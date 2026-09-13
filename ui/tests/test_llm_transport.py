# -*- coding: utf-8 -*-
import os, sys, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *

import http.server
import threading

REQS = []
COUNTS = {}
LOCK = threading.Lock()


def _record(body, headers):
    with LOCK:
        name = body.get("model")
        COUNTS[name] = COUNTS.get(name, 0) + 1
        c = COUNTS[name]
        REQS.append({"body": body, "headers": headers, "model": name, "n": c})
        return c, name


def reqs(model):
    with LOCK:
        return [r for r in REQS if r["model"] == model]


def last_req(model):
    rs = reqs(model)
    return rs[-1] if rs else None


def _json(self, code, obj):
    data = json.dumps(obj).encode("utf-8")
    self.send_response(code)
    self.send_header("Content-Type", "application/json")
    self.send_header("Content-Length", str(len(data)))
    self.end_headers()
    self.wfile.write(data)


def _sse_open(self):
    self.send_response(200)
    self.send_header("Content-Type", "text/event-stream")
    self.end_headers()


def _sse(self, obj):
    self.wfile.write(("data: " + json.dumps(obj) + "\n\n").encode("utf-8"))
    self.wfile.flush()


def _sse_done(self):
    self.wfile.write(b"data: [DONE]\n\n")
    self.wfile.flush()


def _c(t):
    return {"choices": [{"delta": {"content": t}}]}


def _rc(t):
    return {"choices": [{"delta": {"reasoning_content": t}}]}


def _nonstream(self, text):
    _json(self, 200, {"choices": [{"message": {"content": text}, "finish_reason": "stop"}]})


def s_ok_stream(self, body, c):
    _sse_open(self)
    for t in ("你好", "，", "世界"):
        _sse(self, _c(t))
    _sse_done(self)


def s_reason_only(self, body, c):
    _sse_open(self)
    if c == 1:
        for _ in range(3):
            _sse(self, _rc("想"))
    else:
        _sse(self, _c("补上了"))
    _sse_done(self)


def s_nostream(self, body, c):
    if body.get("stream") is True:
        _json(self, 400, {"error": {"message": "stream unsupported"}})
    else:
        _nonstream(self, "非流式正文")


def s_429(self, body, c):
    if c == 1:
        _json(self, 429, {"error": {"message": "slow down"}})
    else:
        _sse_open(self)
        _sse(self, _c("好"))
        _sse_done(self)


def s_401(self, body, c):
    _json(self, 401, {"error": {"message": "Invalid API key."}})


def s_slow(self, body, c):
    time.sleep(3)
    _sse_open(self)
    _sse(self, _c("慢"))
    _sse_done(self)


def s_trickle(self, body, c):
    _sse_open(self)
    for _ in range(30):
        _sse(self, _c("滴"))
        time.sleep(0.4)
    _sse_done(self)


def s_empty(self, body, c):
    _sse_open(self)
    _sse_done(self)


def s_badjson(self, body, c):
    _sse_open(self)
    _sse(self, _c("这不是JSON" if c == 1 else '{"a":1}'))
    _sse_done(self)


SCRIPTS = {
    "ok-stream": s_ok_stream,
    "reason-only-then-ok": s_reason_only,
    "no-stream-400": s_nostream,
    "rate-429-then-ok": s_429,
    "auth-401": s_401,
    "slow-first-byte": s_slow,
    "trickle": s_trickle,
    "empty-stream": s_empty,
    "bad-json-then-json": s_badjson,
}


class GW(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.0"

    def log_message(self, *a):
        pass

    def do_POST(self):
        try:
            n = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(n)
            body = json.loads(raw.decode("utf-8"))
            hdrs = {k.lower(): v for k, v in self.headers.items()}
        except Exception:
            self.send_error(400)
            return
        if self.path != "/v1/chat/completions":
            self.send_error(404)
            return
        c, name = _record(body, hdrs)
        fn = SCRIPTS.get(name)
        if not fn:
            _json(self, 404, {"error": {"message": "unknown model"}})
            return
        try:
            fn(self, body, c)
        except BrokenPipeError:
            pass


srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), GW)
PORT = srv.server_address[1]
BASE = "http://127.0.0.1:%d" % PORT
threading.Thread(target=srv.serve_forever, daemon=True).start()


def cfg(model):
    return {"base_url": BASE + "/v1", "model": model, "api_key": "sk-x"}


MSG = [{"role": "user", "content": "说点什么"}]

m, root = load_engine()

# ---------- _llm_raw: 成功流式 + 请求形状 ----------
t0 = time.time()
text, err = m._llm_raw(MSG, cfg("ok-stream"), max_tokens=123, temperature=0.5, retries=0)
dt = time.time() - t0
check("ok-stream 返回正文", text == "你好，世界", "text=%r err=%r dt=%.3f" % (text, err, dt))
check("ok-stream 无错误", err is None, "err=%r dt=%.3f" % (err, dt))
r = last_req("ok-stream")
check("ok-stream Authorization: Bearer", bool(r) and r["headers"].get("authorization") == "Bearer sk-x",
      "hdrs=%r" % ((r or {}).get("headers"),))
check("ok-stream body.model", bool(r) and r["body"].get("model") == "ok-stream", "")
check("ok-stream body.max_tokens", bool(r) and r["body"].get("max_tokens") == 123, "")
check("ok-stream body.temperature", bool(r) and r["body"].get("temperature") == 0.5, "")
check("ok-stream body.stream=true", bool(r) and r["body"].get("stream") is True, "")
check("think=True 无 thinking/chat_template_kwargs",
      bool(r) and "thinking" not in r["body"] and "chat_template_kwargs" not in r["body"], "")

m._llm_raw(MSG, cfg("ok-stream"), max_tokens=100, think=False, retries=0)
r2 = last_req("ok-stream")
check("think=False 带 thinking disabled",
      bool(r2) and r2["body"].get("thinking") == {"type": "disabled"},
      "body=%r" % ((r2 or {}).get("body"),))
check("think=False 带 chat_template_kwargs",
      bool(r2) and r2["body"].get("chat_template_kwargs") == {"enable_thinking": False}, "")

# ---------- _llm_raw: 仅思考内容 -> 放大 max_tokens 重试 ----------
before = len(reqs("reason-only-then-ok"))
t0 = time.time()
text3, err3 = m._llm_raw(MSG, cfg("reason-only-then-ok"), max_tokens=1000, retries=2)
dt = time.time() - t0
rs = reqs("reason-only-then-ok")[before:]
check("reason-only 重试后返回正文", text3 == "补上了", "text=%r err=%r dt=%.3f" % (text3, err3, dt))
check("reason-only 共 2 次请求", len(rs) == 2, "n=%d" % len(rs))
check("reason-only 第二次 max_tokens×3",
      len(rs) >= 2 and rs[1]["body"].get("max_tokens") == 3000,
      "second=%r" % ((rs[1]["body"].get("max_tokens")) if len(rs) > 1 else None,))

# ---------- _llm_raw: 流式 400 -> 降级非流式 ----------
before = len(reqs("no-stream-400"))
t0 = time.time()
text4, err4 = m._llm_raw(MSG, cfg("no-stream-400"), max_tokens=500, retries=2)
dt = time.time() - t0
rs = reqs("no-stream-400")[before:]
check("400 降级非流式取回正文", text4 == "非流式正文", "text=%r err=%r dt=%.3f" % (text4, err4, dt))
check("400 降级共 2 次请求", len(rs) == 2, "n=%d" % len(rs))
check("第二次请求非流式", len(rs) >= 2 and rs[1]["body"].get("stream") is not True,
      "second_stream=%r" % ((rs[1]["body"].get("stream")) if len(rs) > 1 else None,))

# ---------- _llm_raw: 429 退避重试 ----------
t0 = time.time()
text5, err5 = m._llm_raw(MSG, cfg("rate-429-then-ok"), max_tokens=200, retries=1)
dt = time.time() - t0
check("429 退避后成功", text5 == "好", "text=%r err=%r dt=%.3f" % (text5, err5, dt))
check("429 退避耗时>=4s", dt >= 4.0, "dt=%.3f" % dt)
check("429 退避耗时<=20s", dt <= 20.0, "dt=%.3f" % dt)

# ---------- _llm_raw: 401 不重试 ----------
before = len(reqs("auth-401"))
t0 = time.time()
text6, err6 = m._llm_raw(MSG, cfg("auth-401"), max_tokens=200, retries=2)
dt = time.time() - t0
rs = reqs("auth-401")[before:]
check("401 返回 None", text6 is None, "text=%r dt=%.3f" % (text6, dt))
check("401 err 含 401", bool(err6) and "401" in err6, "err=%r" % (err6,))
check("401 err 含 Invalid API key", bool(err6) and "Invalid API key" in err6, "err=%r" % (err6,))
check("401 不重试仅 1 次", len(rs) == 1, "n=%d" % len(rs))

# ---------- _llm_raw: 首字节超时 ----------
old_cr = m._LLM_CONNECT_READ
m._LLM_CONNECT_READ = 1
try:
    t0 = time.time()
    text7, err7 = m._llm_raw(MSG, cfg("slow-first-byte"), max_tokens=200, retries=0)
    dt = time.time() - t0
finally:
    m._LLM_CONNECT_READ = old_cr
check("首字节超时返回错误", text7 is None and bool(err7), "text=%r err=%r dt=%.3f" % (text7, err7, dt))
check("首字节超时 <3s 返回", dt < 3.0, "dt=%.3f" % dt)

# ---------- _llm_raw: 总墙钟上限 ----------
old_wall = m._LLM_WALL
m._LLM_WALL = 2
try:
    t0 = time.time()
    text8, err8 = m._llm_raw(MSG, cfg("trickle"), max_tokens=200, timeout=2, retries=0)
    dt = time.time() - t0
finally:
    m._LLM_WALL = old_wall
check("墙钟超限返回错误", text8 is None and bool(err8) and ("上限" in err8 or "超" in err8),
      "err=%r dt=%.3f" % (err8, dt))
check("墙钟超限 <=6s", dt <= 6.0, "dt=%.3f" % dt)

# ---------- _llm_raw: 暂停 ----------
m.AUTO["running"] = True
m.AUTO["stop"] = True
try:
    t0 = time.time()
    text9, err9 = m._llm_raw(MSG, cfg("trickle"), max_tokens=200, timeout=30, retries=0)
    dt = time.time() - t0
finally:
    m.AUTO["running"] = False
    m.AUTO["stop"] = False
check("暂停返回已暂停", text9 is None and err9 == "已暂停", "text=%r err=%r dt=%.3f" % (text9, err9, dt))
check("暂停 <=3s 返回", dt <= 3.0, "dt=%.3f" % dt)

# ---------- _llm_raw: 空流 ----------
t0 = time.time()
text10, err10 = m._llm_raw(MSG, cfg("empty-stream"), max_tokens=200, think=True, retries=0)
dt = time.time() - t0
check("空流 err 含 为空", text10 is None and bool(err10) and "为空" in err10,
      "text=%r err=%r dt=%.3f" % (text10, err10, dt))

# ---------- _llm: 用量落盘 ----------
t0 = time.time()
textA, errA = m._llm(MSG, cfg("ok-stream"), max_tokens=200, think=True)
dt = time.time() - t0
check("_llm ok-stream 正文", textA == "你好，世界", "text=%r err=%r dt=%.3f" % (textA, errA, dt))
check("_llm 用量文件存在", os.path.exists(m.USAGE_PATH), "path=%s" % (m.USAGE_PATH,))
usage = {}
if os.path.exists(m.USAGE_PATH):
    with open(m.USAGE_PATH, "r", encoding="utf-8") as f:
        usage = json.load(f)
u = usage.get("ok-stream") or {}
check("_llm 记录 calls>=1", u.get("calls", 0) >= 1, "usage=%r" % (usage,))
check("_llm 记录字段齐全", all(k in u for k in ("calls", "tok_in", "tok_out", "secs")), "u=%r" % (u,))

# ---------- _llm: think=False 空正文自动开思考（retries=0 隔离该自愈路径） ----------
before = len(reqs("empty-stream"))
t0 = time.time()
textB, errB = m._llm(MSG, cfg("empty-stream"), max_tokens=200, think=False, retries=0)
dt = time.time() - t0
rs = reqs("empty-stream")[before:]
check("_llm 空正文自动开思考重试", len(rs) == 2, "n=%d err=%r dt=%.3f" % (len(rs), errB, dt))
check("第二次请求无 thinking 字段",
      len(rs) >= 2 and "thinking" not in rs[1]["body"] and "chat_template_kwargs" not in rs[1]["body"],
      "body=%r" % ((rs[1]["body"]) if len(rs) > 1 else None,))

# ---------- _llm_json ----------
before = len(reqs("bad-json-then-json"))
t0 = time.time()
obj = m._llm_json(MSG, cfg("bad-json-then-json"), max_tokens=500, temperature=0.3, think=False)
dt = time.time() - t0
rs = reqs("bad-json-then-json")[before:]
check("_llm_json 解析出对象", obj == {"a": 1}, "obj=%r dt=%.3f" % (obj, dt))
check("_llm_json 共 2 次请求", len(rs) == 2, "n=%d" % len(rs))
check("第二次 messages 更多",
      len(rs) >= 2 and len(rs[1]["body"].get("messages", [])) > len(rs[0]["body"].get("messages", [])), "")
check("第二次含只输出 JSON 提示",
      len(rs) >= 2 and any("只输出 JSON" in (mm.get("content") or "")
                           for mm in rs[1]["body"].get("messages", []) if mm.get("role") == "user"),
      "")
bad = m._llm_json(MSG, cfg("auth-401"), max_tokens=500, temperature=0.3, think=False)
check("_llm_json 401 返回 None", bad is None, "bad=%r" % (bad,))

# ---------- _json_from ----------
check("_json_from 围栏", m._json_from('```json\n{"k": 2}\n```') == {"k": 2}, "")
check("_json_from 前后废话", m._json_from('好的，结果是 {"x": [1, 2]} 完毕') == {"x": [1, 2]}, "")
check("_json_from 数组优先", m._json_from("[1,2] {}") == [1, 2], "got=%r" % (m._json_from("[1,2] {}"),))
check("_json_from 非法返回 None", m._json_from("这不是JSON") is None, "")

# ---------- _llm_timeout ----------
check("_llm_timeout 150=138", m._llm_timeout(150) == 138, "got=%r" % (m._llm_timeout(150),))
check("_llm_timeout 2000=360", m._llm_timeout(2000) == 360, "got=%r" % (m._llm_timeout(2000),))
check("_llm_timeout 8000=1080", m._llm_timeout(8000) == 1080, "got=%r" % (m._llm_timeout(8000),))
check("_llm_timeout 100000=1800", m._llm_timeout(100000) == 1800, "got=%r" % (m._llm_timeout(100000),))

done(min_pass=28)
