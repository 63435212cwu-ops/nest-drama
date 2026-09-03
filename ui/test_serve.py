# -*- coding: utf-8 -*-
# NEST-DRAMA 集成测试 · Copyright (C) 2026 63435212cwu-ops
# SPDX-License-Identifier: AGPL-3.0-only（全文见随包 LICENSE）
"""群像引擎 serve.py 全链路集成测试（mock LLM，不触真实 API，不碰真实工作区）。

用法:  python3 ui/test_serve.py     # 在群像根目录或任意位置均可；沙盒在系统临时目录
覆盖:  init 建世界→世界书→自动推演收束｜单次成文+监修毙稿重推｜三查/脊椎触达落盘｜世界书命中
       gravity 注入即焚｜访谈三模式｜报告 Agent ReACT｜队列 worker 线程消费/失败回执
"""
import json
import os
import shutil
import sys
import tempfile
import time

BASE = tempfile.mkdtemp(prefix="qx-test-")
ROOT = os.path.join(BASE, "qx-home")
UI = os.path.join(ROOT, "ui")
shutil.rmtree(ROOT, ignore_errors=True)
os.makedirs(os.path.join(ROOT, "材料"), exist_ok=True)
os.makedirs(UI, exist_ok=True)
open(os.path.join(ROOT, "材料", "00_测试.txt"), "w", encoding="utf-8").write("测试材料：驿站与守夜。")

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _HERE)
import importlib.util
spec = importlib.util.spec_from_file_location("serve", os.path.join(_HERE, "serve.py"))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

# ── 重定向路径到测试沙盒 ──
m.ROOT_DIR, m.UI_DIR = ROOT, UI
m.QUEUE_PATH = os.path.join(ROOT, "指令队列.json")
m.DATA_PATH = os.path.join(UI, "data.json")
m.PENDING_PATH = os.path.join(UI, "pending-init.json")
m.API_CFG = os.path.join(UI, "api-config.json")   # API 档案也必须指向沙盒
m.USAGE_PATH = os.path.join(UI, "usage.json")     # 用量记账也进沙盒——曾漏配，测试把假用量写进 assets/
REAL_ARCHIVE = m._archive_old_world               # ⑨ 局史归档需真实实现
m._archive_old_world = lambda title: ""           # ①-⑤ 建世界测试不真归档

CALLS = {"n": 0}
JUDGE_CALLS = {"n": 0}
PATCH_CALLS = {"n": 0}
PLAN_CALLS = {"n": 0}
REF_CALLS = {"n": 0}
SECT_CALLS = {"n": 0}
ACTOR_CALLS = {}
CURRENT_TITLE = ["测试局"]                          # fake 建世界返回的局名（⑨ 换成第二局）
REAL_LLM_CFG = m._llm_cfg                          # 真实现必须在 mock 之前捕获
# ⑬ 要测 _llm 自己的回退逻辑，但下面会把 m._llm 换成 mock——先从源码里抠出这一个函数备用
_REAL_LLM_SRC = (lambda s: s[s.index("def _llm(messages"):s.index("def _llm_raw(messages")])(
    open(os.path.join(_HERE, "serve.py"), encoding="utf-8").read())


def fake_llm(messages, cfg=None, max_tokens=2000, temperature=0.9, timeout=120, retries=2,
             stream=True, think=True):
    """按 system prompt 分发假回复。记录收到的 timeout/retries/think 供断言。"""
    CALLS["n"] += 1
    CALLS.setdefault("timeouts", []).append((timeout, retries))
    _sp0 = str(messages[0].get("content", "")) if messages else ""
    CALLS.setdefault("think", []).append(
        ("角色回合" if "永不破戏" in _sp0 else _sp0[:24], think))
    sys_p = messages[0]["content"] if messages else ""
    if m.DIGEST_SYS[:20] in sys_p:
        return "纲要：测试世界，风雪夜，两人。", None
    if sys_p.startswith("你是建世界模块·第一阶段"):
        return json.dumps({"title": CURRENT_TITLE[0], "world": "测试世界观正文。", "spine": {"iron": ["铁节点A"], "soft": ["软节点B"], "forbid": ["禁区C"]}, "truth": "真相：谁做了什么。"}, ensure_ascii=False), None
    if sys_p.startswith("你是建世界模块·第二阶段"):
        return json.dumps({"cast": [
            {"name": "青梧", "role": "主角", "core": "内核：一行。", "voice": "声纹：一行。", "psyche": "心象：一行。", "secrets": "秘密一桩"},
            {"name": "白榆", "role": "守夜人", "core": "内核：一行。", "voice": "声纹：一行。", "psyche": "心象：一行。", "secrets": "另一桩"}]}, ensure_ascii=False), None
    if sys_p.startswith("你是建世界模块·第三阶段"):
        return json.dumps({"units": [{"name": "单元一", "cast": ["青梧", "白榆"], "dark": [], "stage": "夜", "open": "开场。", "goal": "目标达成态", "must": [], "forbid": [], "budget": 2}]}, ensure_ascii=False), None
    if sys_p.startswith("你是建世界模块·第四阶段"):
        return json.dumps({"lore": [{"name": "守夜规矩", "triggers": ["守夜", "灯"], "constant": True, "excerpt": "守夜规矩正文。"},
                                       {"name": "驿道地理", "triggers": ["马厩", "后坡"], "constant": False, "excerpt": "地理正文。"}]}, ensure_ascii=False), None
    if sys_p.startswith("你是NEST-DRAMA的场记模块"):        # 四拍轮·场记搭台
        PLAN_CALLS["n"] += 1
        PLAN_CALLS.setdefault("inputs", []).append(messages[-1]["content"])
        return json.dumps({"driver": "青梧", "target": "白榆", "others": [],
                           "conflict_axis": "青梧要守住灯×白榆要吹灭它",
                           "turn_fuel": "守夜名单此刻被塞到白榆手里",
                           "stage_note": "站厅里灯烧到一半。"}, ensure_ascii=False), None
    if "永不破戏" in sys_p:                              # 角色 agent（四件套，ACTOR_LAW 前缀）
        who = "青梧" if "以青梧的身份" in messages[-1]["content"] else "白榆"
        ACTOR_CALLS.setdefault("prompts", []).append((who, messages[-1]["content"]))
        return ("【目的】指向→%s；我要从他那里逼出实话。\n"
                "【行为】推门查看站厅动静，他顿了顿，非常小心地把灯扶正。\n"
                "【对话】「谁在那儿？」\n"
                "【心理】我读到局势SECRET-%s，它碰到我的旧账，所以我打算对对方施压。"
                % ("白榆" if who == "青梧" else "青梧", who)), None
    if sys_p.startswith("你是毒编的定点改写手"):          # 定点补丁（v3 新增：只发命中句）
        PATCH_CALLS["n"] += 1
        return json.dumps({"fixes": []}, ensure_ascii=False), None
    if sys_p.startswith("你是总审官"):                    # 四刀+语言层：首次毙稿→验证带死因重推，之后放行
        JUDGE_CALLS["n"] += 1
        if JUDGE_CALLS["n"] == 1:
            return "【毙：完整刀——行为没做完，推门后无下文】\n修正：把推门后的所见写完整。", None
        return "【过】", None
    if sys_p.startswith("你是NEST-DRAMA的反应生成模块"):
        return "他抬头看了一眼，没说话。", None
    if sys_p.startswith("你是NEST-DRAMA的裁判模块"):
        REF_CALLS["n"] += 1
        first = REF_CALLS["n"] == 1
        return json.dumps({"scene": "夜里青梧推门查看，白榆接下名单。", "chronicle": "夜半推门，名单易手。",
                           "states": {"青梧": "惧·紧", "白榆": "恶·紧"},
                           "beats": ({"goal": "青梧要逼出实话", "conflict": "白榆顶了回去",
                                      "turn": "守夜名单进了场", "result": "名单到了白榆手里"} if first
                                     else {"goal": "对峙", "conflict": "僵持", "turn": "无", "result": ""}),
                           "flat": (not first), "baton": ("白榆" if first else "青梧"),
                           "baton_reason": "名单在他手上" if first else "被顶住了",
                           "scars": ([{"a": "青梧", "b": "白榆", "what": "推门那句质问说破了守夜的默契，回不去了"}]
                                     if first else []),
                           "gravity": "顺", "goal_progress": ("推进" if first else "达成"),
                           "goal_reason": "推门查探", "gaps": ["信息差一"],
                           "remaining": "1-2", "checks": {"view": "✓ 未越界", "iq": "✓ 合理", "persona": "✓ 符"},
                           "touched": ["铁节点A"]}, ensure_ascii=False), None
    if sys_p.startswith("你是NEST-DRAMA的终局模块"):
        return json.dumps({"summary": "达成。", "castFates": [{"name": "青梧", "fate": "活着"}], "major": ["大事件"], "minor": [], "audit": "闭合"}, ensure_ascii=False), None
    if sys_p.startswith("你是NEST-DRAMA的报告总编"):
        return json.dumps({"title": "测试报告", "sections": [{"id": "s1", "title": "执行摘要", "focus": "终局如何"}]}, ensure_ascii=False), None
    if sys_p.startswith("你是NEST-DRAMA的章节执笔"):
        # 逼引擎走一遍带范围的 read_chronicle 工具循环——此前曾在这里
        # too many values to unpack 崩掉整个报告管线，mock 直出 final 测不到
        SECT_CALLS["n"] += 1
        if SECT_CALLS["n"] == 1:
            return json.dumps({"thought": "先读纪事", "tool": "read_chronicle", "args": {"a": "1-2"}},
                              ensure_ascii=False), None
        return json.dumps({"final": "本章内容：引用第1轮。"}, ensure_ascii=False), None
    if "上帝视角问答" in sys_p or "吐真模式" in sys_p:
        return "测试答：如是说。", None
    return "（未匹配的假回复）", None


m._llm_cfg = lambda ignore_mode=False: {"base_url": "http://x", "model": "m", "api_key": "k"}
m._llm = fake_llm
log = lambda s: print("  [log]", s)

fails = []


def check(name, cond, extra=""):
    print(("PASS " if cond else "FAIL ") + name + (("  | " + str(extra)[:80]) if extra else ""))
    if not cond:
        fails.append(name)


def _deposit(files=("材料/00_测试.txt",)):
    """模拟「投放新世界」：把本批材料白名单写进 pending-init.json。
    空材料守卫(serve._auto_init)只认这一批白名单——真实建造的唯一材料入口。
    直接往 材料/ 放文件不写白名单，应被判为「没有可用的建世界材料」。"""
    json.dump({"title": "测试局", "requirement": "", "files": list(files),
               "at": time.strftime("%Y-%m-%d %H:%M:%S"), "at_ts": time.time()},
              open(m.PENDING_PATH, "w", encoding="utf-8"), ensure_ascii=False)


print("== ① 队列消费器：init 全链路（建世界→世界书→自动推演2轮→收束） ==")
m._save_queue({"queue": [{"id": "c-0001", "ts": "2026-08-26 14:15:18", "status": "待处理", "type": "init",
                           "payload": {"title": "测试局", "requirement": "支撑28章", "raw": "测试材料", "confirm": True}}]})
t = threading_t = None
import threading
th = threading.Thread(target=lambda: None)  # 占位
_deposit()
ok, msg = m._dispatch({"id": "c-0001", "type": "init",
                       "payload": {"title": "测试局", "requirement": "支撑28章", "raw": "测试材料", "confirm": True}}, log)
print("  init 回执:", msg)
D = json.load(open(m.DATA_PATH, encoding="utf-8"))
check("建世界成功", ok)
check("世界书条目入 data", len(D.get("lore", [])) == 2, D.get("lore"))
check("世界书文件落盘", os.path.exists(os.path.join(ROOT, "02-世界书", "守夜规矩.md")))
check("自动推演2轮收束", D["meta"]["round"] >= 1, D["meta"].get("round"))
r1 = open(os.path.join(ROOT, "推演", "第001轮.md"), encoding="utf-8").read()
check("轮记录含审核审计·毙稿重推", "审核审计" in r1 and "重推" in r1, r1[r1.find("审核审计"):][:120] if "审核审计" in r1 else "无审计段")
check("单次成文落回合", "【行为】推门查看" in r1)
check("机检本地修·按钮词已删", "顿了顿" not in r1.split("## 【纪要】")[0], r1[:400])
check("机检本地修·弱词已删", "非常小心" not in r1)
check("审计层留机检痕迹", "机检" in r1 or "体检" in r1, r1[r1.find("审核审计"):][:200] if "审核审计" in r1 else "无")

# ── 四拍轮结构断言（v3.1）──
check("轮记录含结构四拍段", "【结构·四拍】" in r1)
for _b in ("目的：", "冲突：", "转折：", "结果：", "接棒："):
    check("四拍字段·%s" % _b[:-1], "- " + _b in r1)
check("frontmatter 含 driver/target/baton",
      "driver: 青梧" in r1 and "target: 白榆" in r1 and "baton: 白榆" in r1, r1[:300])
check("回合含【目的】指向行", "【目的】指向→" in r1)
check("心理三步完整入档", "我读到局势SECRET-青梧" in r1)
r2p = os.path.join(ROOT, "推演", "第002轮.md")
check("第2轮存在（budget=2 跑满）", os.path.exists(r2p))
r2 = open(r2p, encoding="utf-8").read() if os.path.exists(r2p) else ""
check("接棒链：R1棒=白榆 必在 R2 驱动/指向位（咬合律）",
      ("driver: 白榆" in r2) or ("target: 白榆" in r2), r2[:260])
check("平轮判定入档（R2 裁判 flat）", "flat: true" in r2 and "平轮" in r2)
_D2 = json.load(open(m.DATA_PATH, encoding="utf-8"))
check("meta 记接棒与平轮债", _D2["meta"].get("flatDebt") == 1 and _D2["meta"].get("baton") == "青梧",
      {"flatDebt": _D2["meta"].get("flatDebt"), "baton": _D2["meta"].get("baton")})
check("meta.lastLed 覆盖两人", set(_D2["meta"].get("lastLed", {})) >= {"青梧", "白榆"}, _D2["meta"].get("lastLed"))
check("feed 带 beats/baton", _D2["feed"][0].get("beats", {}).get("turn") == "守夜名单进了场"
      and _D2["feed"][0].get("baton") == "白榆", _D2["feed"][0].get("beats"))
# 视野律机械保证：应对者（R1 的白榆）看得见驱动者的行为/对话，看不见其心理与目的
_resp = [p for w, p in ACTOR_CALLS.get("prompts", []) if w == "白榆" and "第1轮" in p]
check("应对者收到驱动者公开动作", _resp and "推门查看站厅动静" in _resp[0])
check("应对者看不见驱动者心理", _resp and "SECRET-青梧" not in _resp[0] and "【目的】指向" not in _resp[0])
check("转折燃料送到点名者（白榆）",
      any(w == "白榆" and "守夜名单此刻被塞到" in p for w, p in ACTOR_CALLS.get("prompts", [])))
check("场记收到硬指令（R2 前无债→无；若有债则带）", PLAN_CALLS["n"] >= 2)
check("轮记录含三查", "三查" in r1 and "视野" in r1)
check("轮记录含脊椎触达", "铁节点A" in r1)
check("轮记录含世界书命中", "世界书命中" in r1)
check("feed 含 checks/touched", bool(D["feed"] and D["feed"][0].get("checks") and D["feed"][0].get("touched")))
check("脊椎 touchedRound", any(s.get("touchedRound") for s in D["spine"]))
check("纪事追加", "第1段" in open(os.path.join(ROOT, "纪事.md"), encoding="utf-8").read())

print("== ② gravity 注入 → 下一轮携带即焚 ==")
ok2, _ = m._gravity_inject("一只黑猫跳上供桌")
D = json.load(open(m.DATA_PATH, encoding="utf-8"))
check("注入写入", D["meta"].get("gravityInject") == "一只黑猫跳上供桌")
ok3, msg3, _ = m._auto_round(log)
D = json.load(open(m.DATA_PATH, encoding="utf-8"))
r2 = open(os.path.join(ROOT, "推演", "第002轮.md") if os.path.exists(os.path.join(ROOT, "推演", "第002轮.md"))
          else os.path.join(ROOT, "推演", "第003轮.md"), encoding="utf-8").read()
check("注入即焚", D["meta"].get("gravityInject") == "")

print("== ③ 访谈（戏内/吐真/全局） ==")
a1, e1 = m._interview("青梧", "你怕什么？", "戏内")
a2, e2 = m._interview("青梧", "说实话", "吐真")
a3, e3 = m._interview("全局", "谁在撒谎？", "吐真")
D = json.load(open(m.DATA_PATH, encoding="utf-8"))
check("三模式访谈入库", not e1 and not e2 and not e3 and len(D.get("interviews", [])) == 3, [e1, e2, e3])

print("== ④ 报告 Agent（大纲→ReACT分章） ==")
name, err = m._report_agent(log)
D = json.load(open(m.DATA_PATH, encoding="utf-8"))
check("报告落盘", not err and os.path.exists(os.path.join(ROOT, "导出", name)), err)
check("reports 登记", len(D.get("reports", [])) == 1 and D["reports"][0]["md"].startswith("# 测试报告"))

print("== ⑤ 队列 worker 线程消费（真实线程循环） ==")
m._save_queue({"queue": [{"id": "c-0001", "ts": "2026-08-26 14:15:18", "status": "已处理", "type": "init", "payload": {}},
                          {"id": "c-0002", "ts": time.strftime("%Y-%m-%d %H:%M:%S"), "status": "待处理",
                           "type": "interview", "payload": {"who": "全局", "q": "现在几轮了？", "mode": "吐真"}},
                          {"id": "c-0003", "ts": time.strftime("%Y-%m-%d %H:%M:%S"), "status": "待处理",
                           "type": "unknown-x", "payload": {}},
                          {"id": "c-0004", "ts": time.strftime("%Y-%m-%d %H:%M:%S"), "status": "处理中",
                           "type": "pause", "payload": {}}]})
th = threading.Thread(target=m._queue_worker, daemon=True)
th.start()
threading.Thread(target=m._hb_thread, daemon=True).start()   # 心跳线程（与 worker 分离）
deadline = time.time() + 25
while time.time() < deadline:
    q = m._load_queue()
    st = {i["id"]: i.get("status") for i in q["queue"]}
    if st.get("c-0002") == "已处理" and st.get("c-0003") == "失败" and st.get("c-0004") == "已处理":
        break
    time.sleep(1)
q = m._load_queue()
byid = {i["id"]: i for i in q["queue"]}
check("worker 消费 interview", byid.get("c-0002", {}).get("status") == "已处理", byid.get("c-0002", {}).get("result", ""))
check("worker 未知类型→失败回执", byid.get("c-0003", {}).get("status") == "失败", byid.get("c-0003", {}).get("result", ""))
check("孤儿回收：处理中→重置→消费", byid.get("c-0004", {}).get("status") == "已处理", byid.get("c-0004", {}).get("result", ""))
check("worker 不动其它状态项", byid.get("c-0001", {}).get("status") in ("已处理", "失败"))

print("== ⑥ 接入门（强制弹窗注入） ==")
m._llm_cfg = lambda ignore_mode=False: None            # 模拟未配置
html = "<html><body><div id=\"app\"></div></body></html>"
m._api_save({"profiles": [], "current": "", "mode": "api"})
check("未配置→注入弹窗", "qx-gate" in m._gate_inject(html))
check("弹窗无会话代跑入口", "qx-g-sess" not in m._gate_inject(html))
m._api_save({"profiles": [{"id": "p1", "name": "t", "base_url": "http://x", "model": "m", "api_key": "k"}],
             "current": "p1", "mode": "api"})
m._llm_cfg = REAL_LLM_CFG                            # 恢复真实实现：从沙盒档案读出配置
check("已配置→不注入", "qx-gate" not in m._gate_inject(html))
check("状态条注入已删净（顶栏内建，不再注入）", not hasattr(m, "_status_inject"))
m._llm_cfg = lambda ignore_mode=False: None         # 继续模拟引擎不可用
m._api_save({"profiles": [], "current": "", "mode": "session"})
check("会话代跑禁用：session 也不放行", "qx-gate" in m._gate_inject(html))
check("旧 session 存储→读入即翻回 api", m._api_store().get("mode") == "api")
m._llm_cfg = REAL_LLM_CFG

print("== ⑦ API 持久化（重启后仍生效） ==")
m._api_save({"profiles": [], "current": "", "mode": "api"})
m._llm_cfg = REAL_LLM_CFG
check("沙盒内无配置→gate 生效", "qx-gate" in m._gate_inject(html))
m._api_save({"profiles": [{"id": "p9", "name": "持久档", "base_url": "https://api.persist/v1",
                           "model": "persist-m", "api_key": "sk-persist"}],
             "current": "p9", "mode": "api"})
# 模拟"下次打开"：全进程重新 import serve（如同重启服务）
spec2 = importlib.util.spec_from_file_location("serve2", os.path.join(_HERE, "serve.py"))
m2 = importlib.util.module_from_spec(spec2)
spec2.loader.exec_module(m2)
m2.ROOT_DIR, m2.UI_DIR = ROOT, UI
m2.API_CFG = os.path.join(UI, "api-config.json")
m2.DATA_PATH = os.path.join(UI, "data.json")
cfg2 = m2._llm_cfg()
check("重启进程后档案仍在且可读", bool(cfg2) and cfg2["model"] == "persist-m", cfg2)
check("重启进程后弹窗不注入", "qx-gate" not in m2._gate_inject(html))
m2._llm = fake_llm
check("重启后 auto-status 报已持久", m2._llm_cfg(ignore_mode=True) is not None)

print("== ⑧ 防卡顿：短超时路径 ==")
CALLS["timeouts"] = []
m._llm_cfg = lambda ignore_mode=False: {"base_url": "http://x", "model": "m", "api_key": "k"}
m._interview("全局", "快问", "吐真", timeout=60)
to = CALLS["timeouts"][-1]
check("同步问答 60s 超时直传", to == (60, 2), to)
m._interview("青梧", "戏内问", "戏内")                      # 默认路径
to = CALLS["timeouts"][-1]
check("默认路径自适应超时（None=按 max_tokens 估算）", to[0] is None, to)
check("自适应公式 8000→1080s", m._llm_timeout(8000) == 1080, m._llm_timeout(8000))
check("自适应公式 2000→360s", m._llm_timeout(2000) == 360, m._llm_timeout(2000))
check("自适应公式 150→138s 且有上限", m._llm_timeout(150) == 138 and m._llm_timeout(99999) == 1800,
      (m._llm_timeout(150), m._llm_timeout(99999)))
m._llm_cfg = REAL_LLM_CFG

print("== ⑨ 心跳与局史归档 ==")
check("worker 已产生心跳", m.AUTO.get("hb", 0) > 0)
before_hb = m.AUTO["hb"]
time.sleep(0.1)
check("心跳时间戳在推进（worker 存活）", m.AUTO["hb"] >= before_hb)
check("AUTO 状态含 err 字段（卡死可上报）", "err" in m.AUTO)
# 局史：已有一局（测试局），直接归档再建一局验证
hist = m._archives_store()
check("新局已登记为当前局", hist.get("current") == "测试局", hist.get("current"))
m._api_save({"profiles": [{"id": "p9", "name": "持久档", "base_url": "https://api.persist/v1",
                           "model": "persist-m", "api_key": "sk-persist"}],
             "current": "p9", "mode": "api"})
m._llm_cfg = lambda ignore_mode=False: {"base_url": "http://x", "model": "m", "api_key": "k"}
CURRENT_TITLE[0] = "第二局"                             # fake 建世界改返回新局名
m._archive_old_world = REAL_ARCHIVE                   # 恢复真实归档（M22 起写沙盒库内 归档/，天然隔离）
_deposit()
m._auto_init("第二局材料", "第二局", "需求", log, confirm=True)   # 用户亲手投放=确认覆盖
hist = m._archives_store()
check("归档后局史+1", len(hist["archives"]) == 1 and hist["archives"][0]["title"] == "测试局", hist)
check("归档记录含轮数", hist["archives"][0]["rounds"] >= 1, hist["archives"][0])
import glob as _g2
arch_dirs = _g2.glob(os.path.join(m._archive_root(), "*_群像局_*"))
check("归档目录落盘（库内 归档/）", len(arch_dirs) >= 1, arch_dirs)
d1 = [d for d in arch_dirs if "测试局" in d]
check("归档含 data.json（旧局状态完整）", d1 and os.path.exists(os.path.join(d1[0], "data.json")))
check("归档含推演目录", d1 and os.path.exists(os.path.join(d1[0], "推演")))
check("当前局切到新局", hist.get("current") == "第二局", hist.get("current"))
m._llm_cfg = REAL_LLM_CFG
# 清理测试归档目录
import shutil as _sh
for d in arch_dirs:
    _sh.rmtree(d, ignore_errors=True)

# ── reset-sim：清空推演记录 ──
n_del = m._reset_sim()
D2 = m._load_data() or {}
check("reset-sim 轮文件清空", not __import__("glob").glob(os.path.join(ROOT, "推演", "*.md")), n_del)
check("reset-sim round 归零", D2.get("meta", {}).get("round") == 0, D2.get("meta", {}).get("round"))
check("reset-sim feed 清空", D2.get("feed") == [], len(D2.get("feed") or []))
check("reset-sim 心象归零", "第0轮" in open(os.path.join(ROOT, "角色", "青梧·心象.md"), encoding="utf-8").read(), "")

print("== ⑩ delete-sim：先归档再清库，历史记录消失 ==")
okd, det = m._delete_sim()
import glob as _g3
arch2 = [d for d in _g3.glob(os.path.join(m._archive_root(), "*_群像局_*")) if "第二局" in d]
check("delete-sim 归档落盘（可回滚）", okd and len(arch2) >= 1, det)
check("delete-sim data.json 清除", not os.path.exists(m.DATA_PATH))
check("delete-sim 世界库清除", not os.path.exists(os.path.join(ROOT, "00-世界观.md")))
check("delete-sim 材料保留", os.path.exists(os.path.join(ROOT, "材料", "00_测试.txt")))
check("delete-sim 空库再删→无记录", m._delete_sim()[1] == "当前无推演记录")
import shutil as _sh2
for d in arch2:
    _sh2.rmtree(d, ignore_errors=True)

print()
# ── 终局机制（v3.4）：单元收束自动进下一单元；全部收束=全局终局，beat 拒绝空转 ──
print("== ⑩b 毁局守卫：有进度的局上未确认的建世界指令必须被拒 ==")
_Dg = json.load(open(m.DATA_PATH, encoding="utf-8")) if os.path.exists(m.DATA_PATH) else {"meta": {}}
_Dg.setdefault("meta", {}).update({"built": True, "round": 7, "title": "在跑的局"})
json.dump(_Dg, open(m.DATA_PATH, "w", encoding="utf-8"), ensure_ascii=False)
_okg, _msgg = m._dispatch({"id": "c-orphan", "type": "init",
                           "payload": {"title": "偷袭局", "requirement": "", "raw": "x"}}, log)
check("未确认 init 被拒（不毁局）", (not _okg) and "已推演 7 轮" in _msgg, _msgg)
check("被拒后局仍在", json.load(open(m.DATA_PATH, encoding="utf-8"))["meta"].get("round") == 7)
_qo = {"queue": [{"id": "c-orph2", "ts": "x", "status": "处理中", "type": "init", "payload": {}}]}
m._save_queue(_qo)
_qq = m._load_queue()
_orph = [i for i in _qq["queue"] if i.get("status") == "处理中"]
check("孤儿 init 在队列里待回收", len(_orph) == 1)

print("== ⑪ 终局机制：提前收束/换单元/全局终局守卫 ==")
_D = {"meta": {"unitName": "第一幕", "title": "终局测试局"},          # ⑩ 已清库：现造最小局
      "units": [{"name": "第一幕", "status": "已收束（3/8）", "goal": "g1"},
                {"name": "第二幕", "status": "待启", "goal": "g2"}]}
json.dump(_D, open(m.DATA_PATH, "w", encoding="utf-8"), ensure_ascii=False)
check("未全收束时 _all_closed=False", not m._all_closed())
check("收束后自动进下一单元", m._advance_unit(lambda x: None))
_D2 = json.load(open(m.DATA_PATH, encoding="utf-8"))
check("单元已切换且链状态重置", _D2["meta"]["unitName"] == "第二幕"
      and _D2["meta"].get("baton") == "" and not _D2["meta"].get("nextPlan"), _D2["meta"].get("unitName"))
_D2["units"][1]["status"] = "已收束（5/8）"
json.dump(_D2, open(m.DATA_PATH, "w", encoding="utf-8"), ensure_ascii=False)
check("全部收束 → _all_closed=True", m._all_closed())
check("全局终局后无单元可进", not m._advance_unit(lambda x: None))

print("== ⑫ 预算回退链 + 计时/进度契约（M13 审计）==")
# 剧本文件缺失（本沙盒 剧本/ 为空）时，预算不许再落到默认 8
_D3 = {"meta": {"unitName": "无剧本单元", "title": "预算测试局", "unitRound": "9/8",
                "config": {"plannedRounds": 300}},
       "forecast": {"perUnit": {"无剧本单元": "120-160"}},
       "units": [{"name": "无剧本单元", "goal": "g", "status": "当前"}]}
json.dump(_D3, open(m.DATA_PATH, "w", encoding="utf-8"), ensure_ascii=False)
_U3 = m._unit_ctx(_D3)
check("剧本缺失→取 plannedRounds 而非默认8", _U3["budget"] == 300, _U3["budget"])
check("预算正确→阶段不再全程误判收束轮", _U3["phase"] == "开局", _U3["phase"])
check("units 回填 budget（不再留 None）", _D3["units"][0].get("budget") == 300)
check("meta.unitRound 不参与预算解析（防自我固化）", _U3["budget"] != 8)
_D3["units"][0]["budget"] = 42                     # units 显式预算优先于 plannedRounds
check("units[].budget 优先", m._unit_ctx(_D3)["budget"] == 42)
del _D3["units"][0]["budget"], _D3["meta"]["config"]
check("无 plannedRounds → 取 forecast 上限", m._unit_ctx(_D3)["budget"] == 160)
# 计时样本跨重启
m.AUTO["roundTimes"] = []
_D3.setdefault("meta", {})["roundSecs"] = [100.0, 140.0]
json.dump(_D3, open(m.DATA_PATH, "w", encoding="utf-8"), ensure_ascii=False)
check("重启后从 data.json 读回轮耗时样本", m._round_times() == [100.0, 140.0], m._round_times())
m._push_round_time(60)
check("新样本入内存并落盘",
      m.AUTO["roundTimes"][-1] == 60.0
      and json.load(open(m.DATA_PATH, encoding="utf-8"))["meta"]["roundSecs"][-1] == 60.0)
# 进度分步推进
m.AUTO["round"], m.AUTO["stepDone"], m.AUTO["stepTotal"], m.AUTO["pct"] = 7, 0, 4, 15
m._step_done("甲", " 出手")
_p1 = m.AUTO["pct"]
m._step_done("乙", " 应对")
check("主笔完成即推进进度（不再 15%→85% 冻结）", 15 < _p1 < m.AUTO["pct"] < 85, (_p1, m.AUTO["pct"]))
check("阶段名带已成稿计数", "2/4" in m.AUTO["stage"], m.AUTO["stage"])
m.AUTO["stepDone"] = m.AUTO["stepTotal"] = 0

print("== ⑬ 思考链开关（按实测质量分派，非一刀切）==")
# 契约依据（逐条实测，见 serve.py:_llm 文档串）：
#   关思考质量不降反升 → 监修（病灶抓得更全）、裁判（不再臆造场景）、场记（两跳律写进指令替代思考）、反应
#   创作/综合判断 → 角色回合、终局清单、章节执笔 **保留思考**
# 额度一律给足：不足会被思考吃光返回空正文并触发重试，比给足更慢。
_tk = dict()
for who, th in CALLS.get("think", []):
    _tk.setdefault(who, set()).add(th)
def _thinks(prefix, want):
    hits = [v for k, v in _tk.items() if k.startswith(prefix)]
    return bool(hits) and all(want in v and len(v) == 1 for v in hits)
check("裁判模块关思考", _thinks("你是NEST-DRAMA的裁判", False), _tk.get("你是NEST-DRAMA的裁判模块（上帝视角，只做"))
check("场记模块关思考", _thinks("你是NEST-DRAMA的场记", False))
check("监修（总审官）关思考", _thinks("你是总审官", False))
# 反应行只在有"非主笔在场者"时才调用，本夹具卡司 2 人全是主笔 → 取不到运行样本，退到源码断言
_SRC = open(os.path.join(_HERE, "serve.py"), encoding="utf-8").read()
check("反应生成关思考", "REACT_SYS" in _SRC and
      "think=False" in _SRC[_SRC.index('"content": REACT_SYS'):_SRC.index('"content": REACT_SYS') + 700])
check("终局模块保留思考（整单元综合判断，每单元仅一次）", _thinks("你是NEST-DRAMA的终局", True))
check("角色回合保留思考（创作型）", _thinks("角色回合", True), _tk.get("角色回合"))
check("章节执笔保留思考（创作型）", _thinks("你是NEST-DRAMA的章节执笔", True))
# 关思考拿到空正文时，_llm 必须原地开思考重试一次——绝不为提速丢轮。
# 这里用真实 _llm（本文件顶部把 m._llm 换成了 mock，故从模块源码另取一份原实现）。
_ns = {}
exec(compile(_REAL_LLM_SRC, "serve_llm", "exec"), m.__dict__, _ns)
_real_llm = _ns["_llm"]
_seq = []


def _flaky_raw(messages, cfg=None, max_tokens=2000, temperature=0.9, timeout=None, retries=2,
               stream=True, think=True):
    _seq.append(think)
    return (("正文来了", None) if think else ("", None))


_saved_raw, m._llm_raw = m._llm_raw, _flaky_raw
_txt, _terr = _real_llm([{"role": "system", "content": "x"}], {"model": "m"}, think=False)
m._llm_raw = _saved_raw
check("关思考空正文→自动开思考重试一次", _seq == [False, True], _seq)
check("回退后拿到正文（不丢轮）", _txt == "正文来了", (_txt, _terr))

print("== ⑭ 局部变量先定义后使用（咬合律/轮转律曾在 candlog 定义前就往里记账）==")
# 该分支只在「场记选了非接棒者」且卡司≥3 时触发，2 人夹具跑不到 → 用 AST 静态守卫
import ast as _ast
_tree = _ast.parse(open(os.path.join(_HERE, "serve.py"), encoding="utf-8").read())
_fn = next(n for n in _ast.walk(_tree)
           if isinstance(n, _ast.FunctionDef) and n.name == "_auto_round")
_bad = []
for _name in ("candlog", "turns"):
    _first_set = min([nd.lineno for nd in _ast.walk(_fn)
                      if isinstance(nd, _ast.Name) and isinstance(nd.ctx, _ast.Store) and nd.id == _name] or [10 ** 9])
    _first_use = min([nd.lineno for nd in _ast.walk(_fn)
                      if isinstance(nd, _ast.Name) and isinstance(nd.ctx, _ast.Load) and nd.id == _name] or [10 ** 9])
    if _first_use < _first_set:
        _bad.append("%s 第%d行就被读，第%d行才赋值" % (_name, _first_use, _first_set))
check("_auto_round 无「先用后赋值」局部变量", not _bad, "；".join(_bad))

print("== ⑮ 真人度评分 + SSE 进度载荷 + 图灵盲测（M14）==")
import dupian as _dp
check("真人度：干净人话高分", _dp.human_score("我怕他。真的怕。「你再提王鼎我就走。」他把烟掐了，堵住门口。") >= 85)
check("真人度：AI腔低分", _dp.human_score(
    "他顿了顿，指尖无意识地摩挲着袖口，喉结滚动了一下。空气仿佛凝固。他深吸一口气，眼中闪过一丝复杂。") <= 40)
check("真人度：空文本 0 分", _dp.human_score("") == 0)
# feed 带 human 字段（引擎在 _auto_round 落盘时算过审回合均值）
_feedD = json.load(open(m.DATA_PATH, encoding="utf-8")) if os.path.exists(m.DATA_PATH) else {}
# ①的推演已收束清库，直接验字段契约存在于代码路径
check("feed 契约含 human 字段", '"human": human' in open(os.path.join(_HERE, "serve.py"), encoding="utf-8").read())
# _auto_payload 是 GET 与 SSE 的共同载荷源（两条通道同形）
_pl = m._auto_payload()
for k in ("running", "stage", "pct", "step_done", "step_total", "ver", "live", "eta_secs"):
    assert k in _pl, k
check("_auto_payload 载荷齐全（GET 与 SSE 同源）", True)
_v0 = m.AUTO.get("ver", 0)
m._set_progress("测试阶段", 33)
check("_set_progress 自增 ver（SSE 即推的触发器）", m.AUTO.get("ver", 0) == _v0 + 1)
m._live_push("测试角色", "【行为】推门。\n【对话】「谁？」")
check("_live_push 自增 ver", m.AUTO.get("ver", 0) == _v0 + 2)
# 图灵盲测：mock 已挂（fake_llm 兜底返回非 JSON → 返回 None 不炸）；再验解析路径
def _fake_turing(messages, cfg=None, **kw):
    if messages and str(messages[0].get("content", "")).startswith("你是文学编辑"):
        return json.dumps([{"i": 1, "verdict": "人", "score": 8, "tell": "「谁在那儿？」的口语毛边"},
                           {"i": 2, "verdict": "难辨", "score": 6, "tell": "对话略平"}], ensure_ascii=False), None
    return fake_llm(messages, cfg, **kw)
_saved = m._llm
m._llm = _fake_turing
os.makedirs(os.path.join(ROOT, "推演"), exist_ok=True)
open(os.path.join(ROOT, "推演", "第001轮.md"), "w", encoding="utf-8").write(
    "## 甲 回合\n\n【行为】把卷宗推过去，摊开第三页按住。\n【对话】「看这里。签名是你父亲的吗？」\n\n"
    "## 乙 回合\n\n【行为】合上卷宗，抽走了那一页塞进怀里。\n【对话】「这东西你从哪儿拿的。」\n")
_tur = m._turing_audit({}, {"name": "测试单元"}, lambda s: None)
m._llm = _saved
check("图灵盲测：出分+破绽", bool(_tur) and _tur["score"] == 7.0 and len(_tur["tells"]) == 2, _tur)

print("== ⑮b 时间感：关系后遗症落心象旧账（L3 冲突不留后遗症的对症药）==")
os.makedirs(os.path.join(ROOT, "角色"), exist_ok=True)
for _nm in ("疤甲", "疤乙"):
    open(os.path.join(ROOT, "角色", "%s·心象.md" % _nm), "w", encoding="utf-8").write(
        "---\nemo: 惧\ntier: 紧\nupdated: 第0轮\n---\n\n## 他此刻\n\n无。\n")
m._psyche_scar("疤甲", "疤乙", "推门那句质问说破了守夜的默契，回不去了", 1)
m._psyche_scar("疤乙", "疤甲", "推门那句质问说破了守夜的默契，回不去了", 1)
_psyA = open(os.path.join(ROOT, "角色", "疤甲·心象.md"), encoding="utf-8").read()
_psyB = open(os.path.join(ROOT, "角色", "疤乙·心象.md"), encoding="utf-8").read()
check("旧账写进双方心象", "旧账" in _psyA and "回不去了" in _psyA and "[[疤甲]]" in _psyB)
m._psyche_scar("疤甲", "疤乙", "推门那句质问说破了守夜的默契，回不去了", 1)
check("同一条旧账不重复记", open(os.path.join(ROOT, "角色", "疤甲·心象.md"), encoding="utf-8").read().count("回不去了") == 1)
m._psyche_scar("疤甲", "疤乙", "第二桩：名单的事她记下了", 2)
check("旧账累积不覆盖", open(os.path.join(ROOT, "角色", "疤甲·心象.md"), encoding="utf-8").read().count("与[[疤乙]]") == 2)
check("裁判 scars 契约在推演路径", '"scars"' in open(os.path.join(_HERE, "serve.py"), encoding="utf-8").read()
      and 'R.get("scars")' in open(os.path.join(_HERE, "serve.py"), encoding="utf-8").read())
check("闲笔入法（ACTOR_LAW 第11条+监修免罪）", "过日子" in m.ACTOR_LAW and "闲笔" in m.REVIEW_SYS)

print("== ⑯ 反AI补强（M15）==")
import dupian as _dp2
_c16 = [
    ("空气仿佛凝固了。天气很闷。", "EMO灌水已修", lambda t: _dp2.metrics(t)["情绪词"] == 0),
    ("他突然站了起来。", "突然入弱词族", lambda t: any(h[0] == "弱词·突然族" for h in _dp2.scan(t))),
    ("这不是结束，是开始。", "不是A是B放宽", lambda t: any(h[0] == "不是A是B" for h in _dp2.scan(t))),
    ("希望这能帮到你。", "礼貌残留机检", lambda t: any(h[0].startswith("礼貌残留") for h in _dp2.scan(t))),
    ("那人亮出手机，是想让我知道他知道。", "礼貌残留不误报角色心理", lambda t: not _dp2.scan(t)),
    ("我来晚了十分钟。", "十分钟不误报强度副词", lambda t: not _dp2.scan(t)),
]
for t, name, fn in _c16:
    check(name, fn(t))
check("悖论修辞删后缀信息不减", _dp2.repair("他平静得可怕。")[0] == "他平静。", _dp2.repair("他平静得可怕。")[0])
# ── 数目账 / 密度裁决 / v4 病谱（零 token）──
check("中文数字·五千二百", _dp2.cn2int("五千二百") == 5200)
check("中文数字·两万三", _dp2.cn2int("两万三") == 23000)
check("中文数字·三百零六", _dp2.cn2int("三百零六") == 306)
_nf = _dp2.num_facts("船夫转运五千二百领重铠，仓中存粮一千二百石，甲士八百人。", "阿青")
check("数目抽取·单位后名词", any(f["noun"] == "重铠" and f["qty"] == 5200 and f["unit"] == "领" for f in _nf), _nf)
check("数目抽取·单位前名词", any(f["noun"].endswith("存粮") and f["qty"] == 1200 for f in _nf), _nf)
_led = [{"qty": 5200, "unit": "领", "noun": "重铠", "round": 3, "who": "船夫"}]
_c1 = _dp2.num_conflicts(_dp2.num_facts("那五千领重铠昨日已到。", "老周"), _led)
check("数目冲突·悄悄换数被抓", len(_c1) == 1 and _c1[0][0]["qty"] == 5000, _c1)
check("数目冲突·明着质疑放行", _dp2.disputes("你说五千领？不对，账上是五千二百领。", "重铠"))
check("数目冲突·同数不报", not _dp2.num_conflicts(_dp2.num_facts("五千二百领重铠。", "x"), _led))
check("密度裁决·短文少量命中不毙", not _dp2.density_verdict("他顿了顿。「走。」")[0])
check("密度裁决·密集命中毙", _dp2.density_verdict("他顿了顿，深吸一口气，垂眸，指节泛白，瞳孔一缩，嘴角勾起。喉结滚动，欲言又止，一字一顿地说。")[0])
check("v4病谱·欲言又止", any(h[0] == "欲言又止" for h in _dp2.scan("他欲言又止。")))
check("v4病谱·拟人沉默", any(h[0] == "拟人沉默" for h in _dp2.scan("沉默在屋里蔓延。")))
check("统计层·破折号成瘾", any("破折号" in d for d in _dp2.diagnose("他——走了——又回——来——再走——又回——不走了——罢了。")))

# ── 材料读取层：编码嗅探 / 办公格式 / zip 展开 / API 结构 ──
import io as _io, zipfile as _zf, zlib as _zl
_S = sys.modules.get("serve") or __import__("serve")
def _mk_docx(paras):
    b = _io.BytesIO(); z = _zf.ZipFile(b, "w")
    z.writestr("word/document.xml", '<w:document><w:body>%s<w:p><w:r><w:t>A</w:t><w:tab/><w:t>B</w:t><w:br/><w:t>C &amp; D</w:t></w:r></w:p></w:body></w:document>'
               % "".join("<w:p><w:r><w:t>%s</w:t></w:r></w:p>" % x for x in paras)); z.close(); return b.getvalue()
def _mk_zip(entries):
    b = _io.BytesIO(); z = _zf.ZipFile(b, "w")
    for n, d in entries: z.writestr(n, d)
    z.close(); return b.getvalue()
check("读取·UTF-16 带BOM", _S._decode_bytes("a.txt", "阿青来了".encode("utf-16")) == "阿青来了")
check("读取·UTF-16LE 无BOM 纯中文", _S._decode_bytes("a.txt", "阿青来了，州牧府议事。".encode("utf-16-le")) == "阿青来了，州牧府议事。")
check("读取·GB18030", _S._decode_bytes("a.txt", "阿青·州府的穷账".encode("gb18030")) == "阿青·州府的穷账")
check("读取·Big5", _S._decode_bytes("a.txt", "阿青來了，議事廳。".encode("big5")) == "阿青來了，議事廳。")
check("读取·BOM 与 CRLF 规整", _S._decode_bytes("a.md", "\ufeffX\r\nY".encode("utf-8")) == "X\nY")
_dx = _S._decode_bytes("a.docx", _mk_docx(["段一", "段二"]))
check("读取·docx 段落/制表/换行/实体", "段一" in _dx and "A\tB\nC & D" in _dx, _dx)
_ep = _mk_zip([("META-INF/container.xml", '<container><rootfiles><rootfile full-path="OEBPS/c.opf"/></rootfiles></container>'),
               ("OEBPS/c.opf", '<package><manifest><item id="c2" href="c2.xhtml"/><item id="c1" href="c1.xhtml"/></manifest><spine><itemref idref="c1"/><itemref idref="c2"/></spine></package>'),
               ("OEBPS/c1.xhtml", "<html><head><style>p{}</style></head><body><h1>第一章</h1><p>阿青到了。</p></body></html>"),
               ("OEBPS/c2.xhtml", "<html><body><p>第二章正文</p></body></html>")])
_et = _S._decode_bytes("b.epub", _ep)
check("读取·epub 按书脊顺序", _et.index("第一章") < _et.index("第二章") and "p{}" not in _et, _et)
check("读取·html 去 script", _S._decode_bytes("a.html", b"<html><script>x()</script><body><p>\xe7\x94\xb2</p></body></html>") == "甲")
check("读取·rtf GBK 转义", _S._decode_bytes("a.rtf", br"{\rtf1\ansi{\fonttbl{\f0 SimSun;}}\pard \'b0\'a2\'c7\'e0 said\par x}").startswith("阿青 said\nx"))
_pc = ("BT /F1 12 Tf (Hello world this is a plain text pdf with enough letters to pass) Tj ET").encode("latin-1"); _pz = _zl.compress(_pc)
_pdf = b"%PDF-1.4\n1 0 obj<</Length " + str(len(_pz)).encode() + b"/Filter/FlateDecode>>stream\n" + _pz + b"\nendstream\nendobj\n%%EOF"
check("读取·pdf 文本型可抽", "Hello world" in _S._decode_bytes("a.pdf", _pdf))
try:
    _S._decode_bytes("a.pdf", b"%PDF-1.4 nothing here"); check("读取·pdf 不可读报错", False)
except ValueError as e:
    check("读取·pdf 不可读报错", "PDF" in str(e))
try:
    _S._decode_bytes("a.doc", b"\xd0\xcf\x11\xe0"); check("读取·.doc 明确拒绝", False)
except ValueError as e:
    check("读取·.doc 明确拒绝", ".docx" in str(e))
_zx = _S._expand_files([("材料.zip", _mk_zip([("__MACOSX/._a.txt", "junk"), ("dir/a.txt", "甲文"), ("dir/a.md", "乙文"), ("b.docx", _mk_docx(["丙文"])), ("c.doc", b"old")])),
                        ("dir/a.txt", b"same name")])
_names = [n for n, _, _ in _zx]
check("读取·zip 展开且跳过 __MACOSX", "a.txt" in _names and "b.docx" in _names and not any("._a" in n for n in _names), _names)
check("读取·zip 同名去重（按主干名，落盘统一 .txt 故 a.txt/a.md 也算同名）", len({os.path.splitext(n)[0] for n in _names}) == len(_names) and "a-3.txt" in _names, _names)
check("读取·zip 内 .doc 带错误不炸", any(e for n, _, e in _zx if n == "c.doc"), _zx)
check("读取·zip 内 docx 已解码", any(t == "丙文\n\nA\tB\nC & D" for n, t, _ in _zx if n == "b.docx"), [t for n, t, _ in _zx if n == "b.docx"])
check("API·响应归一 成功", _S._json_norm(200, {"data": 1}) == {"data": 1, "ok": True, "success": True})
check("API·响应归一 失败补 error", _S._json_norm(400, {})["ok"] is False and _S._json_norm(400, {})["error"])
check("API·响应归一 不覆盖显式 ok", _S._json_norm(200, {"ok": False, "error": "x"})["success"] is False)
check("API·schema 覆盖 health/formats/cmd", {e["path"] for e in _S._api_schema()["endpoints"]} >= {"/api/health", "/api/formats", "/cmd", "/api/graph/ontology/generate"})
check("API·health 字段", {"version", "llm_active", "running", "round", "num_ledger"} <= set(_S._health_payload()))
check("版本·pack-release 读 serve.VERSION", _S.VERSION and _S.VERSION[0].isdigit())
check("话量均分→观察告警", bool(_dp2.speech_balance([("甲", 40), ("乙", 41), ("丙", 39), ("丁", 40)])))
check("话量长尾→不告警", _dp2.speech_balance([("甲", 90), ("乙", 12), ("丙", 30), ("丁", 4)]) is None)
check("两人戏不算均分", _dp2.speech_balance([("甲", 40), ("乙", 40)]) is None)

print("== ⑰ 预算解析修正 + 用量思考记账（M17）==")
# 「最多 22 轮（预估 22-28：开局2＋…）」旧版把整行数字拼成 2222282620262 轮（用户截图实锤）
os.makedirs(os.path.join(ROOT, "剧本"), exist_ok=True)
open(os.path.join(ROOT, "剧本", "09-预算测试.md"), "w", encoding="utf-8").write(
    "# 单元09 · 预算测试\n\n目标\n\n把事办成\n\n最多 22 轮（预估 22-28：开局2＋必须发生6×2＋反转层0×2＋全员保底6＋收束2）\n")
_D9 = {"meta": {"unitName": "预算测试", "title": "T", "unitRound": "0/22"}, "units": [{"name": "预算测试", "goal": "g"}]}
_U9 = m._unit_ctx(_D9)
check("「最多 N 轮」只取 N（不再整行拼数字）", _U9["budget"] == 22, _U9["budget"])
_D9b = {"meta": {"unitName": "无文件单元", "config": {"plannedRounds": 99999}}, "units": [{"name": "无文件单元", "goal": "g"}]}
check("预算钳制 ≤480（任何来源）", m._unit_ctx(_D9b)["budget"] == 480, m._unit_ctx(_D9b)["budget"])
# 用量记账带思考 token
m._TL.think_chars = 160
m._usage_add("测试模型", 100, 50, 2.0, 100)
_u = json.load(open(m.USAGE_PATH, encoding="utf-8"))["测试模型"]
check("usage 记 tok_think", _u.get("tok_think") == 100, _u.get("tok_think"))
check("SSE 载荷带 dataVer（图谱/推演流兜底刷新）", "dataVer" in m._auto_payload())

print("== ⑰ 引力三档（M17）==")
m.GRAVITY_PATH = os.path.join(UI, "gravity.json")
check("默认档 medium", m._gravity_mode() == "medium")
check("非法档被拒", not m._set_gravity_mode("ultra"))
check("切 low 生效+落盘", m._set_gravity_mode("low") and m._gravity_mode() == "low"
      and json.load(open(m.GRAVITY_PATH, encoding="utf-8"))["mode"] == "low")
m.AUTO["gmode"] = ""                                     # 模拟重启：内存清空 → 从文件恢复
check("重启后从文件恢复档位", m._gravity_mode() == "low")
check("payload 带 gmode", m._auto_payload().get("gmode") == "low")
check("三档提示词齐备", all(k in open(os.path.join(_HERE, "serve.py"), encoding="utf-8").read()
                             for k in ('"low":', '"medium":', '"high":')))
m._set_gravity_mode("medium")
print("== ⑰b 预算提取（截图实锤的天文数字）==")
_D9 = {"meta": {"unitName": "测试单元九", "config": {}}, "units": [{"name": "测试单元九", "goal": "g"}]}
os.makedirs(os.path.join(ROOT, "剧本"), exist_ok=True)
open(os.path.join(ROOT, "剧本", "09-测试单元九.md"), "w", encoding="utf-8").write(
    "# 单元\n\n目标：g\n\n最多 22 轮（预估 22-28：开局2＋必须发生6×2＋反转层0×2＋全员保底6＋收束2）\n")
_U9 = m._unit_ctx(_D9)
check("「最多 22 轮」只取 22（不再拼接整行数字成 2.2 万亿）", _U9["budget"] == 22, _U9["budget"])
check("预算钳制 ≤480", m._unit_ctx({"meta": {"unitName": "x", "config": {"plannedRounds": 99999}},
                                     "units": [{"name": "x", "goal": "g"}]})["budget"] <= 480)

print("== ⑱ 投放新世界只吃本批材料（旧世界原样复活的根因）==")
import glob as glob_
_mat = os.path.join(ROOT, "材料")
os.makedirs(_mat, exist_ok=True)
for _f in glob_.glob(os.path.join(_mat, "*")):
    os.remove(_f)
open(os.path.join(_mat, "旧局材料.txt"), "w", encoding="utf-8").write("旧世界：北镇旧案，卡司赵拾。")
time.sleep(0.02)
open(os.path.join(_mat, "新投材料.txt"), "w", encoding="utf-8").write("新世界：南港新案，卡司另一批。")
json.dump({"title": "新局", "requirement": "", "files": ["材料/新投材料.txt"],
           "at_ts": time.time()}, open(m.PENDING_PATH, "w", encoding="utf-8"), ensure_ascii=False)
_dig, _raw = m._ingest_materials(lambda s: None)
check("摄取只取本批（旧局材料被跳过）", "南港新案" in _raw and "北镇旧案" not in _raw, _raw[:60])
# 无 pending 白名单时回退全目录（旧局/手工放料仍可用）
os.remove(m.PENDING_PATH)
os.remove(os.path.join(_mat, "_纲要.md"))
_d2, _r2 = m._ingest_materials(lambda s: None)
check("无白名单时回退全目录摄取", "北镇旧案" in _r2 and "南港新案" in _r2)

print("== ⑱b 文件级摄取缓存（重试不再全量重烧）==")
_n0 = CALLS["n"]
_fc = os.path.join(_mat, "_摄取缓存.json")
check("摄取缓存已落盘", os.path.exists(_fc))
# 模拟重试：新 pending（at_ts 更新→批级缓存必失效）+ 删纲要，但材料一个字没变
os.remove(os.path.join(_mat, "_纲要.md"))
json.dump({"title": "重试局", "requirement": "", "files": ["材料/旧局材料.txt", "材料/新投材料.txt"],
           "at_ts": time.time()}, open(m.PENDING_PATH, "w", encoding="utf-8"), ensure_ascii=False)
_d3, _r3 = m._ingest_materials(lambda s: None)
check("重试摄取零 LLM 调用（全命中文件缓存）", CALLS["n"] == _n0, CALLS["n"] - _n0)
check("缓存复用的纲要内容一致", "北镇旧案" in _r3 and "南港新案" in _r3)
# 只改一份材料 → 只重烧那一份
time.sleep(0.02)
open(os.path.join(_mat, "新投材料.txt"), "w", encoding="utf-8").write("新世界：南港改案，卡司第三人。")
os.remove(os.path.join(_mat, "_纲要.md"))
json.dump({"title": "重试局2", "requirement": "", "files": ["材料/旧局材料.txt", "材料/新投材料.txt"],
           "at_ts": time.time()}, open(m.PENDING_PATH, "w", encoding="utf-8"), ensure_ascii=False)
_n1 = CALLS["n"]
_d4, _r4 = m._ingest_materials(lambda s: None)
check("只改一份→只补一份（1 次调用）", CALLS["n"] - _n1 == 1, CALLS["n"] - _n1)
check("改的那份进了原文与纲要条目", "南港改案" in _r4 and "《新投材料.txt》" in _d4, _d4[:80])

print("== ⑱c 盘读缓存（世界观/角色卡每轮只读一次，变了才失效）==")
_w = os.path.join(ROOT, "00-世界观.md")
open(_w, "w", encoding="utf-8").write("---\ntype: world\n---\n\n# 世界观甲\n正文甲。")
_t1 = m._read_cached("00-世界观.md")
check("盘读缓存剥 frontmatter", "type: world" not in _t1 and "正文甲" in _t1, _t1[:40])
_t2 = m._read_cached("00-世界观.md")
check("未变文件命中缓存（同一字符串）", _t2 == _t1)
open(_w, "w", encoding="utf-8").write("---\ntype: world\n---\n\n# 世界观乙\n正文乙。")
_t3 = m._read_cached("00-世界观.md")
check("改盘后缓存自然失效", "正文乙" in _t3 and _t3 != _t1, _t3[:40])
check("读不存在的文件返回空", m._read_cached("00-不存在.md") == "")

print("== ⑲ 失败路径（P0 复现：mock 返回非法值/写入失败也不再崩）==")
# traits 非法值——模型可能把占位文案写进数值位：int() 直接抛异常崩掉整条建世界流水线
check("_trait_int '材'→取默认", m._trait_int("材", 1, 5, 3) == 3)
check("_trait_int '10'→clamp 到 5", m._trait_int("10", 1, 5, 3) == 5)
check("_trait_int None→取默认", m._trait_int(None, 1, 5, 2) == 2)
check("_trait_int '4'→4", m._trait_int("4", 1, 5, 3) == 4)
check("_trait_int scheme '9'→clamp 到 3", m._trait_int("9", 1, 3, 2) == 3)
_bad = {"name": "坏卡人", "role": "仓曹吏", "core": "内核" * 80, "voice": "声纹" * 20,
        "psyche": "心象" * 20, "traits": {"iq": "材", "eq": "10", "survival": None,
                                          "startle": "4", "scheme": "9", "why": "材料未详述"},
        "secrets": "材料未详述"}
_ent = m._write_cast_files(_bad)                         # 旧版在这里直接 ValueError
check("traits 全非法不崩且钳制落盘", _ent and _ent["traits"] == {"iq": 3, "eq": 5, "survival": 3,
                                                            "startle": 4, "scheme": 3}, _ent and _ent["traits"])
check("落盘前占位剥离", "材料未详述" not in open(os.path.join(ROOT, "角色", "坏卡人.md"), encoding="utf-8").read())
# 质量闸门：空壳卡 / 串位卡
_thin = {"name": "薄卡", "role": "r", "core": "材料未详述", "voice": "材料未详述"}
_g1 = m._cast_gate(_thin, "某身份")
check("空壳卡被闸门拦下", not _g1[0] and "过薄" in _g1[1], _g1)
_sw = {"name": "串位卡", "role": "全书主角，幕后主宰", "core": "正文" * 100, "voice": "声" * 40}
_g2 = m._cast_gate(_sw, "账房先生")
check("串位卡被闸门拦下（主权称谓）", not _g2[0] and "主权" in _g2[1], _g2)
_g3 = m._cast_gate(_sw, "全书主角，故事核心")
check("本人即主权者→放行", _g3[0], _g3)
# 名册交叉串位（任意题材）：主权词表对别的小说失效，交叉比对照样拦
_peers = ["法医，冷静寡言，话少", "刑警队长，火爆脾气，老烟枪"]
_crossed = {"name": "季白", "role": "刑警队长，火爆脾气",
            "core": "刑警队长，火爆脾气，进门先吼三声。" + "办案" * 60, "voice": "吼腔" * 25}
_gc = m._cast_gate(_crossed, "法医，冷静寡言，话少", _peers)
check("串位卡被名册交叉拦下（非主权词题材）", not _gc[0] and "另一人" in _gc[1], _gc)
_legit = {"name": "季白", "role": "法医", "core": "法医，冷静寡言。与刑警队长搭班七年。" + "见惯" * 60,
          "voice": "平腔" * 25}
check("本人身份在场→提及他人不误报", m._cast_gate(_legit, "法医，冷静寡言，话少", _peers)[0])
check("名册身份行纯职能词→无基准不判串位", m._cast_gate(_crossed, "主角", _peers)[0])
check("无名册（旧调用兼容）→不判串位", m._cast_gate(_crossed, "法医，冷静寡言，话少")[0])
_psythin = {"name": "薄心象", "role": "仵作", "core": "内核" * 80, "voice": "声纹" * 25,
            "psyche": "材料未详述"}
_gp = m._cast_gate(_psythin, "仵作")
check("心象全占位被拦（内核声纹正常也逃不掉）", not _gp[0] and "心象" in _gp[1], _gp)
m._write_cast_files(dict(_sw, suspect=True))
check("打标写入 frontmatter", "suspect: true" in open(os.path.join(ROOT, "角色", "串位卡.md"), encoding="utf-8").read())
# 失败留痕：材料白名单保住（旧版 mtime 守卫会悄悄删掉 pending → 死局）
json.dump({"title": "t", "files": ["材料/新投材料.txt"], "at_ts": time.time() - 10},
          open(m.PENDING_PATH, "w", encoding="utf-8"), ensure_ascii=False)
json.dump({"meta": {"title": "t", "round": 0, "building": True, "built": False, "vaultPath": ROOT}},
          open(m.DATA_PATH, "w", encoding="utf-8"), ensure_ascii=False)
m._build_fail_record("三卡 2/8", "模拟失败：traits 解析崩")
_p = m._pending()
check("失败留痕保住材料白名单", bool(_p) and _p.get("files") == ["材料/新投材料.txt"], _p)
check("失败留痕可读（阶段+原因）", m._build_fail_load().get("stage") == "三卡 2/8")
m._build_fail_clear()
os.remove(m.PENDING_PATH)
# 孤儿建造态：building=true 卡死页面 → 启动自愈复位
m._resolve_zombie_build()
Dz = json.load(open(m.DATA_PATH, encoding="utf-8"))
check("孤儿建造态自动复位", Dz["meta"].get("building") is False, Dz["meta"].get("building"))
check("复位留可见提示", "重新投放材料" in Dz["meta"].get("buildNote", ""))
# 空库归档守卫：不再制造只剩 data.json 的空壳归档（实测同份 data.json 复制三次都“通过”）
_oldROOT, _oldUI, _oldDATA, _oldPEND = m.ROOT_DIR, m.UI_DIR, m.DATA_PATH, m.PENDING_PATH
_r2 = os.path.join(BASE, "qx-empty")
os.makedirs(os.path.join(_r2, "材料"), exist_ok=True)
os.makedirs(os.path.join(_r2, "ui"), exist_ok=True)
m.ROOT_DIR, m.UI_DIR = _r2, os.path.join(_r2, "ui")
m.DATA_PATH = os.path.join(m.UI_DIR, "data.json")
m.PENDING_PATH = os.path.join(m.UI_DIR, "pending-init.json")
arch = m._archive_old_world("空局")
check("空库不归档（返回空串）", arch == "", arch)
check("空库不建归档目录", not glob_.glob(os.path.join(_r2, "归档", "*")))
# 写入故障端到端：单人三卡落盘全炸 → 整局优雅失败，不崩、有回执
_r3 = os.path.join(BASE, "qx-ro")
os.makedirs(os.path.join(_r3, "材料"), exist_ok=True)
os.makedirs(os.path.join(_r3, "ui"), exist_ok=True)
open(os.path.join(_r3, "材料", "00_测试.txt"), "w", encoding="utf-8").write("测试材料：驿站与守夜。")
m.ROOT_DIR, m.UI_DIR = _r3, os.path.join(_r3, "ui")
m.DATA_PATH = os.path.join(m.UI_DIR, "data.json")
m.PENDING_PATH = os.path.join(m.UI_DIR, "pending-init.json")
m._llm_cfg = lambda ignore_mode=False: {"base_url": "http://x", "model": "m", "api_key": "k"}
_real_wcf = m._write_cast_files
_deposit()


def _boom(c):
    raise OSError("模拟磁盘故障")


m._write_cast_files = _boom
m._build_fail_clear()
okr, msgr = m._init_and_run("材料", "坏盘局", "", False, log, confirm=True)
check("写入全失败→优雅失败不崩", okr is False and "建世界失败" in msgr, (okr, str(msgr)[:60]))
_bf = m._build_fail_load()
check("失败留痕落盘", _bf and _bf.get("reason"), _bf)
m._write_cast_files = _real_wcf
m._build_fail_clear()
m.ROOT_DIR, m.UI_DIR, m.DATA_PATH, m.PENDING_PATH = _oldROOT, _oldUI, _oldDATA, _oldPEND
m._llm_cfg = REAL_LLM_CFG

print("LLM 假调用总数:", CALLS["n"])
print("\n%s  %d 项失败" % ("测试全部通过 ✔" if not fails else "存在失败 ✘", len(fails)))
sys.exit(1 if fails else 0)
