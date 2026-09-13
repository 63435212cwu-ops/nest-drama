# -*- coding: utf-8 -*-
import os, sys, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *

import re

CALLS = {"planner": [], "actor": [], "referee": 0, "monitor": 0}
STATE = {"round": 0}


def round_of(up):
    mx = re.search(r"现在是第(\d+)轮", up or "")
    return int(mx.group(1)) if mx else 0


def up_for(r, who):
    for w, u, s in CALLS["actor"]:
        if w == who and round_of(u) == r:
            return u
    return ""


def sys_for(r, who):
    for w, u, s in CALLS["actor"]:
        if w == who and round_of(u) == r:
            return s
    return ""


def ups_for(r, who):
    return [u for (w, u, s) in CALLS["actor"] if w == who and round_of(u) == r]


def cast_of(D, name):
    return next((c for c in (D.get("cast") or []) if c.get("name") == name), {})


def extra_of(D, name):
    ex = D.get("extras", {})
    if isinstance(ex, dict):
        return ex.get(name, {}) or {}
    return next((e for e in (ex or []) if e.get("name") == name), {})


def qty_has(D, q):
    return any(str(e.get("qty")) == str(q) for e in (D.get("numLedger") or []))


def actor_text(who, up):
    tgt = "白榆" if who == "青梧" else "青梧"
    if who == "青梧":
        dlg = "「名单上有三十七个名字。」"
    elif who == "白榆":
        if STATE["round"] >= 2:
            dlg = "「名单上是三十七个名字。」" if "数目对不上" in up else "「名单上是三十五个名字。」"
        else:
            dlg = "「我昨夜在值房。」"
    else:
        dlg = "「我只是路过。」"
    return ("【目的】指向→%s；我要从他那里逼出实话。\n"
            "【行为】把灯往%s脸上推了推。\n【对话】%s\n"
            "【心理】局势SECRET-%s碰到我的旧账，所以我打算施压。" % (tgt, tgt, dlg, who))


def planner_plan(up):
    STATE["round"] += 1
    if STATE["round"] == 1:
        return {"driver": "青梧", "target": "白榆", "others": [],
                "conflict_axis": "名单归属",
                "turn_fuel": "驿丞抄的名单副本此刻送到柳七耳边", "stage_note": "灯下对峙"}
    return {"driver": "柳七", "target": "青梧", "others": [],
            "conflict_axis": "名单真假", "turn_fuel": "无", "stage_note": "追问"}


def referee(n, up):
    fx = re.search(r"main-[0-9a-f]{10}", up or "")
    focus = fx.group(0) if fx else "main-0000000000"
    R = {"place": "站厅", "flat": False, "gravity": "顺", "goal_progress": "推进",
         "checks": {"view": "清", "iq": "在线", "persona": "稳"},
         "states": {"青梧": "怒·紧", "白榆": "惧·紧", "柳七": "欲·安"}, "scars": []}
    if n == 1:
        R.update({
            "scene": "青梧推灯质问白榆，柳七旁听。", "chronicle": "名单旧事浮出。",
            "beats": {"goal": "逼话", "conflict": "压", "turn": "沉默", "result": "立账"},
            "baton": "白榆", "baton_reason": "被点名接棒",
            "scars": [{"a": "青梧", "b": "白榆", "what": "当众质问，回不去了"}],
            "plot": {"focus": focus, "movement": "推进", "evidence": "名单被提起",
                     "cost": "青梧暴露", "next_trigger": "白榆追问"},
            "extras": [{"name": "老驿卒", "role": "杂役", "what": "递了灯", "status": "在场"}],
            "goal_reason": "名单被公开提起", "gaps": ["名单副本的去向"]})
    else:
        R.update({
            "scene": "白榆复述名单数目，老驿卒倒在雪里。", "chronicle": "名单数目核对。",
            "beats": {"goal": "核对", "conflict": "数目", "turn": "改口", "result": "落实"},
            "baton": "青梧", "baton_reason": "青梧接棒",
            "plot": {"focus": focus, "movement": "推进", "evidence": "数目核对",
                     "cost": "老驿卒倒下", "next_trigger": "青梧行动"},
            "extras": [{"name": "老驿卒", "role": "杂役", "what": "倒在雪里", "status": "死亡"}],
            "goal_reason": "数目核对完成", "gaps": ["名单真伪"]})
    return R


def fake(messages, cfg=None, max_tokens=2000, temperature=0.9,
         timeout=None, retries=2, stream=True, think=True):
    sp, up = sys_of(messages), user_of(messages)
    if sp.startswith("你是NEST-DRAMA的场记模块"):
        CALLS["planner"].append(up)
        return json.dumps(planner_plan(up), ensure_ascii=False), None
    if "永不破戏" in sp:
        who = re.search(r"以(\S+?)的身份行动", up).group(1)
        CALLS["actor"].append((who, up, sp))
        return actor_text(who, up), None
    if sp.startswith("你是总审官"):
        CALLS["monitor"] += 1
        return "【过】", None
    if sp.startswith("你是毒编的定点改写手"):
        return '{"fixes":[]}', None
    if sp.startswith("你是NEST-DRAMA的反应生成模块"):
        return "他抬头看了一眼，没说话。", None
    if sp.startswith("你是NEST-DRAMA的裁判模块"):
        CALLS["referee"] += 1
        return json.dumps(referee(CALLS["referee"], up), ensure_ascii=False), None
    if sp.startswith("你是NEST-DRAMA的终局模块"):
        return json.dumps({"summary": "收束", "castFates": [], "major": [], "minor": [],
                           "coverage": [], "audit": "ok"}, ensure_ascii=False), None
    if sp.startswith("你是文学编辑"):
        return '[{"i":1,"verdict":"人","score":8,"tell":"「灯」自然"}]', None
    return "一句话。", None


def main():
    m, root = load_engine()
    make_world(m, root)
    set_llm(m, fake)
    log = log_to([])
    r1 = m._auto_round(log)
    D1 = m._load_data()
    r2 = m._auto_round(log)
    D2 = m._load_data()

    check("第1轮返回成功且未收束", isinstance(r1, tuple) and r1[0] is True
          and r1[2] is False and "第1轮完成" in r1[1], repr(r1))
    check("第2轮返回成功且未收束", isinstance(r2, tuple) and r2[0] is True
          and r2[2] is False and "第2轮完成" in r2[1], repr(r2))

    check("场记第1轮被调用", len(CALLS["planner"]) >= 1)
    p1 = CALLS["planner"][0] if CALLS["planner"] else ""
    check("场记输入含单元目标", "【单元目标】" in p1)
    check("场记输入含在场名单三人", "【在场名单】青梧、白榆、柳七" in p1)
    check("因无next场记每轮都调用", len(CALLS["planner"]) >= 2)

    a1 = [(w, u) for (w, u, s) in CALLS["actor"] if round_of(u) == 1]
    qw1, by1, lq1 = up_for(1, "青梧"), up_for(1, "白榆"), up_for(1, "柳七")
    check("第1轮青梧有角色回合", qw1 != "")
    check("驱动者提示词标明驱动者身份", "你是本轮的驱动者" in qw1)
    check("被指向者提示词含刚刚当面", "【刚刚，当着你的面】" in by1)
    check("被指向者可见驱动者行为原文", "把灯往白榆脸上推了推" in by1)
    check("被指向者看不到驱动者心理", "SECRET-青梧" not in by1)
    check("应对者提示词不含单元目标句", "守夜名单落到县令案头" not in by1)
    check("应对者提示词不含轮次预算句", "最多 6 轮" not in by1)
    check("应对者提示词不含单元轮序", "本单元第" not in by1)
    check("应对者提示词含当前轮次", "现在是第1轮" in by1)
    check("所有角色提示词不含必发生事件原句",
          all("守夜名单被翻出" not in u for (_, u) in a1))

    t1 = m._read("推演/第001轮.md")
    check("柳七被织入本轮主笔", lq1 != "")
    check("柳七提示词含燃料投递", "【此刻送到你面前的】" in lq1)
    check("柳七提示词含燃料内容", "名单副本" in lq1)
    check("驱动者不接燃料投递", "【此刻送到你面前的】" not in qw1)
    check("审计记录燃料收件人", "燃料收件人" in t1)

    check("第001轮文件存在", bool(t1))
    check("第001轮frontmatter driver", re.search(r"driver:\s*青梧", t1) is not None)
    check("第001轮frontmatter target", re.search(r"target:\s*白榆", t1) is not None)
    check("第001轮frontmatter baton", re.search(r"baton:\s*白榆", t1) is not None)
    check("第001轮frontmatter flat", re.search(r"flat:\s*false", t1, re.I) is not None)
    check("第001轮含青梧回合标题", "## 青梧 回合" in t1)
    check("第001轮含纪要", "## 【纪要】" in t1)
    check("第001轮含结构四拍", "## 【结构·四拍】" in t1)
    check("第001轮含引力检查", "## 引力检查" in t1)
    check("第001轮含三查与脊椎触达", "## 三查与脊椎触达" in t1)
    check("纪事含第1段", "## 第1段" in m._read("纪事.md"))

    xq1, xb1 = m._read("角色/青梧·心象.md"), m._read("角色/白榆·心象.md")
    check("青梧心象此刻写入心理", "SECRET-青梧" in xq1)
    check("青梧心象更新时间", "updated: 第2轮" in xq1)
    check("青梧心象情绪emo", "emo: 怒" in xq1)
    check("青梧心象眼下写入目的", "眼下：指向→白榆" in xq1)
    check("青梧心象出现旧账", "## 旧账" in xq1 and "第1轮·与[[白榆]]" in xq1)
    check("白榆心象出现旧账", "## 旧账" in xb1 and "第1轮·与[[青梧]]" in xb1)

    check("data meta.round=1", D1.get("meta", {}).get("round") == 1)
    check("data meta.baton=白榆", D1.get("meta", {}).get("baton") == "白榆")
    feed1 = D1.get("feed", [])
    check("feed长度1", len(feed1) == 1, str(len(feed1)))
    present = feed1[0].get("present", []) if feed1 else []
    check("feed present含三人", all(x in present for x in ("青梧", "白榆", "柳七")))
    check("feed human为整数", isinstance(feed1[0].get("human"), int) if feed1 else False)
    check("青梧 state 更新", cast_of(D1, "青梧").get("state") == "怒·紧")
    check("numLedger有37", qty_has(D1, 37))
    check("extras老驿卒在场", extra_of(D1, "老驿卒").get("status") == "在场")
    check("gaps含名单副本去向", any("名单副本的去向" in g for g in (D1.get("gaps") or [])))
    pl = D1.get("plotLedger", {}).get("units", {})
    check("plotLedger夜巡主线非空", bool((pl.get("夜巡") or {}).get("main")))
    eh = D1.get("meta", {}).get("emotionHistory", {})
    check("emotionHistory青梧长度1", len(eh.get("青梧", [])) == 1)
    edges = D1.get("graph", {}).get("edges", [])
    check("graph有青梧白榆关系边且权重≥3",
          any(e.get("kind") == "关系" and {e.get("source"), e.get("target")} == {"青梧", "白榆"}
              and (e.get("weight") or 0) >= 3 for e in edges))

    t2 = m._read("推演/第002轮.md")
    check("第2轮frontmatter driver=白榆", re.search(r"driver:\s*白榆", t2) is not None)
    check("第2轮审计含咬合律", "咬合律" in t2)
    by2 = ups_for(2, "白榆")
    check("白榆第2轮被调用至少2次", len(by2) >= 2, str(len(by2)))
    check("白榆补推提示词含数目对不上", len(by2) >= 2 and "数目对不上" in by2[1])
    check("白榆补推提示词含账上37", len(by2) >= 2 and "37" in by2[1])
    check("审计含数目毙", "数目毙" in t2)

    qw2 = up_for(2, "青梧")
    check("第2轮被指向者含上一轮实录", "【上一轮实录（公共部分）】" in qw2)
    check("第2轮被指向者看不到上轮他人心理", "SECRET-白榆" not in (qw2 + sys_for(2, "青梧")))
    check("第2轮被指向者含亲历前几轮", "【你亲历过的前几轮" in sys_for(2, "青梧"))

    check("extras老驿卒死亡", extra_of(D2, "老驿卒").get("status") == "死亡")
    check("feed长度2", len(D2.get("feed", [])) == 2)
    check("data meta.round=2", D2.get("meta", {}).get("round") == 2)
    check("总审官次数不少于过审主笔回合",
          CALLS["monitor"] >= len(CALLS["actor"]) - 1)

    if "燃料收件人" not in t1:
        print("ENGINE-BUG: 覆盖债先于燃料收件人织入，审计不记「燃料收件人」。")
    if up_for(2, "青梧") == "":
        print("ENGINE-BUG: 咬合律强制驱动时把原驱动者改作指向位，挤掉场记 target 青梧。")
    if not qty_has(D1, 37):
        print("ENGINE-BUG: 数目账未识别量词「个」。")

    done(min_pass=30)


if __name__ == "__main__":
    main()
