# -*- coding: utf-8 -*-
import os, sys, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *

GOAL = "守夜名单落到县令案头"
CAST = ("青梧", "白榆", "柳七")
SOFT = "柳七的旧债被提起"


def _find(entry, tid):
    for g in ("main", "subplots", "private"):
        for t in (entry.get(g) or []):
            if t.get("id") == tid:
                return t
    return None


def _labels(threads):
    return [t.get("label") for t in (threads or [])]


def _extra(D, name):
    ex = D.get("extras")
    if isinstance(ex, dict):
        return ex.get(name)
    for e in (ex or []):
        if isinstance(e, dict) and e.get("name") == name:
            return e
    return None


class _Cand(list):
    def __call__(self, msg):
        self.append(msg)


def R_dict(focus, movement=None, gp="未动", evidence="有动静", gaps=None, subs=None):
    p = {"focus": focus, "evidence": evidence}
    if movement is not None:
        p["movement"] = movement
    R = {"plot": p, "goal_progress": gp}
    if gaps is not None:
        R["gaps"] = gaps
    if subs is not None:
        R["subplot_updates"] = subs
    return R


m, root = load_engine()
D = make_world(m, root)
U = m._unit_ctx(D)
entry = m._ensure_plot_ledger(D, U)
goal_id = entry.get("mainGoalId")

main_labels = set(_labels(entry.get("main")))
check("ensure: main 按 label 去重后 ≥2 条", len(main_labels) >= 2)
check("ensure: main 含目标 label", GOAL in main_labels)
soft = [t for t in (entry.get("subplots") or []) if t.get("label") == SOFT]
check("ensure: subplots 含软节点", len(soft) >= 1)
check("ensure: 软节点 owners 含 柳七", bool(soft) and "柳七" in (soft[0].get("owners") or []))
check("ensure: coverage 恰为 3 位卡司", set((entry.get("coverage") or {}).keys()) == set(CAST))
check("ensure: mainGoalId 非空且等于 mainGoal.id",
      bool(goal_id) and goal_id == (entry.get("mainGoal") or {}).get("id"))
_n0 = sum(len(entry.get(g) or []) for g in ("main", "subplots", "private"))
_e2 = m._ensure_plot_ledger(D, U)
_n1 = sum(len(_e2.get(g) or []) for g in ("main", "subplots", "private"))
check("ensure: 再次调用线程总数不变", _n0 == _n1)

_r = m._resolve_plot_thread(entry, requested=goal_id)
check("resolve: 精确 id 命中", bool(_r) and _r.get("id") == goal_id)
_r = m._resolve_plot_thread(entry, requested=GOAL)
check("resolve: label 子串命中", bool(_r) and _r.get("label") == GOAL)
_r = m._resolve_plot_thread(entry, text="今夜定要把守夜名单送进县令案头")
check("resolve: 关键词重叠命中", bool(_r) and _r.get("label") == GOAL)
check("resolve: 无匹配返回 None", m._resolve_plot_thread(entry, requested="zzz无关zzz", text="完全不搭嘎") is None)

sub_id = soft[0]["id"]
_f = m._choose_focus(entry, requested=sub_id, force_main=True)
check("choose_focus: force_main 跳过 subplot 返回 main", bool(_f) and _f.get("kind") == "main")
mains = [t for t in (entry.get("main") or []) if t.get("status") not in ("resolved", "closed")]
_ml = min(t.get("lastRound", 0) for t in mains)
_mp = min(t.get("progress", 0) for t in mains if t.get("lastRound", 0) == _ml)
_f = m._choose_focus(entry)
check("choose_focus: 取 (lastRound,progress) 最小 main",
      bool(_f) and _f.get("kind") == "main" and _f.get("lastRound", 0) == _ml and _f.get("progress", 0) == _mp)

p1 = m._update_plot_ledger(D, U, R_dict(goal_id, "推进", "推进", evidence="翻出名册"), {}, 1, False)
g = _find(p1["entry"], goal_id)
check("update R1: 推进→status active", g.get("status") == "active")
check("update R1: 推进→progress 18", g.get("progress") == 18)
check("update R1: main_moved→mainDebt 0", p1["entry"].get("mainDebt") == 0)
check("update R1: history 恰 1 条", len(p1["entry"].get("history") or []) == 1)
check("update R1: meta.plotMovement=advanced", D.get("meta", {}).get("plotMovement") == "advanced")

p2 = m._update_plot_ledger(D, U, R_dict(goal_id, "受挫", "未动", evidence="名册被夺"), {}, 2, False)
check("update R2: 受挫→movement setback", p2.get("movement") == "setback")
check("update R2: 受挫→progress 10", _find(p2["entry"], goal_id).get("progress") == 10)

p3 = m._update_plot_ledger(D, U, R_dict(goal_id, "停滞", "未动", evidence="僵住"), {}, 3, False)
g3 = _find(p3["entry"], goal_id)
check("update R3: 停滞→status held", g3.get("status") == "held")
check("update R3: 停滞无触发→nextTrigger 以「待定」开头", str(g3.get("nextTrigger", "")).startswith("待定"))
check("update R3: triggerDebt=1", (g3.get("triggerDebt") or 0) == 1)
check("update R3: 两轮未推进→mainDebt 2", p3["entry"].get("mainDebt") == 2)

p4 = m._update_plot_ledger(D, U, R_dict(goal_id, "搁置", "未动", evidence="暂压"), {}, 4, False)
check("update R4: 搁置→deferred", p4.get("movement") == "deferred")

p5 = m._update_plot_ledger(D, U, R_dict(goal_id, "达成", "达成", evidence="案头落印"), {}, 5, False)
g5 = _find(p5["entry"], goal_id)
check("update R5: 达成→status resolved", g5.get("status") == "resolved")
check("update R5: 达成→progress 100", g5.get("progress") == 100)
check("update R5: mainGoal status resolved", (p5["entry"].get("mainGoal") or {}).get("status") == "resolved")
check("update R5: main_moved→mainDebt 归零", p5["entry"].get("mainDebt") == 0)

p6 = m._update_plot_ledger(D, U, R_dict(goal_id, None, "未动", evidence="无进展"), {}, 6, True)
check("update R6: movement 缺失且 flat→held", p6.get("movement") == "held")
check("update R6: flat 未达成→mainDebt 1", p6["entry"].get("mainDebt") == 1)

p7 = m._update_plot_ledger(D, U, R_dict(goal_id, "推进", "推进", evidence="新线", gaps=["黑猫供桌"]), {}, 7, False)
check("gaps: 新 gap 进入 subplots", "黑猫供桌" in _labels(p7["entry"].get("subplots")))
gt = [t for t in p7["entry"]["subplots"] if t.get("label") == "黑猫供桌"]
check("gaps: source 以 gap:R 开头", bool(gt) and str(gt[0].get("source", "")).startswith("gap:R"))
_nb = len(p7["entry"]["subplots"])
p8 = m._update_plot_ledger(D, U, R_dict(goal_id, "推进", "推进", evidence="新线", gaps=["黑猫供桌"]), {}, 8, False)
check("gaps: 同 label 不重复追加", len(p8["entry"]["subplots"]) == _nb)

p9 = m._update_plot_ledger(D, U, R_dict(goal_id, "推进", "推进", evidence="主线推",
      subs=[{"id": sub_id, "movement": "推进", "evidence": "旧债被点", "cost": "", "next_trigger": "柳七还钱"}]), {}, 9, False)
st = _find(p9["entry"], sub_id)
check("subplot_updates: 软线 status active", st.get("status") == "active")
check("subplot: nextTrigger 落地", st.get("nextTrigger") == "柳七还钱")

_ids = [c.get("id") for c in (p1["entry"].get("costDebt") or [])]
check("costDebt: 非flat主线有证据无cost→入账 R1:<focus>", ("R1:%s" % goal_id) in _ids)

Dc = make_world(m, root)
Uc = m._unit_ctx(Dc)
ec = m._ensure_plot_ledger(Dc, Uc)
check("coverage: 初始三人全 due", set(m._coverage_due(ec, list(CAST), 1)) == set(CAST))
m._record_coverage(ec, list(CAST), ["青梧"], [("青梧", "开口"), ("白榆", "应答")], 1)
cov = ec["coverage"]
check("coverage: 青梧 lastLead=1", cov["青梧"].get("lastLead") == 1)
check("coverage: 白榆 lastPresent=1", cov["白榆"].get("lastPresent") == 1)
check("coverage: 白榆 lastLead=0", cov["白榆"].get("lastLead") == 0)
due2 = m._coverage_due(ec, list(CAST), 2)
check("coverage: rnd2 不含 青梧", "青梧" not in due2)
check("coverage: rnd2 含 柳七", "柳七" in due2)
check("coverage: rnd2 柳七(字典序)排白榆前", due2.index("柳七") < due2.index("白榆"))

Ds = make_world(m, root)
Us = m._unit_ctx(Ds)
es = m._ensure_plot_ledger(Ds, Us)
gid = es.get("mainGoalId")
same4 = "【目的】逼债\n【行为】当街拦人\n【对话】你欠我的钱该还了"
diff4 = "【目的】送出文书\n【行为】牵马出关\n【对话】县令有令明日封城"
w1 = m._strategy_audit(Ds, Us, [("青梧", same4)], "青梧", "柳七", gid, 1)
check("strategy: 首轮无重复警告", not any("策略高度重复" in x for x in w1))
w2 = m._strategy_audit(Ds, Us, [("青梧", same4)], "青梧", "柳七", gid, 2)
check("strategy: 次轮同策略→含策略高度重复", any("策略高度重复" in x for x in w2))
check("strategy: 有警告→loopDebt 1", Ds.get("meta", {}).get("loopDebt") == 1)
w3 = m._strategy_audit(Ds, Us, [("青梧", diff4)], "青梧", "柳七", gid, 3)
check("strategy: 三轮换策略→无警告", not any("策略高度重复" in x for x in w3))
check("strategy: 无警告→loopDebt 回落 0", Ds.get("meta", {}).get("loopDebt") == 0)

De = make_world(m, root)
check("emotion: 无历史返回含尚无情绪轨迹", "尚无情绪轨迹" in m._emotion_context(De, "青梧"))
_h = None
for _i, _s in enumerate(["平静", "警觉", "愤怒"], 1):
    _h = m._emotion_history(De, "青梧", _s, "因由%d" % _i, _i)
check("emotion: 连记3轮返回最近≤4条", bool(_h) and len(_h) == 3)
check("emotion: history 长度 3", len(De["meta"]["emotionHistory"]["青梧"]) == 3)
check("emotion: context 含 R3", "R3" in m._emotion_context(De, "青梧"))
for _i in range(4, 24):
    m._emotion_history(De, "青梧", "状态%d" % _i, "r", _i)
check("emotion: 灌入后 history ≤16", len(De["meta"]["emotionHistory"]["青梧"]) <= 16)

Dx = make_world(m, root)
lbuf = []
mlog = log_to(lbuf)
m._update_extras(Dx, {"extras": [{"name": "老驿卒", "role": "驿卒", "what": "递茶", "status": "在场"}]}, 1, log=mlog)
m._update_extras(Dx, {"extras": [{"name": "老驿卒", "role": "驿卒", "what": "被斩", "status": "死亡"}]}, 2, log=mlog)
m._update_extras(Dx, {"extras": [{"name": "老驿卒", "role": "驿卒", "what": "又现身", "status": "在场"}]}, 3, log=mlog)
_old = _extra(Dx, "老驿卒")
check("extras: 死亡后不接受改回在场", _old is not None and _old.get("status") == "死亡")
check("extras: 拒绝改写写入日志", any("拒绝改写" in str(x) for x in lbuf))
m._update_extras(Dx, {"extras": [{"name": "青梧", "role": "驿丞", "what": "经过", "status": "在场"}]}, 4, log=mlog)
check("extras: 卡司名不入 extras", _extra(Dx, "青梧") is None)
for _i in range(1, 10):
    m._update_extras(Dx, {"extras": [{"name": "阿猫", "role": "猫", "what": "第%d次" % _i, "status": "在场"}]}, _i, log=mlog)
_cat = _extra(Dx, "阿猫")
check("extras: facts 最多 6 条", _cat is not None and len(_cat.get("facts") or []) <= 6)
check("extras: context 标出不可能再出现", "不可能再出现" in m._extras_context(Dx))

Dn = make_world(m, root)
check("num: dupian 可用", getattr(m, "dupian", None) is not None)
cand = _Cand()
m._update_num_ledger(Dn, [("青梧", "【行为】清点\n【对话】名单上有三十七个名字")], 1, cand)
_led = Dn.get("numLedger") or []
check("num: R1 入账 qty 37", any(str(x.get("qty")) == "37" for x in _led))
m._update_num_ledger(Dn, [("白榆", "【行为】翻看\n【对话】名单上是三十五个名字")], 2, cand)
check("num: R2 无质疑→candlog 含对不上", any("对不上" in str(x) for x in cand))
check("num: R2 不入新数 35", all(str(x.get("qty")) != "35" for x in (Dn.get("numLedger") or [])))
check("num: R2 账上仍 37", any(str(x.get("qty")) == "37" for x in (Dn.get("numLedger") or [])))
m._update_num_ledger(Dn, [("柳七", "【行为】争辩\n【对话】不对，明明是三十六个名字")], 3, cand)
check("num: R3 明着质疑→candlog 含改口", any("改口" in str(x) for x in cand))
check("num: R3 新数 36 为最新", str((Dn.get("numLedger") or [{}])[-1].get("qty")) == "36")
_n3 = len(Dn.get("numLedger") or [])
m._update_num_ledger(Dn, [("柳七", "【行为】复述\n【对话】名单上是三十六个名字")], 4, cand)
check("num: R4 同数复述不重复入账", len(Dn.get("numLedger") or []) == _n3)

Dl = make_world(m, root)
Ul = m._unit_ctx(Dl)
m._ensure_plot_ledger(Dl, Ul)
Dl["feed"] = [
    {"driver": "青梧", "target": "柳七", "flat": False},
    {"driver": "青梧", "target": "柳七", "flat": True},
    {"driver": "青梧", "target": "柳七", "flat": True},
]
snap = m._loop_snapshot(Dl, Ul)
check("loop: same_pair 3", snap.get("same_pair") == 3)
check("loop: flat_count 2", snap.get("flat_count") == 2)
check("loop: debt ≥ 3", snap.get("debt", 0) >= 3)

done(min_pass=34)
