# -*- coding: utf-8 -*-
# NEST-DRAMA 测试脚手架 · AGPL-3.0-only
"""公共测试脚手架：把 ui/serve.py 装进一次性沙盒，提供断言、假 LLM 挂点、最小世界、真服务器。

用法（每个测试文件顶部）：
    import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from _harness import *
    m, root = load_engine()          # 引擎模块 + 沙盒根目录（材料/ 角色/ 推演/ 都在 root 下，运行态在 root/ui）
    ...
    done(min_pass=10)                # 任一 FAIL 或 PASS 数不足 → 退出码 1

所有文件写入都落在系统临时目录，绝不碰真实工作区。
"""
import importlib.util
import json
import os
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request
import urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
UI_SRC = os.path.dirname(HERE)                       # …/ui
# 假密钥拼接而成：发布打包器的隐私终检会把「api_key: "sk-…"」形态的字面量当明文凭据拦下（拦得对）
FAKE_CFG = {"base_url": "http://127.0.0.1:9/v1", "model": "fake-model", "api_key": "sk-" + "test-fake-key-" + "0" * 10}

_fails, _passes = [], [0]


def check(name, cond, extra=""):
    """一条断言：打印 PASS/FAIL，失败计入汇总（不中断）。"""
    ok = bool(cond)
    print(("PASS " if ok else "FAIL ") + str(name) + (("  | " + str(extra)[:160]) if extra else ""), flush=True)
    if ok:
        _passes[0] += 1
    else:
        _fails.append(str(name))
    return ok


def done(min_pass=1):
    """汇总退出：有 FAIL 或 PASS 不足 min_pass → exit 1。"""
    print("\n%d PASS · %d FAIL%s" % (_passes[0], len(_fails),
                                      ("  (" + "; ".join(_fails[:8]) + ")") if _fails else ""), flush=True)
    if _passes[0] < min_pass:
        print("PASS 数不足（要求 ≥ %d）" % min_pass)
    sys.exit(1 if (_fails or _passes[0] < min_pass) else 0)


_LOADS = [0]


def load_engine(root=None):
    """把 serve.py 作为独立模块装进沙盒。返回 (模块 m, 沙盒根 root)。
    m.ROOT_DIR=root（库：材料/角色/剧本/推演/纪事.md…），m.UI_DIR=root/ui（运行态 data.json 等）。
    m._llm_cfg 已替换成恒返回 FAKE_CFG（引擎认为 API 已接入）；m._llm 仍是真实现——要 mock 请用 set_llm。"""
    root = root or tempfile.mkdtemp(prefix="nd-t-")
    ui = os.path.join(root, "ui")
    os.makedirs(os.path.join(root, "材料"), exist_ok=True)
    os.makedirs(ui, exist_ok=True)
    _LOADS[0] += 1
    if UI_SRC not in sys.path:
        sys.path.insert(0, UI_SRC)
    spec = importlib.util.spec_from_file_location("nd_serve_%d" % _LOADS[0], os.path.join(UI_SRC, "serve.py"))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    m.ROOT_DIR, m.UI_DIR = root, ui
    m.QUEUE_PATH = os.path.join(root, "指令队列.json")
    m.DATA_PATH = os.path.join(ui, "data.json")
    m.PENDING_PATH = os.path.join(ui, "pending-init.json")
    m.BUILD_FAILED_PATH = os.path.join(ui, "build-failed.json")
    m.API_CFG = os.path.join(ui, "api-config.json")
    m.USAGE_PATH = os.path.join(ui, "usage.json")
    m.GRAVITY_PATH = os.path.join(ui, "gravity.json")
    m._llm_cfg = lambda ignore_mode=False: dict(FAKE_CFG)
    return m, root


def set_llm(m, fn):
    """替换引擎的 LLM 调用。fn(messages, cfg=None, max_tokens=2000, temperature=0.9, timeout=None,
    retries=2, stream=True, think=True) -> (text, err)。messages[0]['content'] 是 system 提示词，
    messages[-1]['content'] 是 user 提示词。"""
    m._llm = fn


def sys_of(messages):
    return str(messages[0].get("content", "")) if messages else ""


def user_of(messages):
    return str(messages[-1].get("content", "")) if messages else ""


def log_to(buf):
    """给引擎函数用的 log 回调：把每条日志 append 进 buf（list）。"""
    return lambda s: buf.append(str(s))


CORE_TMPL = ("---\ntype: core\nname: {n}\nrole: {role}\niq: 3\neq: 3\nsurvival: 3\nstartle: 3\nscheme: 2\n---\n\n"
             "# {n} · 内核卡\n\n身份：{role}\n性格底盘：{base}\n欲望：{desire}\n恐惧：{fear}\n真缺点：嘴硬\n底线：不卖朋友\n"
             "谎言习惯：先岔开话头\n待人：对{other}有旧怨\n**秘密**：{secret}\n")
VOICE_TMPL = "---\ntype: voice\nname: {n}\n---\n\n# {n} · 声纹卡\n\n语体：短句，多反问。口头习惯：「你说呢」。示例句（禁入正文）：「灯不是我吹的。」\n"
PSY_TMPL = ("---\ntype: psyche\nname: {n}\nemo: 惧\ntier: 安\nupdated: 第0轮\n---\n\n# {n} · 心象\n\n他知道的世界：驿站三更换岗。\n"
            "他心里的人：{other}靠不住。\n\n## 此刻\n\n刚接岗，手冷。\n\n## 打算\n\n眼下：先把名单拿到手。\n往后：离开驿站。\n")


def make_world(m, root, cast=("青梧", "白榆", "柳七"), unit="夜巡", budget=6,
               goal="守夜名单落到县令案头", must=("守夜名单被翻出",), rounds_done=0):
    """不经 LLM 直接落一个最小可推演的世界：世界观/脊椎/真相/三卡/剧本/纪事/data.json。返回 D。"""
    for d in ("角色", "剧本", "推演", "02-世界书", "导出"):
        os.makedirs(os.path.join(root, d), exist_ok=True)
    w = lambda rel, txt: open(os.path.join(root, rel), "w", encoding="utf-8").write(txt)
    w("00-世界观.md", "---\ntype: world\ntitle: 测试局\n---\n\n# 世界观\n\n北境驿站，雪夜。守夜人轮值，名单由驿丞掌管。\n")
    w("01-剧情脊椎.md", "---\ntype: spine\n---\n\n# 剧情脊椎\n\n## 铁节点（必达）\n\n1. %s\n\n## 软节点（可漂移）\n\n- 柳七的旧债被提起\n" % goal)
    w("真相底稿.md", "---\ntype: truth\n---\n\n# 真相底稿\n\n名单是白榆改过的。\n")
    names = list(cast)
    for i, n in enumerate(names):
        other = names[(i + 1) % len(names)]
        w("角色/%s.md" % n, CORE_TMPL.format(n=n, role=["驿丞", "守夜人", "过路客商"][i % 3], base="谨慎", desire="保住位置",
                                             fear="被查账", other=other, secret="见过改名单的人"))
        w("角色/%s·声纹.md" % n, VOICE_TMPL.format(n=n))
        w("角色/%s·心象.md" % n, PSY_TMPL.format(n=n, other=other))
    w("剧本/01-%s.md" % unit,
      "# 单元01 · %s\n\n## 卡司\n在场：%s\n暗线：（无）\n\n## 舞台\n三更，驿站站厅，灯烧到一半。\n\n## 开场态\n名单不见了。\n\n"
      "## 单元目标\n%s\n\n## 单元约束\n%s\n\n## 轮次预算\n最多 %d 轮（预估 %d-%d：测试）\n"
      % (unit, "、".join(names), goal, "\n".join("- 必须：" + x for x in must), budget, budget - 1, budget + 2))
    w("纪事.md", "# 纪事 · 测试局\n\n## 第0段 · 开局态\n\n名单不见了。\n")
    D = {"meta": {"title": "测试局", "round": rounds_done, "unitName": unit, "unitRound": "%d/%d" % (rounds_done, budget),
                  "gravity": "顺", "engine": "NEST-DRAMA", "built": True, "vaultPath": root, "config": {"plannedRounds": budget}},
         "spine": [{"kind": "铁", "label": goal, "achieved": False}, {"kind": "软", "label": "柳七的旧债被提起", "achieved": False}],
         "cast": [{"name": n, "role": ["驿丞", "守夜人", "过路客商"][i % 3], "state": "惧·安", "brief": "身份：测试",
                   "profile": {"identity": "测试"}, "traits": {"iq": 3, "eq": 3, "survival": 3, "startle": 3, "scheme": 2}}
                  for i, n in enumerate(names)],
         "relations": [], "lore": [{"name": "守夜规矩", "triggers": ["守夜", "灯"], "constant": True, "excerpt": "三更换岗。", "hits": 0}],
         "graph": {"title": "测试局", "unit": unit,
                   "nodes": [{"id": n, "group": "cast", "file": "角色/%s.md" % n} for n in names] + [{"id": unit, "group": "unit", "file": "剧本/01-%s.md" % unit}],
                   "edges": [{"source": n, "target": unit, "kind": "出场", "unitIndex": 0} for n in names]},
         "gaps": [], "levers": [], "menu": [],
         "forecast": {"total": "%d-%d" % (budget - 1, budget + 2), "perUnit": {unit: "%d-%d" % (budget - 1, budget + 2)}, "remaining": "%d-%d" % (budget - 1, budget + 2)},
         "outcome": None, "feed": [],
         "units": [{"name": unit, "budget": budget, "used": rounds_done, "status": "当前单元（%d/%d）" % (rounds_done, budget), "goal": goal,
                    "est": "%d-%d" % (budget - 1, budget + 2), "colorIndex": 0}],
         "interviews": [], "reports": [], "exports": []}
    m._save_data(D)
    return D


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


def start_server(root=None, timeout=15, env_extra=None):
    """把 ui/ 的引擎文件复制进沙盒并以子进程启动真服务器（HOME 也指向沙盒，~/.nest-drama 不会被碰）。
    返回 (proc, base_url, root)。用完请 stop_server(proc)。"""
    root = root or tempfile.mkdtemp(prefix="nd-srv-")
    ui = os.path.join(root, "ui")
    os.makedirs(os.path.join(root, "材料"), exist_ok=True)
    os.makedirs(ui, exist_ok=True)
    for fn in ("serve.py", "dupian.py", "index.html", "enhance.js", "enhance.css", "ui-adjustments.js", "seal.svg"):
        src = os.path.join(UI_SRC, fn)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(ui, fn))
    if os.path.isdir(os.path.join(UI_SRC, "assets")) and not os.path.isdir(os.path.join(ui, "assets")):
        shutil.copytree(os.path.join(UI_SRC, "assets"), os.path.join(ui, "assets"))
    home = os.path.join(root, "home")
    os.makedirs(home, exist_ok=True)
    env = dict(os.environ)
    env["HOME"] = home
    for k in ("LLM_BASE_URL", "LLM_MODEL_NAME", "LLM_API_KEY"):
        env.pop(k, None)
    if env_extra:
        env.update(env_extra)
    port = free_port()
    proc = subprocess.Popen([sys.executable, "-s", "serve.py", str(port)], cwd=ui, env=env,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    base = "http://127.0.0.1:%d" % port
    t0 = time.time()
    while time.time() - t0 < timeout:
        try:
            st, _h, _b = http("GET", base + "/api/health", timeout=2)
            if st == 200:
                return proc, base, root
        except Exception:
            pass
        time.sleep(0.2)
    proc.kill()
    raise RuntimeError("服务器 %d 秒内未就绪" % timeout)


def stop_server(proc):
    try:
        proc.terminate()
        proc.wait(timeout=5)
    except Exception:
        try:
            proc.kill()
        except Exception:
            pass


def http(method, url, body=None, headers=None, timeout=10):
    """极简 HTTP 客户端。body 为 dict → JSON；bytes 原样。返回 (status, headers_dict, body_bytes)，HTTP 错误也正常返回。"""
    data = None
    hdrs = dict(headers or {})
    if isinstance(body, (dict, list)):
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
        hdrs.setdefault("Content-Type", "application/json")
    elif isinstance(body, str):
        data = body.encode("utf-8")
    elif isinstance(body, bytes):
        data = body
    req = urllib.request.Request(url, data=data, method=method, headers=hdrs)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, {k.lower(): v for k, v in r.headers.items()}, r.read()
    except urllib.error.HTTPError as e:
        return e.code, {k.lower(): v for k, v in e.headers.items()}, e.read()


def http_json(method, url, body=None, headers=None, timeout=10):
    """同 http，但把响应体解成 JSON（解不出返回 None）。返回 (status, headers, obj)。"""
    st, h, b = http(method, url, body, headers, timeout)
    try:
        return st, h, json.loads(b.decode("utf-8"))
    except Exception:
        return st, h, None


def multipart(files, fields=None):
    """构造 multipart/form-data。files=[(filename, bytes)]，fields={name: value}。返回 (body_bytes, content_type)。"""
    boundary = "----ndtest%d" % int(time.time() * 1000)
    out = []
    for k, v in (fields or {}).items():
        out.append(("--%s\r\nContent-Disposition: form-data; name=\"%s\"\r\n\r\n%s\r\n" % (boundary, k, v)).encode("utf-8"))
    for fn, raw in files:
        out.append(("--%s\r\nContent-Disposition: form-data; name=\"files[]\"; filename=\"%s\"\r\n"
                    "Content-Type: application/octet-stream\r\n\r\n" % (boundary, fn)).encode("utf-8") + raw + b"\r\n")
    out.append(("--%s--\r\n" % boundary).encode("utf-8"))
    return b"".join(out), "multipart/form-data; boundary=" + boundary
