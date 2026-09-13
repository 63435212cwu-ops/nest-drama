# -*- coding: utf-8 -*-
import os, sys, json, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *

CAST = ("青梧", "白榆", "柳七")
DIA = {"青梧": "「你昨夜去哪了？」", "白榆": "「我去哪，与你何干？」", "柳七": "「两位，夜还长着呢。」"}
PLAN = {"driver": "青梧", "target": "白榆", "others": [], "conflict_axis": "追问行踪",
        "turn_fuel": "无", "stage_note": "灯下对峙"}
FIN = {"summary": "守夜名单最终落到县令案头，白榆被带走问话。",
       "castFates": [{"name": "青梧", "fate": "留守驿站"}, {"name": "白榆", "fate": "被带走问话"},
                     {"name": "柳七", "fate": "继续赶路"}], "major": [], "minor": [], "coverage": [], "audit": "无"}


def atext(who, up):
    opp = [x for x in CAST if x != who][0]
    return ("【目的】指向→%s；我要从他那里逼出实话。\n【行为】把灯往%s脸上推了推。\n【对话】%s\n"
            "【心理】我读到局势SECRET-%s，它碰到我的旧账，所以我打算施压。\n") % (opp, opp, DIA[who], who)


def focus(up):
    m = re.search(r"main-[0-9a-f]{10}", up or "")
    return m.group(0) if m else "main-0000000000"


def rj(progress, flat=False, baton="白榆", turn="推进", result="名单被翻出", fc="main-0000000000",
       scars=None, states=None):
    return {"scene": "青梧把灯推到白榆面前逼问行踪。", "place": "驿站前厅", "chronicle": "青梧逼问白榆行踪，白榆支吾。",
            "beats": {"goal": "逼出实话", "conflict": "对峙", "turn": turn, "result": result}, "flat": bool(flat),
            "baton": baton, "baton_reason": "由%s接棒" % baton, "scars": scars or [],
            "plot": {"focus": fc, "movement": "推进", "evidence": "名单", "cost": "信任", "next_trigger": "知县传唤"},
            "subplot_updates": [], "extras": [], "states": states or {"青梧": "惧·紧"}, "state_reasons": {},
            "gravity": "顺", "goal_progress": progress, "goal_reason": "按剧本", "gaps": [], "remaining": "待续",
            "checks": {"view": True, "iq": True, "persona": True}, "touched": ["青梧", "白榆"]}


def fake_factory(calls, rf):
    def f(messages, cfg=None, max_tokens=2000, temperature=0.9, timeout=None, retries=2, stream=True, think=True):
        sp, up = sys_of(messages), user_of(messages)
        if sp.startswith("你是NEST-DRAMA的场记模块"):
            calls["planner"].append(up)
            return json.dumps(PLAN, ensure_ascii=False), None
        if "永不破戏" in sp:
            who = re.search(r"以(\S+?)的身份行动", up).group(1)
            calls["actor"].append((who, up))
            return atext(who, up), None
        if sp.startswith("你是总审官"):
            calls["monitor"] += 1
            return "【过】", None
        if sp.startswith("你是毒编的定点改写手"):
            return '{"fixes":[]}', None
        if sp.startswith("你是NEST-DRAMA的反应生成模块"):
            return "他抬头看了一眼，没说话。", None
        if sp.startswith("你是NEST-DRAMA的裁判模块"):
            calls["referee"] += 1
            return rf(calls, up), None
        if sp.startswith("你是NEST-DRAMA的终局模块"):
            return json.dumps(FIN, ensure_ascii=False), None
        if sp.startswith("你是文学编辑"):
            return '[{"i":1,"verdict":"人","score":8,"tell":"「灯」自然"}]', None
        if "客观复述" in sp or "80-150" in sp:
            return "青梧问了白榆一句，没答。", None
        return "一句话。", None
    return f


def front(t):
    if not t.startswith("---"):
        return ""
    e = t.find("\n---", 3)
    return t[3:e] if e >= 0 else t


def fm(t, k, v=None):
    f = front(t)
    if v is None:
        return re.search(r"(?m)^\s*%s\s*:" % re.escape(k), f) is not None
    return re.search(r"(?m)^\s*%s\s*:\s*[\"']?%s" % (re.escape(k), re.escape(str(v))), f) is not None


def sec(t, h):
    i = t.find(h)
    if i < 0:
        return ""
    j = t.find("\n## ", i + len(h))
    return t[i:j] if j >= 0 else t[i:]


def hr(msg, n):
    return re.search(r"第\s*%d\s*轮" % n, msg or "") is not None


def edge(D, a, b):
    for e in (D.get("graph") or {}).get("edges", []) or []:
        if e.get("kind") == "关系" and a in e.values() and b in e.values():
            return e
    return None


def script(m, root):
    d = os.path.join(root, "剧本")
    try:
        ns = sorted(os.listdir(d))
    except OSError:
        return ""
    for n in ns:
        if n.endswith(".md"):
            t = m._read(os.path.join("剧本", n))
            if t:
                return t
    return ""


# ============================ 场景 A ============================
ca = {"planner": [], "actor": [], "referee": 0, "monitor": 0}


def rfA(c, up):
    n = len(c["planner"])
    fc = focus(up)
    if n == 1:
        return json.dumps(rj("推进", baton="白榆", fc=fc, scars=[{"a": "青梧", "b": "白榆", "what": "当众揭短"}],
                             states={"青梧": "惧·紧", "白榆": "躁·紧", "柳七": "稳"}), ensure_ascii=False)
    if n == 2:
        return json.dumps(rj("未动", flat=True, baton="青梧", turn="无", result="", fc=fc), ensure_ascii=False)
    if n in (3, 4, 5):
        return json.dumps(rj("临门", baton="白榆" if n < 5 else "青梧", fc=fc), ensure_ascii=False)
    if n == 6:
        return json.dumps(rj("达成", baton="白榆", fc=fc), ensure_ascii=False)
    return json.dumps(rj("推进", fc=fc), ensure_ascii=False)


m1, root1 = load_engine()
make_world(m1, root1, budget=10)
set_llm(m1, fake_factory(ca, rfA))
la = []
log1 = log_to(la)

a = m1._auto_round(log1)
check("A R1 形状", a[0] is True and a[2] is False and hr(a[1], 1))
D = m1._load_data()
check("A meta.round/baton", D["meta"].get("round") == 1 and D["meta"].get("baton") == "白榆")
t1 = m1._read("推演/第001轮.md")
check("A 001 frontmatter", bool(t1) and all(fm(t1, k) for k in (
    "round", "unit", "unit_round", "phase", "present", "driver", "target", "baton", "flat", "gravity",
    "goal_progress")) and fm(t1, "driver", "青梧") and fm(t1, "target", "白榆") and fm(t1, "baton", "白榆")
    and fm(t1, "gravity", "顺") and fm(t1, "goal_progress", "推进") and fm(t1, "round", "1"))
check("A 001 章节", all(x in t1 for x in ("【结构·四拍】", "审核审计", "【纪要】", "引力检查", "三查与脊椎触达"))
    and re.search(r"##\s*青梧[^\n]*回合", t1) is not None)
check("A 纪事第1段", "## 第1段" in m1._read("纪事.md"))
xx = m1._read("角色/青梧·心象.md")
check("A 青梧心象", "## 此刻" in xx and "SECRET-青梧" in xx
    and re.search(r"眼下：\s*指向→白榆", xx) is not None and fm(xx, "updated", "第1轮")
    and fm(xx, "emo") and fm(xx, "tier"))
check("A 旧账双方", "## 旧账" in xx and "第1轮·与[[白榆]]" in xx
    and "第1轮·与[[青梧]]" in m1._read("角色/白榆·心象.md"))
eg = edge(D, "青梧", "白榆")
check("A 关系边", eg is not None and eg.get("weight", 0) > 0)
fd = D.get("feed") or []
check("A feed", bool(fd) and fd[-1].get("round") == 1 and isinstance(fd[-1].get("human"), int)
    and isinstance(fd[-1].get("checks"), dict) and fd[-1].get("present") is not None)
cm = {c.get("name"): c for c in D.get("cast", [])}
check("A cast/plotLedger", cm.get("青梧", {}).get("state") not in (None, "") and bool(D.get("plotLedger")))
du = ru = None
for w, u in ca["actor"]:
    if w == "青梧" and du is None:
        du = u
    if w == "白榆" and ru is None:
        ru = u
check("A 角色调用", du is not None and ru is not None and "以青梧的身份行动" in du
    and "【刚刚，当着你的面】" in ru)
check("A 视野律含公共", "把灯往白榆脸上推了推" in ru and "你昨夜去哪了" in ru)
check("A 视野律排私密", "SECRET-青梧" not in ru and "【目的】指向→白榆" not in ru)
check("A 视野律排设定", "现在是第1轮" in ru and "守夜名单落到县令案头" not in ru
    and "最多 6 轮" not in ru and "最多 10 轮" not in ru and "本单元第" not in ru)

b = m1._auto_round(log1)
check("A R2 形状", b[0] is True and b[2] is False)
D = m1._load_data()
check("A R2 flatDebt/平轮", D["meta"].get("flatDebt") == 1 and "平轮" in m1._read("推演/第002轮.md"))

c = m1._auto_round(log1)
check("A R3 形状/硬指令", c[0] is True and c[2] is False and "近期平轮偏多" in ca["planner"][-1])

d = m1._auto_round(log1)
check("A R4 形状", d[0] is True and d[2] is False)

e = m1._auto_round(log1)
check("A R5 形状/nearDone", e[0] is True and e[2] is False and m1._load_data()["meta"].get("nearDone") == 3)
t5 = m1._read("推演/第005轮.md")
check("A R5 阶段", fm(t5, "phase", "开局") and not fm(t5, "phase", "收束轮"))

g = m1._auto_round(log1)
check("A R6 形状", g[0] is True and g[2] is True)
check("A R6 场记/阶段", "收束轮" in ca["planner"][-1] and fm(m1._read("推演/第006轮.md"), "phase", "收束轮"))
D = m1._load_data()
check("A R6 单元状态", "已收束" in D["units"][0].get("status", "") and D["units"][0].get("result") == "达成")
out = D.get("outcome") or {}
check("A R6 spine/outcome", bool(D.get("spine")) and D["spine"][0].get("achieved") is True
    and bool(out.get("summary")) and (out.get("turing") or {}).get("score") == 8)
check("A R6 收束判定", m1._all_closed() is True and m1._advance_unit(log1) is False)
check("A R6 纪事/剧本", "## 第6段" in m1._read("纪事.md") and "## 单元小结" in script(m1, root1))

# ============================ 场景 B ============================
cb = {"planner": [], "actor": [], "referee": 0, "monitor": 0}


def rfB(c, up):
    if len(c["planner"]) == 1:
        return "这不是JSON"
    return json.dumps(rj("未动", flat=False, baton="白榆", fc=focus(up)), ensure_ascii=False)


m2, root2 = load_engine()
make_world(m2, root2, budget=8)
set_llm(m2, fake_factory(cb, rfB))
lb = []
log2 = log_to(lb)

b1 = m2._auto_round(log2)
check("B R1 形状/重问", b1[0] is True and b1[2] is False and cb["referee"] >= 2)
b1t = m2._read("推演/第001轮.md")
check("B R1 降级纪要", "青梧问了白榆一句" in sec(b1t, "【纪要】") and fm(b1t, "goal_progress", "未判"))
D = m2._load_data()
check("B R1 feed", bool(D.get("feed")) and "青梧问了白榆一句" in (D["feed"][0].get("summary") or ""))
b2 = m2._auto_round(log2)
check("B R2 形状", b2[0] is True and b2[2] is False)
b3 = m2._auto_round(log2)
check("B R3 形状", b3[0] is True and b3[2] is False)
b4 = m2._auto_round(log2)
check("B R4 停滞收束", b4[0] is True and b4[2] is True and "停滞" in (b4[1] or ""))
D = m2._load_data()
check("B R4 单元状态", "停滞" in (D["units"][0].get("result") or "")
    and "已收束（4/8）" in (D["units"][0].get("status") or ""))

# ============================ 场景 C ============================
m3, root3 = load_engine()
D3 = make_world(m3, root3)
D3["units"].append({"name": "第二幕", "budget": 5, "used": 0, "status": "待推演（0/5）",
                    "goal": "g2", "colorIndex": 1})
D3["meta"].update({"flatDebt": 2, "driverStreak": 3, "lastDriver": "青梧", "nearDone": 2, "baton": "白榆"})
D3["units"][0]["status"] = "已收束（6/6）"
m3._save_data(D3)
lc = []
log3 = log_to(lc)
check("C advance True", m3._advance_unit(log3) is True)
C = m3._load_data()
check("C meta 复位", C["meta"].get("unitName") == "第二幕" and C["meta"].get("unitRound") == "0/0"
    and C["meta"].get("baton") == "" and C["meta"].get("flatDebt") == 0
    and C["meta"].get("driverStreak") == 0 and C["meta"].get("nearDone") == 0
    and C["meta"].get("lastDriver") == "")
check("C 单元/图谱", (C["units"][1].get("status") or "").startswith("当前单元")
    and (C.get("graph") or {}).get("unit") == "第二幕")
check("C all_closed False", m3._all_closed() is False)

done(min_pass=30)
