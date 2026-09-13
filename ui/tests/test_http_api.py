# -*- coding: utf-8 -*-
import os, sys, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *
import socket, urllib.parse, urllib.request

API = "http://127.0.0.1:9/v1"
MODEL = "m1"
KEY1 = "sk-test-abcdefghijklmnopqrstuvwxyz"
KEY2 = "sk-test-2222222222222222222"


def F(o, k, d=None):
    if isinstance(o, dict):
        if k in o:
            return o[k]
        v = o.get("data")
        if isinstance(v, dict) and k in v:
            return v[k]
    return d


def H(o, k):
    return isinstance(o, dict) and (k in o or (isinstance(o.get("data"), dict) and k in o["data"]))


def OK(j):
    return isinstance(j, dict) and "ok" in j and "success" in j


def R(m, u, o=None, t=15):
    h = {}
    d = None
    if o is not None:
        d = json.dumps(o).encode()
        h["Content-Type"] = "application/json"
    s, hd, b = http(m, u, d, h, t)
    try:
        j = json.loads(b.decode())
    except Exception:
        j = None
    return s, hd, j


def RW(u, raw):
    s, hd, b = http("POST", u, raw, {"Content-Type": "application/json"}, 15)
    try:
        j = json.loads(b.decode())
    except Exception:
        j = None
    return s, hd, j


def G(u, t=10):
    s, h, b = http("GET", u, None, None, t)
    try:
        j = json.loads(b.decode())
    except Exception:
        j = None
    return s, h, b, j


proc, base, root = start_server()
U = base
try:
    s, h, j = R("GET", U + "/api/health")
    check("health 200 且 ok/success", s == 200 and OK(j))
    check("health 头 version/no-store", bool(h.get("x-nest-version")) and h.get("x-nest-version") == F(j, "version") and "no-store" in (h.get("cache-control") or "").lower())
    check("health 基础字段", F(j, "name") == "NEST-DRAMA" and bool(F(j, "version")) and bool(F(j, "python")) and H(j, "uptime_s"))
    check("health 状态初值", F(j, "running") is False and F(j, "llm_configured") is False and F(j, "built") is False and F(j, "round") == 0 and F(j, "cast") == 0)

    s, h, j = R("GET", U + "/api/version")
    check("version 200 ok 且同构 health", s == 200 and OK(j) and F(j, "name") == "NEST-DRAMA" and H(j, "version"))
    s, h, j = R("GET", U + "/api/schema")
    check("schema 200 且 ok/success", s == 200 and OK(j))
    eps = F(j, "endpoints") or []
    check("schema endpoints >= 15", isinstance(eps, list) and len(eps) >= 15)
    check("schema 每项含 method/path", bool(eps) and all(isinstance(e, dict) and e.get("method") and e.get("path") for e in eps))
    check("schema conventions 非空", bool(F(j, "conventions")))

    s, h, j = R("GET", U + "/api/formats")
    check("formats 200 且 ok/success", s == 200 and OK(j))
    check("formats 列表 >= 8", isinstance(F(j, "formats"), list) and len(F(j, "formats")) >= 8)
    check("formats 上限 64/512", F(j, "max_file_mb") == 64 and F(j, "max_body_mb") == 512)

    s, h, j = R("GET", U + "/api/auto-status")
    check("auto-status 200 且 ok/success", s == 200 and OK(j))
    check("auto-status 键齐全", all(H(j, k) for k in ("running", "stage", "pct", "ver", "gmode", "hb_age", "worker_alive", "eta_secs")))
    check("auto-status gmode 初值 medium", F(j, "gmode") == "medium")

    s, h, j = R("GET", U + "/api/llm-config")
    check("llm-config 200 且 ok/success", s == 200 and OK(j))
    check("llm-config 初值空", F(j, "profiles") == [] and F(j, "current") in ("", None))
    check("llm-config 初值未激活", F(j, "active") is False and F(j, "configured") is False and F(j, "env") is False)

    s, h, j = R("POST", U + "/api/llm-config", {"action": "save", "base_url": API, "model": MODEL, "api_key": KEY1})
    check("llm-config save 200", s == 200)
    cur = F(j, "current")
    check("llm-config save 生效", F(j, "ok") is True and bool(cur) and F(j, "active") is True)

    s, h, j = R("GET", U + "/api/llm-config")
    profs = F(j, "profiles") or []
    check("llm-config 保存 1 条", len(profs) == 1)
    p0 = profs[0] if profs else {}
    masked = F(p0, "api_key_masked") or ""
    check("api_key_masked 掩码", "…" in masked and "ghijklmnop" not in masked)
    check("base_url/model 回显", F(p0, "base_url") == API and F(p0, "model") == MODEL)

    s, h, j = R("POST", U + "/api/llm-config", {"action": "save", "base_url": API, "model": MODEL, "api_key": KEY2})
    s, h, j = R("GET", U + "/api/llm-config")
    check("同源仅更新", len(F(j, "profiles") or []) == 1)

    s, h, j = R("POST", U + "/api/llm-config", {"action": "save", "model": MODEL})
    check("缺字段 400 三项", s == 400 and "三项" in (F(j, "error") or ""))
    s, h, j = R("POST", U + "/api/llm-config", {"action": "mode", "mode": "session"})
    check("mode 切换 403", s == 403)

    s, h, j = R("POST", U + "/api/llm-config", {"action": "delete", "id": cur})
    check("llm-config delete 200", s == 200)
    s, h, j = R("GET", U + "/api/llm-config")
    check("delete 后清空", F(j, "profiles") == [] and F(j, "active") is False)

    s, h, j = R("POST", U + "/api/llm-test", {"base_url": API, "model": "m", "api_key": "k"}, 30)
    check("llm-test 拒连 200", s == 200 and F(j, "ok") is False and bool(F(j, "error")))

    for p in ("/seal.svg", "/enhance.js", "/assets/index-Dbzr5ZOw.js"):
        s, h, b, j = G(U + p)
        check("静态 %s 200" % p, s == 200)
    s, h, b, j = G(U + "/enhance.js")
    check("enhance.js no-store", "no-store" in (h.get("cache-control") or "").lower())

    for p in ("/usage.json", "/api-config.json", "/局史.json", "/data.json.bak", "/serve.py", "/dupian.py"):
        s, h, j = R("GET", U + urllib.parse.quote(p))
        check("敏感 %s 403 含禁止访问" % p, s == 403 and "禁止访问" in (F(j, "error") or ""))
    s, h, j = R("GET", U + "/data.json")
    check("无世界 /data.json 404", s == 404)

    s, h, b, j = G(U + "/some/deep/route")
    body = b.decode("utf-8", "replace")
    check("SPA 深链 200 含 app", s == 200 and '<div id="app">' in body)
    check("未接 API 正文含 qx-gate", "qx-gate" in body)

    try:
        r = urllib.request.urlopen(U + "/events", timeout=5)
        head = r.read(64)
        r.close()
    except Exception:
        head = b""
    check("events 含 event: hello", b"event: hello" in head)

    s, h, j = R("POST", U + "/cmd", {"type": "beat"})
    check("未接 API beat 400 含未接入", s == 400 and "未接入" in (F(j, "error") or ""))
    s, h, j = RW(U + "/cmd", b"{not-json")
    check("非法 JSON 命令 400 bad command", s == 400 and (F(j, "error") or "") == "bad command")

    s, h, j = R("POST", U + "/cmd", {"type": "gravity-mode", "payload": {"mode": "x"}})
    check("非法 gravity-mode 400", s == 400)
    s, h, j = R("POST", U + "/cmd", {"type": "gravity-mode", "payload": {"mode": "high"}})
    check("gravity-mode high 200 回显", s == 200 and F(j, "mode") == "high")
    s, h, j = R("GET", U + "/api/auto-status")
    check("auto-status gmode=high", F(j, "gmode") == "high")
    s, h, j = R("POST", U + "/cmd", {"type": "gravity-mode", "payload": {"mode": "medium"}})
    check("gravity-mode 改回 medium", s == 200)

    s, h, j = R("POST", U + "/api/simulation/start", {})
    check("未接 API simulation/start 400", s == 400)

    body, ct = multipart([("大纲.txt", "驿站与守夜。".encode("utf-8")), ("旧稿.doc", b"\xd0\xcf\x11\xe0junk")],
                         {"project_name": "测试局", "simulation_requirement": "两人夜巡"})
    s, h, b = http("POST", U + "/api/graph/ontology/generate", body, {"Content-Type": ct}, 30)
    try:
        j = json.loads(b.decode())
    except Exception:
        j = None
    sk = F(j, "skipped") or []
    check("投放 未接 API 200 且 ok", s == 200 and OK(j))
    check("投放 files 只列 txt", F(j, "files") == ["材料/大纲.txt"])
    check("投放 skipped 1 含 .doc", len(sk) == 1 and any(".doc" in str(x) for x in sk))
    check("投放 mode 含未就绪", "未就绪" in str(F(j, "mode") or ""))
    pend = os.path.join(root, "ui", "pending-init.json")
    check("pending-init.json 存在", os.path.exists(pend))
    pendf = json.load(open(pend, encoding="utf-8")).get("files") if os.path.exists(pend) else None
    check("pending-init files 同上", pendf == ["材料/大纲.txt"])
    src = os.path.join(root, "材料", "大纲.txt")
    got = open(src, encoding="utf-8").read() if os.path.exists(src) else ""
    check("材料/大纲.txt 内容一致", got.strip() == "驿站与守夜。")
    s, h, j = R("GET", U + "/api/graph/task/qx")
    check("graph task qx processing", s == 200 and F(j, "status") == "processing")
    body2, ct2 = multipart([("x.doc", b"\xd0\xcf\x11\xe0junk")], {})
    s, h, b = http("POST", U + "/api/graph/ontology/generate", body2, {"Content-Type": ct2}, 30)
    check("只投 doc 返回 422", s == 422)

    s, h, j = R("POST", U + "/api/llm-config", {"action": "save", "base_url": API, "model": MODEL, "api_key": KEY1})
    check("重接 API 生效", s == 200 and F(j, "active") is True)
    s, h, b, j = G(U + "/")
    check("接入后首页不含 qx-gate", "qx-gate" not in b.decode("utf-8", "replace"))

    s, h, j = R("POST", U + "/cmd", {"type": "gravity", "payload": {"text": "黑猫"}})
    check("gravity 无世界 400 含尚未建世界", s == 400 and "尚未建世界" in (F(j, "error") or ""))
    s, h, j = R("POST", U + "/cmd", {"type": "pause"})
    cid = F(j, "id")
    check("pause 入队 200 c- id", s == 200 and isinstance(cid, str) and cid.startswith("c-"))
    s, h, j = R("POST", U + "/cmd", {"type": "export"})
    check("export 无记录 400 含尚无记录", s == 400 and "尚无推演记录" in (F(j, "error") or ""))
    s, h, j = R("POST", U + "/cmd", {"type": "continue-story", "payload": {}})
    check("continue-story 缺细纲 400", s == 400 and "细纲" in (F(j, "error") or ""))
    s, h, j = R("POST", U + "/cmd", {"type": "reset-sim"})
    check("reset-sim 200 ok True", s == 200 and F(j, "ok") is True)

    s, h, j = R("POST", U + "/api/simulation/start", {})
    check("已接 API simulation/start 200 含 ok", s == 200 and isinstance(j, dict) and "ok" in j)
    s, h, j = R("POST", U + "/api/simulation/stop", {})
    check("simulation/stop 200", s == 200)
    s, h, j = R("DELETE", U + "/api/simulation")
    check("DELETE simulation 200 deleted", s == 200 and F(j, "deleted") is True)

    s, h, j = R("GET", U + "/api/archives")
    check("archives 200 success", s == 200 and F(j, "success") is True)
    check("archives 列表 current 完整", isinstance(F(j, "archives"), list) and isinstance(F(j, "current"), dict) and all(k in F(j, "current") for k in ("title", "round", "units")))
    s, h, j = R("GET", U + "/api/archives/nope")
    check("archives 不存在 404", s == 404)
    s, h, j = R("GET", U + "/api/archives/..%2F..%2Fx")
    check("archives 穿越 400/404", s in (400, 404))
    s, h, j = R("GET", U + "/exports/../serve.py")
    check("exports 穿越 404", s == 404)
    s, h, j = R("GET", U + "/exports/nope.txt")
    check("exports 不存在 404", s == 404)
    s, h, j = R("POST", U + "/api/archives", {"action": "prune"})
    check("archives prune 200 pruned=0", s == 200 and F(j, "pruned") == 0)
    s, h, j = R("POST", U + "/api/archives", {"action": "zzz"})
    check("archives 非法 action 400", s == 400)
    s, h, j = R("DELETE", U + "/api/archives", {"title": "不存在"})
    check("archives 删除不存在 404", s == 404)

    s, h, j = R("GET", U + "/api/round/abc")
    check("round 非法 400", s == 400)
    s, h, j = R("GET", U + "/api/round/999")
    check("round 越界 404", s == 404)

    up = urllib.parse.urlparse(U)
    sk2 = socket.create_connection((up.hostname, up.port), timeout=10)
    sk2.sendall(("POST /api/llm-test HTTP/1.1\r\nHost: x\r\nContent-Type: application/json\r\nContent-Length: 999999999999\r\n\r\n").encode("latin1"))
    raw = b""
    try:
        raw = sk2.recv(256)
    except Exception:
        raw = b""
    sk2.close()
    line = raw.split(b"\r\n", 1)[0].decode("latin1", "replace")
    check("超大 Content-Length 413", "413" in line)

    s, h, j = R("GET", U + "/api/llm-config")
    cur2 = F(j, "current")
    if cur2:
        R("POST", U + "/api/llm-config", {"action": "delete", "id": cur2})
    s, h, b, j = G(U + "/")
    check("删档后首页再含 qx-gate", "qx-gate" in b.decode("utf-8", "replace"))
finally:
    stop_server(proc)

done(min_pass=40)
