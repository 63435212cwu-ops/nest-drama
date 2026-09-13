# -*- coding: utf-8 -*-
import os, sys, json, time, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *
ST = {"p1": False, "p2": False, "n": 0}
VOICE = "语体：短句为主，声气压低，句尾常带一声叹。遇事先问'当真？'，再慢慢答。"
CORE = ("身份：%s，北境驿站当差，夹在风雪与公文之间讨生活。性格底盘：谨慎多疑，开口前先掂量三分。"
        "欲望：平安度过雪夜，别让旧账再翻上来。恐惧：账本被当众翻出，怕被查账查到底。真缺点：心软，见不得熟人落难。"
        "底线：不害无辜，不为自保出卖同僚。谎言习惯：用沉默代替回答，凡事留一线。待人：对%s有旧怨，说话带刺却留三分余地。")
UNIT = {"name": "夜巡", "cast": ["青梧", "白榆"], "dark": ["柳七"], "stage": "三更站厅", "open": "名单不见了。",
        "goal": "名单落到县令案头", "must": ["名单被翻出"], "forbid": ["杀人"], "budget": 60}


def J(o):
    return json.dumps(o, ensure_ascii=False)


def fake(messages, cfg=None, max_tokens=2000, temperature=0.9, timeout=None, retries=2, stream=True, think=True):
    s = sys_of(messages); u = user_of(messages)
    if s.startswith("你是材料摄取模块"):
        ST["n"] += 1
        return ("纲要：青梧 驿丞；白榆 守夜人；柳七 客商。", None)
    if s.startswith("你是建世界模块·第一阶段"):
        if ST["p1"]:
            return ("不是JSON", None)
        return (J({"title": "雪夜驿站",
                   "world": "北境驿站立在两山风口，雪夜里只剩一盏孤灯，照着未化的旧账与未归的人。" * 2,
                   "spine": {"iron": ["名单落到县令案头"], "soft": ["旧债被提起"], "forbid": ["真凶露面"]},
                   "truth": "名单是白榆改的。"}), None)
    if s.startswith("你是建世界模块·第二阶段A"):
        if ST["p2"]:
            return (J({"cast": []}), None)
        return (J({"cast": [{"name": "青梧", "role": "驿丞"}, {"name": "白榆", "role": "守夜人"}, {"name": "柳七", "role": "过路客商"}]}), None)
    if s.startswith("你是建世界模块·第二阶段B"):
        mm = re.search(r"【人物】([^（\n]+)（([^）\n]+)）", u)
        nm = mm.group(1) if mm else ""; rl = mm.group(2) if mm else ""
        if nm == "柳七":
            return (J({"name": "柳七", "role": rl or "过路客商", "core": "身份：客商。", "voice": "语体：短句。",
                       "psyche": "他知道的世界：路。他此刻：歇脚。他的打算：赶路。", "secrets": "", "habits": "", "desire": "",
                       "traits": {"iq": "3", "eq": "3", "survival": "3", "startle": "3", "scheme": "3", "why": ""}}), None)
        ot = "白榆" if nm == "青梧" else "青梧"
        return (J({"name": nm, "role": rl, "core": CORE % (rl, ot), "voice": VOICE,
                   "psyche": "他知道的世界：驿站是北境咽喉，公文与人心一样薄。他此刻：守着三更的灯，眼皮发沉却不敢合。他的打算：先找名单再说。",
                   "secrets": "三年前白榆替他顶过一桩罚。", "habits": "摸口袋里的钢笔", "desire": "想约人吃饭",
                   "traits": {"iq": "4", "eq": "材料未详述", "survival": "10", "startle": "2", "scheme": "3", "why": "老驿丞"}}), None)
    if s.startswith("你是建世界模块·第三阶段"):
        return (J({"units": [UNIT]}), None)
    if s.startswith("你是建世界模块·第四阶段"):
        return (J({"lore": [{"name": "守夜规矩", "triggers": ["守夜", "灯"], "constant": True, "excerpt": "三更换岗。"}]}), None)
    return ("一句话。", None)

def main():
    m, root = load_engine(); set_llm(m, fake)
    P = lambda p: os.path.join(root, p)
    os.makedirs(P("材料"), exist_ok=True)
    open(P("材料/设定.txt"), "w", encoding="utf-8").write("北境驿站……青梧是驿丞，白榆是守夜人，两人有旧怨。柳七是过路客商。" * 3)
    open(P("材料/青梧.txt"), "w", encoding="utf-8").write("青梧档案：谨慎，怕被查账，欠白榆一条命。" * 5)
    open(P("材料/旧局残留.txt"), "w", encoding="utf-8").write("这是上一局的材料，不该被摄取。")
    PD = {"title": "测试局", "requirement": "两人夜巡", "files": ["材料/设定.txt", "材料/青梧.txt"],
          "at": "2026-09-14 00:00:00", "at_ts": time.time()}
    json.dump(PD, open(m.PENDING_PATH, "w", encoding="utf-8"), ensure_ascii=False)
    RAW = "北境驿站雪夜，青梧驿丞、白榆守夜人，两人有旧怨，柳七客商。守夜名单落到县令案头。"
    lb = []
    ok, title = m._auto_init(RAW, "测试局", "两人夜巡", log_to(lb), confirm=True)
    check("构建成功", ok is True and title == "雪夜驿站")
    W = m._read("00-世界观.md")
    check("世界观", "北境" in W and "孤灯" in W)
    S = m._read("01-剧情脊椎.md")
    check("脊椎完整", all(x in S for x in ("铁节点", "名单落到县令案头", "禁区", "真凶露面", "作者补充", "两人夜巡")))
    check("真相底稿", "白榆" in m._read("真相底稿.md"))
    C = m._read("角色/青梧.md")
    check("内核卡", all(x in C for x in ("# 青梧 · 内核卡", "**习惯**", "**私欲**", "**秘密**", "【你的秉性】")))
    check("特征", all(re.search(r"^%s:\s*%s\s*$" % (k, v), C, re.M) for k, v in (("iq", 4), ("survival", 5), ("eq", 3), ("scheme", 3))))
    check("声纹落盘", len(m._read("角色/青梧·声纹.md")) > 0)
    X = m._read("角色/青梧·心象.md")
    check("心象落盘", all(x in X for x in ("emo: 惧", "tier: 安", "updated: 第0轮")))
    D = m._load_data(); meta = D.get("meta", {}); cast = D.get("cast", [])
    check("meta 基本", isinstance(D, dict) and meta.get("built") is True and meta.get("title") == "雪夜驿站")
    check("cast 3 人", len(cast) == 3)
    by = {c.get("name"): c for c in cast}; qw = by.get("青梧", {})
    check("青梧 traits", qw.get("traits") == {"iq": 4, "eq": 3, "survival": 5, "startle": 2, "scheme": 3})
    check("青梧 identity", bool((qw.get("profile") or {}).get("identity")))
    check("柳七 thin", by.get("柳七", {}).get("thin") is True)
    allog = "".join(lb)
    check("日志质量闸", "未过质量闸" in allog and "柳七" in allog)
    sp = D.get("spine")
    spn = sum(len(v) for v in sp.values() if isinstance(v, list)) if isinstance(sp, dict) else len(sp or [])
    check("spine 3 条", spn == 3)
    lore = D.get("lore", [])
    check("lore 1 条", len(lore) == 1 and lore[0].get("constant") is True)
    G = D.get("graph", {}); nodes = G.get("nodes", []); eds = G.get("edges", [])
    check("图节点4个", len(nodes) == 4)
    names = {c.get("name") for c in cast}
    has = lambda s, t, k: any(e.get("source") == s and e.get("target") == t and e.get("kind") == k for e in eds)
    check("出场边", has("青梧", "夜巡", "出场") and has("白榆", "夜巡", "出场") and not has("柳七", "夜巡", "出场"))
    rels = [e for e in eds if e.get("kind") == "关系"]
    check("关系边", len(rels) >= 1 and all(e.get("source") in names and e.get("target") in names for e in rels) and "图谱关系" in allog)
    units = D.get("units", [])
    check("unit 1 个", len(units) == 1)
    u = units[0] if units else {}
    mm = re.match(r"^(\d+)-(\d+)$", str(u.get("est", "")))
    lo, hi = (int(mm.group(1)), int(mm.group(2))) if mm else (-1, -1)
    check("est 形如 lo-hi", mm is not None)
    check("预算钳制", u.get("budget") == hi and not (lo <= 60 <= hi))
    call = m._estimate_unit_rounds(UNIT, len(cast))
    check("_estimate", isinstance(call, tuple) and len(call) == 3 and call[0] == lo and call[1] == hi and not (call[0] <= 60 <= call[1]))
    check("预算元数据", (meta.get("config") or {}).get("plannedRounds") == u.get("budget") and meta.get("unitRound") == "0/%d" % (u.get("budget") or 0))
    check("forecast.total", re.match(r"^\d+-\d+$", str(D.get("forecast", {}).get("total", ""))) is not None)
    script = m._read("剧本/01-夜巡.md")
    check("剧本卡司", "在场：青梧、白榆" in script and "暗线：柳七" in script)
    check("剧本约束", "- 必须：名单被翻出" in script and "- 禁止：杀人" in script)
    sm = re.search(r"最多\s*(\d+)\s*轮", script)
    check("轮次钳制", sm is not None and int(sm.group(1)) == hi and hi != 60)
    check("世界书", len(m._read("02-世界书/守夜规矩.md")) > 0 and len(m._read("03-推演配置.md")) > 0)
    check("纪事第0段", "第0段" in m._read("纪事.md"))
    gl = m._read("材料/_纲要.md")
    check("纲要缓存", len(gl) > 0 and "上一局的材料" not in gl and len(m._read("材料/_摄取缓存.json")) > 0)
    check("白名单", "只摄取本次投放" in allog and ST["n"] == 2)
    check("pending 已清", m._pending() is None)
    check("当前世界", (m._archives_store() or {}).get("current") == "雪夜驿站")

    PD["at"] = "2026-09-14 00:10:00"; PD["at_ts"] = time.time()
    json.dump(PD, open(m.PENDING_PATH, "w", encoding="utf-8"), ensure_ascii=False)
    check("二次构建", m._auto_init(RAW, "测试局", "两人夜巡", log_to([]), confirm=True)[0] is True)
    arc = P("归档")
    gs = [d for d in os.listdir(arc) if "群像局" in d] if os.path.isdir(arc) else []
    check("归档群像局", len(gs) == 1)
    gd = os.path.join(arc, gs[0]) if gs else ""
    check("归档内容", bool(gd) and os.path.exists(os.path.join(gd, "角色", "青梧.md")) and os.path.exists(os.path.join(gd, "metadata.json")))
    check("归档数1", len((m._archives_store() or {}).get("archives", [])) == 1)
    check("缓存命中", ST["n"] == 2)

    r = m._cast_gate({"core": "", "role": "驿丞", "voice": VOICE}, "驿丞", [])
    check("空壳卡", r[0] is False and "空壳卡" in r[1])
    r = m._cast_gate({"core": CORE % ("驿丞", "白榆"), "role": "第一主角", "voice": VOICE}, "驿丞", ["白榆"])
    check("串位", r[0] is False and "串位" in r[1])
    r = m._cast_gate({"core": CORE % ("驿丞", "白榆"), "role": "驿丞", "voice": VOICE}, "驿丞", ["白榆"])
    check("正常卡", r[0] is True and r[1] == "")
    check("_trait_int", [m._trait_int(a, 1, 5, 3) for a in ("10", "材", None, "4")] == [5, 3, 3, 4])
    st = m._strip_placeholder("材料未详述，留白。他谨慎。")
    check("去占位符", "未详述" not in st and "留白" not in st)

    D = m._load_data(); D.setdefault("meta", {})["round"] = 3; m._save_data(D)
    g = m._auto_init(RAW, "测试局", "两人夜巡", log_to([]), confirm=False)
    check("守卫拒绝", g[0] is False and "拒绝" in g[1])
    g = m._auto_init(RAW, "测试局", "两人夜巡", log_to([]), confirm=True)
    check("confirm 不拦", not (g[0] is False and "拒绝" in g[1]))

    ST["p1"] = True
    f = m._auto_init(RAW, "测试局", "两人夜巡", log_to([]), confirm=True)
    check("世界层失败", f[0] is False and "世界层解析失败" in f[1])
    f2 = m._init_and_run(RAW, "t", "", False, log_to([]), confirm=True)
    check("_init_and_run 失败", f2[0] is False and "建世界失败" in f2[1])
    bf = m._build_fail_load()
    check("失败留痕", isinstance(bf, dict) and "世界层" in str(bf.get("reason", "")))
    m._build_fail_clear(); ST["p1"] = False

    ST["p2"] = True
    f = m._auto_init(RAW, "测试局", "两人夜巡", log_to([]), confirm=True)
    check("空卡司", f[0] is False and "未能从材料中提取角色" in f[1])
    ST["p2"] = False

    if os.path.exists(m.PENDING_PATH):
        os.remove(m.PENDING_PATH)
    D = m._load_data()
    if isinstance(D, dict) and isinstance(D.get("meta"), dict):
        D["meta"]["round"] = 0; m._save_data(D)
    g = m._auto_init("短", "", "", log_to([]), confirm=False)
    check("无材料被拒", g[0] is False and "没有可用的建世界材料" in g[1])
    done(min_pass=40)


main()
