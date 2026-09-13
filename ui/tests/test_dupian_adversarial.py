# -*- coding: utf-8 -*-
import os, sys, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *

import re, random

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import dupian


def _residue_text(residue):
    parts = []
    for item in residue:
        try:
            parts.append("".join(str(x) for x in item))
        except TypeError:
            parts.append(str(item))
    return " || ".join(parts)


fixed, residue, logs = dupian.repair("他顿了顿，说：「走。」")
check("repair_删除顿词", "顿了顿" not in fixed, fixed)
check("repair_保留对话原文", "走。" in fixed, fixed)
check("repair_产生非空日志", len(logs) > 0, str(logs))

f2, r2, l2 = dupian.repair("他非常突然地出现，又极其安静地离开。")
check("弱词_非常被删", "非常" not in f2, f2)
check("弱词_突然被删", "突然" not in f2, f2)

f3, r3, l3 = dupian.repair("他心中一凛，继续前行。")
check("议类_原句保留", "心中一凛" in f3, f3)
check("议类_进入残留", "心中一凛" in _residue_text(r3), _residue_text(r3))

s4 = dupian.scan("他目光锁死前方不动。")
check("观类_scan处置为观", any(len(p) >= 2 and p[1] == "观" for p in s4), str(s4))
f4, r4, l4 = dupian.repair("他目光锁死前方不动。")
check("观类_不被删除", "目光锁死" in f4, f4)
check("观类_不进残留", "目光锁死" not in _residue_text(r4), _residue_text(r4))

qseg = "他盯着案上的卷宗似乎想看出些什么来却又什么也看不出来只好作罢转身离去。"
qsrc = qseg * 6
qf, qr, ql = dupian.repair(qsrc)
qn = qf.count("似乎")
check("配额_删超额且留底", 1 <= qn < 6, "似乎=%d 原长=%d" % (qn, len(qsrc)))

random.seed(20260914)
bing = [
    "他顿了顿。", "她深吸一口气。", "他喉结滚动。", "她垂眸。",
    "他指节泛白。", "她瞳孔一缩。", "他嘴角勾起。", "她抿了抿唇。",
    "他非常疲惫。", "她极其安静。", "他忽然停下。", "她猛地转身。",
    "他下意识地后退。", "她不由自主地颤抖。", "他露出一丝笑意。",
    "她心中暗想。", "他话音刚落。", "她冷哼一声。", "他一字一顿地说。",
    "他深吸一口气又说。",
]
dial = ["「走。」", "「你别过来。」", "「今夜有雨。」", "「名单呢？」",
        "「我不知道。」", "「等我回来。」", "「此事蹊跷。」", "「就在此处。」"]
num_pool = [
    ("仓中存粮一千二百石。", "一千二百"),
    ("甲士八百人。", "八百"),
    ("船夫转运五千二百领重铠。", "五千二百"),
    ("库银计三百零六文。", "三百零六"),
    ("银两12两。", "12"),
]
bad_dial = 0
bad_num = 0
bad_len = 0
for _i in range(20):
    parts = []
    want_dial = []
    want_num = []
    for _k in range(3):
        parts.append(random.choice(bing))
    for _k in range(random.randint(1, 3)):
        d = random.choice(dial)
        parts.append(d)
        want_dial.append(d)
    ns, nw = random.choice(num_pool)
    parts.append(ns)
    want_num.append(nw)
    random.shuffle(parts)
    src = "".join(parts)
    out, _r, _l = dupian.repair(src)
    for d in want_dial:
        if d not in out:
            bad_dial += 1
    for w in want_num:
        if w not in out:
            bad_num += 1
    if len(out) > len(src):
        bad_len += 1
check("模糊_对话原文不丢失", bad_dial == 0, "丢失=%d" % bad_dial)
check("模糊_数字词不丢失", bad_num == 0, "丢失=%d" % bad_num)
check("模糊_长度不增长", bad_len == 0, "增长=%d" % bad_len)

mt1 = dupian.metrics("空气很闷，天气不好。")
check("metrics_情绪护栏", mt1["情绪词"] == 0, str(mt1))
mt2 = dupian.metrics("我怕他。")
check("metrics_我怕算情绪", mt2["情绪词"] >= 1, str(mt2))
mt3 = dupian.metrics("他顿了顿，抿了抿唇。")
check("metrics_微动作计数", mt3["微动作"] >= 2, str(mt3))

clean = "天刚亮，街边的铺子陆续卸下门板，老王挑着担子走过石桥，筐里的青菜还挂着露水。他盘算着今日往东市去，那里人多，生意总归好做些。"
sick = "他顿了顿，深吸一口气，喉结滚动，垂眸，指节泛白，瞳孔一缩，嘴角勾起，抿了抿唇，非常，极其，突然，忽然。"
hs_empty = dupian.human_score("")
hs_clean = dupian.human_score(clean)
hs_sick = dupian.human_score(sick)
check("human_空串为0", hs_empty == 0, str(hs_empty))
check("human_干净人话达标", hs_clean >= 85, str(hs_clean))
check("human_机器腔低分", hs_sick < 60, str(hs_sick))
check("human_干净高于机器", hs_clean > hs_sick, "%d vs %d" % (hs_clean, hs_sick))

kill_src = "。".join(["他顿了顿", "她深吸一口气", "他喉结滚动", "她垂眸", "他指节泛白",
                     "她瞳孔一缩", "他嘴角勾起", "她抿了抿唇", "他心中暗想", "她冷哼一声",
                     "他一字一顿地说", "他忽然停下"])
kd, hd, dd = dupian.density_verdict(kill_src)
check("density_十处以上kill", bool(kd) is True, "%s %s %s" % (kd, hd, dd))
check("density_三元类型正确", isinstance(kd, bool) and isinstance(hd, int) and isinstance(dd, (int, float)), "%s %s %s" % (type(kd), type(hd), type(dd)))
filler = "夜色压在城墙上，风从垛口穿过，卷起细碎的尘沙，远处更鼓声沉闷地滚过街巷。"
n300 = (filler * 8)[:300] + "他顿了顿。她顿了顿。他又顿了顿。"
kd2, hd2, dd2 = dupian.density_verdict(n300)
check("density_少量命中不kill", bool(kd2) is False, "%s %s %s" % (kd2, hd2, dd2))

diag1 = dupian.diagnose("他走进屋子，看着来人，慢慢坐下。" * 20)
check("diagnose_匀速念稿", any("匀速" in str(d) for d in diag1), str(diag1))
pad_dash = ("夜色沉沉，风声穿过长街，灯火在纸上摇晃。他站在桥头，看水面上碎开的月光，远处更鼓声一下一下，敲得人心里发空。" * 4)[:300]
txt_dash = pad_dash + "他站住——回头——皱眉——张口——又闭上——转身——走开——停住。"
diag2 = dupian.diagnose(txt_dash)
check("diagnose_破折号成瘾", any("破折号" in str(d) for d in diag2), str(diag2))

frag = "青石桥头灯火阑珊"
prev = ["夜色里" + frag + "，他独自站了很久才离开。", "后来" + frag + "处，只剩下风声在回响。"]
cur = "他又回到" + frag + "的地方，站定不语。"
cr = dupian.cross_repeat(cur, prev)
check("cross_命中非对话重复", any(len(r[0]) >= 6 and r[0] in cur for r in cr), str(cr))
prev_d = ["他开口：「青石桥头相见。」", "她低声：「青石桥头相见。」"]
cur_d = "他点头说：「青石桥头相见。」"
cr2 = dupian.cross_repeat(cur_d, prev_d)
check("cross_对话不计入", len(cr2) == 0, str(cr2))

sb1 = dupian.speech_balance([("a", 30), ("b", 30), ("c", 30)])
check("balance_三人均分告警", sb1 is not None and "均分" in sb1, str(sb1))
sb2 = dupian.speech_balance([("a", 5), ("b", 60), ("c", 120)])
check("balance_差异大不告警", sb2 is None, str(sb2))
sb3 = dupian.speech_balance([("a", 30), ("b", 30)])
check("balance_两人不告警", sb3 is None, str(sb3))

check("cn2int_五千二百", dupian.cn2int("五千二百") == 5200)
check("cn2int_两万三", dupian.cn2int("两万三") == 23000)
check("cn2int_十五", dupian.cn2int("十五") == 15)
check("cn2int_三百零六", dupian.cn2int("三百零六") == 306)
check("cn2int_一万二千", dupian.cn2int("一万二千") == 12000)
check("cn2int_阿拉伯数字", dupian.cn2int("12") == 12)
check("cn2int_非法返回None", dupian.cn2int("abc") is None)

nf1 = dupian.num_facts("船夫转运五千二百领重铠")
check("num_facts_重铠", any(f.get("qty") == 5200 and f.get("unit") == "领" and "重铠" in str(f.get("noun", "")) for f in nf1), str(nf1))
nf2 = dupian.num_facts("仓中存粮一千二百石")
check("num_facts_存粮", any(f.get("qty") == 1200 and f.get("unit") == "石" and "存粮" in str(f.get("noun", "")) for f in nf2), str(nf2))
nf3 = dupian.num_facts("甲士八百人")
check("num_facts_甲士", any(f.get("qty") == 800 and f.get("unit") == "人" for f in nf3), str(nf3))
check("num_facts_两人不入账", dupian.num_facts("两人对视") == [])
check("num_facts_第三天不入账", dupian.num_facts("第三天") == [])
approx = dupian.num_facts("一两天")
check("num_facts_一两天不入账", approx == [], str(approx))
naked = dupian.num_facts("三万里路")
check("num_facts_三万里路不入账", naked == [], str(naked))

newf = dupian.num_facts("船夫转运五千二百领重铠")
ledf = dupian.num_facts("船夫转运三千领重铠")
cf1 = dupian.num_conflicts(newf, ledf)
check("num_conflicts_冲突", len(cf1) >= 1, str(cf1))
ledf_same = dupian.num_facts("船夫转运五千二百领重铠")
check("num_conflicts_同数不冲突", dupian.num_conflicts(newf, ledf_same) == [], str(dupian.num_conflicts(newf, ledf_same)))
ledf_unit = dupian.num_facts("船夫转运五千二百石重铠")
check("num_conflicts_异单位不冲突", dupian.num_conflicts(newf, ledf_unit) == [], str(dupian.num_conflicts(newf, ledf_unit)))

check("disputes_正例", bool(dupian.disputes("重铠的数目明明对不上。", noun="重铠")) is True)
check("disputes_反例", bool(dupian.disputes("重铠已经清点完毕，数目无误。", noun="重铠")) is False)

led_line = dupian.num_ledger_lines(dupian.num_facts("船夫转运五千二百领重铠"))
check("num_ledger_lines_含5200领", "5200领" in led_line, led_line)

done(min_pass=30)
