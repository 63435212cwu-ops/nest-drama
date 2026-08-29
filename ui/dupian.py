# -*- coding: utf-8 -*-
# NEST-DRAMA 毒编机检 · Copyright (C) 2026 63435212cwu-ops
# SPDX-License-Identifier: AGPL-3.0-only（全文见随包 LICENSE）
"""毒编机检 v3 —— 零 token 反 AI 层（语言层前置执法）。

设计要点（为什么这样做，不这样做会怎样）：
1. **本地能修的绝不发给模型**。原流水线一命中病灶就整篇重推，用 ~2000 输出 token 换掉一个
   「顿了顿」——既贵又赌运气（temp 0.95 重掷可能换来新病灶）。这里先做确定性删改：
   删副词、删转嫁动作从句，信息量一字不减，成本为零。
2. **黑名单换成"相对人类基线的超额率"**。大规模真人小说语料的统计证明
   似乎/仿佛/缓缓 这些词在真人小说里本来就有（2.41/1.58/1.07 次每万字）——一刀切全禁，
   模型只会换皮（禁"顿住"就发明"手是稳的"）。这里按 3 倍人类基线设配额：允许它像人一样偶尔用，
   超额部分删掉。
3. **可证伪优先**。每条规则带 `ev` 证据字段（语料/论文/用户裁定/待证）。与实测冲突的教条一律不进库
   （见 §微动作倒挂：真人情绪词是微动作的 150 倍，"用动作代替情绪词"本身就是 AI 腔）。

基线来源：真人小说语料的程序化统计（统计数据非模型现写）。
"""
import re

# ── 人类基线（真语料实测，勿凭感觉改）────────────────────────────────────────
HUMAN = {
    "句长均值": 29.3,       # 字
    "句长标准差": 20.9,
    "句长CV": 0.71,        # 变异系数——人的呼吸不匀，机器的匀
    "短句率": 0.121,        # ≤10 字句占比
    "二十字内": 0.373,
    "对话占比": 0.208,
    "情绪词率": 5.27,       # ‰（喜怒哀惧爱恶欲及其词族）
    "微动作率": 0.035,      # ‰（大样本真人语料实测 0.02–0.05）
    "样本": "大规模真人小说语料（分层抽样）",
}
# 单词级：每万字出现次数（真人语料）。配额 = 3 × 基线 × 文本长度，且至少给 1 次。
AI_WORD_RATE = {
    "似乎": 2.409, "仿佛": 1.576, "缓缓": 1.073, "指尖": 0.522,
    "不禁": 0.474, "微微一": 0.382, "轻轻一": 0.134, "余温": 0.017,
}

DEL, DELC, SUB, ARG, WATCH = "删", "删句", "换", "议", "观"
# 删=只删命中词（副词类，删完句子仍通）；删句=命中词占满整个小句，需连小句一起删（否则留下
# "他，地攥着…"这种断肢）；换=确定性替换；议=改动会伤语义，交定点补丁，机检不擅自代笔。

# ── 病谱 v3 ────────────────────────────────────────────────────────────────
# (病灶名, 正则, 处置, 替换文本或None, 证据)
RULES = [
    # 一、旁白摄像机自报（写即破功：活人不知道自己"下意识"）
    ("旁白自报·无意识", r"(不由自主地?|下意识地?|不自觉地?|无意识地?|鬼使神差地?|莫名地?)", DEL, None, "用户裁定"),
    ("旁白自报·自察念头", r"(他|她|我)(才)?(意识到自己|发现自己正|察觉自己在)(在)?想", ARG, None, "用户裁定"),

    # 二、按钮式微反应（换皮重灾区：整族拦截，不逐词打地鼠）
    ("按钮·顿口", r"(微微)?顿了顿|顿了一下|(略|稍)一停顿|停顿了一下", DELC, None, "指纹库"),
    ("按钮·深呼吸", r"深(深地)?吸(了)?一口气|深呼吸了?一(下|口)|吐出一口(浊)?气", DELC, None, "指纹库"),
    ("按钮·喉结呼吸心跳", r"喉结[^，。；！？\n]{0,6}(滚动|滑动|上下|动了动)|"
                          r"(呼吸|气息)[^，。；！？\n]{0,4}(一滞|一窒|屏住|放轻|乱了|急促起来)|"
                          r"心(跳|脏)[^，。；！？\n]{0,8}(漏了一拍|停了一拍|骤然加快|狂跳)", DELC, None, "指纹库·同族一致"),
    ("按钮·眸", r"垂眸|抬眸|敛眸|眸(光|色)[^，。；！？\n]{0,4}(一沉|微暗|骤冷)|睫毛[^，。；！？\n]{0,4}(颤|抖|垂)", DELC, None, "指纹库·同族一致"),
    ("按钮·指节泛白", r"指节[^，。；！？\n]{0,4}泛白|手背青筋", DELC, None, "指纹库"),
    ("按钮·瞳孔", r"瞳孔[^，。；！？\n]{0,4}(一缩|骤缩|微缩|放大)|眼(中|底)[^，。；！？\n]{0,4}(闪过|掠过|浮现)", DELC, None, "指纹库·同族一致"),
    ("按钮·嘴角", r"嘴角[^，。；！？\n]{0,4}(勾起|扬起|抽动|一扯|微不可察)|抿了抿(唇|嘴)|唇角", DELC, None, "指纹库·同族一致"),

    # 三、身体语言转嫁（手替嘴演戏——AI 用小动作代替说话与行动）
    ("转嫁·摩挲", r"(指甲|指尖|拇指|指节|掌心)[^，。；！？\n]{0,10}"
                  r"(擦过|蹭了蹭|摩挲|摩擦|揉搓|划过|叩了叩|轻叩|叩击|敲了敲|敲击|捻了捻|收紧|蜷)", ARG, None, "用户裁定"),
    ("转嫁·衣物", r"(裤缝|袖口|衣角|领口|袖子)[^，。；！？\n]{0,8}(蹭|擦了擦|攥|捏|抚|捋|揪)|"
                  r"(攥|捏|揪|捋|抚)(着|了)?(裤缝|袖口|衣角|领口)", ARG, None, "用户裁定"),

    # 四、质感标签批发 / 账目思维（进屋就盘点，物品统一发工牌）
    ("质感·新旧并置", r"新旧并置|过于(整齐|干净|陈旧|清晰|新)|太(新|旧|稳|破|干净)了?|"
                      r"锈(色|迹)斑斑|簇新|锃亮|斑驳|剥落[，,]露出", ARG, None, "指纹库"),
    ("质感·字迹注意力", r"(更小|更大|更深|更浅|更细|颜色更深|力道更重)的(字体|字迹|字号|颜色|笔画)", ARG, None, "用户裁定"),

    # 五、句式模板
    ("模板句式", r"眼中闪过|命运的齿轮|空气[^，。；！？\n]{0,6}(凝固|安静|仿佛)|"
                 r"心中一(凛|紧|沉|颤)|(一股|一阵)[^，。；！？\n]{0,6}涌上心头|"
                 r"仿佛在诉说着|不知为何|不知怎的|这一刻[^，。；！？\n]{0,4}(他|她|我)(明白|懂|知道)了|"
                 r"然而(他|她|我)不知道的是|没有人(知道|注意到)|时间(仿佛)?(静止|凝固)", ARG, None, "指纹库"),
    ("悖论修辞", r"(?<=[^，。；！？\n])得(过分|可怕|反常|不像话|惊人|出奇)(了)?", DEL, None, "指纹库·删后缀信息不减"),
    # 旧版只认五个动词前缀，「这不是结束，是开始」「从来不是」全漏——AI 最高频判断句之一
    ("不是A是B", r"[^，。；！？\n]{1,8}(从来|并|可|但)?不是[^，。；！？\n]{1,12}[，,](而)?是[^。；！？\n]{1,12}", ARG, None, "指纹库"),
    ("对仗收束", r"(?<=[，。；！？\n】])[^，。；！？\n]{2,12}是[^，。；！？\n]{1,6}的[，,]"
                 r"[^，。；！？\n]{2,12}(是|却是|可)[^，。；！？\n]{1,6}的[。！？]", ARG, None, "半页毙"),
    ("量词·一丝一抹", r"(一丝|一抹|一缕|些许|几分)(?=[^，。；！？\n]{0,3}"
                      r"(疲惫|不安|寒意|凉意|暖意|笑意|嘲讽|狠|光|复杂|异样|慌|怒|喜))", DEL, None, "指纹库"),
    ("旁白代言·声音里带着", r"(声音|眼(中|里|底)|语气|脸上)(里)?(带|透|藏)着", ARG, None, "指纹库"),
    ("说教升华", r"也许这就是|这正是[^，。；！？\n]{0,10}的意义|命运(的)?(安排|玩笑)|"
                 r"(他|她)终于(明白|懂得|释然)|这个(世界|道理)告诉(他|她|我们)", ARG, None, "指纹库"),

    # 六、结构层（vale-ai-tells 映射：技术文体的结构指纹在中文叙事同样成立）
    ("结构·分词补充小句", r"[，,][^，。；！？\n]{0,8}(仿佛|像是|似乎)在(诉说|提醒|宣告|昭示)[^。；！？\n]{0,12}[。！？]|"
                          r"[，,](凸显|印证|昭示|预示|映衬)(了|着)[^。；！？\n]{1,16}[。！？]", ARG, None,
     "PNAS：分词补充句为第一判别特征，AI 为人类 527%"),
    ("结构·预告计数", r"(有|是)?[一二三四五六七八九十两](件事|个原因|点理由|种可能|条线索|个问题)"
                      r"[^。；！？\n]{0,6}[:：]", ARG, None, "vale:CataphoricForecasting"),
    ("结构·冒号标签", r"(结论|问题|答案|关键|真相|代价)[:：][^\n]{6,}", ARG, None, "vale:LabelAndExplain"),
    ("结构·排比短句", r"([^，。；！？\n]{2,6}[。！])\s*([^，。；！？\n]{2,6}[。！])\s*([^，。；！？\n]{2,6}[。！])", ARG, None, "vale:ParallelStaccato"),
    ("结构·无端转折", r"有什么(东西)?(不一样|变了|断了)了?[。，]|一切都(变|不同)了", ARG, None, "vale:NarrativePivots"),
    ("结构·空承认", r"(说出来|问了|想到了)[^，。；！？\n]{0,8}[，,](却)?(没有|不)(说破|追问|回答|解释)", ARG, None, "vale:HollowAcknowledgment"),
    ("结构·自然涌现", r"(自然而然地?|顺理成章地?|水到渠成地?)", DEL, None, "vale:OrganicConsequence"),

    # 七、弱词与评价语通胀（删掉句子仍立 → 全删）
    ("弱词·强度副词", r"(非常|极其|极为|异常|出奇|无比|十分(?!钟)|格外|深深)(地)?", DEL, None, "指纹库"),
    # 文档列了突然/忽然，正则漏了这两个使用频率最高的（旧注释称"配额制"也是错的——实为无条件删）
    ("弱词·突然族", r"(突然|忽然|猛地|顿时|霎时|刹那间|瞬间|骤然)", DEL, None, "指纹库·anti-ai #19"),
    ("评价语通胀", r"细思极恐|不寒而栗|令人窒息|恐怖如斯|压迫感十足|不容置疑", ARG, None, "指纹库"),

    # 八、全知群像（反应必须挂具名的人）
    ("全知群像", r"(所有人都|众人(都)?|每个人都)[^。；！？\n]{0,10}(倒吸|愣住|沉默|看向|屏住)|空气(仿佛)?凝固", ARG, None, "指纹库"),

    # 九、七情记账词直写（引擎用语泄漏进正文）
    ("记账词泄漏", r"(主导情绪|情绪档|强度[:：]|安档|紧档|危档|崩档|七情|引力值)", DEL, None, "架构纪律"),

    # 十一、v3 补遗（病谱列入但未下沉机检的族——第一梯队，纯黑名单零误报）
    ("礼貌残留·助手腔", r"(希望这(能|可以)帮到|需要我(继续|帮忙|再)|让(我们|我)来看看"
                        r"|如果您(需要|还有|想)|请问还有什么|我很乐意为您|(请|随时)让我知道|让我知道(就好|即可))",
     DELC, None, "用户裁定·anti-ai #39 人格失守信号弹"),
    ("心理烂大街", r"(心中暗想|心里咯噔|五味杂陈|恍然大悟|心下了然|百感交集|思绪万千"
                   r"|暗自(思忖|盘算|嘀咕|下定决心))", DELC, None, "指纹库·anti-ai #7"),
    ("过渡万能词", r"(与此同时|话音刚落|不知过了多久|一时之间|转瞬之间|就在这时|正在这时)",
     DEL, None, "指纹库·anti-ai #8"),
    ("脸谱化反应", r"(冷哼一声|倒吸一口凉气|眼中闪过一丝精光|你给我等着|对不起我来晚了"
                   r"|众人哗然|全场震惊|哈哈哈+惊|卧槽牛逼)", DELC, None, "指纹库·anti-ai #13"),
    # M20 降观察级：习惯机制上线后，「端起杯子抿一口」可能是某人内核卡里的专属习惯（跨轮稳定复现），
    # 机检分不出习惯与套话（判据=专属+稳定），删句会误杀——只告警，交监修按内核卡判
    ("动作套话", r"(端起(水杯|茶杯|杯子)[^。；！？\n]{0,4}(抿|喝)了一口"
                 r"|推门(走了?|而)(进|入|出)|转身(离开|走了出去)|缓缓(转身|开口|抬手|站起))",
     WATCH, None, "指纹库·anti-ai #6·习惯豁免"),
    ("数字化注意力", r"[一二三四五六七八九十两\d]{1,3}\s*小时\s*[零一二三四五六七八九十\d]{1,3}\s*分钟"
                     r"|[一二三四五六七八九十两\d]{1,2}\s*点\s*[零一二三四五六七八九十\d]{1,2}\s*分(?!钟|布)",
     ARG, None, "用户裁定·数字只许活在文书里"),

    # 十、观察层（待证：只告警不执法——首轮实测观察到的引擎级倾向，攒证据后再升级）
    ("观察·声音调制", r"(声音|嗓音)(压得|放得|沉得)(很平|很低|很轻)", WATCH, None, "待证·实测高频"),
    ("观察·目光锁定", r"目光(锁死|钉在|钉住|锁定)", WATCH, None, "待证·实测高频"),
    ("观察·一字一顿", r"一个字一个字地", WATCH, None, "待证"),
    ("观察·收网隐喻", r"(旧债|旧账)[^，。；\n]{0,6}(在)?收网|网(正在)?收紧", WATCH, None, "待证·实测复现"),
]
RULES = [(n, re.compile(p), t, r, e) for n, p, t, r, e in RULES]

# 配额族：本地按 3× 人类基线放行，超额删除（词族名 → (正则, 每万字基线)）
QUOTA = [
    ("似乎仿佛", re.compile(r"似乎|仿佛|好像"), 2.409 + 1.576),
    ("缓缓轻轻微微", re.compile(r"缓缓|轻轻(一)?|微微(一)?|慢慢地"), 1.073 + 0.382 + 0.134),
    ("不禁", re.compile(r"不禁|忍不住"), 0.474),
    ("指尖", re.compile(r"指尖"), 0.522),
]

# 微动作族（用于"微动作倒挂"检测——不逐条杀，只看它有没有压过情绪词）
MICRO = re.compile(r"顿了顿|抿了抿|指节|喉结|睫毛|垂眸|抬眸|瞳孔|嘴角[^，。]{0,3}(勾|扬|抽)|"
                   r"眉(头|心)[^，。]{0,3}(蹙|皱|挑)|深吸一口气|攥紧|蜷|摩挲")
# 情绪词计数（微动作倒挂检测的分子）。裸单字 气/爱/烦/笑/急 误命中极普遍
# （空气/天气/喘口气/可爱/麻烦/笑话/急事全中），把情绪词计数灌水后
# 「微动作 > 情绪词」的倒挂告警会被稀释——28 项黑盒测试驱动的护栏版。
# 注意：裸 急/烦 必须从尾段移除，否则 Python 分支从左到右回退会绕过护栏。
EMO = re.compile(
    r"怕|惧|恐慌|害怕|恐惧|心慌|发慌|"
    r"(?<!空|天|喘|口|勇|力|炉|煤|燃|丧|泄|脾|霉|潮|香|臭|腥)"
    r"气(?!温|体|候|息|味|泡|水|车|油|球|氛|度|压|喘|短|粗|壮|概|派|场|势|韵|色|象|筒|阀|泵)|"
    r"愤怒|恼怒|怒火|发怒|怒(?!放|涛|吼|号)|"
    r"(?<!可|恋|亲|友|恩|珍|宠|溺|偏)爱(?!情|好|戴|护|惜|国|河|巢|屋|人|抚|称)|"
    r"(?<!麻|耐|腻)烦(?!琐|人|忙|冗)|"
    r"(?<!可|嘲|讥|取|见|说|谈|玩|嬉|逗|欢)笑(?!话|容|柄|纳|眯|嘻|哈|盈|逐|靥|谈|声|意)|"
    r"急(?!救|诊|性|促|于|件|电|流|行|速|事|需|用|先|锋|转|弯|智|中|就)|"
    r"恨|哀|悲|痛苦|痛哭|哭|惊|悔|羞|妒|怜|怨|愧|厌(?!氧)|恶心|委屈|"
    r"难受|不安|紧张|绝望|松了口气|心疼|心碎|心寒|心酸|堵得慌|喘不上气")
SENT_SPLIT = re.compile(r"[。！？…\n]+")
DIALOG = re.compile(r"[「“\"][^」”\"]{1,200}[」”\"]")


def _clean(t):
    """删除后的标点收拾：不留双逗号、空句、句首逗号。"""
    t = re.sub(r"[，,]{2,}", "，", t)
    t = re.sub(r"[，,]\s*([。！？；])", r"\1", t)
    t = re.sub(r"([。！？；])\s*[，,]", r"\1", t)
    t = re.sub(r"(【[行为对话心理反应]{2}】)\s*[，,]+", r"\1", t)
    t = re.sub(r"」\s*[他她我]们?\s*[，,]?\s*「", "」「", t)   # 引号间孤悬主语（"」他顿了顿，「"删剩"」他「"）
    t = re.sub(r"[ \t]{2,}", " ", t)
    return t


def scan(text, quota_check=True):
    """扫描病灶。返回 [(病灶名, 处置, 命中原文, 所在句)]。"""
    hits = []
    for name, pat, tier, repl, ev in RULES:
        for m in pat.finditer(text):
            hits.append((name, tier, m.group(0), _sent_of(text, m.start())))
    if quota_check:
        n = max(len(text), 1)
        for fam, pat, base in QUOTA:
            allow = max(1, int(round(3.0 * base * n / 10000)))
            ms = list(pat.finditer(text))
            for m in ms[allow:]:
                hits.append(("超额·%s（配额%d）" % (fam, allow), DEL, m.group(0), _sent_of(text, m.start())))
    seen, out = set(), []
    for h in hits:
        k = (h[0], h[2], h[3])
        if k not in seen:
            seen.add(k)
            out.append(h)
    return out


def _sent_of(text, i):
    lo = max(text.rfind("。", 0, i), text.rfind("\n", 0, i), text.rfind("！", 0, i), text.rfind("？", 0, i)) + 1
    hi = min([x for x in (text.find("。", i), text.find("\n", i), text.find("！", i), text.find("？", i)) if x >= 0] or [len(text)])
    return text[lo:hi + 1].strip()[:90]


DELIM = "，,。；！？、\n】：:「」“”…"
FUNC = set("他她它我你们的地得了着并又就也还很再把被从对在与和是之其此那这个只都才却也")


def _clause_span(text, s, e):
    """命中词所在小句的边界（含前后分隔符判定）。"""
    lo = 0
    for c in DELIM:
        j = text.rfind(c, 0, s)
        if j + 1 > lo:
            lo = j + 1
    hi = len(text)
    for c in DELIM:
        j = text.find(c, e)
        if j >= 0 and j < hi:
            hi = j
    return lo, hi


def _spans(text):
    """算出所有确定性删除区间（DEL 只删词，DELC 视残留决定是否连小句一起删）。"""
    spans, log = [], []
    for name, pat, tier, repl, ev in RULES:
        if tier not in (DEL, DELC):
            continue
        k = 0
        for m in pat.finditer(text):
            s, e = m.span()
            if tier == DELC:
                lo, hi = _clause_span(text, s, e)
                rest = (text[lo:s] + text[e:hi]).strip()
                if not rest or all(ch in FUNC for ch in rest):   # 小句只剩虚词=整句是病灶
                    if re.fullmatch(r"[他她我你它]们?", rest):    # 只剩主语：留主语，让它接下一句
                        e = hi + 1 if hi < len(text) and text[hi] in "，,、" else hi
                    else:
                        s = lo
                        e = hi + 1 if hi < len(text) and text[hi] in "，,、" else hi
            spans.append((s, e))
            k += 1
        if k:
            log.append("%s×%d" % (name, k))
    return spans, log


def _quota_spans(text, protect):
    """配额超额区间。protect=需议病灶区间列表——不在别人的病句里抽词，免得抽成断句。"""
    spans, log = [], []
    n = max(len(text), 1)
    for fam, pat, base in QUOTA:
        allow = max(1, int(round(3.0 * base * n / 10000)))
        seen = 0
        for m in pat.finditer(text):
            seen += 1
            if seen <= allow:
                continue
            s, e = m.span()
            if any(a <= s and e <= b for a, b in protect):
                continue
            spans.append((s, e))
        if seen > allow:
            log.append("超额%s(限%d/见%d)" % (fam, allow, seen))
    return spans, log


def _cut(text, spans):
    """按区间从后往前删，避免下标漂移。"""
    merged = []
    for s, e in sorted(spans):
        if merged and s <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(merged[-1][1], e))
        else:
            merged.append((s, e))
    for s, e in reversed(merged):
        text = text[:s] + text[e:]
    return text


def cross_repeat(text, prev_texts, min_len=6, min_hits=2):
    """跨轮复读检测（引擎级口癖抓手）：当前回合的非对话 n-gram 若在此前多轮反复出现，
    说明模型在给这个角色批发同一句手感——单轮机检看不见，只有跨轮对照能抓到。
    返回 [(片段, 此前出现轮数)]。纯本地零 token。"""
    body = DIALOG.sub("", re.sub(r"【[^】]{1,4}】", "", text))
    grams = set()
    for m in re.finditer(r"[\u4e00-\u9fff]{%d,12}" % min_len, body):
        seg = m.group(0)
        for k in range(0, len(seg) - min_len + 1):
            grams.add(seg[k:k + min_len])
    hits = {}
    for pt in prev_texts:
        pb = DIALOG.sub("", pt)
        for g in grams:
            if g in pb:
                hits[g] = hits.get(g, 0) + 1
    out = [(g, n) for g, n in hits.items() if n >= min_hits]
    out.sort(key=lambda x: -x[1])
    merged = []                                   # 去掉互相包含的碎片，只留最长代表
    for g, n in out:
        if not any(g in m0 for m0, _ in merged):
            merged.append((g, n))
    return merged[:5]


def repair(text):
    """本地确定性修复：删可删的、换可换的。返回 (修后文本, 剩余需议病灶, 修复日志)。

    只做"删掉后信息量不减"的操作——副词、按钮式微反应小句、配额超额词。
    任何会改变事实/语义的（镜头病灶、模板句式、对仗句）一律留给定点补丁，机检不擅自代笔。
    """
    for name, pat, tier, repl, ev in RULES:          # 确定性替换先走
        if tier == SUB and repl is not None:
            text = pat.sub(repl, text)
    spans, log = _spans(text)
    protect = [m.span() for name, pat, tier, repl, ev in RULES if tier == ARG for m in pat.finditer(text)]
    qs, qlog = _quota_spans(text, protect)
    text = _clean(_cut(text, spans + qs))
    text = re.sub(r"([，。；！？\n】])\s*[地的得]\s*(?=[^，。；！？\n])", r"\1", text)   # 断肢虚词收尾
    text = re.sub(r"([他她我你它]们?)地(?=[^，。；！？\n])", r"\1", text)                # 主语后的孤零"地"
    text = re.sub(r"^\s*[，。、]+", "", text)
    return text, [h for h in scan(text) if h[1] == ARG], log + qlog          # WATCH 只入 scan 审计，不进补丁


def metrics(text):
    """统计层体检：与真人语料基线对比。返回 dict（供轮记录审计层与补丁提示用）。"""
    body = re.sub(r"【[^】]{1,4}】", "", text)
    sents = [s.strip() for s in SENT_SPLIT.split(body) if s.strip()]
    L = [len(s) for s in sents] or [0]
    mean = sum(L) / len(L)
    var = sum((x - mean) ** 2 for x in L) / len(L)
    cv = (var ** 0.5) / mean if mean else 0
    dlg = sum(len(m.group(0)) for m in DIALOG.finditer(body))
    n = max(len(body), 1)
    return {
        "句数": len(L), "均长": round(mean, 1), "CV": round(cv, 2),
        "短句率": round(sum(1 for x in L if x <= 10) / len(L), 3),
        "最长句": max(L), "对话率": round(dlg / n, 3),
        "情绪词": len(EMO.findall(body)), "微动作": len(MICRO.findall(body)),
        "字数": len(body),
    }


def diagnose(text):
    """统计层判词（只给证据不给结论，交毒编/裁判定夺）。返回 [告警字符串]。"""
    m = metrics(text)
    out = []
    if m["句数"] >= 3:
        if m["CV"] < 0.45:
            out.append("匀速念稿：句长CV %.2f（真人 0.71）——该断的没断，长短句没有交错" % m["CV"])
        if m["短句率"] < 0.06 and m["句数"] >= 6:
            out.append("无喘息：≤10字短句占 %.0f%%（真人 12%%）——每段至少给一个短句" % (m["短句率"] * 100))
        if m["最长句"] > 120:
            out.append("长句失控：最长句 %d 字（真人 99.5%% 在 110 字内）" % m["最长句"])
    if m["微动作"] > m["情绪词"] and m["微动作"] >= 2:
        out.append("微动作倒挂：微动作 %d 处 > 情绪词 %d 处。真人语料里情绪词是微动作的 150 倍"
                   "（情绪 5.27‰ vs 微动作 0.035‰）——用小动作代替情绪本身就是 AI 腔，该直说就直说"
                   % (m["微动作"], m["情绪词"]))
    return out


def speech_balance(pairs):
    """群像话量观察（全场同话量/均分话量——
    群像引擎最标志性的两个 AI 病，humanize 二律「话量本身是人设」的执法端）。
    pairs = [(角色名, 本轮该角色台词总字数)]。真人群像话量是长尾分布，AI 是均匀的。
    只观测不执法（待证：阈值需真语料标定，先攒数据）。返回告警字符串或 None。"""
    vals = [n for _, n in pairs if n > 0]
    if len(vals) < 3:
        return None                                     # 两人戏谈不上"均分"
    mean = sum(vals) / len(vals)
    if mean < 12:
        return None
    cv = (sum((x - mean) ** 2 for x in vals) / len(vals)) ** 0.5 / mean
    if cv < 0.25:                                       # 全员话量几乎一样 → 疑似均分
        return "观察·均分话量：%d 人话量 CV %.2f（%s）——真人群像是长尾，全场同话量是 AI 腔" % (
            len(vals), cv, "、".join("%s%d" % p for p in pairs[:6]))
    return None


def human_score(text):
    """真人度评分 0-100（零 token，纯统计）。给 UI 做逐轮正反馈用，非执法依据。
    扣分项 = 病灶命中（执法级重扣、观察级轻扣）+ 统计层对真语料基线的偏差（diagnose 同源）。
    校准锚点：干净人话 ≈ 90+；机检粗筛门槛（8 处执法命中）≈ 50 上下。"""
    if not (text or "").strip():
        return 0
    hits = scan(text)
    enforce = sum(1 for h in hits if h[1] != "观")
    watch = len(hits) - enforce
    m = metrics(text)
    per_k = max(1.0, m["字数"] / 1000.0)          # 按千字归一：长文不因体量吃亏
    pen = (enforce * 6.0 + watch * 2.0) / per_k
    pen += len(diagnose(text)) * 6.0              # 统计层每条告警扣 6
    return max(0, min(100, round(100 - pen)))


def brief(text):
    """一行体检摘要（写进轮记录审计层）。"""
    m = metrics(text)
    return "字数%d 句%d 均长%.0f CV%.2f 短句%.0f%% 情绪%d/微动作%d" % (
        m["字数"], m["句数"], m["均长"], m["CV"], m["短句率"] * 100, m["情绪词"], m["微动作"])


def patch_prompt(residue, diags):
    """把残留病灶编成定点补丁指令（只发命中句，不发全文——省 token 的关键）。"""
    lines = []
    for name, tier, frag, sent in residue[:8]:
        lines.append("· [%s] 「%s」 ← 出自：%s" % (name, frag, sent))
    for d in diags[:3]:
        lines.append("· [统计层] " + d)
    return "\n".join(lines)


PATCH_SYS = (
    "你是毒编的定点改写手。下面给你几处被机检判定为 AI 腔的句子。逐句改写：**信息量一字不减**"
    "（谁做了什么、说了什么、想什么，全部保留），只换表达方式；能删的直接删（删掉后句子仍成立的修饰"
    "一律删）。不要重写整段，不要新增情节，不要加金句。\n"
    "若某处是这个角色声纹卡里写明的**既定签名动作**（每人至多一个，如某人紧张时整领带），那是人物特征不是 AI 腔，原样放回。\n"
    "输出严格 JSON：{\"fixes\":[{\"old\":\"原句原文（逐字照抄）\",\"new\":\"改后句\"}]}。"
    "改不动的原样放回 new。只输出 JSON。")
