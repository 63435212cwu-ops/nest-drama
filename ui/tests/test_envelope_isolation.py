# -*- coding: utf-8 -*-
import os, sys, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *

import random
import re
from collections import Counter

m, root = load_engine()

SAMPLE = """# 第3轮 · 单元「甲」

## 青梧 回合

【目的】指向→白榆；逼出他昨夜去向
【行为】把灯往他脸上推了推。
【对话】「你昨夜去哪了？」
【心理】我读到他在躲。
【走神】早饭还没吃。

## 白榆 反应

【反应】退了半步。

## 【结构·四拍】

- 目的：青梧要逼出白榆去向
- 接棒：白榆——被问住了

## 审核审计（快档·不入正文）

- 一次过审

## 【纪要】

青梧举灯逼问，白榆退了半步没答。

## 引力检查

- 阶段：收束轮｜引力：顺｜目标：临门

## 三查与脊椎触达

- 脊椎触达：铁节点A
"""

# ---------- 1. 样本 public_cut ----------
pub = m._public_cut(SAMPLE)
check("public_cut 保留行为", "把灯往他脸上推了推" in pub)
check("public_cut 保留对话", "你昨夜去哪了" in pub)
check("public_cut 保留反应", "退了半步" in pub)
check("public_cut 保留纪要", "青梧举灯逼问" in pub)
check("public_cut 删除目的原文", "逼出他昨夜去向" not in pub)
check("public_cut 删除心理原文", "我读到他在躲" not in pub)
check("public_cut 删除走神原文", "早饭还没吃" not in pub)
check("public_cut 删除结构接棒", ("接棒" not in pub) and ("结构" not in pub))
check("public_cut 删除引力临门", "临门" not in pub)
check("public_cut 删除脊椎审核", ("脊椎" not in pub) and ("审核" not in pub))

# ---------- 2. 模糊测试 40 次 ----------
random.seed(20240914)
NAMES20 = ["青梧", "白榆", "柳七", "朱砂", "墨尘", "玉衡", "云舒", "子衿", "怀瑾", "折枝",
           "临风", "听雪", "望川", "孤鸿", "拾光", "若水", "远山", "微澜", "南枝", "半夏"]
GOD = [
    "## 【结构·四拍】\n\n- 目的：GOD-P\n- 接棒：GOD-B\n",
    "## 审核审计（快档·不入正文）\n\n- GOD-A\n",
    "## 引力检查\n\n- 阶段：收束轮｜目标：临门\n",
    "## 三查与脊椎触达\n\n- 脊椎触达：GOD-S\n",
]
PRIV_LABS = ["【目的】", "【心理】", "【走神】", "【闪念】", "【身体】"]
PUB_LABS = ["【行为】", "【对话】", "【反应】"]

for it in range(40):
    names = random.sample(NAMES20, random.randint(2, 4))
    parts = ["# 第%d轮 · 单元「模糊」\n" % (it + 1)]
    priv_local, pub_local = [], []
    for nm in names:
        parts.append("## %s 回合\n" % nm)
        for _ in range(random.randint(1, 5)):
            if random.random() < 0.5:
                lab = random.choice(PRIV_LABS)
                mk = "PRIV-%d-%d" % (it, len(priv_local))
                priv_local.append(mk)
            else:
                lab = random.choice(PUB_LABS)
                mk = "PUB-%d-%d" % (it, len(pub_local))
                pub_local.append(mk)
            parts.append("%s%s 一些内容。\n" % (lab, mk))
        parts.append("")
    gsel = random.sample(GOD, random.randint(1, 3))
    parts.append("\n".join(gsel))
    rec = "\n".join(parts)
    out = m._public_cut(rec)
    ok_priv = all(mk not in out for mk in priv_local)
    ok_pub = all(mk in out for mk in pub_local)
    detail = ""
    if not (ok_priv and ok_pub):
        detail = "泄漏=%s 丢失=%s" % ([k for k in priv_local if k in out],
                                     [k for k in pub_local if k not in out])
    check("模糊%d 无泄漏且保留公开" % (it + 1), ok_priv and ok_pub, detail)

# ---------- 3. 无上帝层 ----------
rec3 = "# 第1轮 · 单元「无神」\n\n## 甲 回合\n\n【目的】秘密目的A\n【行为】公开行为B\n【心理】秘密心理C\n"
out3 = m._public_cut(rec3)
check("无上帝层 删私密留公开",
      ("秘密目的A" not in out3) and ("秘密心理C" not in out3) and ("公开行为B" in out3))

# ---------- 4. _scene_ctx ----------
U_init = {"body": """# 单元剧本

## 卡司

- 青梧：驿丞
- 白榆：守夜人
- 暗线：幕后黑手

## 舞台

灯下长桌前，众人在座。

## 开场态

门外风声紧。
在场：青梧、白榆、柳七

## 单元目标

把守夜名单送到县令案头。

## 单元约束

- 必须：守夜名单被翻出
- 禁止：天降救兵

## 轮次预算 最多 6 轮

"""}
sc = m._scene_ctx(U_init)
check("scene 含舞台正文", "灯下长桌前" in sc)
check("scene 含开场态正文", "门外风声紧" in sc)
check("scene 含在场行", "在场：" in sc)
check("scene 无目标句", "送到县令案头" not in sc)
check("scene 无必须句", "守夜名单被翻出" not in sc)
check("scene 无禁止句", "天降救兵" not in sc)
check("scene 无最多预算", "最多" not in sc)
check("scene 无暗线", ("暗线" not in sc) and ("幕后黑手" not in sc))

U_cont = {"body": """## 卡司（本单元在场者）

- 青梧（驿丞）
- 白榆（守夜人）

## 前情提要（上一次的余波必须被接住）

上回青梧逼问白榆，白榆含糊其辞。

## 细纲

1. 青梧继续施压
2. 白榆松口

## 新增角色

- 柳七（过路客商）
"""}
sc2 = m._scene_ctx(U_cont)
check("scene续演 前情正文保留", "上回青梧逼问白榆" in sc2)
check("scene续演 细纲不出现", ("青梧继续施压" not in sc2) and ("白榆松口" not in sc2))
check("scene续演 新增角色不出现", "柳七" not in sc2)

U_raw = {"body": """这是一段散文。

目标：把名单送去。

这里有个必须完成的事。

其它正常的一句话。
"""}
sc3 = m._scene_ctx(U_raw)
check("scene未知 剔目标行", "把名单送去" not in sc3)
check("scene未知 剔必须行", "必须完成的事" not in sc3)
check("scene未知 保留其它行", ("其它正常的一句话" in sc3) and ("这是一段散文" in sc3))

sc4 = m._scene_ctx(U_init, limit=80)
check("scene limit=80 截断", len(sc4) <= 81, "len=%d" % len(sc4))

# ---------- 5. _psyche_ctx ----------
psy_short = "## 此刻\n\n我坐在这里。"
check("psyche 短文本原样", m._psyche_ctx(psy_short) == psy_short)

body = "山" * 1500
psy = (body + "\n\n## 此刻\n\n此刻内容ABC。\n\n## 打算\n\n打算内容XYZ。\n\n## 旧账\n\n"
       + "\n".join("- 旧账%02d" % i for i in range(1, 15)) + "\n")
pc = m._psyche_ctx(psy, 900)
check("psyche 含最后旧账", "旧账14" in pc)
check("psyche 含此刻正文", "此刻内容ABC" in pc)
check("psyche 含打算正文", "打算内容XYZ" in pc)
check("psyche 不含第1-6条旧账", all(("旧账%02d" % i) not in pc for i in range(1, 7)))
check("psyche 长度受限", len(pc) <= 960, "len=%d" % len(pc))
check("psyche 此刻先于旧账", (pc.find("此刻") >= 0) and (pc.find("此刻") < pc.find("旧账")))

# ---------- 6. _memory_ctx ----------
D = {"feed": [
    {"round": 1, "unit": "u", "present": ["甲", "乙"], "place": "官府", "summary": "S1"},
    {"round": 2, "unit": "u", "present": ["甲"], "place": "点击查看", "summary": "S2"},
    {"round": 3, "unit": "v", "present": ["甲"], "place": "客栈", "summary": "S3"},
]}
mc = m._memory_ctx(D, "甲", "u")
check("memory 同单元在场筛选", ("S1" in mc) and ("S2" in mc) and ("S3" not in mc))
check("memory place省略点击查看", "点击查看" not in mc)
check("memory 格式含地点", "R1·官府：S1" in mc)

D2 = {"feed": [{"round": i, "unit": "u", "present": ["甲"], "place": "", "summary": "M%02d" % i}
               for i in range(1, 11)]}
mc2 = m._memory_ctx(D2, "甲", "u")
check("memory 只取最后6条", ("R1：" not in mc2) and ("R4：" not in mc2)
      and ("R5：" in mc2) and ("R10：" in mc2))
check("memory 无匹配返回空", m._memory_ctx(D, "丙", "u") == "")

# ---------- 7. _field_guard ----------
lg = []
fg = m._field_guard("【行为】我想他在躲。把灯推过去。", lg, "青梧", 220)
beh = [l for l in fg.splitlines() if l.startswith("【行为】")]
mind = [l for l in fg.splitlines() if l.startswith("【心理】")]
check("guard 行为仅剩外显", bool(beh) and ("把灯推过去" in beh[0]) and ("我想" not in beh[0]))
check("guard 心理收内心句", any("我想他在躲" in l for l in mind))
check("guard 日志字段越界", any("字段越界" in x for x in lg))
lg2 = []
fg2 = m._field_guard("【行为】我心里盘算着。", lg2)
check("guard 全内心→行为无", ("【行为】无" in fg2) and ("我心里盘算着" in fg2))
src3 = "【行为】把灯推过去。"
check("guard 无内心原文不变", m._field_guard(src3) == src3)


def _norm(s):
    s = re.sub(r"【[^】]*】", "", s)
    return Counter(s.replace("\n", "").replace("\r", ""))


src_m = "【行为】我想他在躲。把灯推过去。\n【心理】我早就知道。"
out_m = m._field_guard(src_m, [], "甲", 220)
_ns, _no = _norm(src_m), _norm(out_m)
check("guard 信息字符不丢", all(_no[k] >= v for k, v in _ns.items()))

# ---------- 8. _turn_fields ----------
t1 = m._turn_fields("【目的】A\n【行为】B\n【对话】C\n【心理】D\n【生活】E")
check("fields 基础五字段", (t1["purpose"] == "A") and (t1["behavior"] == "B")
      and (t1["dialogue"] == "C") and (t1["mind"] == "D") and (t1["life"] == "E"))
check("fields 别名 要的→purpose", m._turn_fields("【要的】A2")["purpose"] == "A2")
check("fields 别名 说→dialogue", m._turn_fields("【说】C2")["dialogue"] == "C2")
check("fields 别名 心里→mind", m._turn_fields("【心里】D2")["mind"] == "D2")
check("fields 别名 私人牵挂→life", m._turn_fields("【私人牵挂】E2")["life"] == "E2")
check("fields 别名 走神→life", m._turn_fields("【走神】E3")["life"] == "E3")

# ---------- 9. _fuel_recipient ----------
names = ["甲", "乙", "丙", "白榆"]
check("fuel 送到丙耳边→丙",
      m._fuel_recipient("甲手里的账本恰好戳破乙瞒着的事，送到丙耳边", names) == "丙")
check("fuel 塞到白榆手里→白榆",
      m._fuel_recipient("守夜名单此刻被塞到白榆手里", names) == "白榆")
check("fuel 让乙看见→乙",
      m._fuel_recipient("有人让乙看见了那封信", names) == "乙")
check("fuel 空燃料→default", m._fuel_recipient("", names, "默认") == "默认")
check("fuel 无名单人名→default",
      m._fuel_recipient("一阵风吹过空荡的院子", names, "默认") == "默认")

# ---------- 10. 其它工具 ----------
check("verdict 毙→killed", m._monitor_verdict("毙：出戏了")[0] is True)
check("verdict 【过】→否", m._monitor_verdict("【过】") == (False, ""))
check("verdict 过。毙不了。→否", m._monitor_verdict("过。毙不了。") == (False, ""))
check("verdict 空串→否", m._monitor_verdict("") == (False, ""))

check("clip 短文本原样", m._clip_boundary("短文本。", 500) == "短文本。")
long1 = "字" * 400 + "。" + "字" * 200
b = m._clip_boundary(long1, 500)
check("clip 长文停在句号", b.endswith("。") and (len(b) <= 501), "len=%d" % len(b))
long2 = "字" * 600
c = m._clip_boundary(long2, 500)
check("clip 无句界加省略号", c.endswith("……") and (len(c) <= 501), "len=%d" % len(c))

check("split 清洗与去重", m._split_names("甲、乙；无、（无）、待补") == ["甲", "乙"])

sec_src = "## 卡司\n\n- 甲\n- 乙\n\n## 舞台\n\n灯下。\n"
check("section_body 卡司", ("甲" in m._section_body(sec_src, "卡司"))
      and ("灯下" not in m._section_body(sec_src, "卡司")))
check("section_body 缺节空", m._section_body(sec_src, "终局") == "")

check("DEAD 正 已死", bool(m._DEAD_PAT.search("他已死")))
check("DEAD 正 被收押", bool(m._DEAD_PAT.search("被收押")))
check("DEAD 正 死者", bool(m._DEAD_PAT.search("死者")))
check("DEAD 反 负责收押的狱卒", not m._DEAD_PAT.search("负责收押的狱卒"))
check("DEAD 反 验尸的法医", not m._DEAD_PAT.search("验尸的法医"))

done(min_pass=32)
