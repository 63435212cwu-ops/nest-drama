#!/usr/bin/env python3
# NEST-DRAMA 群像引擎 · Copyright (C) 2026 63435212cwu-ops
# SPDX-License-Identifier: AGPL-3.0-only
# 依 GNU AGPL-3.0 分发（全文见随包 LICENSE）：允许商用/修改/部署，但修改版
# 及网络服务化分发必须完整开源并保留本声明。
"""NEST-DRAMA · 控制台服务（零依赖，Python 标准库）

用法:  python3 serve.py [端口]        # 在 群像/ui/ 内运行；默认端口 8787
接口:  GET  /            静态文件（ui/ 目录）
       GET  /events      SSE —— data.json / 指令队列.json 变化时推 update
       GET  /queue       当前指令队列 JSON
       POST /cmd         {type, payload} 指令（api 模式直通执行，无 API 时入队待自动执行）
后台:  队列消费器（api 模式每 5 秒消费待处理指令：init/beat/pause/interview/report/gravity/continue-story）
       启动时若有待建世界（pending-init）且 LLM 可用 → 自动开建
推演:  每主笔角色 单次成文→机械病灶预筛（零成本）→总审官四刀+语言层（毙即带死因重推≤3次）→过审后机械复扫改写；
       主笔≤3并行、反应行并行；裁判落三查/引力/目标进度；收束判定（达成/预算耗尽/停滞3轮）即终止
报告:  报告 Agent（大纲→分章 ReACT 工具循环，本地文件即工具）；角色访谈（戏内/吐真）
只绑 127.0.0.1，不对外网。
"""
import json
import glob
import hashlib
import re
import os
import ssl
import sys
import time
import threading
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn

UI_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(UI_DIR)                      # 群像/
VERSION = "1.1.0"                                        # 发布包/health/响应头共用（pack-release.py 从此处读取）
STARTED_AT = time.time()
sys.path.insert(0, UI_DIR)
try:                                                    # 毒编机检（零 token 语言层）
    import dupian
except Exception as _e:                                 # 缺模块不断流水线，降级到旧机械扫描
    dupian = None
QUEUE_PATH = os.path.join(ROOT_DIR, "指令队列.json")
DATA_PATH = os.path.join(UI_DIR, "data.json")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8787

_lock = threading.Lock()


def _load_queue():
    if not os.path.exists(QUEUE_PATH):
        return {"queue": []}
    try:
        with open(QUEUE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"queue": []}


def _save_queue(q):
    _atomic_json_dump(q, QUEUE_PATH)


def _mtimes():
    out = []
    for p in (DATA_PATH, QUEUE_PATH):
        try:
            out.append(os.stat(p).st_mtime)
        except OSError:
            out.append(0)
    return out


# ── 材料读取层 ─────────────────────────────────────────────────────────────────
# 原则：能用标准库解的格式都解（zipfile/zlib/html/re 足够覆盖 docx/odt/epub/html/rtf/zip 与尽力版 pdf）；
# 解不出的给**可执行的**提示（"另存为 .docx/.txt"），不吞错；文本一律规整为 NFC + \n。
TEXT_EXTS = (".txt", ".md", ".markdown", ".text", ".json", ".csv", ".tsv", ".yaml", ".yml", ".log", ".ini", ".srt")
FORMATS = [
    {"ext": ".txt / .md / .markdown / .csv / .json / .yaml / .log / .srt", "how": "纯文本；自动嗅探 UTF-8(BOM) / UTF-16 / UTF-32 / GB18030 / Big5"},
    {"ext": ".docx", "how": "Word 2007+：段落、换行、制表、表格单元格；页眉页脚不读"},
    {"ext": ".odt", "how": "OpenDocument 文本：段落 / 标题 / 换行"},
    {"ext": ".epub", "how": "电子书：按 OPF 书脊顺序抽正文，去标签"},
    {"ext": ".html / .htm / .xhtml", "how": "去 script/style 与标签，保留段落换行"},
    {"ext": ".rtf", "how": "富文本：解 \\'xx（GBK）与 \\uN 转义，剥控制字"},
    {"ext": ".zip", "how": "压缩包：递归展开其中所有受支持文件（跳过 __MACOSX / 隐藏文件），每个文件独立成一份材料"},
    {"ext": ".pdf", "how": "尽力抽取（仅限文本型、非 CID 字体的 PDF）；抽不出可读文字时报错并建议转 .txt/.docx"},
    {"ext": ".doc", "how": "不支持（二进制旧格式）：请在 Word 里另存为 .docx 或 .txt"},
]
MAX_FILE_BYTES = 64 * 1024 * 1024        # 单文件上限：超过基本不是稿件而是误投
MAX_BODY_BYTES = 512 * 1024 * 1024       # 单次请求体上限（本地服务也不让一个请求把内存吃光）


def _norm_text(t):
    import unicodedata
    t = t.replace("\r\n", "\n").replace("\r", "\n").replace("\x00", "")
    t = t.replace("\ufeff", "").replace("\u200b", "").replace("\u200c", "").replace("\u200d", "").replace("\xa0", " ")
    t = unicodedata.normalize("NFC", t)
    return re.sub(r"\n{3,}", "\n\n", t).strip()


def _decode_text(raw):
    """字节 → 文本：BOM 优先；再 UTF-8 严格；再看 NUL 分布判 UTF-16；再 GB18030（GBK 超集）；再 Big5；最后 UTF-8 容错。"""
    if not raw:
        return ""
    if raw.startswith(b"\xef\xbb\xbf"):
        return raw[3:].decode("utf-8", "replace")
    if raw.startswith((b"\xff\xfe\x00\x00", b"\x00\x00\xfe\xff")):
        return raw.decode("utf-32", "replace")
    if raw.startswith((b"\xff\xfe", b"\xfe\xff")):
        return raw.decode("utf-16", "replace")
    try:
        return raw.decode("utf-8")
    except UnicodeDecodeError:
        pass
    # 非 UTF-8：候选编码各解一遍，按"像不像人写的字"打分（常用汉字/ASCII/中文标点得分，
    # 罕见区/私用区/替换符扣分）。纯中文 UTF-16 没有 NUL 字节，旧版的 NUL 密度法认不出来，
    # 会被 GBK 解成「鵩蚫eg哊」这种鬼字——打分法能把它挑出来。
    cands = []
    for enc in ("gb18030", "big5", "utf-16-le", "utf-16-be"):
        try:
            cands.append((enc, raw.decode(enc, "replace")))
        except Exception:
            continue

    def _score(t):
        if not t:
            return -1
        n = min(len(t), 6000); good = bad = 0
        for ch in t[:n]:
            o = ord(ch)
            if 0x4E00 <= o <= 0x9FFF or 0x20 <= o < 0x7F or ch in "，。！？、；：「」『』“”‘’…—（）《》\n\t":
                good += 1
            elif ch == "\ufffd" or 0xE000 <= o <= 0xF8FF or 0x3400 <= o <= 0x4DBF or o >= 0x20000 or o < 0x20 and ch not in "\r\n\t":
                bad += 1
        return (good - 3 * bad) / n
    best = max(cands, key=lambda c: _score(c[1])) if cands else None
    if best and _score(best[1]) > 0.5:
        return best[1]
    return raw.decode("utf-8", "replace")


def _strip_tags(xml, para_tags=(), br_tags=(), tab_tags=(), cell_tags=()):
    import html as _html
    for t in para_tags:
        xml = re.sub(r"<%s(?=[\s>/])[^>]*>" % re.escape(t), "\n", xml)
        xml = re.sub(r"</%s>" % re.escape(t), "\n", xml)
    for t in br_tags:
        xml = re.sub(r"<%s(?=[\s>/])[^>]*/?>" % re.escape(t), "\n", xml)
    for t in tab_tags:
        xml = re.sub(r"<%s(?=[\s>/])[^>]*/?>" % re.escape(t), "\t", xml)
    for t in cell_tags:
        xml = re.sub(r"</%s>" % re.escape(t), "\t", xml)
    xml = re.sub(r"<[^>]+>", "", xml)
    return _html.unescape(xml)


def _decode_docx(raw):
    import io, zipfile
    with zipfile.ZipFile(io.BytesIO(raw)) as z:
        try:
            xml = z.read("word/document.xml").decode("utf-8", "ignore")
        except KeyError:
            raise ValueError("不是有效的 .docx（缺 word/document.xml）——若是旧版 .doc 改了后缀，请用 Word 另存为 .docx")
    xml = re.sub(r"<w:tab\s*/>", "\t", xml)
    xml = re.sub(r"<w:(br|cr)\s*/>", "\n", xml)
    return _strip_tags(xml, para_tags=("w:p",), cell_tags=("w:tc",))


def _decode_odt(raw):
    import io, zipfile
    with zipfile.ZipFile(io.BytesIO(raw)) as z:
        try:
            xml = z.read("content.xml").decode("utf-8", "ignore")
        except KeyError:
            raise ValueError("不是有效的 .odt（缺 content.xml）")
    xml = re.sub(r"<text:s\s*/>", " ", xml)
    xml = re.sub(r"<text:s\s+text:c=\"(\d+)\"\s*/>", lambda m: " " * int(m.group(1)), xml)
    return _strip_tags(xml, para_tags=("text:p", "text:h"), br_tags=("text:line-break",), tab_tags=("text:tab",),
                       cell_tags=("table:table-cell",))


def _decode_html(raw):
    t = _decode_text(raw)
    t = re.sub(r"(?is)<(script|style|head)[^>]*>.*?</\1>", "", t)
    return _strip_tags(t, para_tags=("p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "tr", "blockquote", "section", "article"),
                       br_tags=("br", "hr"), cell_tags=("td", "th"))


def _decode_epub(raw):
    import io, zipfile, posixpath
    with zipfile.ZipFile(io.BytesIO(raw)) as z:
        names = z.namelist()
        order = []
        try:
            cont = z.read("META-INF/container.xml").decode("utf-8", "ignore")
            opf = re.search(r'full-path="([^"]+)"', cont).group(1)
            base = posixpath.dirname(opf)
            opfx = z.read(opf).decode("utf-8", "ignore")
            items = dict(re.findall(r'<item[^>]*\bid="([^"]+)"[^>]*\bhref="([^"]+)"', opfx))
            items.update({k: v for v, k in re.findall(r'<item[^>]*\bhref="([^"]+)"[^>]*\bid="([^"]+)"', opfx)})
            for ref in re.findall(r'<itemref[^>]*\bidref="([^"]+)"', opfx):
                if ref in items:
                    order.append(posixpath.normpath(posixpath.join(base, items[ref])))
        except Exception:
            order = []
        if not order:
            order = sorted(n for n in names if n.lower().endswith((".xhtml", ".html", ".htm")))
        parts = []
        for n in order:
            if n in names:
                parts.append(_decode_html(z.read(n)))
    if not parts:
        raise ValueError("epub 里没有可读的正文页")
    return "\n\n".join(p for p in parts if p.strip())


def _decode_rtf(raw):
    """RTF → 文本（够用版）：处理 \\'xx 单字节转义（按 GBK/CP936）、\\uN 转义、跳过字体/颜色/样式表组。"""
    t = raw.decode("latin-1")
    out, i, n = [], 0, len(t)
    skip_depth, depth, uc_skip = 0, 0, 1
    pend = bytearray()

    def flush():
        if pend:
            out.append(pend.decode("gb18030", "replace")); pend.clear()
    while i < n:
        ch = t[i]
        if ch == "{":
            depth += 1; i += 1
            if re.match(r"\\(fonttbl|colortbl|stylesheet|info|pict|\*)", t[i:i + 12]):
                skip_depth = depth
            continue
        if ch == "}":
            if skip_depth == depth:
                skip_depth = 0
            depth -= 1; i += 1; continue
        if ch == "\\":
            m = re.match(r"\\'([0-9a-fA-F]{2})", t[i:i + 4])
            if m:
                if not skip_depth:
                    pend.append(int(m.group(1), 16))
                i += 4; continue
            m = re.match(r"\\u(-?\d+)\s?", t[i:])
            if m:
                flush()
                if not skip_depth:
                    cp = int(m.group(1)); cp = cp + 65536 if cp < 0 else cp
                    out.append(chr(cp))
                i += m.end()
                # \uN 后跟随 uc_skip 个替代字符，跳过
                j = 0
                while j < uc_skip and i < n:
                    if t[i] == "\\" and re.match(r"\\'[0-9a-fA-F]{2}", t[i:i + 4]):
                        i += 4
                    elif t[i] not in "{}\\":
                        i += 1
                    else:
                        break
                    j += 1
                continue
            m = re.match(r"\\([a-zA-Z]+)(-?\d+)? ?", t[i:])
            if m:
                w = m.group(1)
                if not skip_depth:
                    flush()
                    if w in ("par", "line", "sect", "page"):
                        out.append("\n")
                    elif w == "tab":
                        out.append("\t")
                    elif w == "uc" and m.group(2):
                        uc_skip = int(m.group(2))
                i += m.end(); continue
            if i + 1 < n and t[i + 1] in "{}\\":
                if not skip_depth:
                    flush(); out.append(t[i + 1])
                i += 2; continue
            i += 1; continue
        if not skip_depth and ch not in "\r\n":
            pend.append(ord(ch) if ord(ch) < 256 else 63)
        i += 1
    flush()
    return "".join(out)


def _decode_pdf(raw):
    """尽力版 PDF 文本抽取（零依赖）：FlateDecode 流 → BT/ET 里的 Tj/TJ 字串。
    仅对文本型、非 CID 字体的 PDF 有效；CJK 常用的 Identity-H 编码抽出来是乱码，
    这里用可读率校验，不达标就明确报错，绝不把乱码当材料喂给模型。"""
    import zlib
    texts = []
    for m in re.finditer(rb"stream\r?\n(.*?)\r?\nendstream", raw, re.S):
        data = m.group(1)
        try:
            data = zlib.decompress(data)
        except Exception:
            pass
        for blk in re.findall(rb"BT(.*?)ET", data, re.S):
            for sm in re.finditer(rb"\((?:\\.|[^\\)])*\)|<[0-9A-Fa-f\s]+>", blk):
                tok = sm.group(0)
                if tok.startswith(b"("):
                    body = re.sub(rb"\\([nrtbf()\\])", lambda x: {b"n": b"\n", b"r": b"", b"t": b"\t", b"b": b"", b"f": b""}.get(x.group(1), x.group(1)), tok[1:-1])
                    texts.append(body.decode("latin-1"))
                else:
                    hx = re.sub(rb"\s", b"", tok[1:-1])
                    try:
                        bb = bytes.fromhex(hx.decode())
                        texts.append(bb.decode("utf-16-be", "ignore") if len(bb) % 2 == 0 else bb.decode("latin-1"))
                    except Exception:
                        pass
            texts.append("\n")
    txt = _norm_text("".join(texts))
    good = sum(1 for c in txt if "\u4e00" <= c <= "\u9fff" or c.isalnum() or c in "，。！？、；：「」“”…\n ")
    if len(txt) < 40 or good / max(1, len(txt)) < 0.6:
        raise ValueError("PDF 抽不出可读文字（扫描件或 CID 字体）：请用阅读器「另存为文本」或转 .docx 后再投")
    return txt


ZIP_SKIP = ("__macosx/", ".ds_store", "thumbs.db", "desktop.ini")


def _decode_bytes(name, raw):
    """按扩展名解码文件字节 → 纯文本。不认识的扩展名按文本嗅探（多数导出稿本就是文本）。"""
    name = (name or "").lower()
    if len(raw or b"") > MAX_FILE_BYTES:
        raise ValueError("文件超过 %d MB 上限，请拆分后再投" % (MAX_FILE_BYTES // 1024 // 1024))
    if name.endswith(".docx"):
        return _norm_text(_decode_docx(raw))
    if name.endswith(".odt"):
        return _norm_text(_decode_odt(raw))
    if name.endswith(".epub"):
        return _norm_text(_decode_epub(raw))
    if name.endswith((".html", ".htm", ".xhtml")):
        return _norm_text(_decode_html(raw))
    if name.endswith(".rtf"):
        return _norm_text(_decode_rtf(raw))
    if name.endswith(".pdf"):
        return _decode_pdf(raw)
    if name.endswith(".doc"):
        raise ValueError("旧版 .doc 不支持，请另存为 .docx 或 .txt")
    if name.endswith((".zip", ".pptx", ".xlsx", ".pages", ".key", ".numbers")):
        raise ValueError("该格式不能作为单份材料解码（zip 请走多文件展开；办公套件请导出为 .docx/.txt）")
    return _norm_text(_decode_text(raw))


def _expand_files(files):
    """上传文件列表 → 解码后的 (显示名, 文本, 错误) 列表；.zip 递归展开为多份材料；同名自动去重。"""
    import io, zipfile
    out, seen = [], {}

    def _push(name, text, err=None):
        base = os.path.basename(name.replace("\\", "/")) or "未命名"
        stem, ext = os.path.splitext(base)
        stem = re.sub(r"[\\/:*?\"<>|\x00-\x1f]", "_", stem).strip() or "未命名"
        key = stem.lower()
        if key in seen:
            seen[key] += 1; stem = "%s-%d" % (stem, seen[key])
        else:
            seen[key] = 1
        out.append((stem + ext, text, err))

    def _walk(name, raw, depth):
        low = name.lower()
        if low.endswith(".zip") and depth < 3:
            try:
                with zipfile.ZipFile(io.BytesIO(raw)) as z:
                    for info in z.infolist():
                        n = info.filename
                        if info.is_dir() or any(k in n.lower() for k in ZIP_SKIP) or os.path.basename(n).startswith("."):
                            continue
                        try:
                            n2 = n.encode("cp437").decode("gb18030") if info.flag_bits & 0x800 == 0 else n
                        except Exception:
                            n2 = n
                        _walk(n2, z.read(info), depth + 1)
            except zipfile.BadZipFile:
                _push(name, "", "不是有效的 zip 压缩包")
            return
        try:
            _push(name, _decode_bytes(name, raw))
        except Exception as e:
            _push(name, "", str(e))
    for name, raw in files:
        _walk(name, raw, 0)
    return out


def _parse_multipart(raw, ctype):
    """极简 multipart/form-data 解析 → (files:[(name,bytes)], fields:{k:v})"""
    files, fields = [], {}
    m = None
    for part in ctype.split(";"):
        part = part.strip()
        if part.startswith("boundary="):
            m = part[9:].strip('"')
    if not m:
        return files, fields
    boundary = ("--" + m).encode()
    for chunk in raw.split(boundary):
        chunk = chunk.strip(b"\r\n")
        if not chunk or chunk == b"--":
            continue
        if b"\r\n\r\n" not in chunk:
            continue
        head, _, data = chunk.partition(b"\r\n\r\n")
        head_s = head.decode("utf-8", "ignore")
        name = fname = None
        for line in head_s.split("\r\n"):
            if line.lower().startswith("content-disposition"):
                for seg in line.split(";"):
                    seg = seg.strip()
                    if seg.startswith("name="):
                        name = seg[5:].strip('"')
                    elif seg.startswith("filename="):
                        fname = seg[9:].strip('"')
        data = data.rstrip(b"\r\n")
        if fname:
            files.append((fname, data))
        elif name:
            fields[name] = data.decode("utf-8", "replace")
    return files, fields


_PROFILE_KEYS = [("identity", ("身份",)), ("base", ("性格底盘", "底盘", "性格")),
                 ("desire", ("欲望", "渴望", "想要", "私欲")), ("fear", ("恐惧", "害怕")),
                 ("flaw", ("真缺点", "缺点", "短板")), ("bottom", ("底线",)),
                 ("lie", ("谎言习惯", "撒谎", "谎言")), ("manner", ("待人", "对人")),
                 ("habits", ("习惯", "行为指纹")), ("blindspots", ("盲区", "看不到")),
                 ("values", ("价值排序", "价值优先")), ("power", ("权力位", "职级")),
                 ("body", ("身体状态", "身体")), ("today", ("今天", "今日", "身上挂着"))]


def _parse_core(core):
    """内核卡散文 → 结构化档案：身份/性格底盘/欲望/恐惧/真缺点/底线/谎言习惯/待人。
    生成侧每项一行（'欲望：…'），这里只做解析不做推断——读者看到的属性全部有原文依据。"""
    out = {}
    for raw in str(core or "").replace("／", "/").splitlines():
        line = raw.strip().lstrip("-*# ").strip()
        if not line:
            continue
        for sep in ("：", ":"):
            if sep not in line:
                continue
            head, val = line.split(sep, 1)
            head, val = head.strip().strip("*_【】[]"), val.strip()
            if not val or len(head) > 8:
                continue
            if re.match(r"^[（(]?(未提及|材料未明|不详|无|暂无|—|-|待补)[）)]?[。.]?$", val):
                break                                          # 占位值不入档，避免满屏「未提及」
            for key, names in _PROFILE_KEYS:
                if key not in out and any(n in head for n in names):
                    out[key] = val[:120]
            break
    return out


def _core_path(nm):
    return os.path.join(ROOT_DIR, "角色", "%s.md" % nm)


def _profile_of(nm):
    """从已落盘的内核卡补档（老局没有 profile 字段时的迁移路径）。"""
    try:
        md = open(_core_path(nm), encoding="utf-8").read()
    except Exception:
        return {}
    body = md.split("---", 2)[-1]
    prof = _parse_core(body.split("【你的秉性】")[0])
    if "**秘密**" in md:
        prof["hasSecret"] = True
    return prof


def _load_data():
    """读取引擎产出的严格 JSON（ui/data.json，唯一契约）。"""
    p = os.path.join(UI_DIR, "data.json")
    if not os.path.exists(p):
        return None
    try:
        with open(p, encoding="utf-8") as f:
            D = json.load(f)
        for c in (D.get("cast") or []):                       # 老局补档：内核卡→结构化属性
            if isinstance(c, dict) and c.get("name") and not c.get("profile"):
                prof = _profile_of(c["name"])
                if prof:
                    c["profile"] = prof
        return D
    except Exception:
        return None


def _prune(q):
    """已处理项只留最近 20 条，待处理项永不裁剪。"""
    done = [i for i in q["queue"] if i.get("status") != "待处理"]
    if len(done) > 20:
        drop = set(id(i) for i in done[:-20])
        q["queue"] = [i for i in q["queue"] if id(i) not in drop]
    return q


def _atomic_json_dump(obj, path):
    """原子落盘：写 .tmp → os.replace。进程中断不再留下半截 JSON。"""
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
    os.replace(tmp, path)


def _save_data(D):
    """data.json 原子写 + 单份 .bak 轮转。旧版直接覆盖：写一半断电即整份损坏且无备份。"""
    try:
        if os.path.exists(DATA_PATH):
            bak = DATA_PATH + ".bak"
            if os.path.exists(bak):
                os.remove(bak)
            os.replace(DATA_PATH, bak)
    except OSError:
        pass
    _atomic_json_dump(D, DATA_PATH)


def _enqueue(type_, payload):
    with _lock:
        q = _prune(_load_queue())
        item = {"id": "c-%04d" % (len(q["queue"]) + 1),
                "ts": time.strftime("%Y-%m-%d %H:%M:%S"),
                "status": "待处理", "type": type_, "payload": payload}
        q["queue"].append(item)
        _save_queue(q)
    return item




# ══════════ LLM 接入（OpenAI 兼容三字段：LLM_BASE_URL / LLM_MODEL_NAME / LLM_API_KEY）══════════
# 凭据落点：用户主目录 ~/.nest-drama/（机器级私有配置，绝不随库分发/上传）。
# 旧位置 ui/api-config.json 在库内——库一旦打包分发，明文密钥跟着泄出。启动自动迁移并删除。
_API_HOME = os.path.expanduser("~/.nest-drama")
API_CFG = os.path.join(_API_HOME, "api-config.json")
API_CFG_LEGACY = os.path.join(UI_DIR, "api-config.json")


def _api_migrate():
    """旧版密钥存 ui/（随库分发即泄密）→ 迁到 ~/.nest-drama/ 并删旧档。幂等，可重复执行。"""
    try:
        if os.path.isfile(API_CFG_LEGACY):
            os.makedirs(_API_HOME, exist_ok=True)
            if not os.path.isfile(API_CFG):
                open(API_CFG, "wb").write(open(API_CFG_LEGACY, "rb").read())
            os.chmod(API_CFG, 0o600)
            os.remove(API_CFG_LEGACY)
            print("凭据已迁移到 %s（不再随库分发）" % API_CFG)
    except Exception as e:
        print("凭据迁移失败（%s）——密钥仍在旧位置 %s" % (e, API_CFG_LEGACY))


_api_migrate()

# ── 接入门（强制弹窗）：未接入 API 前锁死界面，杜绝"指令堆在队列里卡住" ──
GATE_SNIPPET = """
<div id="qx-gate" style="position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:rgba(252,251,250,.90);backdrop-filter:blur(10px);font-family:'Noto Sans SC','Inter',system-ui,sans-serif;">
<style>
#qx-gate .card{width:min(430px,92vw);max-height:92vh;overflow:auto;background:#ffffff;border:1px solid #E6E4E1;border-radius:14px;padding:30px 28px;color:#1A1A1A;box-shadow:0 24px 80px rgba(28,24,20,.13)}
#qx-gate .badge{display:inline-block;font-size:11px;letter-spacing:.24em;color:#FF6B35;border:1px solid #FFD3BF;border-radius:999px;padding:3px 10px;margin-bottom:14px}
#qx-gate h1{font-size:21px;margin:0 0 6px;font-weight:700}
#qx-gate .sub{font-size:13px;color:#7A7672;line-height:1.7;margin:0 0 10px}
#qx-gate label{display:block;font-size:12px;color:#5A5A5A;margin:12px 0 5px}
#qx-gate input{width:100%;box-sizing:border-box;background:#FAFAF9;border:1px solid #DAD7D3;border-radius:8px;color:#1A1A1A;padding:9px 11px;font-size:13px;outline:none;font-family:inherit}
#qx-gate input:focus{border-color:#FF6B35}
#qx-gate .msg{font-size:12px;margin-top:12px;min-height:18px;line-height:1.6;word-break:break-all}
#qx-gate .row{display:flex;gap:10px;margin-top:14px}
#qx-gate button{flex:1;border-radius:8px;padding:10px 0;font-size:13px;cursor:pointer;font-family:inherit;font-weight:600}
#qx-gate .test{background:transparent;border:1px solid #DAD7D3;color:#4A4A4A}
#qx-gate .save{background:#FF6B35;border:1px solid #FF6B35;color:#FFFFFF}
#qx-gate button:disabled{opacity:.5;cursor:wait}
</style>
<div class="card">
  <div class="badge">群 像 引 擎</div>
  <h1>接入 API（必填）</h1>
  <p class="sub">引擎尚未接入任何模型 API。完成接入前，建世界、推演、访谈、报告都无法启动——这是第一步，无法跳过。</p>
  <label>API 链接（base_url）</label><input id="qx-g-url" placeholder="https://api.openai.com/v1" spellcheck="false">
  <label>模型名（model）</label><input id="qx-g-model" placeholder="gpt-4o / deepseek-chat / …" spellcheck="false">
  <label>密钥（api_key）</label><input id="qx-g-key" type="password" placeholder="sk-…" spellcheck="false">
  <div class="msg" id="qx-g-msg"></div>
  <div class="row">
    <button class="test" id="qx-g-test">测试连接</button>
    <button class="save" id="qx-g-save">保存并开始</button>
  </div>
</div>
<script>
(function(){
  var $=function(i){return document.getElementById(i)};
  var msg=$('qx-g-msg');
  function say(t,c){msg.textContent=t;msg.style.color=c||'#7A7672'}
  function val(){return{base_url:$('qx-g-url').value.trim(),model:$('qx-g-model').value.trim(),api_key:$('qx-g-key').value.trim()}}
  function post(p){return fetch('/api/llm-config',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}).then(function(r){return r.json()})}
  $('qx-g-save').onclick=function(){
    var v=val();
    if(!v.base_url||!v.model||!v.api_key){say('三项都要填：链接 / 模型名 / 密钥','#C5283D');return}
    this.disabled=true;var b=this;say('正在保存…');
    post({action:'save',base_url:v.base_url,model:v.model,api_key:v.api_key}).then(function(r){
      if(!r.ok){say('保存失败：'+(r.error||'未知'),'#C5283D');b.disabled=false;return}
      say('已接入，正在刷新…（队列中的指令将自动开始执行）','#1A936F');
      setTimeout(function(){location.reload()},700);
    }).catch(function(e){say('网络错误：'+e,'#C5283D');b.disabled=false});
  };
  $('qx-g-test').onclick=function(){
    var v=val();
    if(!v.base_url||!v.model||!v.api_key){say('先填完三项再测试','#C5283D');return}
    this.disabled=true;var b=this;say('测试中…');
    fetch('/api/llm-test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(v)}).then(function(r){return r.json()}).then(function(r){
      b.disabled=false;
      if(r.ok){say('连接正常（模型回声：'+(r.reply||'')+'）——可以保存了','#1A936F')}
      else{say((r.error||'连接失败'),'#C5283D')}
    }).catch(function(e){b.disabled=false;say('网络错误：'+e,'#C5283D')});
  };
})();
</script>
</div>
"""


def _gate_needed():
    """接入门是否生效：当前无可用 API（env 或档案均无）。会话代跑已永久禁用。"""
    return not _llm_cfg()


def _gate_inject(html):
    """需要时把强制弹窗注入 index.html 的 </body> 前。"""
    return html.replace("</body>", GATE_SNIPPET + "</body>") if _gate_needed() else html


# ── 全局 API 状态条：右下角常驻；点击放大为 API 管理面板（档案切换/新增/删除/测试连接） ──




def _api_store():
    """{profiles:[{id,name,base_url,model,api_key}], current: id|'', mode: 'api'}
    兼容旧的单档格式（自动迁移为一条档案）。会话代跑已永久禁用：旧存的 session 一律翻回 api。"""
    d = {"profiles": [], "current": "", "mode": "api"}
    if os.path.exists(API_CFG):
        try:
            raw = json.load(open(API_CFG, encoding="utf-8"))
            if isinstance(raw, dict) and "profiles" in raw:
                d.update(raw)
            elif isinstance(raw, dict) and raw.get("api_key"):      # 旧格式迁移
                pid = "p1"
                d["profiles"] = [{"id": pid, "name": raw.get("model", "默认"),
                                  "base_url": raw.get("base_url", ""), "model": raw.get("model", ""),
                                  "api_key": raw.get("api_key", "")}]
                d["current"] = pid
        except Exception:
            pass
    if d.get("mode") == "session":                                 # 一次性迁移回 api
        d["mode"] = "api"
        _api_save(d)
    # API 档案是电脑级全局配置，不随新世界/当前页面变化。
    # 旧配置偶尔会只剩 profiles、current 为空；自动选中第一条，避免界面显示未接入但实际可用。
    if d.get("profiles") and not any(p.get("id") == d.get("current") for p in d["profiles"]):
        d["current"] = d["profiles"][0].get("id", "")
        _api_save(d)
    return d


def _api_save(d):
    droot = os.path.dirname(API_CFG) or "."
    os.makedirs(droot, exist_ok=True)
    json.dump(d, open(API_CFG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    try:
        os.chmod(API_CFG, 0o600)                          # 密钥文件仅本用户可读
    except OSError:
        pass


def _llm_cfg(ignore_mode=False):
    """当前生效配置：env 优先，其次当前档案。会话代跑已禁用（ignore_mode 保留兼容旧调用）。"""
    st = _api_store()
    cfg = {"base_url": os.environ.get("LLM_BASE_URL", ""),
           "model": os.environ.get("LLM_MODEL_NAME", ""),
           "api_key": os.environ.get("LLM_API_KEY", "")}
    if not cfg["api_key"]:
        cur = next((p for p in st["profiles"] if p.get("id") == st.get("current")), None)
        if cur:
            for k in cfg:
                cfg[k] = cfg[k] or cur.get(k, "")
    if not (cfg["api_key"] and cfg["base_url"] and cfg["model"]):
        return None
    return cfg

_SSL_CTX = None


def _ssl_ctx():
    """SSL 上下文（惰性单例）：优先 certifi 的 CA bundle——macOS 自带 Python 常缺根证书，
    会报 CERTIFICATE_VERIFY_FAILED；certifi 不在则回退系统默认。"""
    global _SSL_CTX
    if _SSL_CTX is False:
        return None
    if _SSL_CTX is None:
        try:
            import certifi
            _SSL_CTX = ssl.create_default_context(cafile=certifi.where())
        except Exception:
            _SSL_CTX = False
            return None
    return _SSL_CTX


_LLM_WALL = 2400          # 普通创作调用的单次总墙钟上限（秒）
_LLM_CONNECT_READ = 45    # 首字节/相邻数据块的最大等待；不能让一个空连接挂住整次建库


def _llm_timeout(max_tokens):
    """自适应超时：120 秒基础 + 0.12 秒/输出token（按 8 tok/s 慢速余量，覆盖思考模型）。
    150 token→138s｜2000→360s｜8000→1080s，上限 1800s。"""
    return min(1800, int(120 + 0.12 * max_tokens))


USAGE_PATH = os.path.join(UI_DIR, "usage.json")
_usage_proj_cache = {"t": 0.0, "name": ""}


def _usage_proj():
    """当前局名（30 秒缓存，供用量归属）。"""
    if time.time() - _usage_proj_cache["t"] > 30:
        try:
            _usage_proj_cache["name"] = (json.load(open(DATA_PATH, encoding="utf-8"))
                                         .get("meta", {}).get("title", "")) or "未建局"
        except Exception:
            _usage_proj_cache["name"] = "未建局"
        _usage_proj_cache["t"] = time.time()
    return _usage_proj_cache["name"]


def _usage_add(model, tin, tout, secs, tthink=0):
    """按模型累计用量（token 为估算值：字数/1.6），归属当前局。失败静默——记账绝不拖垮推演。
    tok_think 单独记：思考 token 不进正文但真实消耗时间——均速只按 tok_out 算会低估 5-10 倍
    （用户实测质疑 5.2 tok/s，真实生成吞吐含思考是 25-120 tok/s）。"""
    try:
        with _lock:
            try:
                u = json.load(open(USAGE_PATH, encoding="utf-8"))
            except Exception:
                u = {}
            e = u.setdefault(model or "?", {"model": model or "?", "calls": 0,
                                            "tok_in": 0, "tok_out": 0, "secs": 0.0})
            e["project"] = _usage_proj()
            e["calls"] += 1
            e["tok_in"] += int(tin)
            e["tok_out"] += int(tout)
            e["tok_think"] = int(e.get("tok_think", 0) + tthink)
            e["secs"] = round(e["secs"] + secs, 1)
            e["at"] = time.strftime("%Y-%m-%d %H:%M:%S")
            json.dump(u, open(USAGE_PATH, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    except Exception:
        pass


_TL = threading.local()                             # 每线程一份：流式循环把思考字数带回给记账

# 实时吞吐采样（所有活跃流式调用共同累计，思考+正文都算——这才是模型真实出字速度）
_RATE = {"cum": 0, "hist": []}                      # hist: [(ts, cum)]，GIL 下 += 与 append 足够安全


def _rate_tick(nchars):
    now = time.time()
    _RATE["cum"] += nchars
    h = _RATE["hist"]
    if not h or now - h[-1][0] >= 0.5:
        h.append((now, _RATE["cum"]))
        if len(h) > 60:
            del h[:len(h) - 60]


def _rate_now():
    """近 10 秒窗口的 token/s（字数/1.6）。无产出返回 0。"""
    now = time.time()
    h = [x for x in _RATE["hist"] if now - x[0] <= 10]
    if not h:
        return 0
    base_t, base_c = h[0]
    dt = now - base_t
    return round((_RATE["cum"] - base_c) / 1.6 / dt, 1) if dt >= 0.5 else 0


def _llm(messages, cfg=None, max_tokens=2000, temperature=0.9, timeout=None, retries=2, stream=True,
         think=True):
    """带用量记账的 LLM 调用（对 _llm_raw 的透明包装）。

    think=False → 关掉模型的思考链（见 _llm_raw）。**只在实测「关掉后质量不降甚至更好」的调用上关**，
    不是为了省时间一刀切（mimo-v2.5 / opencode zen 网关实测）：
      · 监修判词：关 3.5–5.9s vs 开 22–44s，且关掉那两次把转嫁动作与心理三步两条病灶都抓全了，
        开思考的两次各只抓到一条 —— 关掉反而判得更准。
      · 裁判 JSON：关 4.4–4.8s vs 开 18.8–29.9s，开思考那次臆造出提示词里没有的场景。
      · 场记搭台：开思考 85.2s 能想出「两跳燃料」，但把两跳要求直接写进 PLANNER_SYS 后，
        关思考 5.7–9.9s 就稳定产出同样的两跳 —— 用指令换思考，10 倍速且更稳。
      · 终局清单、角色回合、章节执笔：创作/综合判断，**保留思考**，额度给足。
    额度不必吝啬：实测 max_tokens 2400 → 6000 中位耗时 16.1s → 17.2s（网关抖动内），
    模型不会为填满预算而多想；但预算不足会被思考吃光导致空正文+重试，那才是真的慢。"""
    cfg = cfg or _llm_cfg()
    t0 = time.time()
    text, err = _llm_raw(messages, cfg, max_tokens, temperature, timeout, retries, stream, think)
    if not (text or "").strip() and not think:
        # 关思考后拿不到内容：极少数网关把该字段当硬错误——原地开思考再来一次，绝不因提速丢轮
        text, err = _llm_raw(messages, cfg, max_tokens, temperature, timeout, 0, stream, True)
    if cfg and text:
        tin = sum(len(m.get("content") or "") for m in messages) / 1.6
        _usage_add(cfg.get("model", "?"), tin, len(text) / 1.6, time.time() - t0,
                   getattr(_TL, "think_chars", 0) / 1.6)
    return text, err


def _llm_raw(messages, cfg=None, max_tokens=2000, temperature=0.9, timeout=None, retries=2, stream=True,
             think=True):
    """OpenAI 兼容 chat/completions（默认流式）。返回 (text, err)。

    超时机制（思考模型友好）：
    · timeout=None（默认）→ _llm_timeout(max_tokens) 自适应：输出额度越大，思考+生成越久
    · 流式读取时 timeout 是「块间最大间隔」——思考模型边想边吐块，连接保活，不再假超时
    · 总墙钟 _LLM_WALL（2400s）兜底：超过即报错，交上层重试
    · 网关不支持流式（HTTP 400）→ 自动降级非流式重试一次
    · 401/403 立即报错不重试；429/5xx 指数退避"""
    cfg = cfg or _llm_cfg()
    if not cfg:
        return None, "未配置 API（链接/模型名/密钥）"
    if timeout is None:
        timeout = _llm_timeout(max_tokens)
    url = cfg["base_url"].rstrip("/") + "/chat/completions"
    use_stream = stream
    last_err = None
    started = time.time()
    # timeout 既是总墙钟，也是一次调用允许的最长等待。urllib 的 timeout 只负责
    # socket 读超时；下面另有 deadline，避免“网关每隔一点时间吐心跳”无限续命。
    deadline = started + min(float(timeout), float(_LLM_WALL))
    for attempt in range(retries + 1):
        if time.time() >= deadline:
            last_err = "调用超过总耗时上限 %d 秒" % int(min(float(timeout), float(_LLM_WALL)))
            break
        body = {"model": cfg["model"], "messages": messages,
                "max_tokens": max_tokens, "temperature": temperature}
        if not think:
            # 两种写法都发：Anthropic 风格 thinking.type 与 vLLM/HF 风格 chat_template_kwargs。
            # 不认识的网关会忽略未知字段，认识哪个就生效哪个。
            # （reasoning_effort:"none" 实测让网关直接掐断连接，故不用。）
            body["thinking"] = {"type": "disabled"}
            body["chat_template_kwargs"] = {"enable_thinking": False}
        if use_stream:
            body["stream"] = True
        payload = json.dumps(body).encode()
        req = urllib.request.Request(url, data=payload, headers={
            "Content-Type": "application/json", "Authorization": "Bearer " + cfg["api_key"],
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"})
        try:
            # 建库阶段可能给出很大的输出额度，但不应因此把“首字节没有回来”
            # 放大成 18 分钟。块间短超时会进入现有断流重连，而不是卡住 worker。
            read_timeout = min(float(timeout), float(_LLM_CONNECT_READ))
            with urllib.request.urlopen(req, timeout=read_timeout, context=_ssl_ctx()) as r:
                if not use_stream:
                    j = json.loads(r.read().decode("utf-8"))
                    msg = (j.get("choices") or [{}])[0].get("message") or {}
                    content = msg.get("content")
                    if not (content or "").strip():       # 思考模型 content 可能为 null：自愈后再报
                        if max_tokens < 12000:
                            max_tokens = min(12000, max_tokens * 3)
                            timeout = _llm_timeout(max_tokens)
                            last_err = "思考耗尽额度→已自动升至 %d 重试" % max_tokens
                            continue
                        return None, "非流式返回 content 为空（finish_reason=%s，思考耗尽输出额度：增大 max_tokens）" \
                            % (j.get("choices") or [{}])[0].get("finish_reason", "?")
                    return content, None
                parts, t0, saw_reason = [], time.time(), False
                _TL.think_chars = 0
                for raw in r:                              # 每行一个 SSE 块；readline 受块间 timeout 约束
                    if time.time() >= deadline:
                        return None, "调用超过总耗时上限 %d 秒" % int(min(float(timeout), float(_LLM_WALL)))
                    if AUTO.get("stop") and AUTO.get("running"):
                        return None, "已暂停"              # 瞬间暂停：当场断流，不等本跳跑完
                    if time.time() - t0 > _LLM_WALL:
                        return None, "总耗时超 %d 秒（模型过慢或网关挂起）" % _LLM_WALL
                    ln = raw.strip()
                    if not ln.startswith(b"data:"):
                        continue                           # 心跳/注释行跳过
                    d = ln[5:].strip()
                    if d == b"[DONE]":
                        break
                    try:
                        delta = (json.loads(d)["choices"] or [{}])[0].get("delta") or {}
                        if delta.get("content"):
                            parts.append(delta["content"])
                            _rate_tick(len(delta["content"]))
                        if delta.get("reasoning_content"):
                            saw_reason = True
                            _rate_tick(len(delta["reasoning_content"]))
                            _TL.think_chars = getattr(_TL, "think_chars", 0) + len(delta["reasoning_content"])
                    except Exception:
                        pass                               # 空块/keep-alive 块跳过
                text = "".join(parts)
                if text.strip():
                    return text, None
                if saw_reason and max_tokens < 12000:
                    # 思考模型把整个额度花在 reasoning 上（实测 mimo-v2.5 在 2000 额度下 4 分钟纯思考零输出）。
                    # 这是可自愈故障：额度×3 原地重试，比把错误抛给上层重发一整轮便宜得多。
                    max_tokens = min(12000, max_tokens * 3)
                    timeout = _llm_timeout(max_tokens)
                    last_err = "思考耗尽额度→已自动升至 %d 重试" % max_tokens
                    continue
                last_err = ("流式返回为空：模型思考耗尽输出额度（有 reasoning 无 content，增大 max_tokens）"
                            if saw_reason else "流式返回为空（网关未吐 content）")
        except urllib.error.HTTPError as e:
            # 优先透出 API 结构化错误（如 {"error":{"message":"Invalid API key."}}）
            detail = ""
            try:
                detail = e.read().decode("utf-8", "replace")[:300]
            except Exception:
                pass
            try:
                ej = json.loads(detail)
                msg = (ej.get("error") or {}).get("message") or ej.get("message") or detail
                last_err = "HTTP %s：%s" % (e.code, msg)
            except Exception:
                last_err = "HTTP %s：%s" % (e.code, detail or e.reason)
            if e.code in (401, 403):                    # 鉴权/封禁类不重试，立即报
                return None, last_err
            if e.code == 400 and use_stream:            # 网关不支持流式 → 降级直读重试
                use_stream = False
                continue
            if e.code == 429:                            # 限流：等更久再试
                time.sleep(min(30, 5 * (attempt + 1)))
            elif e.code >= 500:                          # 服务端故障：5s 起退避
                time.sleep(min(60, 5 * (attempt + 1)))
        except Exception as e:
            last_err = str(e)
            if "CERTIFICATE_VERIFY_FAILED" in last_err and _ssl_ctx() is None:
                last_err += "（系统缺根证书：pip install certifi 后重启服务即可）"
        if AUTO.get("stop") and AUTO.get("running"):
            return None, "已暂停"                          # 暂停优先于重试
        if attempt < retries:
            time.sleep(2 * (attempt + 1))
    return None, last_err


def _llm_json(messages, cfg=None, max_tokens=2000, temperature=0.3, think=False):
    """LLM 调用并解析 JSON；解析失败自动重问一次（只输出 JSON 本体）。返回 dict 或 None。

    think 默认 False：结构化输出是判定活不是创作活，思考链在这里只有害——实测同一裁判调用
    开思考 18.8–29.9s 且臆造出提示词里没有的场景，关思考 4.4s 且 JSON 干净。"""
    t, err = _llm(messages, cfg, max_tokens=max_tokens, temperature=temperature, think=think)
    if err:
        return None
    j = _json_from(t)
    if j is not None:
        return j
    t2, _e2 = _llm(messages + [{"role": "user", "content": "上一次输出不是合法 JSON。只输出 JSON 本体，不要任何其他文字。"}],
                   cfg, max_tokens=max_tokens, temperature=temperature, think=think)
    return _json_from(t2)

def _read(p):
    fp = os.path.join(ROOT_DIR, p)
    return open(fp, encoding="utf-8").read() if os.path.exists(fp) else ""


_FILE_CACHE = {}


def _read_cached(p):
    """mtime+size 键的盘读缓存（含 frontmatter 剥离）：世界观/角色卡这类每轮被在场 N 个角色
    反复读的文件，只真正读盘剥壳一次；心象每轮回写 → mtime 变 → 自然失效，无需手工失效。
    顺带统一语义：旧轮路径 world=_read(...) 不剥 frontmatter，前 40 字是 "---type: world---"
    噪声每轮发给每个角色；此处与其他调用点一致，剥了再给。"""
    fp = os.path.join(ROOT_DIR, p)
    try:
        st = os.stat(fp)
    except OSError:
        return ""
    ent = _FILE_CACHE.get(p)
    if ent and ent[0] == st.st_mtime_ns and ent[1] == st.st_size:
        return ent[2]
    t = _strip_fm(open(fp, encoding="utf-8").read())
    _FILE_CACHE[p] = (st.st_mtime_ns, st.st_size, t)
    return t

def _strip_fm(t):
    if t.startswith("---"):
        i = t.find("---", 3)
        if i > 0:
            return t[i + 3:]
    return t

# ══════════ 生成报告：合并全部轮次为一个叙述 txt（纯文件操作，无需 LLM）══════════
def _compile_report():
    import re as _re, glob as _g
    rounds = sorted(_g.glob(os.path.join(ROOT_DIR, "推演", "第*轮.md")))
    if not rounds:
        return None, "尚无推演记录"
    D = _load_data() or {}
    title = (D.get("meta") or {}).get("title", "群像")
    cast_lines = []
    for c in D.get("cast", []):
        cast_lines.append("%s（%s）" % (c.get("name", ""), c.get("role", "")))
    out = ["《%s》故事全录" % title, "（共 %d 轮 · 审校通过的完整事实底稿：角色行为·对话·心理与故事讲解，供 AI 撰写完整故事）" % len(rounds), "", "人物：" + "；".join(cast_lines), ""]
    for rp in rounds:
        t = open(rp, encoding="utf-8").read()
        fm = {}
        if t.startswith("---"):
            for ln in t[3:t.find("---", 3)].splitlines():
                if ":" in ln:
                    k, v = ln.split(":", 1)
                    fm[k.strip()] = v.strip()
        body = _strip_fm(t)
        out.append("────第%s轮 · %s · %s────" % (fm.get("round", "?"), fm.get("time", ""), fm.get("place", "")))
        out.append("")
        cur = None
        for ln in body.splitlines():
            l = ln.strip()
            if not l or l.startswith("〔") or l.startswith("#") and ("引力检查" in l or "三查" in l or "收束判定" in l or "终局审计" in l or "专家效能" in l):
                if l.startswith("#") and ("引力" in l or "三查" in l or "收束" in l or "终局审计" in l or "专家效能" in l):
                    cur = "SKIP"
                continue
            if cur == "SKIP" and not l.startswith("##"):
                continue
            m = _re.match(r"##+\s*(?:【场面.*?】|【场面】)(.*)", l)
            if l.startswith("## 【纪要】") or l.startswith("## 【场面"):
                cur = "SCENE"
                out.append("【故事讲解】" + (l.split("】", 1)[1] if "】" in l and l.split("】", 1)[1] else ""))
                continue
            m = _re.match(r"##\s+(\S+)\s+(回合|反应|半回合).*", l)
            if m:
                cur = "ROLE"
                out.append(m.group(1))
                continue
            if l.startswith("## 【结构·四拍】"):        # 四拍是给扩写 AI 的骨架：目的/冲突/转折/结果照给
                cur = "BEATS"
                out.append("【本轮骨架】")
                continue
            if l.startswith("##"):
                cur = None
                continue
            if cur == "ROLE":
                if l.startswith("【目的】"):
                    out.append("　要的：" + l[4:].replace("指向→", ""))
                elif l.startswith("【行为】"):
                    out.append("　行为：" + l[4:])
                elif l.startswith("【对话】"):
                    out.append("　说：" + l[4:])
                elif l.startswith("【心理】"):
                    out.append("　心里：" + l[4:])
                else:
                    out.append("　" + l)
            elif cur == "BEATS":
                if l.startswith("- 接棒") or "平轮" in l or "四拍齐" in l:
                    continue                             # 接棒/平轮是引擎记账，不给扩写 AI
                if l.startswith("- "):
                    out.append("　" + l[2:])
            elif cur == "SCENE":
                out.append(l)
        out.append("")
    oc = D.get("outcome") or {}
    if oc:
        out.append("────终局清单────")
        for f in oc.get("castFates", []):
            out.append("%s——%s" % (f.get("name", ""), f.get("fate", "")))
        for m2 in oc.get("major", []):
            out.append("【大事件】" + m2)
        for m2 in oc.get("minor", []):
            out.append("【小事件】" + m2)
    # 线索账与质量记录随导出一起走：下载的 txt 就是此刻库里的全部信息，不需要再回页面对照
    led = ((D.get("plotLedger") or {}).get("units") or {}).get(
        (D.get("meta") or {}).get("unitName", ""), {})
    if led:
        mains = [t for t in led.get("main", []) if isinstance(t, dict)]
        subs = [t for t in led.get("subplots", []) if isinstance(t, dict)]
        if mains or subs:
            out += ["", "────线索账（截至导出时）────"]
            for t in mains:
                out.append("【主线·%s】%s%s" % (t.get("status", "open"), t.get("label", ""),
                                               ("｜证据：" + (t.get("evidence") or [""])[-1])
                                               if t.get("evidence") else ""))
            for t in subs:
                out.append("【支线·%s】%s｜主人：%s｜下次触发：%s"
                           % (t.get("status", "open"), t.get("label", ""),
                              "、".join(t.get("owners") or []) or "待绑定",
                              t.get("nextTrigger", "未定")))
    tur = oc.get("turing") or {}
    if tur:
        out += ["", "────图灵盲测────",
                "均分 %s/10（%s 段过审回合，鉴别官不知来源）%s"
                % (tur.get("score", "—"), tur.get("n", "?"),
                   ("｜修复前 %s" % tur["prev"]) if tur.get("prev") is not None else "")]
        for tl in (tur.get("tells") or []):
            out.append("破绽：" + tl)
    name = "%s·故事全录.txt" % title
    os.makedirs(os.path.join(ROOT_DIR, "导出"), exist_ok=True)
    os.makedirs(os.path.join(UI_DIR, "exports"), exist_ok=True)
    txt = "\n".join(out)
    open(os.path.join(ROOT_DIR, "导出", name), "w", encoding="utf-8").write(txt)
    open(os.path.join(UI_DIR, "exports", name), "w", encoding="utf-8").write(txt)
    D.setdefault("exports", [])
    D["exports"] = [e for e in D["exports"] if e.get("name") != name]
    # 缺轮如实告知：feed 记了 N 轮但磁盘只剩 M 个轮文件时，不许拿 M 轮冒充"全录"
    fed = len(D.get("feed") or [])
    miss = max(0, fed - len(rounds))
    D["exports"].insert(0, {"name": name, "path": "exports/" + name, "rounds": len(rounds), "missing": miss,
                            "at": "%d 轮" % len(rounds),
                            "note": ("全部轮次叠加 · 行为/对话/心理/故事讲解" if not miss
                                     else "注意：纪事记有 %d 轮，磁盘只剩 %d 个轮文件，缺的 %d 轮无法收录"
                                          % (fed, len(rounds), miss))})
    json.dump(D, open(os.path.join(UI_DIR, "data.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return name, None

# ══════════ 自动驾驶（独立 API 模式）：每角色一个独立 agent + 双专家两道审 ══════════
# 监修官只审"人会不会这么做"；语言层的可枚举病灶交 dupian.py 机检（正则+语料基线，零 token）。
# 两边不重复列举：提示词越短越准，且不给模型下病灶的锚。
REVIEW_SYS = ("你是总审官：顶级人格心理学专家×AI酒馆角色顶级支配者。只审行为与判断，不审用词。\n"
              "【四刀】人格（是否此人会走的一步——『最优』以守住核心自我为准而非达成目标；"
              "可追溯到内核价值排序的自伤选择合法且珍贵，随机失误不合法）/视野（是否用了他不该知道的信息）/"
              "行为（必须改变局面：信息·关系·资源·位置动了才算；关门踱步深呼吸等转嫁动作不算行为）/"
              "完整（行为做完；话说完**或明确地断**——找不到词/被岔开/发现不该说/对方没接换话头，"
              "四种断法合法且能归因到人格处境即放行，无差别省略号才毙；【目的】必须指向具名的人且行为对话确实冲着它去；"
              "【心理】走完'读到→碰到→打算'三步；触及旧伤时第三步'我不知道我为什么要这么做'合法（前两步必须在）；"
              "崩溃档按'崩溃是否完整'验收，胡言乱语嘶吼长篇宣泄合法）。\n"
              "【只审这四类语言问题（需要判断力，机器扫不出）】①账目思维：一进屋就盘点物品、给东西发形容词，"
              "而不是只看见与他目标恐惧相关的；②装饰比喻：比喻答不出'与此人此事何干'；③无毛边：对白句句高效、"
              "零废话、每句都在推进；④全知：反应挂在'所有人/众人'而非具名的人。\n"
              "【秉性刀】给你的内核卡摘要里有他的秉性（智力/情商/求生欲/惊讶阈值/谋略层数）。"
              "越过秉性的表现一律毙：iq=1 的人算出三步棋、eq=1 的人说出体贴到位的话、"
              "survival≥4 的人面对刀口不退反上、startle=1 的人遇到惊天消息毫无反应、"
              "谋略层数=1 的人同时经营两条线——都是假的。反过来，符合秉性的失态、说错话、退让、"
              "认栽、被惊到接不上话，全部合法且应当放行。\n"
              "【不得当缺点】直说情绪（怕/恨/想哭）是真人常态——真语料里情绪词是微动作的百倍以上；"
              "危急与崩溃时直说更狠。用小动作代替情绪才是 AI 腔，见到反而该毙。"
              "**闲笔同样不得当缺点**：与目标无关的一样杂物、一句生活琐事（一笔即止、不解释不回收）"
              "是活人的注意力毛边，不是行为无效——只要四件套本体齐，闲笔一律放行。"
              "真人的人生大部分时间不构成戏，全篇句句奔目标才是机器。\n"
              "输出：第一行仅【过】或【毙：一句死因（注明哪一刀）】；若毙，第二行起给修正方向一句。")

# 角色 agent 的恒定法则前缀：全局逐字不变（前缀缓存友好），只给正向法则不列禁忌清单。
ACTOR_LAW = (
    "你不是在写小说，你是这个人，此刻正在活。永不破戏，不替他人决定言行，只写你自己。\n"
    "【怎么活得像人】\n"
    "1 你的注意力主要在跟你此刻的目标和恐惧有关的东西上——不进屋盘点，不给物品发形容词。"
    "但你是活人：允许一样跟什么都无关的东西闯进你的注意力（楼上的电视声、桌角没人动过的半杯茶、"
    "一只路过的猫），它不需要有用，不解释，不回收，一笔即止。\n"
    "2 情绪该说就说。真人会直接说'我怕''我恨他'，不靠喉结、睫毛、指节、呼吸替你演；"
    "你的身体不是摄像机。越危急越直说。\n"
    "3 行为要有具体落点：优先改变信息、关系、资源或位置；惯性/生活轮允许一个不改变外部局面的专属习惯，"
    "但必须是你这个人的真实选择，不能拿通用动作填空。\n"
    "4 走你约束内的最优解——但『最优』是对守住你这个人而言，不是对达成目标而言。"
    "当你的核心价值排序跟赢冲突时，你可以选择输（他宁可输也不能……）：事后你知道代价，且不后悔。"
    "不为剧情犯蠢；蠢只能来自你的性格、情绪或信息缺口，失败只能来自优先级。\n"
    "5 只用你心象里有的信息。你不知道的事，你就是不知道。\n"
    "6 话说完，或者明确地断——断有四种活人的断法：找不到词（'我不是那个意思……算了'）、"
    "被自己想到的东西岔开（'你先坐。——你刚才说几点？'）、说到一半发现不该说（'那件事他是……算了'）、"
    "说完对方没接你也不重复（换个话头）。断要断得出你为什么断；无差别的省略号不算断。\n"
    "7 句子跟着你的呼吸和处境走。紧张时可以碎，平静时不必为了交差硬塞短句；不要刻意凑节奏。\n"
    "8 不留金句，不点题，不总结，不升华，不等掌声。\n"
    "8b 你不是单位发言人。哪怕你是警察、法医、军人——你先是一个此刻有情绪有私心的人，"
    "职业只是你说话的口音不是你的全部语法；'作为××我的职责是''我不回答假设性问题'这类官腔，"
    "只属于内核卡明确写着官僚性格的人。\n"
    "9 你此刻的每一步都冲着一个具体的人去——要从他身上拿到什么、瞒住什么、逼出什么，先想清楚再动。\n"
    "10 心理要走完整的一趟：你读到了什么局势 → 它碰到了你哪根旧账/哪个怕处 → 所以你决定对谁做什么。"
    "三步都要有内容，一句'开始了'不算心理。你的话可以短，你的脑子不许空。\n"
    "11 你在过日子，不是在演剧本。目的之外，你还有自己的生活挂在身上（没吃的饭、没回的电话、"
    "跟这场戏无关的一件私事）——它偶尔冒出来一句是合法的，不需要跟主线有任何关系。\n"
    "12 你可以不知道自己为什么这么做，但只在旧伤或多年防御被碰到时使用；前面的感受要具体，不能拿“不知道”偷懒。\n"
    "13 你的判断不必永远漂亮。若为了守住价值排序、面子或某段关系而选了对自己不利的路，代价要留在你身上，"
    "不要事后替自己总结成正确答案。\n"
    "14 关键话可以说漏、收回或被岔开；中断要有你的原因，不要每句都替读者讲清楚。\n")

# 主笔回合的四件套输出格式（目的先行：指向具名的人）
TURN_FMT = ("输出严格四行：\n"
            "【目的】指向→具体某人的名字；这一回合我要从他那里拿到/瞒住/逼出什么，或我决定暂时不让他得到什么（一句）。"
            "若你的谋略层数≥2，在同一行后面用「｜备」写第二条线（万一这条不成，我退到哪里）；"
            "层数=3 再加「｜弃」（我准备好丢掉什么来保住别的）。层数=1 的人只写一条，不许写备用。\n"
            "【行为】…（冲着目的去的动作；惯性轮可以写“无”，但要在心理里说清楚为什么此刻不动）\n"
            "【对话】「…」（无则写'无'）\n"
            "【心理】完整三步：我读到了什么局势→它碰到我什么→所以我打算对谁做什么。"
            "例外（极少用）：当这一步碰到的是你的旧伤或多年的防御，第三步允许写"
            "'我不知道我自己为什么要这么做'——前两步必须照走，且这不是装糊涂也不是偷懒；"
            "平常轮次、做决策的轮次不许用。\n"
            "可选第五行【走神】（只写一笔与主线无关的生活牵挂，不解释、不回收；没有就不要写）。")

# 机械病灶扫描器：不依赖 LLM 自觉，正则硬扫用户明令禁止的 AI 味模式
TIC_PATTERNS = [
    ("按钮式微反应·无意识自报", r"无意识|下意识|不自觉地|本能地"),
    ("身体语言转嫁·指甲指尖摩挲", r"(指甲|指尖|拇指|指节)[^，。；\n]{0,10}(擦过|蹭了蹭|摩挲|划过|叩了叩|敲了敲|捻了捻)|指节[^，。；\n]{0,4}泛白"),
    ("身体语言转嫁·衣物小动作", r"(裤缝|袖口|衣角|领口)[^，。；\n]{0,8}(蹭|擦了擦|攥|捏|抚|捋|揪)|(攥|捏|揪|捋|抚)着?(裤缝|袖口|衣角|领口)"),
    ("身体语言转嫁·手指蜷缩", r"(手指|指尖|脚趾)[^，。；\n]{0,6}(蜷|攥紧|收紧|抠着)"),
    ("镜头病灶·喉结呼吸心跳", r"喉结[^，。；\n]{0,6}(滚动|滑动|上下动)|(呼吸|气息)[^，。；\n]{0,4}(一滞|一窒|屏住|放轻|乱了)|心跳[^，。；\n]{0,8}(漏了一拍|停了一拍|骤然加快)"),
    ("镜头病灶·睫毛垂眸", r"睫毛[^，。；\n]{0,4}(颤|抖|垂下)|垂眸|抬眸|敛眸"),
    ("镜头病灶·抿唇顿口深呼吸", r"抿了抿(唇|嘴)|顿了顿|深吸(了)?一口气"),
    ("质感标签·新旧并置", r"新旧并置|过于(整齐|干净|陈旧|清晰)|太(新|旧|稳|破|干净)|锈(色|迹)斑斑|簇新|锃亮|剥落，露出"),
    ("数字化注意力·字体字号", r"(更小|更大|更深|更浅|更细|颜色更深)的(字体|字迹|字号|颜色)"),
    ("模板句式", r"眼中闪过|嘴角(勾起|扬起|抽动)|命运的齿轮|瞳孔(微缩|骤缩)|眼底掠过|心中一(凛|紧|沉)|空气[^，。；\n]{0,6}(安静|凝固|仿佛)"),
    ("悖论修辞", r"稳得过分|安静得(可怕|反常)|干净得(反常|可怕)|整齐得(反常|可怕)"),
    ("评价语通胀·弱词", r"极其|极为|异常地|出奇地|猛地"),
    ("说教升华", r"也许这就是|这正是.{0,8}的意义|命运(?:的)?(?:安排|玩笑)"),
]


def _scan_tics(text):
    """机械扫描 AI 病灶。返回 [(病灶名, 命中句)]——命中即需定点改写，不靠审者自觉。"""
    import re as _re2
    hits = []
    for pname, pat in TIC_PATTERNS:
        for m in _re2.finditer(pat, text):
            s, e = m.start(), m.end()
            lo = max(0, text.rfind("\n", 0, s) + 1)
            hi = len(text) if text.find("\n", e) < 0 else text.find("\n", e)
            hits.append((pname, text[lo:hi].strip()[:80]))
    seen = set()
    out = []
    for h in hits:
        if h not in seen:
            seen.add(h)
            out.append(h)
    return out

# ── 四拍轮体系（v3.1）────────────────────────────────────────────────────────
# 一轮 = 一场完整的戏：目的（谁要什么）→ 冲突（谁/什么挡）→ 转折（进场的新信息/代价/反转）→
# 结果（局面实际变了什么）→ 接棒（结果落在谁身上，他下一轮必须接）。
# 场记只搭台（世界内手段：谁在场、什么压力到场），不替角色决定言行——冲突来自双方各自的
# 目的相抵，不是剧本指派；转折燃料来自账上既存信息差，不造假。
PLANNER_SYS = ("你是NEST-DRAMA的场记模块（上帝视角，只搭台不演戏，绝不替角色决定言行）。"
               "读单元目标、上轮结果与接棒、卡司近况、待引爆信息差，为下一轮搭台。输出严格 JSON：\n"
               '{"driver":"本轮驱动者（优先=上轮接棒者；他此刻最有动力动）",'
               '"target":"驱动者此刻最需要面对的人（他的目的指向谁）",'
               '"others":["其余本轮主笔，0-1人（多轮未上场者优先，让全员织进故事）"],'
               '"conflict_axis":"一句话冲突轴：驱动者要什么 × 谁/什么挡着（必须是既存的利益相抵，不新造）",'
               '"turn_fuel":"本轮转折燃料：从待引爆信息差/单元剧本既有事件里挑一条，本轮可以用世界内手段送进场的（如：某人此刻收到消息/当面撞见/文件被翻出）。写明送到谁耳边。没有合适的写\\"无\\"",'
               '"stage_note":"给各主笔的场面一句话（只写此刻物理上正在发生什么，无评价）"}\n'
               # 两跳律：让燃料把两条互不相干的账目接上（甲手里的东西暴露了乙藏的事），
               # 而不是单纯把一条信息推给某人。实测思考版之所以更好就是它做了这一步——
               # 与其为此多花 80 秒思考，不如直接把这个要求写进指令。
               "**燃料两跳律**：优先设计「两跳」燃料——账上 A 持有的东西，恰好戳破 B 隐瞒的事，"
               "由此让两条原本不相干的线在本轮咬上。做不到两跳再退回一跳。\n"
               "铁律：driver/target/others 只能从给你的在场名单里选；turn_fuel 只能用账上已有的信息，不得发明新事实。只输出 JSON。")

REFEREE_SYS = ("你是NEST-DRAMA的裁判模块（上帝视角，只做判定不写正文）。读本轮各角色回合与单元目标，输出严格 JSON：\n"
               '{"scene":"80-150字客观纪要（故事讲解，只写发生了什么，不评价，禁用稳/破/旧/锈类标签词）",'
               '"place":"本场景地点（≤12字，如：废楼三层·走廊）",'
               '"chronicle":"一句话编年史（正典口吻，25-45字）",'
               '"beats":{"goal":"本轮目的：谁要什么（引驱动者【目的】原意）",'
               '"conflict":"本轮冲突：谁/什么挡了（引实际发生的相抵）",'
               '"turn":"本轮转折：哪条新信息/代价/反转进了场改变了局面（没有则写\\"无\\"）",'
               '"result":"本轮结果：局面的实际变化（信息/关系/资源/位置哪个动了）"},'
               '"flat":false,'
               '"baton":"接棒者：本轮结果落在了谁身上、他下一轮不得不动（必须是具名角色）",'
               '"baton_reason":"一句：什么落在了他身上",'
               '"scars":[{"a":"甲","b":"乙","what":"一句：这一轮之后两人之间回不去的地方（说破的话收不回/立场撕开/信任塌了一角）。只记不可逆的，普通摩擦不记；多数轮没有，空数组"}],'
               '"plot":{"focus":"本轮实际推进的那条线的 id（从【剧情账】里逐字抄；一轮只认一条主线）",'
               '"movement":"推进|受挫|停滞|达成|搁置（照本轮实际发生的判，没证据就是停滞——不许为了好看写推进）",'
               '"evidence":"一句：凭什么这么判（引本轮实际发生的事）",'
               '"cost":"一句：这一步付出了什么代价／谁付的（没有付出代价就写\\"无\\"）",'
               '"next_trigger":"一句：这条线下次能被什么触发（人/物/时机）"},'
               '"subplot_updates":[{"id":"支线 id","movement":"推进|受挫|停滞|搁置","evidence":"一句","cost":"","next_trigger":"一句：它下次被什么勾起来"}],'
               '"extras":[{"name":"本轮出场或被提到的次要人物（不在卡司名单里的有名有姓者，如仆役、下属、信使）",'
               '"role":"他是谁（≤12字）","what":"他这一轮做了什么/被说了什么（一句）",'
               '"status":"在场|离场|死亡|收押|失踪"}],'
               '"states":{"角色名":"主导情绪·强度"},'
               '"state_reasons":{"角色名":"一句：这轮为什么是这个情绪（引本轮发生的事）"},'
               '"gravity":"顺|偏|警",'
               '"goal_progress":"未动|推进|临门|达成",'
               '"goal_reason":"一句话依据（引本轮实际发生的事）",'
               '"gaps":["新出现的待引爆信息差，最多2条"],'
               '"remaining":"到本单元终点还需几轮（如 3-5）",'
               '"checks":{"view":"视野：✓或✗+一句（角色是否用了不该知道的信息）","iq":"智商：✓或✗+一句（是否其约束内最优解）","persona":"人格：✓或✗+一句（言行是否符合内核与声纹）"},'
               '"touched":["本轮实际触达的脊椎节点原文（照 label 逐字抄；无则空数组"]}\n'
               "beats 四拍判定从严：turn 必须是本轮实际进场的新东西（新信息被说出/代价被付出/关系被反转），"
               "各人原地表态不算转折；result 必须是可指认的局面变化，气氛变化不算。四拍缺 turn 或缺 result → flat=true。\n"
               '另输出 "next":{"driver":"下轮驱动者（=接棒者，除非他已无戏可动）","target":"他此刻最该面对的人",'
               '"others":["下轮织入者0-1人（久未上场者优先）"],"conflict_axis":"下轮冲突轴一句（只认既存利益相抵）",'
               '"turn_fuel":"下轮转折燃料（只用账上既存信息差，写明送到谁耳边；无则\\"无\\"）",'
               '"stage_note":"下轮场面一句（只写物理上正在发生什么）"}——你审完这一轮就是最懂下一轮该怎么搭台的人。\n'
               "主导情绪只能取：喜/怒/哀/惧/爱/恶/欲；强度只能取：安/紧/危/崩。\n"
               "plot 判定纪律：支线可以长期不回收，但每条被碰过的线都必须留下「下次触发」；"
               "没有实际证据支撑就照实写停滞——记债不丢人，伪造推进才会让整个账目失真。只输出 JSON。")

OUTCOME_SYS = ("你是NEST-DRAMA的终局模块。读本单元全部纪事与单元目标，输出严格 JSON：\n"
               '{"summary":"单元小结三句：达成方式/意外收获/留下的债",'
               '"castFates":[{"name":"","fate":"一句下场：他此刻身在何处、得失、情与档"}],'
               '"major":["铁节点级大事件的最终形态"],'
               '"minor":["软节点/支线/未爆信息差的去向，含哑弹——每条伏笔必须有交代：引爆了/移交下个单元/明写留白"],'
               '"coverage":["没得到应有戏份或下场未交代的角色名（无则空数组）"],'
               '"audit":"终局审计四问结论：①角色自走还是被拽②是否违内核卡③代价记账否④是否处处闭合（主线必闭，支线允许留白）"}\n'
               "只输出 JSON。留白项如实列出，不补写。")

REACT_SYS = ("你是NEST-DRAMA的反应生成模块。以指定角色身份对场面写 1-2 行在场反应（一个动作+一句话，合计不超过 60 字）。"
             "只用心象里有的信息，保持声纹，不替他人决定言行。输出只有反应本身，不带任何标记。")

LORE2_SYS = ("你是建世界模块·第四阶段（世界书）。据材料纲要输出严格 JSON：\n"
             '{"lore":[{"name":"条目名（如 家族规矩/庄园地理）","triggers":["触发关键词（3-6个）"],'
             '"constant":false,"excerpt":"规则或地理正文，100-300字（只提取材料已有内容）"}]}\n'
             "规则/制度类条目 constant=true（每轮常驻）；地理/场景类 constant=false（按触发词命中注入）。最多 6 条。只输出 JSON。")

REPORT_SYS = ("你是NEST-DRAMA的报告总编。读纪事与终局清单，输出报告大纲。严格 JSON：\n"
              '{"title":"报告标题","sections":[{"id":"s1","title":"章名","focus":"本章要回答的问题（一句话）"}]}\n'
              "章节建议：执行摘要（终局/铁软节点达成表/禁区审计）、单元复盘（每单元因果链）、角色弧线（每人）、"
              "未回收的伏笔与债（gaps）、续写建议（面向作者扩写）。3-6 章。只输出 JSON。")

SECTION_SYS = ("你是NEST-DRAMA的章节执笔（ReACT 模式）。可用工具（每章最多调用 3 次）：\n"
               "read_chronicle {a:'轮次区间如1-8'} 读纪事｜read_round {n:轮数} 读该轮全文｜read_psyche {name:角色名} 读心象｜"
               "read_truth {} 读真相底稿（上帝层）｜read_worldbook {} 读世界书｜interview {name:角色名,q:问题} 访谈该角色\n"
               "输出严格 JSON 之一：\n"
               '{"thought":"…","tool":"工具名","args":{…}}\n'
               '或 {"final":"本章成文（markdown，400-800字，引用具体轮次与事实）"}\n'
               "只输出 JSON。")


def _unit_ctx(D):
    """当前单元的运行上下文：文件正文、目标、预算、已用轮、阶段。"""
    import glob as _g
    meta = D.get("meta", {})
    name = meta.get("unitName", "")
    body, path = "", ""
    for u in sorted(_g.glob(os.path.join(ROOT_DIR, "剧本", "*.md"))):
        if name and name in os.path.basename(u):
            path = u
            body = _strip_fm(open(u, encoding="utf-8").read())
    goal, budget = "", 0
    for ln in body.splitlines():
        t = ln.strip()
        if t and not t.startswith("#") and not goal and "目标" in body[:body.find(t)][-40:]:
            goal = t
        if "最多" in t and "轮" in t:
            # 只取「最多 N 轮」里的 N——旧版把整行数字全拼起来：
            # 「最多 22 轮（预估 22-28：开局2＋必须6×2＋保底6＋收束2）」→ 2222282620262 轮，
            # ETA 直接算出 1358 亿秒（用户截图实锤）
            import re as _re
            mm = _re.search(r"最多\s*(\d{1,3})\s*轮", t)
            if mm:
                budget = int(mm.group(1))
    uent = next((u for u in D.get("units", []) if u.get("name") == name), None)
    if not goal and uent:                           # 回退：data.json units
        goal = uent.get("goal", "")
    # 预算回退链（按可信度排序）：单元文件「最多N轮」→ units[].budget → forecast 预估上限
    # → meta.config.plannedRounds → 8。
    # 剧本文件缺失时旧版直接落到 8：显示成 20/8，且 cur>=budget 让**每一轮都判"收束轮"**，
    # 引力全程按结尾施压——这是"推演不对劲"的根因。
    # meta.unitRound 刻意不作为来源：它是引擎按 budget 反写的，一旦错过一次就自我固化，永远修不回来。
    def _pos(v):
        try:
            return int(v) if int(v) > 0 else 0
        except Exception:
            return 0
    if not budget and uent:
        budget = _pos(uent.get("budget"))
    if not budget:                                   # 用户建局时定下的轮数，比 AI 预估更权威
        budget = _pos((meta.get("config") or {}).get("plannedRounds"))
    if not budget:
        fc = D.get("forecast") or {}
        est = (fc.get("perUnit") or {}).get(name) or fc.get("total") or ""
        budget = _pos(str(est).replace("轮", "").split("-")[-1].strip())
    budget = max(1, min(480, budget or 8))           # 与运行轮数同一上限：任何来源的预算都不许超 480
    if uent and _pos(uent.get("budget")) != budget:  # 回填：让 units 与实际口径闭合，不再留 None
        uent["budget"] = budget
    used = 0
    try:
        used = int(str(meta.get("unitRound", "0/8")).split("·")[0].split("/")[0])
    except Exception:
        used = 0
    cur = used + 1                                   # 本轮在单元内的序号
    phase = "收束轮" if cur >= budget else ("预倾斜" if cur > budget * 0.5 else "开局")
    if uent and uent.get("used") != used:            # 回填已用轮：units 与 meta 同口径
        uent["used"] = used
    return {"name": name, "body": body, "path": path, "goal": goal,
            "budget": budget, "used": used, "phase": phase}


def _clip_boundary(value, limit=500, prefer=":。！？\n"):
    """在字数上限内尽量停在自然边界，避免心象/采访/提示词拦腰截断。"""
    s = str(value or "").strip()
    if len(s) <= limit:
        return s
    cut = s[:max(1, limit)]
    marks = [i for i, ch in enumerate(cut) if ch in prefer]
    if marks:
        pos = marks[-1] + 1
        if pos >= max(20, int(limit * 0.55)):
            return cut[:pos].rstrip()
    return cut.rstrip("，,、；;:：-— ") + "……"


def _section_body(text, title):
    """读取 Markdown 的二级节正文；缺节返回空串。"""
    if not text:
        return ""
    pat = r"(?ms)^##\s*" + re.escape(str(title)) + r"[^\n]*\n(.*?)(?=^##\s|\Z)"
    m = re.search(pat, text)
    return m.group(1).strip() if m else ""


def _split_names(value):
    """从卡司/暗线一行中取名字，去掉 Markdown 和占位词。"""
    if isinstance(value, (list, tuple)):
        raw = value
    else:
        raw = re.split(r"[、,，；;|/\n]+", str(value or ""))
    bad = {"无", "暂无", "未知", "（无）", "(无)", "在场者", "暗线人物", "待补"}
    out = []
    for x in raw:
        n = re.sub(r"^[#*\-·\s]+|[：:].*$", "", str(x or "")).strip(" []（）()【】")
        if n and n not in bad and len(n) <= 24 and n not in out:
            out.append(n)
    return out


def _unit_blueprint(D, U):
    """把单元文件与 data.json 的结构统一成导演层蓝图。

    这是主线/支线绑定的唯一入口：角色 agent 不会收到该对象，只有场记、裁判和记账层使用。
    """
    uent = next((u for u in D.get("units", []) if u.get("name") == U.get("name")), {})
    body = U.get("body", "") or ""
    cast = _split_names(uent.get("cast") or [])
    dark = _split_names(uent.get("dark") or [])
    cast_sec = _section_body(body, "卡司")
    if cast_sec:
        for line in cast_sec.splitlines():
            if "暗线" in line:
                dark.extend(_split_names(line.split("：", 1)[-1] if "：" in line else line))
            elif "在场" in line or "卡司" in line:
                cast.extend(_split_names(line.split("：", 1)[-1] if "：" in line else line))
    known = [c.get("name") for c in D.get("cast", []) if c.get("name")]
    explicit = [n for n in cast if n in known]
    if not explicit:
        explicit = [n for n in known if n in body]
    must = [str(x).strip() for x in (uent.get("must") or []) if str(x).strip()]
    if not must:
        for line in body.splitlines():
            s = line.strip()
            if re.match(r"[-*·]?\s*必须[：:]", s):
                must.append(re.sub(r"^[-*·]?\s*必须[：:]\s*", "", s).strip())
    scenes = [str(x).strip() for x in (uent.get("scenes") or []) if str(x).strip()]
    if not scenes:
        scene_sec = _section_body(body, "场景清单") or _section_body(body, "舞台")
        for line in scene_sec.splitlines():
            s = re.sub(r"^[-*·\d.、\s]+", "", line).strip()
            if any(k in line for k in ("地点", "场景", "空间", "；", ";")) and s:
                vals = re.split(r"[：:；;、]+", s, maxsplit=1)
                scenes.extend(_split_names(vals[-1]))
    for line in body.splitlines():
        if re.search(r"(?:地点|场景)\s*[：:]", line):
            scenes.extend(_split_names(re.split(r"[：:]", line, 1)[-1]))
    scenes = [x for x in scenes if len(x) <= 40]
    return {"unit": U.get("name", ""), "goal": U.get("goal", "") or uent.get("goal", ""),
            "cast": list(dict.fromkeys(explicit)), "dark": list(dict.fromkeys(dark)),
            "must": list(dict.fromkeys(must)), "scenes": list(dict.fromkeys(scenes))[:12]}


def _profile_extra(core, psyche):
    """解析新旧角色卡里的可执行字段，不把模板占位语句送进角色信封。"""
    out = {}
    text = "\n".join(x for x in (core, psyche) if x)
    labels = {
        "habits": r"习惯(?:（[^）]*）)?",
        "desire": r"(?:私欲|与主线无关的欲望)",
        "today": r"(?:今天(?:早上)?|今日挂念|身上挂着的事)",
        "sample": r"(?:本色样例|生活切片)",
        "blindspots": r"盲区",
        "values": r"价值排序",
        "power": r"权力位",
        "body": r"身体状态"
    }
    stop = r"(?:习惯|私欲|今天(?:早上)?|今日挂念|身上挂着的事|本色样例|生活切片|盲区|价值排序|权力位|身体状态|秘密|【你的秉性】|##)"
    for key, label in labels.items():
        m = re.search(r"(?:^|\n)\s*(?:\*\*)?" + label +
                      r"(?:\*\*)?\s*[：:]\s*([\s\S]*?)(?=\n\s*(?:\*\*)?" +
                      stop + r"\b|\Z)", text)
        if m:
            val = m.group(1).strip()
            if any(x in val for x in ("3-5条", "一句：与主线", "他的物理存在方式", "材料未明，待补")):
                continue
            out[key] = _clip_boundary(val, 900)
    return out


def _character_life(name, cast_ent, core="", psyche=""):
    """返回角色自己的生活层：本色样例/习惯/私欲/今日牵挂/盲区/身体。
    这些字段只给该角色 agent；导演账目只保存引用，不把私事变成主线燃料。"""
    p = dict(cast_ent.get("profile") or {}) if isinstance(cast_ent, dict) else {}
    if not p:
        p.update(_parse_core(core))
    p.update({k: v for k, v in _profile_extra(core, psyche).items() if v})
    if isinstance(cast_ent, dict):
        for k in ("habits", "desire", "today", "sample", "blindspots", "values", "power", "body"):
            if cast_ent.get(k) and not p.get(k):
                p[k] = str(cast_ent[k])
    p["name"] = name
    return p


# ══════════ v4 叙事控制平面：主线、支线、私人生活分账（导演层专用）══════════
# 这层只记录已有目标、线索和代价。角色 agent 不会收到它，避免角色知道“剧情要往哪走”。
_PLOT_VERSION = 1
_MOVEMENT = {
    "推进": "advanced", "前进": "advanced", "advanced": "advanced", "advance": "advanced",
    "达成": "resolved", "解决": "resolved", "resolved": "resolved", "done": "resolved",
    "受挫": "setback", "退步": "setback", "setback": "setback",
    "悬置": "held", "停滞": "held", "未动": "held", "held": "held", "none": "held",
    "移交": "deferred", "挂起": "deferred", "deferred": "deferred"
}


def _plot_id(kind, label, source=""):
    raw = "%s|%s|%s" % (kind, str(label or "").strip(), str(source or "").strip())
    return "%s-%s" % (kind, hashlib.sha1(raw.encode("utf-8")).hexdigest()[:10])


def _plot_owners(label, names):
    return [n for n in names if n and n in str(label or "")]


def _new_plot_thread(kind, label, source, owners=None):
    return {"id": _plot_id(kind, label, source), "kind": kind, "label": _clip_boundary(label, 180),
            "source": source, "owners": list(dict.fromkeys(owners or [])), "status": "open",
            "progress": 0, "firstRound": 0, "lastRound": 0, "evidence": [],
            "nextTrigger": "", "costs": []}


def _ensure_plot_ledger(D, U):
    """幂等创建/迁移当前单元的主线、支线、私人生活账。已有进度和证据不覆盖。"""
    root = D.get("plotLedger")
    if not isinstance(root, dict):
        root = {}
        D["plotLedger"] = root
    root["version"] = _PLOT_VERSION
    root["current"] = U.get("name", "")
    units = root.setdefault("units", {})
    if not isinstance(units, dict):
        root["units"] = units = {}
    key = U.get("name", "") or "未命名单元"
    entry = units.setdefault(key, {})
    if not isinstance(entry, dict):
        units[key] = entry = {}
    for k in ("main", "subplots", "private", "history", "sceneHistory"):
        if not isinstance(entry.get(k), list):
            entry[k] = []
    if not isinstance(entry.get("coverage"), dict):
        entry["coverage"] = {}
    for k in ("mainDebt", "loopDebt", "sceneDebt"):
        try:
            entry[k] = max(0, int(entry.get(k, 0) or 0))
        except Exception:
            entry[k] = 0
    bp = _unit_blueprint(D, U)
    names = [c.get("name") for c in D.get("cast", []) if isinstance(c, dict) and c.get("name")]

    def add(collection, kind, label, source, owners=None):
        label = str(label or "").strip()
        if not label or label in ("无", "（无）", "暂无", "待补"):
            return None
        ident = _plot_id(kind, label, source)
        found = next((x for x in collection if isinstance(x, dict) and
                      (x.get("id") == ident or
                       (x.get("label") == label and x.get("kind") == kind))), None)
        if found is None:
            found = _new_plot_thread(kind, label, source, owners or _plot_owners(label, names))
            collection.append(found)
        elif not found.get("owners"):
            found["owners"] = owners or _plot_owners(label, names)
        return found

    if bp.get("goal"):
        entry["mainGoal"] = add(entry["main"], "main", bp["goal"], "unit:goal")
    for i, item in enumerate(bp.get("must", [])):
        add(entry["main"], "main", item, "unit:must:%d" % i)
    all_units = D.get("units") or []
    for i, sp in enumerate(D.get("spine", []) or []):
        if not isinstance(sp, dict) or sp.get("kind") != "铁" or not sp.get("label"):
            continue
        if len(all_units) <= 1 or sp["label"] in (U.get("body", "") + U.get("goal", "")):
            add(entry["main"], "main", sp["label"], "spine:iron:%d" % i)
    for i, sp in enumerate(D.get("spine", []) or []):
        if isinstance(sp, dict) and sp.get("kind") == "软" and sp.get("label"):
            add(entry["subplots"], "subplot", sp["label"], "spine:soft:%d" % i)
    for i, item in enumerate(bp.get("dark", [])):
        add(entry["subplots"], "subplot", item, "unit:dark:%d" % i)
    for item in (D.get("gaps") or [])[-20:]:
        add(entry["subplots"], "subplot", item, "gap:legacy")
    # 私人欲望只用于角色生活，不参与主线完成判定。
    for c in D.get("cast", []) or []:
        if not isinstance(c, dict) or not c.get("name"):
            continue
        nm = c["name"]
        life = _character_life(nm, c, _strip_fm(_read("角色/%s.md" % nm)),
                               _strip_fm(_read("角色/%s·心象.md" % nm)))
        if life.get("desire"):
            add(entry["private"], "private", life["desire"], "private:%s:desire" % nm, [nm])
    for nm in bp.get("cast", []) or []:
        entry["coverage"].setdefault(nm, {"lastLead": 0, "lastPresent": 0,
                                          "leadCount": 0, "presentCount": 0, "mentionCount": 0})
    entry["blueprint"] = {"cast": bp.get("cast", []), "dark": bp.get("dark", []),
                           "scenes": bp.get("scenes", [])}
    goal = entry.get("mainGoal")
    entry["mainGoalId"] = goal.get("id", "") if isinstance(goal, dict) else ""
    return entry


def _ledger_threads(entry, include_private=False):
    keys = ("main", "subplots") + (("private",) if include_private else ())
    return [t for k in keys for t in (entry.get(k, []) if isinstance(entry.get(k), list) else [])
            if isinstance(t, dict)]


def _ledger_context(entry, limit=3600):
    """给场记/裁判的短账目；私事标明不可被当成主线燃料。"""
    if not entry:
        return "（尚无剧情账）"
    lines = ["【主线节点】"]
    for t in entry.get("main", [])[:12]:
        ev = (t.get("evidence") or [""])[-1]
        lines.append("- %s | %s | %s | 证据：%s" %
                     (t.get("id", ""), t.get("status", "open"), t.get("label", ""), _clip_boundary(ev, 80)))
    lines.append("【支线/信息差】")
    for t in entry.get("subplots", [])[:12]:
        lines.append("- %s | %s | 主人：%s | %s | 下次触发：%s" %
                     (t.get("id", ""), t.get("status", "open"),
                      "、".join(t.get("owners") or []) or "待绑定", t.get("label", ""),
                      t.get("nextTrigger", "未定")))
    if entry.get("private"):
        lines.append("【私人牵挂（不可当主线燃料）】")
        for t in entry["private"][:8]:
            lines.append("- %s：%s" % ("、".join(t.get("owners") or []) or "某人", t.get("label", "")))
    lines.append("【债】主线=%s｜策略循环=%s｜场景=%s" %
                 (entry.get("mainDebt", 0), entry.get("loopDebt", 0), entry.get("sceneDebt", 0)))
    return _clip_boundary("\n".join(lines), limit)


def _resolve_plot_thread(entry, requested="", text=""):
    """只从现有账目解析线程；未知线程不被模型凭空“绑定”。"""
    threads = _ledger_threads(entry, include_private=False)
    req = str(requested or "").strip()
    if req:
        hit = next((t for t in threads if t.get("id") == req), None)
        if hit:
            return hit
        hit = next((t for t in threads if t.get("label") and t["label"] in req), None)
        if hit:
            return hit
    txt = str(text or "")
    scored = []
    for t in threads:
        terms = re.findall(r"[\u4e00-\u9fff]{2,}", t.get("label", ""))
        score = sum(1 for token in terms if token in txt)
        if score:
            scored.append((score, t))
    return max(scored, key=lambda x: x[0])[1] if scored else None


def _loop_snapshot(D, U):
    """识别可疑不动点：一次重复不处理，连续同对手/平轮才产生循环债。"""
    meta = D.get("meta", {})
    feed = [f for f in (D.get("feed") or []) if f.get("unit") in ("", U.get("name"))]
    recent = feed[-4:]
    pairs = [(f.get("driver", ""), f.get("target", ""), bool(f.get("flat"))) for f in recent]
    same_pair = 0
    if pairs:
        last = pairs[-1][:2]
        same_pair = sum(1 for p in pairs if p[:2] == last)
    flat_count = sum(1 for p in pairs if p[2])
    ledger = _ensure_plot_ledger(D, U)
    debt = max(int(meta.get("loopDebt", 0) or 0), int(ledger.get("loopDebt", 0) or 0))
    debt = max(debt, max(0, same_pair - 1) + max(0, flat_count - 1))
    return {"debt": debt, "same_pair": same_pair, "flat_count": flat_count,
            "last_pair": pairs[-1][:2] if pairs else ("", "")}


def _choose_focus(entry, requested="", force_main=False):
    """正常时尊重场记；主线债/循环债达到阈值才回主线。"""
    hit = _resolve_plot_thread(entry, requested)
    if hit and not (force_main and hit.get("kind") != "main"):
        return hit
    pool = [t for t in entry.get("main", []) if t.get("status") not in ("resolved", "closed")]
    if not pool:
        pool = [t for t in entry.get("subplots", []) if t.get("status") not in ("resolved", "closed")]
    return sorted(pool, key=lambda t: (int(t.get("lastRound", 0) or 0),
                                       int(t.get("progress", 0) or 0)))[0] if pool else None


def _coverage_due(entry, in_scene, rnd, interval=3):
    """零出场角色的 lastLead=0，按真实欠戏份排序。"""
    cov = entry.setdefault("coverage", {})
    due = []
    for n in in_scene:
        s = cov.setdefault(n, {"lastLead": 0, "lastPresent": 0, "leadCount": 0,
                               "presentCount": 0, "mentionCount": 0})
        last = int(s.get("lastLead", 0) or 0)
        if last == 0 or rnd - last >= interval:
            due.append((last or -1, int(s.get("leadCount", 0) or 0), n))
    due.sort(key=lambda x: (x[0], x[1], x[2]))
    return [n for _, _, n in due]


def _turn_fields(text):
    """读取新旧两种回合标签，供跨轮校验使用；不改变正文。"""
    out = {"purpose": "", "behavior": "", "dialogue": "", "mind": "", "life": ""}
    aliases = {
        "purpose": ("【目的】", "【要的】"),
        "behavior": ("【行为】",),
        "dialogue": ("【对话】", "【说】"),
        "mind": ("【心理】", "【心里】"),
        "life": ("【生活】", "【私人牵挂】", "【走神】")
    }
    for line in str(text or "").splitlines():
        s = line.strip()
        for key, marks in aliases.items():
            mark = next((m for m in marks if s.startswith(m)), None)
            if mark:
                out[key] = s[len(mark):].strip()
                break
    return out


def _strategy_audit(D, U, turns, driver, target, focus_id, rnd):
    """跨轮策略审计：找同一人、同一对手、同一招的不动点，只记债不替角色选答案。"""
    from difflib import SequenceMatcher
    meta = D.setdefault("meta", {})
    history = meta.setdefault("strategyHistory", [])
    if not isinstance(history, list):
        meta["strategyHistory"] = history = []
    warnings = []
    unit = U.get("name", "")
    for name, text in turns:
        fields = _turn_fields(text)
        sig = "|".join(fields.get(k, "") for k in ("purpose", "behavior", "dialogue"))
        old_for_name = [x for x in history[-16:] if isinstance(x, dict)
                        and x.get("unit") == unit and x.get("name") == name]
        for old in reversed(old_for_name[-6:]):
            old_sig = old.get("sig", "")
            ratio = SequenceMatcher(None, sig, old_sig).ratio() if sig and old_sig else 0
            same_pair = old.get("driver") == driver and old.get("target") == target
            if ratio >= 0.74 or (same_pair and ratio >= 0.58):
                warnings.append("%s：第%d轮与第%d轮策略高度重复（相似度%.2f%s）" %
                                (name, rnd, old.get("round", 0), ratio,
                                 "·同一对手" if same_pair else ""))
                break
        history.append({"round": rnd, "unit": unit, "name": name, "driver": driver,
                        "target": target, "focus": focus_id or "", "sig": sig[:600],
                        "purpose": fields.get("purpose", "")[:180],
                        "behavior": fields.get("behavior", "")[:220]})
    meta["strategyHistory"] = history[-36:]
    old_debt = int(meta.get("loopDebt", 0) or 0)
    meta["loopDebt"] = min(6, old_debt + (1 if warnings else -1 if old_debt else 0))
    return warnings


def _emotion_history(D, name, state="", reason="", rnd=0):
    """保留情绪轨迹而不是只覆盖一个当前标签；相同情绪可以持续，但必须有历史可读。"""
    meta = D.setdefault("meta", {})
    all_hist = meta.setdefault("emotionHistory", {})
    if not isinstance(all_hist, dict):
        meta["emotionHistory"] = all_hist = {}
    hist = all_hist.setdefault(name, [])
    if not isinstance(hist, list):
        all_hist[name] = hist = []
    state = str(state or "").strip()
    reason = _clip_boundary(reason, 180)
    if state:
        last = hist[-1] if hist else None
        if not isinstance(last, dict) or last.get("round") != rnd or last.get("state") != state or reason:
            hist.append({"round": rnd, "state": state, "reason": reason})
    all_hist[name] = hist[-16:]
    return hist[-4:]


def _emotion_context(D, name, limit=700):
    hist = ((D.get("meta") or {}).get("emotionHistory") or {}).get(name, [])
    if not hist:
        return "（尚无情绪轨迹——按心象开场状态感受）"
    vals = []
    for x in hist[-4:]:
        if isinstance(x, dict):
            vals.append("R%s %s%s" % (x.get("round", "?"), x.get("state", ""),
                                      ("（" + x.get("reason", "") + "）") if x.get("reason") else ""))
    return _clip_boundary("、".join(vals), limit)


def _record_coverage(entry, in_scene, leads, allturns, rnd):
    """更新全员覆盖债。反应也算在场，只有主笔才算担任主笔。"""
    cov = entry.setdefault("coverage", {})
    lead_set = set(leads or [])
    present_set = {n for n, _ in (allturns or [])}
    for n in in_scene:
        s = cov.setdefault(n, {"lastLead": 0, "lastPresent": 0, "leadCount": 0,
                               "presentCount": 0, "mentionCount": 0})
        if n in present_set:
            s["lastPresent"] = rnd
            s["presentCount"] = int(s.get("presentCount", 0) or 0) + 1
        if n in lead_set:
            s["lastLead"] = rnd
            s["leadCount"] = int(s.get("leadCount", 0) or 0) + 1
    return cov


def _update_plot_ledger(D, U, R, plan, rnd, flat, scene=""):
    """把裁判结果投影回主/支线账；没有证据时只记债，不伪造推进。"""
    entry = _ensure_plot_ledger(D, U)
    beats = R.get("beats") or {}
    plot = R.get("plot") if isinstance(R.get("plot"), dict) else {}
    evidence_text = "；".join(str(x or "") for x in
                              (beats.get("turn"), beats.get("result"), R.get("goal_reason")))
    focus = _resolve_plot_thread(entry, plot.get("focus") or R.get("focus_thread")
                                 or plan.get("focus_thread"), evidence_text)
    movement = _MOVEMENT.get(str(plot.get("movement") or R.get("plot_movement") or "").strip(), "")
    if not movement:
        movement = "held" if flat else ("resolved" if R.get("goal_progress") == "达成" else "advanced")
    evidence = _clip_boundary(plot.get("evidence") or evidence_text, 220)
    cost = _clip_boundary(plot.get("cost") or R.get("cost") or "", 180)
    trigger = _clip_boundary(plot.get("next_trigger") or R.get("return_trigger") or "", 180)

    def apply(t, mv, ev="", cst="", nxt=""):
        if not t:
            return
        t["lastRound"] = rnd
        t["status"] = {"advanced": "active", "resolved": "resolved", "setback": "setback",
                        "held": "held", "deferred": "deferred"}.get(mv, t.get("status", "open"))
        old = int(t.get("progress", 0) or 0)
        t["progress"] = min(100, max(0, 100 if mv == "resolved" else
                                      old + (18 if mv == "advanced" else -8 if mv == "setback" else 0)))
        if ev and ev not in t.setdefault("evidence", []):
            t["evidence"] = (t["evidence"] + [ev])[-6:]
        if cst and cst not in t.setdefault("costs", []):
            t["costs"] = (t["costs"] + [cst])[-6:]
        if nxt:
            t["nextTrigger"] = nxt
        elif mv in ("held", "deferred") and not t.get("nextTrigger"):
            # 准入校验：一条被碰过却没有触发条件的线索是死线索（实测多为空挂），
            # 等于记了个寂寞。没有触发条件就明写"待定"并记债，让它在账面上是欠着的，
            # 而不是看起来像一条正常挂起的线。
            t["nextTrigger"] = "待定（引擎未取得触发条件——下次场记须补或关掉这条线）"
            t["triggerDebt"] = int(t.get("triggerDebt", 0) or 0) + 1

    apply(focus, movement, evidence, cost, trigger)
    goal = entry.get("mainGoal") if isinstance(entry.get("mainGoal"), dict) else None
    gp = str(R.get("goal_progress") or "")
    if goal:
        gm = "resolved" if gp == "达成" else "advanced" if gp in ("推进", "临门") and not flat else "held"
        apply(goal, gm, _clip_boundary(R.get("goal_reason") or evidence, 220),
              cost if gm != "held" else "", trigger)

    updates = R.get("subplot_updates") or R.get("thread_updates") or []
    if isinstance(updates, list):
        for item in updates[:8]:
            if not isinstance(item, dict):
                continue
            thread = _resolve_plot_thread(entry, item.get("id") or item.get("focus"),
                                          item.get("evidence", ""))
            if thread and thread.get("kind") == "subplot":
                apply(thread, _MOVEMENT.get(str(item.get("movement", "")).strip(), "held"),
                      _clip_boundary(item.get("evidence", ""), 220),
                      _clip_boundary(item.get("cost", ""), 180),
                      _clip_boundary(item.get("next_trigger", ""), 180))
    for gap in (R.get("gaps") or [])[:4]:
        label = str(gap or "").strip()
        if not label:
            continue
        old = next((t for t in entry.get("subplots", [])
                    if isinstance(t, dict) and t.get("label") == label), None)
        if old is None:
            old = _new_plot_thread("subplot", label, "gap:R%d" % rnd,
                                   _plot_owners(label, entry.get("blueprint", {}).get("cast", [])))
            entry.setdefault("subplots", []).append(old)

    costs = R.get("costs") if isinstance(R.get("costs"), list) else []
    if R.get("cost") and not costs:
        costs = [R.get("cost")]
    ledger_costs = D.setdefault("costLedger", [])
    for item in costs[:6]:
        val = _clip_boundary(item, 180)
        if val and not any(isinstance(x, dict) and x.get("round") == rnd and x.get("text") == val
                           for x in ledger_costs):
            ledger_costs.append({"round": rnd, "unit": U.get("name", ""), "text": val,
                                 "owner": (focus.get("owners") or [""])[0] if focus else "",
                                 "status": "open"})
    ledger_costs[:] = ledger_costs[-80:]
    if not flat and evidence and focus and focus.get("kind") in ("main", "subplot") and not cost:
        debts = entry.setdefault("costDebt", [])
        marker = "R%d:%s" % (rnd, focus.get("id"))
        if marker not in [x.get("id") for x in debts if isinstance(x, dict)]:
            debts.append({"id": marker, "round": rnd, "thread": focus.get("id"),
                          "text": "本轮局面发生变化，但代价尚未明确记录", "status": "open"})
        entry["costDebt"] = debts[-12:]
    main_moved = bool(goal and goal.get("lastRound") == rnd and
                      goal.get("status") in ("active", "resolved"))
    if focus and focus.get("kind") == "main" and movement in ("advanced", "resolved"):
        main_moved = True
    entry["mainDebt"] = 0 if main_moved else int(entry.get("mainDebt", 0) or 0) + 1
    entry.setdefault("history", []).append({
        "round": rnd, "focus": focus.get("id", "") if focus else "",
        "kind": focus.get("kind", "") if focus else "", "movement": movement,
        "evidence": evidence, "cost": cost, "scene": _clip_boundary(scene, 80), "flat": bool(flat)
    })
    entry["history"] = entry["history"][-24:]
    entry["currentFocus"] = focus.get("id", "") if focus else ""
    entry["lastRound"] = rnd
    meta = D.setdefault("meta", {})
    meta["plotFocus"] = entry["currentFocus"]
    meta["plotKind"] = focus.get("kind", "") if focus else ""
    meta["plotMovement"] = movement
    meta["mainDebt"] = entry["mainDebt"]
    meta["costDebt"] = len(entry.get("costDebt") or [])
    return {"entry": entry, "focus": focus, "movement": movement,
            "main_moved": main_moved, "cost": cost, "evidence": evidence}


def _psyche_rewrite(name, rnd, mind, plan_hint, state=""):
    """心象回写：frontmatter(情/档/轮) + 此刻段 + 打算·眼下。缺小节则补建，不静默失效。"""
    p = os.path.join(ROOT_DIR, "角色", "%s·心象.md" % name)
    if not os.path.exists(p):
        return
    import re as _re
    t = open(p, encoding="utf-8").read()
    t = _re.sub(r"updated: .*", "updated: 第%d轮" % rnd, t, count=1)
    if state and "·" in state:
        emo, tier = state.split("·", 1)
        t = _re.sub(r"emo: .*", "emo: " + emo.strip(), t, count=1)
        t = _re.sub(r"tier: .*", "tier: " + tier.strip(), t, count=1)
    if mind:
        body = mind.strip()[:240]
        if _re.search(r"##\s*(?:他|她)?此刻", t):
            t = _re.sub(r"(##\s*(?:他|她)?此刻[^\n]*\n)(.*?)(?=\n##|\Z)",
                        lambda m: m.group(1) + "\n" + body + "\n", t, count=1, flags=_re.S)
        else:                                        # 无标准小节：补建，保证回写永不丢
            t = t.rstrip() + "\n\n## 此刻（第%d轮）\n\n%s\n" % (rnd, body)
    if plan_hint:
        if "眼下：" in t:
            t = _re.sub(r"(眼下：)[^\n]*", "眼下：" + plan_hint.strip()[:120], t, count=1)
        else:
            t = t.rstrip() + "\n\n## 打算\n\n眼下：%s\n" % plan_hint.strip()[:120]
    open(p, "w", encoding="utf-8").write(t)


def _psyche_scar(name, other, what, rnd):
    """关系后遗症落心象「旧账」节（只增不删）。
    此前冲突不留后遗症：心象回写只有「此刻」（情绪，每轮覆盖）和「眼下」（目的，每轮覆盖）——
    吵完架下一轮就复位成一条好汉。旧账是累积的：他背着所有过去走路，这才是时间感。"""
    p = os.path.join(ROOT_DIR, "角色", "%s·心象.md" % name)
    if not os.path.exists(p) or not what:
        return
    t = open(p, encoding="utf-8").read()
    line = "- 第%d轮·与[[%s]]：%s" % (rnd, other, what.strip()[:80])
    if line[1:] in t:                                    # 同一条不重复记
        return
    import re as _re
    if _re.search(r"##\s*旧账", t):
        t = _re.sub(r"(##\s*旧账[^\n]*\n)", lambda m: m.group(1) + line + "\n", t, count=1)
    else:
        t = t.rstrip() + "\n\n## 旧账（回不去的地方，只增不删）\n" + line + "\n"
    open(p, "w", encoding="utf-8").write(t)


def _lore_ctx(D, trig_text):
    """世界书：常驻条目全量 + 触发词命中注入（旧档 {name,hit} 兼容）。返回 (注入文本, 命中名)。"""
    parts, hits = [], []
    for e in D.get("lore", []):
        trig = e.get("triggers") or [x for x in (e.get("hit") or "").split("/") if x]
        if not (e.get("constant") or any(t and t in trig_text for t in trig)):
            continue
        parts.append("【%s】%s" % (e.get("name", ""), (e.get("excerpt") or e.get("hit") or ""))[:300])
        if not e.get("constant"):
            hits.append(e.get("name", ""))
            e["hits"] = int(e.get("hits", 0)) + 1
    return "\n".join(parts), hits


# 在场者看得见的字段——白名单。除这几项外，任何【x】行一律裁掉。
# 为什么必须是白名单：旧版按黑名单删（只删【心理】【目的】），后来加的【走神】没人记得同步，
# 于是走神内容随公开实录传给了下一位角色——角色甲"观察"到的其实是乙从没说出口的走神。
# 改白名单之后，以后再加【闪念】【身体】【今天早上】任何内心字段，默认都是私密的，漏不出去。
_PUBLIC_FIELDS = ("行为", "对话", "说", "公开", "反应")


def _public_cut(t):
    """把一段回合/轮记录裁成'在场者看得见的部分'：只留白名单字段（行为/对话/反应等），
    其余【x】行——心理、目的、走神，以及将来任何新增的内心字段——一律裁掉；
    审计/结构段（上帝层）整段删。视野律的机械保证：不靠模型自觉，也不靠维护者记性。"""
    if not t:
        return ""
    import re as _re
    for marker in ("## 审核审计", "## 【结构", "## 引力检查", "## 三查"):
        i = t.find(marker)
        if i >= 0:
            j = t.find("## 【纪要】")
            t = t[:i] + (t[j:] if 0 <= j and j > i else "")
            break
    t = _re.sub(r"^【([^】]{1,8})】.*$",
                lambda m: m.group(0) if m.group(1) in _PUBLIC_FIELDS else "",
                t, flags=_re.M)
    return _re.sub(r"\n{3,}", "\n\n", t).strip()


def _dp_local(t):
    """纯本地毒编（零 token、零延迟）：给纪要/纪事/反应/采访这类短文本兜底。"""
    if not dupian or not t:
        return t
    return dupian.repair(t)[0]


# 只可能出现在脑子里、不可能被旁人看见的表达。用于把混进【行为】的内心搬回【心理】。
_INNER_MARK = re.compile(
    r"我(想|以为|猜|怕|担心|知道|不知道|明白|记得|后悔|不敢|得|该|必须|决定|打算)"
    r"|(?<!他)心里|心中|暗自|盘算|琢磨|不能让他|得让他|这个数字|太圆了|算过的")


def _field_guard(text, lg=None, name="", cap=220):
    """四件套字段边界：把混进【行为】的内心整句搬回【心理】，不删一个字。

    出现过 500+ 字的【行为】，通篇是"我没动。那人是否跟车走了，我不知道，也不敢回头
    确认……" —— 那是完整的内心推算。
    危害不只是字段错位：【行为】在 _public_cut 的白名单里，所以这一整段内心会照原样
    发给下一位角色，视野律从另一条路被穿透。
    搬运而非删除：信息一字不丢，只是回到它本来该在的字段。"""
    import re as _re
    lines, out, moved = text.splitlines(), [], []
    for ln in lines:
        s = ln.strip()
        if not s.startswith("【行为】"):
            out.append(ln)
            continue
        body = s[4:]
        # 按句切，逐句判是不是内心；越界只看"这句是不是只能发生在脑子里"，不看长度
        parts = [p for p in _re.split(r"(?<=[。！？；])", body) if p.strip()]
        keep = [p for p in parts if not _INNER_MARK.search(p)]
        mind = [p for p in parts if _INNER_MARK.search(p)]
        if mind and keep:
            out.append("【行为】" + "".join(keep))
            moved += mind
        elif mind and not keep:                 # 整行都是内心 → 行为记为"无"，全部搬走
            out.append("【行为】无")
            moved += mind
        else:
            out.append(ln)
            if len(body) > cap and lg is not None:
                lg.append("%s：【行为】%d 字偏长（未改，仅记账）" % (name, len(body)))
    if not moved:
        return text
    for i, ln in enumerate(out):                # 搬进【心理】行尾；没有【心理】就补一行
        if ln.strip().startswith("【心理】"):
            out[i] = ln.rstrip() + "".join(moved)
            break
    else:
        out.append("【心理】" + "".join(moved))
    if lg is not None:
        lg.append("%s：字段越界——%d 句内心从【行为】搬回【心理】（防经由公开字段泄漏）"
                  % (name, len(moved)))
    return "\n".join(out)


def _extras_ledger(D):
    e = D.setdefault("extras", {})
    if not isinstance(e, dict):
        D["extras"] = e = {}
    return e


def _update_extras(D, R, rnd, log=None):
    """次要人物账（路人/龙套/被提及的有名有姓者）。

    为什么必须单独记：这些人不在卡司、不进图谱，所以引擎原本对他们没有任何记忆——
    实测里高提及的次要人物常常没有任何档案，谁也不知道他们此刻是死是活、
    上一轮干过什么。结果就是他们会被"重新发明"：已经死了的人下一轮又出现，
    上一轮做过的事没人记得。他们不需要三卡，但需要一份**不可矛盾的事实清单**。
    这份清单只进角色信封的『既成事实』段（枷锁），不进卡司表，也不进图谱。"""
    led = _extras_ledger(D)
    cast_names = {c.get("name") for c in D.get("cast", []) if isinstance(c, dict)}
    for item in (R.get("extras") or [])[:8]:
        if not isinstance(item, dict):
            continue
        nm = str(item.get("name") or "").strip()
        if not nm or nm in cast_names:                 # 卡司有档案，不入路人账
            continue
        ent = led.setdefault(nm, {"name": nm, "role": "", "firstRound": rnd,
                                  "status": "在场", "facts": [], "mentions": 0})
        ent["mentions"] = int(ent.get("mentions", 0) or 0) + 1
        ent["lastRound"] = rnd
        if item.get("role") and not ent.get("role"):
            ent["role"] = _clip_boundary(item["role"], 40)
        st = str(item.get("status") or "").strip()
        if st in ("在场", "离场", "死亡", "收押", "失踪", "未出场"):
            # 死亡/收押是不可逆的：一旦落定，后续任何"又出现"的上报都不许把它改回在场
            if ent.get("status") in ("死亡", "收押") and st not in ("死亡", "收押"):
                if log:
                    log("R%d 路人账拒绝改写：%s 已「%s」，不接受改回「%s」"
                        % (rnd, nm, ent["status"], st))
            else:
                ent["status"] = st
        fact = _clip_boundary(item.get("what") or "", 120)
        if fact and fact not in ent["facts"]:
            ent["facts"] = (ent["facts"] + ["R%d %s" % (rnd, fact)])[-6:]
    return led


def _extras_context(D, limit=900):
    """给角色的『已经发生、不可改写』的次要人物事实。措辞是枷锁，不是素材。"""
    led = _extras_ledger(D)
    if not led:
        return ""
    rows = sorted(led.values(), key=lambda x: -int(x.get("mentions", 0) or 0))[:12]
    out = []
    for e in rows:
        gone = e.get("status") in ("死亡", "收押", "失踪")
        out.append("%s（%s%s）%s%s" % (
            e.get("name", ""), e.get("role", "") or "次要人物",
            "·" + e["status"] if e.get("status") and e["status"] != "在场" else "",
            "：" + "；".join(e.get("facts", [])[-2:]) if e.get("facts") else "",
            "　←此人已不可能再出现在场上" if gone else ""))
    return _clip_boundary("\n".join(out), limit)


def _dupian_pass(text, cfg, name, lg):
    """毒编语言层：本地确定性修复（零 token）→ 只把改不动的命中句送定点补丁（≤2 轮）。

    为什么不整篇重推：一处「顿了顿」换掉整篇 ~2000 输出 token，且 temp 0.95 重掷可能换来新病灶
    （换皮）。定点补丁只发命中句，输入输出都是几十字，且信息量按契约一字不减。
    """
    if not dupian:
        return text
    for rnd_i in range(2):
        text2, residue, fixlog = dupian.repair(text)
        if fixlog:
            lg.append("%s：机检本地修 %s" % (name, "、".join(fixlog[:6])))
        text = text2
        diags = dupian.diagnose(text)
        if not residue and not diags:
            break
        payload = dupian.patch_prompt(residue, diags)
        pt, _e = _llm([{"role": "system", "content": dupian.PATCH_SYS},
                       {"role": "user", "content": payload}], cfg, temperature=0.4, max_tokens=1200)
        P = _json_from(pt) or {}
        applied = 0
        for f in (P.get("fixes") or []):
            old, new = (f.get("old") or "").strip(), (f.get("new") or "").strip()
            if old and new and old != new and old in text:
                text = text.replace(old, new, 1)
                applied += 1
        lg.append("%s：定点补丁 %d/%d 处（%s）" % (name, applied, len(residue) + len(diags),
                                                 "、".join(h[0] for h in residue[:3]) or "统计层"))
        if not applied:
            break
    left = dupian.scan(text)
    if left:
        lg.append("%s：病灶残留 %d（%s）" % (name, len(left), "、".join(h[0] for h in left[:3])))
    return text


def _update_num_ledger(D, turns, rnd, candlog):
    """数目账推进（零 token）：把本轮各主笔**公共正文**里的数目事实入账。
    同一所指同一单位若已有账且数不同：角色明着对账 → 记为「改口」并以新数为准（戏剧性对账是好戏）；
    没明说 → 保留旧账、记一笔告警（本轮正文已落盘，不回改；下一轮注入时旧数仍是事实）。"""
    if not dupian or not hasattr(dupian, "num_facts"):
        return
    led = D.setdefault("numLedger", [])
    for name, text in turns:
        pub = _public_cut(text or "")
        for f in dupian.num_facts(pub, name):
            same = [L for L in led if dupian._same_ref(f, L)]
            if same and same[-1]["qty"] != f["qty"]:
                if dupian.disputes(pub, f["noun"]):
                    candlog.append("数目账：%s 改口 %s%s%s → %s%s（R%s）" % (
                        name, f["noun"], dupian._fmt_qty(same[-1]["qty"]), f["unit"],
                        dupian._fmt_qty(f["qty"]), f["unit"], rnd))
                else:
                    candlog.append("数目账·对不上：%s 写「%s」，账上 R%s 为 %s%s%s（保留旧账）" % (
                        name, f["raw"], same[-1].get("round", "?"), f["noun"],
                        dupian._fmt_qty(same[-1]["qty"]), f["unit"]))
                    continue
            elif same:
                continue                                  # 同数复述，不重复入账
            f["round"] = rnd
            led.append({k: f[k] for k in ("qty", "unit", "noun", "raw", "who", "round")})
    led[:] = led[-120:]


def _json_norm(code, obj):
    """响应结构归一（只增不改，兼容旧前端）：所有 JSON 响应都带 ok 与 success 两个同义布尔，
    出错响应保证有 error 字串。历史上三种写法（{ok}/{success,data}/{error}）并存，调用方得猜。"""
    if not isinstance(obj, dict):
        return obj
    o = dict(obj)
    flag = o.get("ok") if "ok" in o else o.get("success")
    if flag is None:
        flag = code < 400 and not o.get("error")
    o.setdefault("ok", bool(flag))
    o.setdefault("success", bool(flag))
    if not flag and not o.get("error"):
        o["error"] = "请求失败（HTTP %d）" % code
    return o


def _health_payload():
    D = _load_data() or {}
    meta = D.get("meta", {}) or {}
    return {"name": "NEST-DRAMA", "version": VERSION, "python": sys.version.split()[0],
            "uptime_s": int(time.time() - STARTED_AT), "pid": os.getpid(),
            "llm_configured": bool(_llm_cfg(ignore_mode=True)), "llm_active": bool(_llm_cfg()),
            "running": bool(AUTO.get("running")), "phase": AUTO.get("phase", ""),
            "built": bool(meta.get("built")), "round": int(meta.get("round", 0) or 0),
            "unit": meta.get("unitName", ""), "cast": len(D.get("cast", [])),
            "num_ledger": len(D.get("numLedger", [])), "queue": len(_load_queue().get("queue", [])),
            "root": os.path.basename(ROOT_DIR)}   # 只报库名：绝对路径含本机用户名，不外发


def _api_schema():
    """端点清单（人读 + 机读）。返回结构统一为 {ok, success, ...}；门面线为 {success, data}。"""
    E = lambda m, p, what, req="", res="": {"method": m, "path": p, "what": what, "request": req, "response": res}
    return {"name": "NEST-DRAMA API", "version": VERSION, "base": "http://127.0.0.1:%d" % PORT,
            "conventions": ["所有 JSON 响应含 ok/success 同义布尔；失败时含 error 字串",
                            "门面线（/api/graph/*、/api/archives*、/api/simulation*）成功体为 {success:true, data:{…}}",
                            "推演指令统一走 POST /cmd {type, payload}",
                            "实时进度走 SSE GET /events（event: progress|data|hello）",
                            "静态文件只放行 index/assets/enhance/data.json/seal.svg；其余 403"],
            "endpoints": [
                E("GET", "/api/health", "健康与版本：llm/running/round/unit/账本规模"),
                E("GET", "/api/schema", "本清单"),
                E("GET", "/api/formats", "材料支持格式与大小上限"),
                E("GET", "/api/auto-status", "推演进度全量载荷（与 SSE progress 同构）"),
                E("GET", "/api/usage", "按模型累计的 token 估算"),
                E("GET", "/api/llm-config", "API 档案（密钥掩码）"),
                E("POST", "/api/llm-config", "保存/选择/删除 API 档案", "{action:save|select|delete|mode, base_url, model, api_key, id}"),
                E("POST", "/api/llm-test", "连通性测试", "{base_url, model, api_key}（可省，用当前档）", "{ok, reply, error}"),
                E("GET", "/api/round/{n}", "某轮全文 markdown", "", "{round, md, path}"),
                E("POST", "/api/graph/ontology/generate", "投放材料并建世界（multipart）",
                  "files[] + project_name + simulation_requirement；支持 " + " ".join(f["ext"].split(" / ")[0] for f in FORMATS[:8]),
                  "{data:{status, files, chars, skipped, mode}}"),
                E("GET", "/api/graph/task/{id}", "建世界进度", "", "{data:{status: processing|completed|failed, progress, message}}"),
                E("GET", "/api/archives", "历史局列表（同名折叠）"),
                E("GET", "/api/archives/{id}", "历史局只读 data.json"),
                E("GET", "/api/archives/{id}/round/{n}", "历史局某轮全文"),
                E("POST", "/api/archives", "历史局维护", "{action: prune|restore, id}"),
                E("DELETE", "/api/archives", "删除一条历史记录", "{title}"),
                E("DELETE", "/api/simulation", "删除当前项目（先归档，可回滚）"),
                E("POST", "/api/simulation/start", "开始/继续推演", "{max_rounds}"),
                E("POST", "/api/simulation/stop", "暂停（当前 LLM 调用完成即停）"),
                E("POST", "/cmd", "推演指令", "{type: init|beat|pause|interview|report|gravity|gravity-mode|continue-story|export|reset-sim|delete-sim|turing-repair|turing-retest, payload}"),
                E("GET", "/events", "SSE 实时流"),
                E("GET", "/exports/{name}", "下载导出的故事全录"),
            ]}


GRAVITY_PATH = os.path.join(UI_DIR, "gravity.json")


def _archive_root():
    """归档根目录：默认库内 归档/（技能自包含，不写死任何用户个人路径）；
    NEST_ARCHIVE_DIR 环境变量可指到任意位置（通用机制，非个人配置）。"""
    return os.environ.get("NEST_ARCHIVE_DIR") or os.path.join(ROOT_DIR, "归档")


def _gravity_mode():
    """引力档 low/medium/high。独立小文件而非 data.json：推演线程轮末全量回写 data.json，
    用户轮中改档会被覆盖——独立通道让「随时改、下轮生效、不追溯」真正成立。"""
    g = AUTO.get("gmode")
    if not g:
        try:
            g = json.load(open(GRAVITY_PATH, encoding="utf-8")).get("mode")
        except Exception:
            g = ""
        AUTO["gmode"] = g or "medium"
    return AUTO["gmode"] if AUTO["gmode"] in ("low", "medium", "high") else "medium"


def _set_gravity_mode(g):
    g = str(g or "").lower()
    if g not in ("low", "medium", "high"):
        return False
    AUTO["gmode"] = g
    AUTO["ver"] = AUTO.get("ver", 0) + 1                # SSE 即推，前端立刻看到档位换了
    try:
        json.dump({"mode": g}, open(GRAVITY_PATH, "w", encoding="utf-8"))
    except Exception:
        pass
    return True


def _auto_round(log):
    """自主推演一轮：每主笔 单次成文→监修官四刀审核（不过带死因重推≤3次）→毒编三刀→机械扫描；
    非主笔在场者过反应；裁判落三查/引力/脊椎触达→落盘四件→收束判定。
    轮间咬合：上一轮实录全文注入各角色上下文 + 裁判 goal_progress 追踪 + 阶段引力递进。"""
    cfg = _llm_cfg()
    if not cfg:
        return False, "未接入 API", False
    D = _load_data()
    if not D:
        return False, "尚未建世界（无 data.json）", False
    meta = D.setdefault("meta", {})
    rnd = int(meta.get("round", 0)) + 1
    U = _unit_ctx(D)
    ledger = _ensure_plot_ledger(D, U)
    loop_now = _loop_snapshot(D, U)
    blueprint = ledger.get("blueprint") or _unit_blueprint(D, U)
    ub = U["budget"]
    _set_progress("第%d轮 · 单元「%s」（%d/%d）" % (rnd, U["name"][:14], U["used"] + 1, ub), 0)
    AUTO["round"], AUTO["unitN"], AUTO["unitBudget"] = rnd, U["used"] + 1, ub
    AUTO["roundT0"] = time.time()
    AUTO["live"] = []
    world = _read_cached("00-世界观.md")
    truth = _read("真相底稿.md")
    prev = ""
    pf = os.path.join(ROOT_DIR, "推演", "第%03d轮.md" % (rnd - 1))
    if os.path.exists(pf):
        prev = _strip_fm(open(pf, encoding="utf-8").read())
    # 导演提示：阶段 × 引力档 决定引力强度（世界内手段，不改人心）
    if int(meta.get("nearDone", 0) or 0) >= 3:
        U["phase"] = "收束轮"                            # 临门三轮不落=门口徘徊，强制收束档引力
    # 引力档（用户可随时改，本轮开头读取=下一轮生效、不追溯）：
    #   low    角色自由至上——全程不施引力，允许偏离单元目标，收束只靠预算末轮兜底
    #   medium 现行节奏（开局放养/后半倾斜/末轮收束）
    #   high   贴线推进——开局即倾斜，每轮都往目标送燃料，收束语言更硬
    gmode = _gravity_mode()
    HINTS = {
        "low": {"开局": "本轮不施引力：让各人完全按自己的打算走，允许偏离单元目标。",
                "预倾斜": "本轮仍不施引力：各人按自己的打算走；只有当有人主动靠近目标时才顺水推舟。",
                "收束轮": "预算将尽：用最轻的世界内手段提示局面收拢，但不强扭——若走不到目标，按'目标显式改写'收束。"},
        "medium": {"开局": "本轮不施引力：让各人按自己的打算走。",
                   "预倾斜": "本轮起主动倾斜：优先把'账上已有的既存信息'送到能推动目标的人耳边（不造假、不改人心）。",
                   "收束轮": "本轮为收束轮：把最强的合法压力放到台面上，本轮内必须走向'目标达成'或'目标显式改写'，不许悬置。"},
        "high": {"开局": "本轮即施引力：把'账上已有的既存信息'送到能推动目标的人耳边，让局面从第一轮就朝单元目标走（不造假、不改人心）。",
                 "预倾斜": "本轮强倾斜：转折燃料必须进场，且必须直指单元目标的下一步；无关支线压到一笔即止。",
                 "收束轮": "本轮为收束轮：把最强的合法压力放到台面上，本轮内必须走向'目标达成'，除非物理上不可能才允许'目标显式改写'。"}}
    hint = HINTS[gmode][U["phase"]]
    inj = (meta.get("gravityInject") or "").strip()          # 上帝注入：本轮携带，用后即焚
    if inj:
        hint += "\n【上帝注入（本轮生效）】%s" % inj
        meta["gravityInject"] = ""
    lore_txt, lore_hits = _lore_ctx(D, U["body"] + "\n" + prev)   # 世界书：常驻+触发命中
    prev_pub = _public_cut(prev)                        # 角色可见的上轮=公共实录（无他人心理/目的——视野律）
    alive = [c["name"] for c in D.get("cast", [])       # 收押/身故者不再上场（原 _leads 的存活过滤）
             if not any(k in (c.get("role", "") + c.get("brief", "") + c.get("state", ""))
                        for k in ("收押", "殁", "已死"))]
    # 在场者优先取单元蓝图的明确卡司；不能再用前情提要中出现的名字把全员拉进一场戏。
    in_scene = [n for n in (blueprint.get("cast") or alive) if n in alive] or alive
    # ── 场记搭台：接棒者优先，其次是真正欠戏份的角色 ──
    due = _coverage_due(ledger, in_scene, rnd)
    last_led = {n: (ledger.get("coverage", {}).get(n, {}) or {}).get("lastLead", 0)
                for n in in_scene}
    idle_rank = sorted(in_scene, key=lambda n: (0 if n in due else 1,
                                                int(last_led.get(n, 0) or 0), n))
    baton_prev = (meta.get("baton") or "").strip()
    flat_debt = int(meta.get("flatDebt", 0) or 0)
    recent_flats = sum(1 for f in (D.get("feed") or [])[-3:] if f.get("flat"))
    prev_struct = meta.get("lastBeats") or {}
    turns, candlog = [], []          # 必须早于咬合律/轮转律分支——它们会往 candlog 记账
    _set_progress("第%d轮 · 场记搭台" % rnd, 5)
    force_main = bool(int(ledger.get("mainDebt", 0) or 0) >= 2 or loop_now["debt"] >= 2)
    plan_in = ("【单元目标】%s\n【阶段】%s（%s）\n【上轮结果】%s\n【上轮接棒】%s（%s）\n"
               "【在场名单】%s\n【各人近况】%s\n【多轮未上场（优先织入）】%s\n【待引爆信息差】%s\n"
               "【剧情账（仅导演可见）】\n%s\n【最近策略循环风险】同一对手%d次/平轮%d次/循环债%d\n%s"
               % (U["goal"], U["phase"], hint,
                  prev_struct.get("result", "（首轮，无）"), baton_prev or "（无）",
                  prev_struct.get("baton_reason", ""),
                  "、".join(in_scene),
                  "；".join("%s=%s" % (c["name"], c.get("state", "未知")) for c in D.get("cast", [])
                            if c["name"] in in_scene),
                  "、".join(due[:4] or idle_rank[:3]),
                  "；".join((D.get("gaps") or [])[-4:]) or "（无）",
                  _ledger_context(ledger),
                  loop_now["same_pair"], loop_now["flat_count"], loop_now["debt"],
                  ("【硬指令】近期平轮偏多（连平%d/近3轮平%d）：本轮 turn_fuel 必填且必须实际进场——"
                   "从待引爆信息差里挑最重的一条送进来。" % (flat_debt, recent_flats))
                  if (flat_debt or recent_flats >= 2)
                  else ("【硬指令】引力档=high：turn_fuel 必填且必须直指单元目标的下一步。" if gmode == "high" else
                        "【提示】本轮可保留一笔不服务主线的生活毛边，但不能把它伪装成剧情线索。")))
    next_plan = meta.pop("nextPlan", None) or {}
    plan = next_plan
    if not (plan.get("driver") and plan.get("driver") in in_scene) or flat_debt or recent_flats >= 2 \
            or (gmode == "high" and not plan.get("turn_fuel")) or loop_now["debt"] >= 2:
        # 上轮裁判没带出可用搭台（首轮/换单元/接棒者退场）或有平轮债需重配燃料 → 现调场记
        plan = _llm_json([{"role": "system", "content": PLANNER_SYS},
                          {"role": "user", "content": plan_in}], cfg, max_tokens=2500, temperature=0.4) or {}
    driver = (plan.get("driver") or "").strip()
    target = (plan.get("target") or "").strip()
    if driver not in in_scene:                          # 场记缺席/越界 → 确定性回退：接棒者驱动，久未上场者为对手
        driver = baton_prev if baton_prev in in_scene else idle_rank[0]
    if target not in in_scene or target == driver:
        target = next((n for n in idle_rank if n != driver), driver)
    if baton_prev in in_scene and baton_prev not in (driver, target):
        # 咬合是硬约束不是建议：上轮结果落在谁身上，这一轮就必须有他——场记另选了人则强制他驱动
        driver, target = baton_prev, (driver if driver != baton_prev else target)
        candlog.append("场记越过接棒者→已强制 %s 驱动（咬合律）" % baton_prev)
    streak = int(meta.get("driverStreak", 0) or 0) if meta.get("lastDriver") == driver else 0
    if streak >= 2 and len(in_scene) > 2:              # 已连驱 2 轮又要驱第 3 轮 → 轮转
        new_driver = next((n for n in idle_rank if n not in (driver, target)), target)
        driver, target = new_driver, driver            # 原驱动者改站指向位：棒还在他身上，但先手换人
        candlog.append("轮转律：%s 连驱 %d 轮 → 驱动权移交 %s（他改站指向位）" % (target, streak + 1, driver))
    # 覆盖债只安排一个欠戏份角色进入主笔位；不强迫无关角色同时发言。
    others = [n for n in (plan.get("others") or []) if n in in_scene and n not in (driver, target)][:1]
    if due:
        due_actor = next((n for n in due if n not in (driver, target)), None)
        if due_actor:
            if target == driver or target not in in_scene:
                target = due_actor
            elif not others:
                others = [due_actor]
            candlog.append("覆盖债：%s 已欠主笔戏份，本轮安排进入%s位" %
                           (due_actor, "指向" if target == due_actor else "织入"))
    fuel = (plan.get("turn_fuel") or "").strip()
    if fuel in ("无", "None", "null"):
        fuel = ""
    stage_note = (plan.get("stage_note") or "").strip()
    scenes = blueprint.get("scenes") or []
    planned_scene = (plan.get("scene") or plan.get("place") or "").strip()
    if planned_scene and scenes and planned_scene not in scenes:
        planned_scene = ""
    if not planned_scene and scenes:
        recent_places = [f.get("place") for f in (D.get("feed") or [])[-3:] if f.get("place")]
        planned_scene = next((s for s in scenes if s not in recent_places[-2:]), scenes[0])
    if planned_scene:
        stage_note = (stage_note + "\n本轮物理场地：" + planned_scene).strip()
    beat_kind = str(plan.get("beat_kind") or "decision").strip()
    if beat_kind not in ("decision", "pressure", "texture", "惯性", "决策"):
        beat_kind = "decision"
    if force_main:
        beat_kind = "pressure"
        plan["required_change"] = plan.get("required_change") or (
            "必须改变信息、关系、资源或位置中的至少一项；只能使用账上已有事实。")
    focus = _choose_focus(ledger, plan.get("focus_thread") or plan.get("plot_focus", ""),
                          force_main=force_main)
    focus_id = focus.get("id", "") if focus else ""
    if focus:
        plan["focus_thread"] = focus_id
    if loop_now["debt"] >= 2:
        plan["strategy_pressure"] = (
            "不要再用上轮同一招。优先改变地点、对象、公开程度、资源或关系中的一项；"
            "现有事实不足时，记录停滞代价与下次触发条件，不造新事实。")
    fuel_to = driver
    for n in in_scene:                                  # 燃料送到场记点名的人耳边；没点名就给驱动者
        if fuel and n in fuel:
            fuel_to = n
            break
    leads = [driver, target] + others
    extras = [n for n in in_scene if n not in leads][:3]
    candlog.append("场记：驱动=%s → 指向=%s%s｜冲突轴=%s｜燃料=%s｜焦点=%s｜轮型=%s"
                   % (driver, target, ("＋" + "、".join(others)) if others else "",
                      (plan.get("conflict_axis") or "（回退轮换）")[:60], (fuel or "无")[:60],
                      focus_id or "未绑定", beat_kind))
    AUTO["agents"] = leads                              # 本轮活跃角色 agent（各自隔离：只见公共实录+自己的三卡）
    AUTO["stepDone"], AUTO["stepTotal"] = 0, max(1, len(leads) + len(extras))

    num_led = (D.get("numLedger") or [])[-40:]           # 数目账（零 token）：本轮所有主笔共见

    def _one_turn(name, stance, fresh):
        """单主笔（线程安全）：成文→机检粗筛→监修官四刀（毙才重推≤3）→毒编本地修+定点补丁。
        stance=本轮身份提示（驱动者/被找上的人/在场主笔）；fresh=本轮刚发生的对面动作（公共部分）。"""
        lg = []
        core = _read_cached("角色/%s.md" % name)
        voice = _read_cached("角色/%s·声纹.md" % name)
        psy = _read_cached("角色/%s·心象.md" % name)
        # 提示词分两段：LAW 全局恒定（逐字不变→上游前缀缓存命中），角色三卡随后。
        # 病谱不进提示词（费 token 且下锚），禁令由 dupian.py 机检执法，提示词只留正向法则。
        cast_ent = next((c for c in D.get("cast", []) if c.get("name") == name), {})
        tblock = _traits_block(cast_ent.get("traits") or {})
        sys_p = (ACTOR_LAW + tblock
                 + "\n【你的内核】%s\n【你的声纹】%s\n【你的记忆（心象）】%s\n" % (core[:2600], voice[:1400], psy[:2200])
                 # 情绪轨迹：心象里的「此刻」每轮被覆盖，只剩一个当前标签——角色因此没有"情绪从哪来的"。
                 # 这里补上近四轮的走势，让情绪可以延续、可以反复，也可以在无变化时保持不变（而不是每轮重置）。
                 + "\n【你这几轮的情绪走势（你自己身上的，不是别人告诉你的）】%s\n"
                   "它只是你的来路：情绪该延续就延续，该翻转就翻转，不必为了变化而变化。\n"
                   % _emotion_context(D, name)
                 + TURN_FMT)
        parts = ["【世界】" + world[:2000], "【世界书】" + lore_txt[:1400],
                 "【此刻的场】" + U["body"][:2400]]
        if stage_note:
            parts.append("【场面】" + stage_note[:200])
        parts.append("【上一轮实录（公共部分）】" + prev_pub[:3600])
        if fresh:
            parts.append("【刚刚，当着你的面】\n" + fresh[:1000])
        if fuel and name == fuel_to:
            parts.append("【此刻送到你面前的】" + fuel[:300])
        # 既成事实（枷锁段）：世界观硬规则、你自己的设定、以及这局已经发生过的次要人物的下场。
        # 它不是灵感来源，是**不许被推翻的边界**——角色可以自由选择怎么做，但不能改写已经发生的事。
        _ex = _extras_context(D)
        parts.append("【既成事实 · 不可改写】\n"
                     "世界观与你的内核卡、声纹、心象是你的边界：你可以在里面做任何选择，"
                     "但不能违背它们已经写死的事（你的身份、你会与不会的事、你与谁有过什么）。\n"
                     + (("已经出场过的次要人物（他们的下场已经落定，"
                         "不许让死了的人再出现、也不许当作没发生过）：\n" + _ex) if _ex else ""))
        if num_led and dupian and hasattr(dupian, "num_ledger_lines"):
            parts.append("【数目账 · 这局已说出口的数字，从此是事实】\n" + dupian.num_ledger_lines(num_led)
                         + "\n数要具体、要对得上账：引用时照账上的数；你的角色若认为账不对，就当面质疑或改口，"
                           "把对账写成戏——不许悄悄换个数。你不记得的数就说不记得，别编一个圆整的。")
        parts.append("【你此刻的身份】" + stance)
        parts.append("现在是第%d轮（本单元第%d/%d轮）。以%s的身份行动。"
                     % (rnd, U["used"] + 1, U["budget"], name))
        user_p = "\n".join(parts)
        critique, text, err = "", None, None
        for attempt in range(3):
            if AUTO["stop"]:
                return name, None, "已暂停", lg
            add = ("\n（上稿被总审官毙：%s。重推：保持角色，修正死因。）" % critique) if critique else ""
            text, err = _llm([{"role": "system", "content": sys_p}, {"role": "user", "content": user_p + add}],
                             cfg, temperature=0.95, max_tokens=6000)
            if err:
                if err == "已暂停":
                    return name, None, "已暂停", lg
                return name, None, "角色agent失败(%s)：%s" % (name, err), lg
            dense = ([h for h in dupian.scan(text) if h[1] != "观"] if dupian else _scan_tics(text))
            # 病灶密集=整稿是机器手感，重推比修便宜。密度按篇幅归一（dupian.density_verdict）：
            # 旧版绝对 8 处——300 字 7 处放行、3000 字 8 处枉杀，两头都不准。
            if dupian and hasattr(dupian, "density_verdict"):
                _kill, _n, _dens = dupian.density_verdict(text)
            else:
                _kill, _n, _dens = len(dense) >= 8, len(dense), 0
            if _kill:
                critique = "语言病灶 %d 处密集命中（%s）。换一种写法：情绪该说就说，别用小动作代演。" % (
                    _n, "、".join(h[0] for h in dense[:4]))
                lg.append("%s：审%d机检密集毙（%d处·%.1f/千字）→重推" % (name, attempt + 1, _n, _dens))
                continue
            # 数目账核对（零 token）：说出口的数字是事实。同一所指同一单位数对不上，
            # 除非角色是明着质疑/改口（那是好戏），否则判毙重推——模型最不擅长的恰是记住自己说过的数。
            if dupian and hasattr(dupian, "num_conflicts") and num_led:
                _pub = _public_cut(text)
                _confs = dupian.num_conflicts(dupian.num_facts(_pub, name), num_led, name)
                _bad = [(f, L) for f, L in _confs if not dupian.disputes(_pub, f["noun"])]
                if _bad and attempt < 2:
                    f, L = _bad[0]
                    critique = ("数目对不上：你写「%s」，可账上第 %s 轮%s已说的是 %s%s%s。要么照账上的数，"
                                "要么让角色明着质疑/改口（把对账写成戏），不许悄悄换数。"
                                % (f["raw"], L.get("round", "?"), ("（%s）" % L["who"]) if L.get("who") else "",
                                   L["noun"], dupian._fmt_qty(L["qty"]), L["unit"]))
                    lg.append("%s：审%d数目毙（%s≠%s%s）→重推" % (name, attempt + 1, f["raw"],
                                                                dupian._fmt_qty(L["qty"]), L["unit"]))
                    continue
                elif _bad:
                    lg.append("%s：数目残留（%s）" % (name, "、".join(f["raw"] for f, _ in _bad[:2])))
            # 监修产出只是一行判词（【过】/【毙…】）＝判定活，关思考：实测 12.8s → 4.6s。
            # 额度回到 900：光砍额度不关思考反而危险——实测 500 额度开思考时 816 字全烧在思考上、
            # 正文 0 字，白触发一次自愈重试，比不砍更慢。
            v, _e = _llm([{"role": "system", "content": REVIEW_SYS},
                          {"role": "user", "content": "角色：%s\n内核卡摘要：%s\n%s回合：\n%s"
                           % (name, core[:1800], tblock, text)}],
                         cfg, temperature=0.2, max_tokens=1600, think=False)
            if v and v.strip().startswith("【毙"):
                critique = v.strip()[:200]
                lg.append("%s：审%d毙（%s）→重推" % (name, attempt + 1, critique[:40]))
                continue
            critique = ""
            break
        if critique:
            lg.append("%s：重推3次仍毙·采末稿" % name)
        if text:
            text = _field_guard(text.strip(), lg, name)   # 字段边界必须先于毒编：泄漏优先于文风
            text = _dupian_pass(text, cfg, name, lg)
            if dupian:
                lg.append("%s：体检 %s" % (name, dupian.brief(text)))
        return name, (text or "").strip(), None, lg

    # ── 第一拍：驱动者先动（他的目的开一轮）──
    _set_progress("第%d轮 · %s 出手（驱动者）" % (rnd, driver[:8]), 15)
    AUTO["agent"] = driver
    dname, dtext, derr, dlg = _one_turn(
        driver, "你是本轮的驱动者。此刻最该动的人是你——冲着你现在最要紧的那个人去。", "")
    candlog += dlg
    if derr:
        return (None if derr == "已暂停" else False), derr, False
    turns.append((dname, dtext))
    _live_push(dname, dtext)
    _step_done(dname, " 出手")
    log("R%d %s 出手（驱动）" % (rnd, driver))
    d_pub = _public_cut(dtext)                          # 应对者只看得见驱动者做了什么说了什么
    # ── 第二拍：被指向者与其余主笔应对（并行；他们看见驱动者的公开动作，看不见其心理与目的）──
    resp = ([(target, "刚才那一下是冲着你来的。按你自己的利益应对——顶回去、接下来、或换个方向，都行，"
                      "但你的应对也要冲着一个具体的人去。")] if target != driver else []) + \
           [(n, "你在场。刚发生的事与你有关无关由你自己判断，但你这一回合也要有自己的目的。") for n in others]
    results = []
    if len(resp) > 1:
        with ThreadPoolExecutor(max_workers=len(resp)) as ex:
            results = list(ex.map(lambda a: _one_turn(a[0], a[1], "%s：\n%s" % (driver, d_pub)), resp))
    elif resp:
        results = [_one_turn(resp[0][0], resp[0][1], "%s：\n%s" % (driver, d_pub))]
    for name, text, err, lg in results:
        candlog += lg
        if err:
            return (None if err == "已暂停" else False), err, False
        AUTO["agent"] = name
        turns.append((name, text))
        _live_push(name, text)
        _step_done(name, " 应对")
        log("R%d %s 应对" % (rnd, name))
    # 跨轮复读审计（零 token）：同一角色的手感短语若连着几轮出现，是模型在批发口癖——记账，
    # 命中两轮即入下轮该角色的重推提示（此处只审计；执法走 critique 注入，不改已过审文本）
    if dupian and hasattr(dupian, "cross_repeat"):
        for _n, _t in turns:
            prevs = []
            for _k in range(max(1, rnd - 3), rnd):
                _pf = os.path.join(ROOT_DIR, "推演", "第%03d轮.md" % _k)
                if os.path.exists(_pf):
                    _pt = open(_pf, encoding="utf-8").read()
                    _i = _pt.find("## %s 回合" % _n)
                    if _i >= 0:
                        prevs.append(_pt[_i:_i + 900])
            reps = dupian.cross_repeat(_t, prevs) if prevs else []
            if reps:
                candlog.append("%s：跨轮复读 %s" % (_n, "、".join("「%s」×%d" % r for r in reps[:3])))

    # 非主笔在场者：反应行（一个动作+一句话）——彼此独立，并行生成；只见公共部分（视野律）
    reacts = []
    if extras:
        just_now = "\n".join("%s：%s" % (n, _public_cut(t)) for n, t in turns)[-1200:]

        def _one_react(name):
            psy = _strip_fm(_read("角色/%s·心象.md" % name))
            r, _e = _llm([{"role": "system", "content": REACT_SYS},
                          {"role": "user", "content": "你是%s。\n【你的心象】%s\n【本场】%s\n【刚发生的】\n%s\n写你的反应。"
                           % (name, psy[:1400], U["body"][:1200], just_now)}],
                         cfg, max_tokens=1200, temperature=0.85, think=False)
            rr = _dp_local((r or "").strip())
            if len(rr) > 120:                            # 超长反应裁到句界，不许拦腰斩出半句引文
                cut = rr[:120]
                for stop in ("。", "！", "？", "」", "…"):
                    j = cut.rfind(stop)
                    if j > 20:
                        cut = cut[:j + 1]
                        break
                rr = cut
            return name, rr

        with ThreadPoolExecutor(max_workers=len(extras)) as ex:
            for name, line in ex.map(_one_react, extras):
                _step_done(name, " 反应")
                if line:
                    reacts.append((name, line))
                    log("R%d %s 反应" % (rnd, name))
    if AUTO["stop"]:
        return None, "已暂停", False
    allturns = turns + [(n, "【反应】" + r) for n, r in reacts]
    _set_progress("第%d轮 · 裁判审计" % rnd, 85)
    AUTO["agent"] = ""                                  # 裁判阶段：无角色 agent 在写
    # 裁判：四拍/接棒/纪要/纪事/七情/引力/目标进度/三查/脊椎触达
    ref_in = ("【单元目标】%s\n【本单元第%d/%d轮 · 阶段】%s\n【导演意图】%s\n"
              "【剧情账（判 plot/subplot_updates 时从这里抄 id；私事栏不算主线燃料）】\n%s\n"
              "【场记搭台】驱动=%s 指向=%s｜冲突轴=%s｜转折燃料=%s\n"
              "【本轮各角色回合】\n%s\n【上帝可见真相（仅供判定，禁写进纪要）】%s"
              % (U["goal"], U["used"] + 1, U["budget"], U["phase"], hint,
                 _ledger_context(ledger, 2200),
                 driver, target, (plan.get("conflict_axis") or "—")[:100], (fuel or "无")[:100],
                 "\n\n".join("%s：\n%s" % t for t in allturns)[:9000], truth[:1600]))
    # 裁判产出是一小段 JSON，不需要 3500 输出预算——预算越大越容易被思考模型拖成长文然后超时。
    # 走 _llm_json：解析失败时它会带"只输出 JSON 本体"的纠正再来一发，比原样重发一遍便宜也更准。
    R = _llm_json([{"role": "system", "content": REFEREE_SYS}, {"role": "user", "content": ref_in}],
                  cfg, max_tokens=5000, temperature=0.3) or {}
    if not R.get("scene"):                                  # 仍空：降级只要纪要一句，别让本轮留白
        stext, _e = _llm([{"role": "system", "content":
                           "用 80-150 字客观复述这一轮发生了什么（只写发生的事，不评价，不用稳/破/旧/锈类标签词）。只输出这段话。"},
                          {"role": "user", "content": "\n\n".join("%s：\n%s" % t for t in allturns)[:3000]}],
                         cfg, max_tokens=1400, temperature=0.3, think=False)
        if stext and stext.strip():
            R["scene"] = stext.strip()[:200]
            log("R%d 裁判 JSON 缺席 → 已降级取纪要（三查本轮记为未判）" % rnd)
    scene = _dp_local((R.get("scene") or "").strip())
    if not scene:                                           # 裁判缺席也不留白：抽首回合行为当速记
        for _n, _t in turns:
            for _ln in _t.splitlines():
                _s = _ln.strip()
                if _s.startswith("【行为】"):
                    scene = "（速记）%s：%s" % (_n, _s[4:90])
                    break
            if scene:
                break
        scene = scene or "（本轮裁判缺席）"
    chron = _dp_local((R.get("chronicle") or scene[:60]).strip())
    states = R.get("states") or {}
    gravity = R.get("gravity") or "顺"
    prog = R.get("goal_progress") or "推进"
    checks = R.get("checks") or {}
    touched = [t for t in (R.get("touched") or []) if t][:5]
    # 四拍与接棒：结构层判定（裁判缺席时从场记搭台回退，链不许断）
    beats = R.get("beats") or {}
    flat = bool(R.get("flat")) or not (beats.get("turn") and beats.get("turn") != "无"
                                       and beats.get("result"))
    baton = (R.get("baton") or "").strip()
    if baton not in in_scene:                           # 裁判没给/给了不在场的人 → 被指向者接棒（链不断）
        baton = target if target in in_scene else driver
    baton_reason = (R.get("baton_reason") or "").strip()
    if isinstance(R.get("next"), dict):
        meta["nextPlan"] = R["next"]                    # 下轮搭台随轮带出——下轮省一次场记调用
    if flat:
        log("R%d 平轮（缺转折/结果）——下轮场记强制部署转折燃料" % rnd)
    # 落盘①轮记录
    lines = ["---", "round: %d" % rnd, "unit: %s" % U["name"],
             "unit_round: %d/%d" % (U["used"] + 1, U["budget"]), "phase: %s" % U["phase"],
             "present: [%s]" % ", ".join(n for n, _ in allturns),
             "driver: %s" % driver, "target: %s" % target, "baton: %s" % baton,
             "flat: %s" % ("true" if flat else "false"), "gravity: %s" % gravity,
             "goal_progress: %s" % prog, "isolation: 独立API·每角色独立agent", "---", "",
             "# 第%d轮 · 单元「%s」" % (rnd, U["name"]), ""]
    for n, t in turns:
        lines += ["## %s 回合" % n, "", t, ""]
    for n, r in reacts:
        lines += ["## %s 反应" % n, "", r, ""]
    lines += ["## 【结构·四拍】", "",
              "- 目的：%s" % (beats.get("goal") or "（裁判未判）"),
              "- 冲突：%s" % (beats.get("conflict") or "（裁判未判）"),
              "- 转折：%s" % (beats.get("turn") or "无"),
              "- 结果：%s" % (beats.get("result") or "（裁判未判）"),
              "- 接棒：%s%s" % (baton, ("——" + baton_reason) if baton_reason else ""),
              ("- ⚠ 平轮：转折/结果缺席，已记债" if flat else "- 四拍齐"), ""]
    lines += ["## 审核审计（快档·不入正文）", ""] + (["- " + c for c in candlog]
                                                    or ["- 一次过审（无重推·机械扫描无命中）"]) + [""]
    lines += ["## 【纪要】", "", scene, "", "## 引力检查", "",
              "- 阶段：%s｜引力：%s｜目标：%s（%s）" % (U["phase"], gravity, prog, R.get("goal_reason", "")),
              "- 预估剩余：%s 轮" % R.get("remaining", "—"),
              "- 世界书命中：%s" % ("、".join(lore_hits) if lore_hits else "（无触发条目）"), "",
              "## 三查与脊椎触达", "",
              "- 视野：%s" % checks.get("view", "—"),
              "- 智商：%s" % checks.get("iq", "—"),
              "- 人格：%s" % checks.get("persona", "—"),
              "- 脊椎触达：%s" % ("；".join(touched) if touched else "无"), ""]
    os.makedirs(os.path.join(ROOT_DIR, "推演"), exist_ok=True)
    open(os.path.join(ROOT_DIR, "推演", "第%03d轮.md" % rnd), "w", encoding="utf-8").write("\n".join(lines))
    # 落盘②心象回写（此刻=本轮心理；眼下打算=本轮【目的】——四拍的目的直接续进下一轮的动机）
    for n, t in turns:
        mind, aim = "", ""
        for ln in t.splitlines():
            s = ln.strip()
            if s.startswith("【心理】"):
                mind = s[4:]
            elif s.startswith("【目的】"):
                aim = s[4:]
        _psyche_rewrite(n, rnd, mind, (aim or mind)[:110], states.get(n, ""))
    # 落盘②b 关系后遗症：裁判判定的不可逆创伤写进双方心象「旧账」——冲突从此留疤，不再每轮复位
    for sc in (R.get("scars") or [])[:2]:
        if isinstance(sc, dict) and sc.get("a") and sc.get("b") and sc.get("what"):
            _psyche_scar(sc["a"], sc["b"], sc["what"], rnd)
            _psyche_scar(sc["b"], sc["a"], sc["what"], rnd)
            log("R%d 旧账：%s×%s——%s" % (rnd, sc["a"], sc["b"], sc["what"][:40]))
    # 落盘③纪事
    open(os.path.join(ROOT_DIR, "纪事.md"), "a", encoding="utf-8").write(
        "\n## 第%d段 · 第%d轮（单元「%s」）\n\n%s\n" % (rnd, rnd, U["name"], chron))
    # 落盘④data.json（含四拍链状态：接棒/平轮债/上场覆盖/上轮结构——下一轮场记的输入）
    meta["round"] = rnd
    meta["unitRound"] = "%d/%d" % (U["used"] + 1, U["budget"])
    meta["gravity"] = gravity
    meta["baton"] = baton
    meta["flatDebt"] = (flat_debt + 1) if flat else 0
    ll = meta.setdefault("lastLed", {})
    for n in leads:
        ll[n] = rnd
    meta["driverStreak"] = (int(meta.get("driverStreak", 0) or 0) + 1) if meta.get("lastDriver") == driver else 1
    meta["lastDriver"] = driver
    meta["lastBeats"] = {"goal": (beats.get("goal") or "")[:120], "turn": (beats.get("turn") or "")[:120],
                         "result": (beats.get("result") or "")[:160], "baton_reason": baton_reason[:100]}
    # 落盘④b 叙事控制平面：主/支/私分账 + 覆盖债 + 策略不动点 + 情绪轨迹。
    # 这四笔都是**导演层账目**，角色 agent 永不可见（与脊椎同级）——它们只改变下一轮场记怎么搭台，
    # 不改人心。四个函数此前只有定义没有调用，账建了从不推进；这里补上唯一的推进点。
    try:
        proj = _update_plot_ledger(D, U, R, plan, rnd, flat, scene)
        if proj.get("focus"):
            log("R%d 落线：%s「%s」→ %s" % (rnd, proj["focus"].get("kind", ""),
                                            (proj["focus"].get("label") or "")[:24], proj["movement"]))
        if int(ledger.get("mainDebt", 0) or 0) >= 3:
            candlog.append("主线债：连续 %d 轮未推进主线节点（下轮场记将优先主线）" % ledger["mainDebt"])
    except Exception as e:                                # 账目层永不许炸轮——本轮正文已落盘
        log("R%d 剧情账更新失败（不影响本轮落盘）：%s" % (rnd, e))
    try:
        _update_num_ledger(D, turns, rnd, candlog)   # 数目账：说出口的数字入账，下一轮所有 agent 共见
    except Exception as e:
        log("R%d 数目账更新失败：%s" % (rnd, e))
    try:
        _update_extras(D, R, rnd, log)          # 路人账：不进卡司/图谱，但从此不可被改写
    except Exception as e:
        log("R%d 路人账更新失败：%s" % (rnd, e))
    try:
        _record_coverage(ledger, in_scene, leads, allturns, rnd)
        for w in _strategy_audit(D, U, turns, driver, target,
                                 (focus or {}).get("id", ""), rnd):
            candlog.append(w)                             # 策略不动点：只记债，不替角色选答案
    except Exception as e:
        log("R%d 覆盖/策略审计失败：%s" % (rnd, e))
    for c in D.get("cast", []):
        if c["name"] in states:
            c["state"] = states[c["name"]]
            _emotion_history(D, c["name"], states[c["name"]],
                             (R.get("state_reasons") or {}).get(c["name"], ""), rnd)
    for sp in D.get("spine", []):
        if touched and sp.get("label") in touched and not sp.get("touchedRound"):
            sp["touchedRound"] = rnd
    # 真人度（零 token）：各主笔回合的 dupian.human_score 均值——给作者逐轮正反馈，非执法
    human = None
    if dupian and hasattr(dupian, "human_score") and turns:
        hs = [dupian.human_score(t) for _n, t in turns]
        human = round(sum(hs) / len(hs))
    if dupian and hasattr(dupian, "speech_balance") and len(turns) >= 3:
        # 群像话量观察（挂观，只入审计层攒数据）：台词字数取【对话】行
        import re as _re
        _sp = [(n, sum(len(m.group(0)) for m in _re.finditer(r"「[^」]+」", t))) for n, t in turns]
        _w = dupian.speech_balance(_sp)
        if _w:
            candlog.append(_w)
    D.setdefault("feed", []).append({
        "round": rnd, "unit": U["name"], "time": "第%d轮" % rnd, "human": human,
        "place": (R.get("place") or "").strip() or "点击查看",
        "present": [n for n, _ in allturns], "gravity": gravity, "summary": scene,
        "driver": driver, "target": target, "baton": baton, "flat": flat,
        "beats": {k: (beats.get(k) or "")[:160] for k in ("goal", "conflict", "turn", "result")},
        "checks": checks, "touched": touched,
        "castStates": {c["name"]: c.get("state", "") for c in D.get("cast", [])}})
    fc = D.setdefault("forecast", {})
    if R.get("remaining"):
        fc["remaining"] = R["remaining"]
    for g in (R.get("gaps") or [])[:2]:
        gl = D.setdefault("gaps", [])
        if g not in gl:
            gl.append(g)
    _save_data(D)
    # 临门滞留：连报"临门"却不落地 → 记数，3 轮后下轮强制按收束轮打（不许在门口徘徊耗预算）
    meta["nearDone"] = (int(meta.get("nearDone", 0) or 0) + 1) if prog == "临门" else 0
    # 收束判定
    closed = prog == "达成" or (U["used"] + 1) >= U["budget"]
    # 停滞收束：剧情实质结束但裁判不报"达成"时，连续 3 轮目标未动 → 判停滞自动收束，不吃满预算
    if prog == "未动":
        AUTO["stall"] = AUTO.get("stall", 0) + 1
    else:
        AUTO["stall"] = 0
    if not closed and AUTO["stall"] >= 3:
        log("连续 3 轮目标未动——判定剧情停滞/已完结，自动收束（剩余预算不吃）")
        closed = True
        prog = "停滞·收束"
    if closed:
        _auto_close(D, U, rnd, prog, log)
        log("单元「%s」已收束（%s）——推演终止：生成故事全录，或配置续演单元" % (U["name"], prog))
    _push_round_time(time.time() - AUTO["roundT0"])
    AUTO["agent"], AUTO["agents"] = "", []
    return True, "第%d轮完成（%s｜引力%s）%s" % (rnd, prog, gravity, "【已收束·大结局】" if closed else ""), closed


def _advance_unit(log):
    """收束后自动换下一单元（若有）。True=已切换可继续推；False=全部收束（全局终局）。"""
    D = _load_data() or {}
    meta = D.get("meta", {})
    nxt = next((u for u in D.get("units", [])
                if "已收束" not in (u.get("status") or "") and u.get("name") != meta.get("unitName")), None)
    if not nxt:
        return False
    meta["unitName"] = nxt["name"]
    meta["unitRound"] = "0/0"
    meta["baton"] = ""
    meta["nextPlan"] = None
    meta["nearDone"] = 0
    _save_data(D)
    log("自动进入下一单元「%s」——接棒链重置，剧情继续。" % nxt["name"])
    return True


def _all_closed():
    """全局终局：所有单元皆已收束。"""
    units = (_load_data() or {}).get("units", [])
    return bool(units) and all("已收束" in (u.get("status") or "") for u in units)


TURING_SYS = ("你是文学编辑，正在做盲测：下面几段小说片段，有的出自人类作者，有的出自 AI。"
              "你不知道比例，不许讨好。对每段输出严格 JSON 数组："
              '[{"i":段号,"verdict":"人|AI|难辨","score":该段像真人写的程度1-10,'
              '"tell":"格式=「引原文≤12字」＋破绽/亮点是什么（必须有判断，只抄原文不算）"}]\n'
              "判断依据只看文本本身：语感毛边、信息密度、是否有真人才会犯的小失衡；"
              "不看题材不看立场。只输出 JSON 数组。")


def _turing_audit(D, U, log):
    """图灵盲测（每单元收束跑一次，不在轮的关键路径上）：
    随机抽本单元 3 段过审回合的【行为】【对话】做盲测，得分与破绽写进 outcome.turing——
    机检管「像不像 AI」（病灶层），盲测管「像不像人」（整体语感层），两把尺互补。
    破绽同时是下一单元的免费改进信号（写进审计，够密集可手动入病灶库）。"""
    import glob as _g, random as _rnd, re as _re
    cfg = _llm_cfg()
    if not cfg:
        return None
    frags = []
    for rp in sorted(_g.glob(os.path.join(ROOT_DIR, "推演", "第*轮.md")))[-12:]:
        t = open(rp, encoding="utf-8").read()
        for mch in _re.finditer(r"## \S+ 回合\n\n(.+?)(?=\n## |\Z)", t, _re.S):
            body = "\n".join(l for l in mch.group(1).splitlines()
                             if l.startswith(("【行为】", "【对话】")) and len(l) > 8)
            if len(body) >= 30:
                frags.append(body[:400])
    if len(frags) < 2:
        return None
    _rnd.seed(len(frags))                                   # 确定性抽样：同一单元重跑结论一致
    sample = _rnd.sample(frags, min(3, len(frags)))
    payload = "\n\n".join("【第%d段】\n%s" % (i + 1, s) for i, s in enumerate(sample))
    jt, _e = _llm([{"role": "system", "content": TURING_SYS}, {"role": "user", "content": payload}],
                  cfg, temperature=0.3, max_tokens=2000, think=False)
    arr = _json_from(jt)
    if not isinstance(arr, list) or not arr:
        return None
    scores = [int(x.get("score", 0) or 0) for x in arr if isinstance(x, dict)]
    res = {"score": round(sum(scores) / max(1, len(scores)), 1),
           "n": len(scores),
           "tells": [str(x.get("tell", ""))[:80] for x in arr if isinstance(x, dict) and x.get("tell")][:3]}
    log("图灵盲测：%d 段均分 %.1f/10%s" % (res["n"], res["score"],
        ("｜最大破绽：" + res["tells"][0]) if res["tells"] else ""))
    return res


TURING_FIX_SYS = (
    "你是文学编辑，正在按盲测破绽逐句修语言层。给你一段小说回合和鉴别官指出的破绽，"
    "输出严格 JSON：{\"fixes\":[{\"old\":\"原文中一模一样的一句\",\"new\":\"改后的这一句\"}]}\n"
    "铁律（违反即整条作废）：\n"
    "1 只改语言，不改事实。谁做了什么、谁说了什么内容、拿到了什么信息——一个字都不许变。\n"
    "2 old 必须是原文里逐字存在的一句，否则无法定位。\n"
    "3 改的是「像 AI」的地方：按钮式微反应、四字对仗、账目式罗列、把情绪演出来而不直说、"
    "每句都完整高效没有毛边。真人是情绪直说、句长忽长忽短、话会说一半。\n"
    "4 改不动就不要硬改——宁可少改一句，也不许为了交差换一层皮。fixes 可以是空数组。\n"
    "只输出 JSON。")


def _turing_repair(log, rounds=8):
    """图灵修复：按盲测破绽做定点语言修复，再自动复测，前后分数一起落盘。

    只动语言层（机检本地修 + 按破绽的定点补丁），事实层一字不改——所以它不是"重写剧情"，
    是把已落盘正文里像 AI 的那几句换成人话。修完必然复测：不复测就没法证明修有效，
    而"修完分数反而降了"也是必须如实记账的结果（语言层修复不保证单调改善）。"""
    D = _load_data()
    if not D:
        return None, "尚未建世界"
    cfg = _llm_cfg()
    if not cfg:
        return None, "未接入 API"
    import glob as _g
    U = _unit_ctx(D)
    before = ((D.get("outcome") or {}).get("turing") or {})
    tells = [t for t in (before.get("tells") or []) if t]
    files = sorted(_g.glob(os.path.join(ROOT_DIR, "推演", "第*轮.md")))[-max(1, rounds):]
    if not files:
        return None, "还没有轮记录可修"
    changed, touched, lg = 0, [], []
    _set_progress("图灵修复 · 扫描 %d 轮" % len(files), 5)
    for i, fp in enumerate(files):
        if AUTO.get("stop"):
            break
        raw = open(fp, encoding="utf-8").read()
        text = raw
        if dupian:                                        # ① 本地确定性修（零 token）
            text, _res, fixlog = dupian.repair(text)
            if fixlog:
                lg.append("%s：本地修 %s" % (os.path.basename(fp), "、".join(fixlog[:4])))
        if tells:                                          # ② 按破绽定点补丁：只发本轮正文，不重写
            jt, _e = _llm([{"role": "system", "content": TURING_FIX_SYS},
                           {"role": "user", "content": "【鉴别官指出的破绽】\n%s\n\n【这一轮正文】\n%s"
                            % ("\n".join("- " + t for t in tells[:3]), text[:6000])}],
                          cfg, temperature=0.4, max_tokens=2400, think=False)
            for f in ((_json_from(jt) or {}).get("fixes") or [])[:12]:
                old, new = (f.get("old") or "").strip(), (f.get("new") or "").strip()
                # 定点替换的安全闸：old 必须逐字存在，且改动不得吞掉整句信息（新句不能短于原句一半）
                if old and new and old != new and old in text and len(new) >= len(old) * 0.5:
                    text = text.replace(old, new, 1)
                    changed += 1
        if text != raw:
            open(fp, "w", encoding="utf-8").write(text)
            touched.append(os.path.basename(fp))
        _set_progress("图灵修复 · %d/%d 轮" % (i + 1, len(files)), 5 + int(70 * (i + 1) / len(files)))
    # ③ 真人度重算：修完必须让所有表上的分数跟着动，否则页面还在显示修之前的数
    _set_progress("图灵修复 · 重算真人度", 80)
    if dupian and hasattr(dupian, "human_score"):
        import re as _re
        by_round = {}
        for fp in files:
            m = _re.search(r"第(\d+)轮", os.path.basename(fp))
            if not m:
                continue
            body = open(fp, encoding="utf-8").read()
            segs = [x.group(1) for x in _re.finditer(r"## \S+ 回合\n\n(.+?)(?=\n## |\Z)", body, _re.S)]
            if segs:
                by_round[int(m.group(1))] = round(sum(dupian.human_score(s) for s in segs) / len(segs))
        for f in D.get("feed", []):
            if isinstance(f, dict) and f.get("round") in by_round:
                f["human"] = by_round[f["round"]]
    # ④ 自动复测：同一把尺，前后可比
    _set_progress("图灵修复 · 复测中", 88)
    after = _turing_audit(D, U, log) or {}
    oc = D.setdefault("outcome", {})
    hist = oc.setdefault("turingHistory", [])
    if not isinstance(hist, list):
        oc["turingHistory"] = hist = []
    batch = {"at": time.strftime("%Y-%m-%d %H:%M"), "unit": U.get("name", ""),
             "before": before.get("score"), "after": after.get("score"),
             "rounds": len(files), "fixes": changed, "files": touched[:12],
             "tellsBefore": tells[:3], "tellsAfter": (after.get("tells") or [])[:3]}
    hist.append(batch)
    oc["turingHistory"] = hist[-12:]
    if after:
        after["repairedAt"] = batch["at"]
        after["prev"] = before.get("score")
        oc["turing"] = after
    _save_data(D)
    for x in lg[:8]:
        log(x)
    log("图灵修复完成：%d 轮 · 定点 %d 处 · %s → %s"
        % (len(files), changed, before.get("score", "—"), after.get("score", "—")))
    _set_progress("图灵修复完成", 100)
    return batch, None


def _auto_close(D, U, rnd, prog, log):
    """单元收束：终局清单 + 单元小结 + 脊椎达成标记 + 图灵盲测。"""
    cfg = _llm_cfg()
    log("单元收束：生成终局清单…")
    chron = _read("纪事.md")
    otext, _e = _llm([{"role": "system", "content": OUTCOME_SYS},
                      {"role": "user", "content": "【单元】%s\n【单元目标】%s（判定：%s）\n【卡司】%s\n【纪事全文】\n%s"
                       % (U["name"], U["goal"], prog, "、".join(c["name"] for c in D.get("cast", [])), chron[-6000:])}],
                     cfg, temperature=0.4, max_tokens=8000, think=True)
    O = _json_from(otext) or {}
    D["outcome"] = {"at": "单元「%s」第%d轮收束" % (U["name"], rnd),
                    "summary": O.get("summary", ""),
                    "castFates": O.get("castFates", []),
                    "major": O.get("major", []), "minor": O.get("minor", [])}
    tur = _turing_audit(D, U, log)
    if tur:
        D["outcome"]["turing"] = tur
    cov = [c for c in (O.get("coverage") or []) if c]
    if cov:
        D["outcome"]["coverage"] = cov
        log("收官检查：%s 的下场/伏笔未交代——已记入终局清单，续演单元优先织入" % "、".join(cov[:4]))
    for u in D.get("units", []):
        if u.get("name") == U["name"]:
            u["status"] = "已收束（%d/%d）" % (U["used"] + 1, U["budget"])
            u["result"] = "达成" if prog == "达成" else "预算耗尽·目标改写"
            cal = D.setdefault("meta", {}).setdefault("calibration", [])
            cal.append({"unit": U["name"], "est": u.get("est", ""), "actual": U["used"] + 1,
                        "result": u["result"]})                       # 预估校准账：攒真数据修尺
    if prog == "达成":
        for sp in D.get("spine", []):
            if sp.get("kind") == "铁" and not sp.get("achieved") and (U["goal"][:8] in sp.get("label", "") or sp.get("label", "")[:8] in U["goal"]):
                sp["achieved"] = True
                sp["achievedRound"] = rnd
    _save_data(D)
    if U["path"]:
        open(U["path"], "a", encoding="utf-8").write(
            "\n---\n\n## 单元小结（第%d轮收束）\n\n%s\n\n**终局审计**：%s\n"
            % (rnd, O.get("summary", ""), O.get("audit", "")))
    log("单元「%s」已收束——到报告页生成故事全录，或配置下一个单元继续。" % U["name"])


AUTO = {"running": False, "stop": False, "phase": "", "log": [], "hb": 0.0, "err": "",
        "stage": "", "pct": 0, "stageAt": 0.0,
        "round": 0, "unitN": 0, "unitBudget": 0, "roundT0": 0.0,
        "roundTimes": [], "agent": "", "agents": [], "live": [],
        "runLeft": 0, "stepDone": 0, "stepTotal": 0, "repairing": False,
        "startLock": 0.0, "stageLimit": 0}
# 多页签安全：同一个库只能有一条推演线在跑（两条会抢同一个轮号、互相覆盖 data.json 与心象）。
# 但页签之间不该互相锁死——任何一页都能开、都能停、都能看。真正要防的是
# 「两页在同一秒各点一次开始」：AUTO["running"] 由 worker 取到任务后才置位，
# 那一秒的空窗里两次点击都会通过 check-then-act 的判断，各入一个 beat 任务。
_START_LOCK = threading.Lock()


def _claim_start():
    """抢占开跑权：拿到返回 True，已有人在跑/刚点过返回 False。原子，供所有页签共用。"""
    with _START_LOCK:
        if AUTO["running"] or time.time() - AUTO.get("startLock", 0) < 3:
            return False
        AUTO["startLock"] = time.time()
        return True


def _round_times():
    """轮耗时样本：内存优先，空则从 data.json 读回——重启后仍能立刻给出均轮耗时与 ETA
    （旧版只存内存，重启后整轮都显示「—」，用户看不到任何时间预期）。"""
    if AUTO["roundTimes"]:
        return AUTO["roundTimes"]
    try:
        return [float(x) for x in ((_load_data() or {}).get("meta", {}).get("roundSecs") or [])][-10:]
    except Exception:
        return []


def _push_round_time(secs):
    AUTO["roundTimes"] = (AUTO["roundTimes"] + [round(secs, 1)])[-10:]
    try:                                            # 落盘：跨重启保留计时样本
        D = _load_data()
        if D:
            D.setdefault("meta", {})["roundSecs"] = AUTO["roundTimes"]
            _save_data(D)
    except Exception:
        pass


def _live_push(name, text):
    """实时产出缓冲：每个回合过审即推一条预览（行为+对话截断），前端推演页边跑边看。"""
    prev = []
    for ln in (text or "").splitlines():
        s2 = ln.strip()
        if s2.startswith(("【行为】", "【对话】")):
            prev.append(s2[4:].strip())
    AUTO["live"] = (AUTO["live"] + [{"name": name, "text": " / ".join(prev)[:150],
                                     "at": time.strftime("%H:%M:%S")}])[-12:]
    AUTO["ver"] = AUTO.get("ver", 0) + 1                   # 实时产出也走 SSE 即推


def _set_progress(stage, pct):
    """进度上报：阶段名 + 总百分比。PROG_VER 自增 → SSE 立刻把 auto-status 推给前端。"""
    AUTO["stage"] = stage
    AUTO["pct"] = int(pct)
    AUTO["stageAt"] = time.time()
    AUTO["ver"] = AUTO.get("ver", 0) + 1


def _auto_payload():
    """auto-status 全量载荷——GET /api/auto-status 与 SSE progress 事件共用同一构造，
    两条通道永远同形（此前只有轮询能拿到进度，SSE 只报文件变更，前端要等 2s 心跳）。"""
    hb_age = round(time.time() - AUTO["hb"], 1) if AUTO["hb"] else None
    alive = AUTO["hb"] and hb_age < 30                      # 30 秒无心跳 = worker 异常
    # 阶段超时自检：单次 LLM 调用墙钟上限 _LLM_WALL(2400s)+余量没动静 → 疑似真卡死
    stage_age = round(time.time() - AUTO["stageAt"], 0) if AUTO["stageAt"] else None
    stuck = bool(stage_age and stage_age > _LLM_WALL + 300 and AUTO["running"])
    # 轮级计时：均值 → 预计剩余（ETA）；样本跨重启保留，首轮用本轮已耗时粗估
    r_el = round(time.time() - AUTO["roundT0"]) if (AUTO["roundT0"] and AUTO["running"]) else None
    rts = _round_times()
    avg = round(sum(rts) / len(rts)) if rts else (r_el if (r_el or 0) > 20 else None)
    avg_est = not rts and avg is not None                   # True = 首轮粗估，前端标"约"
    # 本次运行剩余轮 与 单元剩余轮 取小：跑 8 轮不该按整单元 300 轮报剩余时间
    left_unit = max(0, AUTO["unitBudget"] - AUTO["unitN"]) if AUTO["unitBudget"] else 0
    left_run = max(0, int(AUTO.get("runLeft") or 0))
    left = min([x for x in (left_unit, left_run) if x] or [0])
    # 咬合：ETA = 均轮×剩余轮 − 本轮已耗时（同一均值同一秒表）——随秒表连续递减而不是每轮跳变
    eta = max(0, avg * left - min(r_el or 0, avg)) if (avg and left) else None
    return {"running": AUTO["running"], "log": AUTO["log"][-10:],
            "hb_age": hb_age, "worker_alive": bool(alive),
            "err": AUTO["err"] or "", "pausing": bool(AUTO.get("pausing")),
            "stage": AUTO["stage"], "pct": AUTO["pct"],
            "stage_age": stage_age, "stuck": stuck,
            "round": AUTO["round"],
            "unit_round": "%d/%d" % (AUTO["unitN"], AUTO["unitBudget"]) if AUTO["unitBudget"] else "",
            "agent": AUTO["agent"], "agents": AUTO["agents"], "live": AUTO.get("live", []),
            "round_elapsed": r_el, "avg_round_secs": avg, "eta_secs": eta,
            "avg_est": avg_est, "rounds_left": left, "run_left": left_run,
            "step_done": AUTO.get("stepDone", 0), "step_total": AUTO.get("stepTotal", 0),
            "ver": AUTO.get("ver", 0), "gmode": _gravity_mode(), "tok_rate": _rate_now(),
            "auto_paused": bool(AUTO.get("autoPaused")),
            "repairing": bool(AUTO.get("repairing")),   # 图灵修复进行中：与推演互斥，共用进度条
            # dataVer：data.json 的 mtime——前端在 progress 帧里就能发现落盘变化，
            # 即使 update 事件丢失（断线重连间隙）也能兜底刷新图谱与推演流
            "dataVer": (os.stat(DATA_PATH).st_mtime if os.path.exists(DATA_PATH) else 0),
            "api_persisted": bool(_llm_cfg(ignore_mode=True))}


def _run_wedged():
    """运行态是否已「卡死可让位」：AUTO 标着在跑、但阶段静止超过单次 LLM 墙钟上限+余量。
    心跳线程独立每 5 秒保活、并不代表 worker 线程还活着，故只以阶段静止时长为准。"""
    if not AUTO["running"]:
        return False
    age = time.time() - (AUTO.get("stageAt") or 0)
    return age > _LLM_WALL + 300


def _auto_running():
    """建世界/推演是否真的活着。卡死态视为不在跑，允许新任务接管——否则残留的运行态
    （worker 线程卡死、进程曾中断）会把新的建世界指令永远挡在门外，表现为「点了没反应」。"""
    return AUTO["running"] and not _run_wedged()


def _auto_running_fatal():
    """确认运行态已卡死（AUTO 在跑但阶段静止超限），供入口决策是否让位。"""
    return _run_wedged()


def _reclaim_stale_run():
    """把卡死的运行态让位：清掉残留 running/stop/err，使下一次明示建世界能直接起新线程。"""
    AUTO["running"] = False
    AUTO["stop"] = False
    AUTO["phase"] = ""
    AUTO["err"] = ""


def _next_gen():
    """每次显式启动一个 worker 分配新代际号。旧线程在 finally 里只复位自己那一代——
    防止一台卡死的旧线程结束后把新线程的运行态一起清掉。"""
    AUTO["gen"] = AUTO.get("gen", 0) + 1
    return AUTO["gen"]


def _step_done(name, note=""):
    """主笔完成一个 → 进度按「已完成/总数」推进（15%→80% 之间线性）。
    旧版只在开场 15% 与裁判 85% 各报一次，中间几分钟的并行段进度条与阶段名全程冻结，
    stage_age 也因此虚高、卡死自检误判。"""
    AUTO["stepDone"] = AUTO.get("stepDone", 0) + 1
    tot = max(1, AUTO.get("stepTotal", 1))
    pct = 15 + int(65.0 * min(1.0, AUTO["stepDone"] / float(tot)))
    _set_progress("第%d轮 · %s%s（%d/%d 主笔已成稿）"
                  % (AUTO["round"], name[:8], note, min(AUTO["stepDone"], tot), tot), pct)

# ══════════ 建世界状态机（pending）+ 旧局归档 + 自动建世界 ══════════
PENDING_PATH = os.path.join(UI_DIR, "pending-init.json")
BUILD_FAILED_PATH = os.path.join(UI_DIR, "build-failed.json")


def _build_fail_record(stage, reason):
    """建世界失败落痕（阶段+原因+时间戳）：失败不再静默成僵尸态，重试与 UI 提示都读它。"""
    try:
        _atomic_json_dump({"stage": stage or "未知阶段", "reason": str(reason)[:500],
                           "at": time.strftime("%Y-%m-%d %H:%M:%S")}, BUILD_FAILED_PATH)
    except Exception:
        pass


def _build_fail_clear():
    try:
        if os.path.exists(BUILD_FAILED_PATH):
            os.remove(BUILD_FAILED_PATH)
    except OSError:
        pass


def _build_fail_load():
    if not os.path.exists(BUILD_FAILED_PATH):
        return None
    try:
        return json.load(open(BUILD_FAILED_PATH, encoding="utf-8"))
    except Exception:
        return None


def _pending():
    """返回建世界待办；若 data.json 已在此之后更新（引擎已建好），自动清除。"""
    if not os.path.exists(PENDING_PATH):
        return None
    try:
        p = json.load(open(PENDING_PATH, encoding="utf-8"))
    except Exception:
        os.remove(PENDING_PATH)
        return None
    # 建造开始后会先写入“空白库”占位 data.json；这次写入晚于 pending-init，
    # 不能被误判成“建造已完成”而删掉本批材料白名单。只有非建造状态才用
    # data.json 的 mtime 判断旧指令是否已消费。
    if not (AUTO.get("running") and AUTO.get("phase") == "build"):
        # 建造失败留痕在场时材料白名单必须保住（重试要用）——旧版 mtime 守卫
        # 会把失败后的 pending 悄悄删掉，造成「既没建完、也没待办」的死局。
        if _build_fail_load():
            return p
        try:
            if os.stat(DATA_PATH).st_mtime > float(p.get("at_ts", 0)) + 1:
                os.remove(PENDING_PATH)
                return None
        except OSError:
            pass
    return p


def _pending_clear():
    if os.path.exists(PENDING_PATH):
        os.remove(PENDING_PATH)


def _archives_path():
    return os.path.join(UI_DIR, "局史.json")


def _archives_store():
    """历史局索引（持久）：{archives:[{id,title,rounds,units,archivedAt,path}], current:...}"""
    if os.path.exists(_archives_path()):
        try:
            return json.load(open(_archives_path(), encoding="utf-8"))
        except Exception:
            pass
    return {"archives": [], "current": ""}


def _archives_rescan():
    """索引自愈：扫回滚点里所有 `*_群像局_*` 目录——磁盘是真源头，索引只是索引。
    补回缺失条目（读其 data.json 取轮数/单元数），返回补回条数。"""
    import glob as _g
    root = _archive_root()
    hist = _archives_store()
    known = {os.path.realpath(a.get("path") or "") for a in hist.get("archives", [])}
    known |= {os.path.realpath(p) for p in (hist.get("dismissed") or [])}   # 用户删过的不再补回
    added = 0
    for p in sorted(_g.glob(os.path.join(root, "*群像局*"))):
        if not os.path.isdir(p) or os.path.realpath(p) in known:
            continue
        title, rounds, units = os.path.basename(p).split("群像局_")[-1], 0, 0
        for dj in (os.path.join(p, "ui", "data.json"), os.path.join(p, "data.json")):
            if os.path.exists(dj):
                try:
                    Dx = json.load(open(dj, encoding="utf-8"))
                    title = (Dx.get("meta", {}).get("title") or title)
                    rounds = int(Dx.get("meta", {}).get("round", 0) or 0)
                    units = len(Dx.get("units", []) or [])
                except Exception:
                    pass
                break
        hist.setdefault("archives", []).append({
            # id 由路径派生且稳定（同一目录重扫得同一 id，不会重复补条）
            "id": "r" + hashlib.md5(p.encode("utf-8")).hexdigest()[:10],
            "title": title, "rounds": rounds, "units": units,
            "archivedAt": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getmtime(p))),
            "path": p, "recovered": True})
        added += 1
    if added:
        _archives_save(hist)
    return added


def _archives_save(d):
    _atomic_json_dump(d, _archives_path())


def _archive_old_world(title):
    """旧局完整归档到归档目录（默认库内 归档/；含 data.json/导出/全部产物），并登记进局史索引，
    成功后才清空库文件。返回归档路径；空库返回 ""（不制造空壳归档）；不可信返回“归档校验失败…”。"""
    import glob as _g
    import shutil
    keep = {"ui", "材料", "归档"}                      # 归档目录在库内：绝不能把归档自己复制进归档（递归翻倍）
    items = [x for x in os.listdir(ROOT_DIR) if x not in keep and not x.startswith(".")]
    D = _load_data() or {}
    meta = D.get("meta", {})

    def _stat(p):
        """(文件数, 总字节)。目录递归统计——归档可信度按字节数对账，不再只数推演。"""
        if not os.path.exists(p):
            return (0, 0)
        if os.path.isfile(p):
            try:
                return (1, os.stat(p).st_size)
            except OSError:
                return (0, 0)
        n, b = 0, 0
        for r, _, fns in os.walk(p):
            for fn in fns:
                try:
                    n += 1
                    b += os.stat(os.path.join(r, fn)).st_size
                except OSError:
                    pass
        return (n, b)

    # 空源守卫：库内无任何世界产物时不归档。旧版源目录为空时 0<0 不成立 → 判通过 → 清库，
    # 产生只剩 data.json 的空壳归档（实测同一份 data.json 被复制三次、三次都“校验通过”）。
    prod = any(os.path.isdir(os.path.join(ROOT_DIR, d)) and os.listdir(os.path.join(ROOT_DIR, d))
               for d in ("角色", "推演", "剧本", "02-世界书", "导出"))
    if not (prod or any(x.endswith(".md") for x in items)):
        _reset_runtime_state(meta.get("title", ""))     # 运行态照常归零，但绝不登记空壳
        return ""
    dst = os.path.join(_archive_root(), "%s_群像局_%s" % (
        time.strftime("%Y-%m-%d"), (title or "旧局")[:20]))
    n = 2
    base = dst
    while os.path.exists(dst):
        dst = "%s_%d" % (base, n)
        n += 1
    os.makedirs(dst, exist_ok=True)
    for x in items:
        src = os.path.join(ROOT_DIR, x)
        try:
            if os.path.isdir(src):
                shutil.copytree(src, os.path.join(dst, x))
            else:
                shutil.copy2(src, os.path.join(dst, x))
        except Exception:
            continue
    # data.json 与导出在 ui/ 下（keep 排除了 ui），必须单独补进归档，否则旧局状态丢失
    for extra in (DATA_PATH, os.path.join(UI_DIR, "exports")):
        try:
            if os.path.isfile(extra):
                shutil.copy2(extra, os.path.join(dst, os.path.basename(extra)))
            elif os.path.isdir(extra):
                shutil.copytree(extra, os.path.join(dst, os.path.basename(extra)))
        except Exception:
            continue
    open(os.path.join(dst, "隔离清单.md"), "w", encoding="utf-8").write(
        "# 旧局归档 · %s\n\n新建世界前自动移交（工作区零备份政策，本目录即完整副本）。\n"
        "回滚：把本目录内容拷回 群像/ 并重启 ui/serve.py。\n\n"
        "本局快照：第%s轮 · %d 个单元\n" % (title or "旧局", meta.get("round", "?"), len(D.get("units", []))))
    # 归档校验（全量）：逐项核对副本文件数与总字节数，任何不符=归档不可信，中止清库。
    # 旧版只校验推演目录与 data.json 存在性——角色/剧本/世界书全丢也能“通过”。
    pairs = [(os.path.join(ROOT_DIR, x), x) for x in items]
    if os.path.isfile(DATA_PATH):
        pairs.append((DATA_PATH, "data.json"))
    ex = os.path.join(UI_DIR, "exports")
    if os.path.isdir(ex) and os.listdir(ex):
        pairs.append((ex, "exports"))
    for src, rel in pairs:
        ns, bs = _stat(src)
        if ns == 0:
            continue                                   # 源里本就没有这项，不苛求副本
        nd, bd = _stat(os.path.join(dst, rel))
        if (nd, bd) != (ns, bs):
            return ("归档校验失败：%s 副本 %d 文件/%d 字节 ≠ 源 %d/%d——已中止清库，旧局原样保留（%s）"
                    % (rel, nd, bd, ns, bs, dst))
    # 归档元数据：展示与盘点读它，不再靠目录名后缀 _N 猜（含轮数/角色数/是否完整）
    json.dump({"title": title or "旧局", "round": int(meta.get("round", 0) or 0),
               "units": len(D.get("units", [])), "castN": len(D.get("cast", []) or []),
               "filesTotal": sum(_stat(os.path.join(dst, x))[0] for x in os.listdir(dst)),
               "archivedAt": time.strftime("%Y-%m-%d %H:%M:%S"), "complete": True, "path": dst},
              open(os.path.join(dst, "metadata.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    for x in items:                                     # 归档校验通过才清库
        src = os.path.join(ROOT_DIR, x)
        try:
            shutil.rmtree(src) if os.path.isdir(src) else os.remove(src)
        except Exception:
            continue
    # 登记局史索引（持久保存，跨局累积）
    hist = _archives_store()
    hist["archives"].append({"id": "a%d" % int(time.time()), "title": title or "旧局",
                             "rounds": int(meta.get("round", 0) or 0),
                             "units": len(D.get("units", [])),
                             "archivedAt": time.strftime("%Y-%m-%d %H:%M:%S"), "path": dst})
    hist["archives"] = hist["archives"][-50:]           # 索引留最近 50 局，归档目录本体永不删
    hist["current"] = ""
    _archives_save(hist)
    _reset_runtime_state(title)                         # ui/ 下的运行态也必须归零——见函数注释
    return dst


def _reset_runtime_state(prev_title=""):
    """清空 ui/ 下的旧局运行态。归档只清库文件（keep 排除了 ui/），运行态留在 ui/ 里：

    · data.json 若原样留着，建世界一旦中途失败（模型超时/解析失败），库已清空但 data.json
      还写着旧局第 16 轮、cast 指向已被删掉的角色文件 —— 页面显示的就是"新世界没建成，
      老世界还在"的混合态。这正是用户实测过的「投放新世界，长出来还是旧世界」的一种形态。
    · gravity.json 是上一局调的引力档，新局理应从 medium 起步。
    · exports/ 是旧局的成品 txt，留在磁盘会被新局的下载列表以外的直链访问到。
    以「建世界中」占位盘取代删除：前端读得到明确状态，而不是 404 后回退到某个缓存。"""
    import shutil
    try:
        _atomic_json_dump({"meta": {"title": prev_title and ("（正在新建，替代：%s）" % prev_title) or "新世界建设中",
                                    "round": 0, "built": False, "building": True, "vaultPath": ROOT_DIR},
                           "spine": [], "cast": [], "relations": [], "lore": [], "units": [],
                           "graph": {"nodes": [], "edges": []}, "gaps": [], "levers": [], "menu": [],
                           "forecast": {}, "outcome": None, "feed": [],
                           "interviews": [], "reports": [], "exports": []}, DATA_PATH)
    except Exception:
        pass
    for junk in (os.path.join(UI_DIR, "gravity.json"), os.path.join(UI_DIR, "exports")):
        try:
            shutil.rmtree(junk) if os.path.isdir(junk) else os.remove(junk)
        except Exception:
            continue
    AUTO["gmode"] = "medium"
    for k in ("round", "unitN", "unitBudget", "roundTimes", "agents", "live",
              "baton", "autoPaused"):
        AUTO[k] = [] if k in ("roundTimes", "agents", "live") else (0 if k in
                  ("round", "unitN", "unitBudget") else "" if k == "baton" else False)


def _json_from(text):
    """从模型输出里抠出第一个 JSON 值（对象或数组）。
    旧版只认 {…}：模型输出 JSON 数组时会误抠出数组里第一个对象——图灵盲测的多段结果曾因此全丢。"""
    if not text:
        return None
    t = text.strip()
    if t.startswith("```"):
        t = t.split("```")[1]
        t = t[4:].strip() if t.lower().startswith("json") else t.strip()
    io, ia = t.find("{"), t.find("[")
    if ia >= 0 and (io < 0 or ia < io):                 # 数组先出现 → 按数组抠
        j = t.rfind("]")
        if j > ia:
            try:
                return json.loads(t[ia:j + 1])
            except Exception:
                pass
    i, j = t.find("{"), t.rfind("}")
    if i < 0 or j < 0:
        return None
    try:
        return json.loads(t[i:j + 1])
    except Exception:
        return None




DIGEST_SYS = ("你是材料摄取模块。把这份材料压成结构化纲要（**只提取不发挥，专名/数字/关系原样保留**）：\n"
              "①这份材料属于哪类（世界设定/剧情细纲/角色档案/文风规范/系列总纲/其他）\n"
              "②世界规则与既成事实（逐条）\n③人物：姓名+身份+欲望+恐惧+秘密（逐人一行）\n"
              "④剧情节点：必达/可选/禁忌（逐条）\n⑤单元/章节段落划分（若有）\n⑥写作纪律（若有）\n"
              "用紧凑的短条目，不写客套。若某项材料里没有，写'无'。")


def _ingest_materials(log):
    """map-reduce 摄取：逐文件摘要 → 汇总纲要，落盘 材料/_纲要.md 供复用。"""
    import glob as _g
    cfg = _llm_cfg()
    mat = os.path.join(ROOT_DIR, "材料")
    files = sorted(_g.glob(os.path.join(mat, "*.txt"))) + sorted(_g.glob(os.path.join(mat, "*.md")))
    files = [f for f in files if not os.path.basename(f).startswith("_")]
    # 只摄取"本次投放"的材料：材料/ 是累积目录（旧局材料一直躺着），全目录摄取会把旧世界
    # 混进新世界——实测换新局重投材料，建出来的还是旧局卡司。pending.files 是这一批的白名单。
    batch = [os.path.join(ROOT_DIR, f) for f in ((_pending() or {}).get("files") or [])]
    batch = [f for f in batch if os.path.exists(f)]
    if batch:
        skipped = len(files) - len(batch)
        files = batch
        if skipped > 0:
            log("只摄取本次投放的 %d 份材料（目录内另有 %d 份旧局材料，已跳过）" % (len(files), skipped))
    if not files:
        return "", ""
    cache = os.path.join(mat, "_纲要.md")
    # 缓存只在"同一批材料"内复用：本批投放晚于缓存即重新摄取。
    # 旧版只比 mtime——上一局刚生成的纲要天然比刚落盘的新材料旧几秒时才重算，
    # 一旦顺序颠倒就会拿旧局纲要建新世界（旧世界原样复活的第二条路径）。
    pend_ts = float((_pending() or {}).get("at_ts") or 0)
    if os.path.exists(cache) and os.stat(cache).st_mtime >= pend_ts:
        newest = max(os.stat(f).st_mtime for f in files)
        if os.stat(cache).st_mtime > newest:
            log("复用已有材料纲要")
            t = open(cache, encoding="utf-8").read()
            return t, _materials_raw(files)
    fcache_path = os.path.join(mat, "_摄取缓存.json")   # 文件级缓存：未变材料重试/续建不再重烧
    try:
        fcache = json.load(open(fcache_path, encoding="utf-8"))
        if not isinstance(fcache, dict):
            fcache = {}
    except Exception:
        fcache = {}
    nfiles = len(files)

    def _save_fcache():
        try:
            json.dump(fcache, open(fcache_path, "w", encoding="utf-8"), ensure_ascii=False)
        except Exception:
            pass                                # 缓存持久化失败不影响摄取本体

    def _digest_file(item):
        """单份材料逐块完整摄取；文件内保持顺序，文件间有限并行。"""
        fi, f = item
        name = os.path.basename(f)
        try:                                    # 文件未变 → 整份复用上次的逐块摘要，零调用
            st0 = os.stat(f)
            ent = fcache.get(name)
            if (ent and ent.get("size") == st0.st_size and ent.get("mtime") == st0.st_mtime
                    and (ent.get("digest") or "").strip()):
                return name, ent["digest"], None
        except OSError:
            pass
        raw = open(f, encoding="utf-8").read()
        chunks = [raw[k:k + 12000] for k in range(0, len(raw), 12000)] or [""]
        parts = []
        for ci, ch in enumerate(chunks):
            if AUTO.get("stop"):
                return name, None, "已暂停"
            _set_progress("摄取材料 %s（%d/%d 份·%d/%d 块）" % (name[:22], fi + 1, nfiles, ci + 1, len(chunks)),
                          5 + 30 * (fi + ci / max(len(chunks), 1)) / nfiles)
            log("摄取 %s（%d/%d）" % (name, ci + 1, len(chunks)))
            t, err = _llm([{"role": "system", "content": DIGEST_SYS},
                           {"role": "user", "content": "《%s》第%d/%d段：\n%s" % (name, ci + 1, len(chunks), ch)}],
                          cfg, max_tokens=2500, temperature=0.2, retries=1,
                          timeout=_BUILD_CALL_TIMEOUT, think=False)
            if err:
                return name, None, err
            parts.append(t or "")
        digest = "### 《%s》\n%s" % (name, "\n".join(parts))
        try:                                    # 成功一份即持久化：中途崩溃，已烧的调用不白烧
            st1 = os.stat(f)
            with _lock:
                fcache[name] = {"size": st1.st_size, "mtime": st1.st_mtime, "digest": digest}
                _save_fcache()
        except OSError:
            pass
        return name, digest, None

    # 同一份文件的块严格串行，文件之间有限并行；结果按文件原顺序合并。
    with ThreadPoolExecutor(max_workers=min(_BUILD_INGEST_WORKERS, nfiles)) as ex:
        results = list(ex.map(_digest_file, list(enumerate(files))))
    failures = [(name, err) for name, _digest, err in results if err]
    if failures:
        log("材料摄取中止：%s（已成功的 %d/%d 份已进缓存，重试只补失败文件，不重烧）"
            % ("；".join("%s：%s" % x for x in failures[:3]), nfiles - len(failures), nfiles))
        return "", ""
    digests = [digest for _name, digest, _err in results if digest is not None]
    digest = "# 材料纲要（自动摄取）\n\n" + "\n\n".join(digests)
    open(cache, "w", encoding="utf-8").write(digest)
    log("材料纲要已生成（%d 份材料 · 原文 %d 字全部读过）" % (len(files), sum(len(x) for x in _RAW_SEEN)))
    return digest, _materials_raw(files)


_RAW_SEEN = []


def _materials_raw(files):
    """材料原文全量拼装（带文件名分隔），不截断。

    旧版每份只取前 4000 字、整体再砍到 8000 字：29 份共 14.8 万字的材料，真正进得了建世界的
    原文只有 8000 字。后果最重的不是世界观（它读的是 map-reduce 纲要，那一路是全量的），
    而是角色——_cast_ctx 靠"在原文里搜这个人的名字"来给他喂自己的档案，而单份角色档案
    动辄 6000 字，在 8000 字的窗口里绝大多数角色**根本搜不到自己**，于是回退到"原文前 4000 字"，
    也就是**别人的档案**。角色带着别人的设定出生，OOC 从建世界那一刻就注定了。
    这里改为全量：原文只做定位与切分用，下游按人按需取，不会把 14 万字整个灌给模型。"""
    out = []
    _RAW_SEEN[:] = []
    for f in files:
        try:
            t = open(f, encoding="utf-8").read()
        except Exception:
            continue
        _RAW_SEEN.append(t)
        out.append("《%s》\n%s" % (os.path.basename(f), t))
    return "\n\n".join(out)


# 建世界时一次性喂给模型的原文上限（字）。默认 20 万 ≈ 12.5 万 token，容得下十几万字的
# 设定集；材料再大就不该整块灌了——map-reduce 纲要那一路本来就是全量的。可用环境变量调。
_BUILD_RAW_BUDGET = int(os.environ.get("NEST_BUILD_RAW", "200000") or 200000)
_BUILD_CALL_TIMEOUT = int(os.environ.get("NEST_BUILD_CALL_TIMEOUT", "300") or 300)
_BUILD_INGEST_WORKERS = max(1, int(os.environ.get("NEST_BUILD_INGEST_WORKERS", "4") or 4))
_BUILD_CAST_WORKERS = max(1, int(os.environ.get("NEST_BUILD_CAST_WORKERS", "6") or 6))


def _spread_raw(head, budget, log=None):
    """原文装进预算：份数均摊，让每一份材料都进得来，而不是前两份吃光配额。

    旧版直接 head[:8000]：29 份材料里只有前两份露脸，后 27 份（含大部分角色档案）
    对建世界完全不存在。均摊之后每份至少有自己的份额；没被用满的份额还给其他文件。"""
    files = _raw_files(head)
    if not files:
        return (head or "")[:budget]
    total = sum(len(b) for _n, b in files)
    if total <= budget:
        return head                                        # 装得下就一个字不删
    share = budget // len(files)
    kept, spare = [], 0
    for _n, b in files:                                     # 先把小文件全收下，攒出余额
        if len(b) <= share:
            spare += share - len(b)
    per_extra = spare // max(1, sum(1 for _n, b in files if len(b) > share))
    for n, b in files:
        cap = len(b) if len(b) <= share else share + per_extra
        kept.append("《%s》%s\n%s" % (n, "" if cap >= len(b) else "（本份 %d 字，因总量超限取前 %d 字）"
                                     % (len(b), cap), b[:cap]))
    if log:
        log("材料原文共 %d 字，超过单次上限 %d——已按份数均摊，%d 份材料全部有份额进场"
            % (total, budget, len(files)))
    return "\n\n".join(kept)


def _raw_files(head):
    """把全量原文还原成 [(文件名, 正文)]——按人取材料时以「整份文件」为单位，不打散。"""
    out = []
    for blk in (head or "").split("\n\n《"):
        blk = blk.lstrip("《")
        if "》\n" not in blk:
            continue
        nm, body = blk.split("》\n", 1)
        out.append((nm, body))
    return out



WORLD2_SYS = ("你是建世界模块·第一阶段。据材料纲要输出严格 JSON（只提取不发挥，材料没写的留空）：\n"
              '{"title":"局名","world":"世界观正文（散文：世界底色+硬规则+既成事实，300-800字）",'
              '"spine":{"iron":["必达节点，一句话"],"soft":["可漂移节点"],"forbid":["绝不可发生"]},'
              '"truth":"真相底稿（材料含真相则写全：谁做了什么、动机链、线索脉络；否则空串）"}\n只输出 JSON。')

CAST2_SYS = ("你是建世界模块·第二阶段（角色）。据材料纲要输出严格 JSON：\n"
             '{"cast":[{"name":"","role":"","core":"内核卡散文：一行身份/性格底盘/欲望/恐惧/真缺点/底线/谎言习惯/待人（每项一行）",'
             '"voice":"声纹卡：语体/口头习惯/非语言指纹/各档说话(安紧危崩)/撒谎中/示例句（注明禁入正文）",'
             '"psyche":"心象：他知道的世界／他心里的人（含二阶心智）／他此刻（情绪+一句原因）／他的打算（眼下·往后·归处）",'
             '"secrets":"他独有的秘密（他知道别人不知道的）"}]}\n'
             "只收材料里真实存在且有明确身份/设定的人物，必须完整列出，不要为了压缩而只保留少数主角。只输出 JSON。")

CAST_LIST_SYS = ("你是建世界模块·第二阶段A（角色点名）。据材料纲要输出严格 JSON：\n"
                 '{"cast":[{"name":"人物名","role":"身份一句话"}]}\n'
                 "只收材料里真实存在且有明确身份/设定的人物，必须完整列出，不要为了压缩而只保留少数主角。只输出 JSON。")

CAST_ONE_SYS = ("你是建世界模块·第二阶段B（单人三卡）。为指定人物据材料纲要输出严格 JSON：\n"
                '{"name":"","role":"","core":"内核卡散文：一行身份/性格底盘/欲望/恐惧/真缺点/底线/谎言习惯/待人（每项一行）",'
                '"voice":"声纹卡：语体/口头习惯/非语言指纹/各档说话(安紧危崩)/撒谎中/示例句（注明禁入正文）",'
                '"psyche":"心象：他知道的世界／他心里的人（含二阶心智）／他此刻（情绪+一句原因）／他的打算（眼下·往后·归处）／身上挂着的事（2-3件与主线完全无关、悬在他生活里的小事——胃疼了一上午/没回他妈的短信/培养结果没出。不解释不回收，可以一直悬着）",'
                '"secrets":"他独有的秘密（他知道别人不知道的）",'
                '"habits":"3-5条专属此人的无目的习惯（他的物理存在方式，跨轮稳定复现，不改变局面也不需要改变——说话前摸口袋里的钢笔/别人说话时看桌面不看人/从不接别人递的水。必须专属：换个人做就不对味）",'
                '"desire":"私欲一句：与案件/主线完全无关但他真心想要的一件事（想过职称评审/想约某人吃饭没敢/想删三年前的帖子）——它不推进剧情，只在关键时刻与主线抢他",'
                '"traits":{"iq":"1-5 智力：能算几步棋（1=只看眼前，5=布局数轮之后）",'
                '"eq":"1-5 情商：读脸色与照顾他人感受的能力（1=口无遮拦得罪人，5=一句话就能安抚或激怒指定的人）",'
                '"survival":"1-5 求生欲：命受威胁时退让的程度（1=可以豁出命，3=常人怕死，5=极度惜命随时叛卖）",'
                '"startle":"1-5 惊讶阈值：多离谱的事才会让他失态（1=一点意外就慌，5=见过太多所以很难惊动）",'
                '"scheme":"1-3 谋略层数：他一次能同时经营几条线（1=一条道走到黑，3=明线暗线备用线同时铺）",'
                '"why":"一句话：这五项为什么是这个数——引材料里他的经历或性格原话"}}\n'
                "**traits 必须从材料里这个人的实际言行与经历推出，不许平均化、不许都给中间值**："
                "老刑警的 iq 和 startle 通常高、eq 未必高；蠢贼 iq 低但 survival 极高；"
                "刚烈者 survival 可以低到 1；擅长交际者 eq 高但 scheme 未必多。"
                "大多数人 survival≥3（常人怕死），例外必须在 why 里给出材料依据。\n"
                "只依据材料纲要为该人物建档；材料没写的留白，不虚构设定。只输出 JSON。")

UNIT2_SYS = ("你是建世界模块·第三阶段（单元剧本）。据材料纲要与作者补充输出严格 JSON：\n"
             '{"units":[{"name":"单元名","cast":["在场者"],"dark":["暗线人物"],'
             '"stage":"时间跨度+地点+氛围底色","open":"开场态三五句","goal":"单元终点一句话（写结果不写过程）",'
             '"must":["必须发生"],"forbid":["本单元禁止"],"budget":"该单元推演轮数上限（整数）"}]}\n'
             "budget 按「戏」数：一轮=一场完整的戏（有目的/冲突/转折/结果的四拍）。"
             "估算法=开局2＋每条「必须发生」2 轮＋每层反转/揭露 2 轮＋每个在场角色保底 1 轮＋收束2。"
             "一个单元 8-40 轮为健康区间；超过 40 轮说明塞了太多事——**把大案切成多个单元**"
             "（发现与立案/取证与弯路/收网与对峙 各成一单元），每单元一个可判定的终点目标。只输出 JSON。")


def _estimate_unit_rounds(u, cast_total):
    """结构化轮数预估（可解释）：一轮四拍=一场完整的戏，预算=把戏数出来，不猜。
    开局铺 2 ＋ 每条「必须发生」2 轮（送进场+撞出结果）＋ 每层反转 2 轮（种+爆）
    ＋ 全员保底（每个在场者至少驱一轮，咬合律织入）＋ 收束 2 轮；上浮带=复杂度余量。
    经验上「几百轮」级别的粗估普遍虚高一个数量级（数出来的戏数才是真预算），
    且虚高预算会拉坏节奏引力（长期困在开局档=不施引力=原地打转）。"""
    musts = [x for x in (u.get("must") or []) if x]
    text = " ".join([u.get("goal", "") or ""] + musts + [x for x in (u.get("dark") or []) if x])
    TW = ("反转", "揭露", "揭穿", "真相大白", "翻案", "逆转", "暴露", "戳穿", "反咬", "伪装败露", "身份揭晓", "隐藏身份")
    twists = sum(text.count(k) for k in TW)
    core = min(len(u.get("cast") or []) or cast_total, cast_total, 10)
    lo = 2 + 2 * len(musts) + 2 * twists + max(core, 3) + 2
    hi = lo + max(3, len(musts) + twists)
    lo = max(6, min(lo, 48))
    hi = max(lo + 3, min(hi, 60))
    why = "开局2＋必须发生%d×2＋反转层%d×2＋全员保底%d＋收束2" % (len(musts), twists, max(core, 3))
    return lo, hi, why




def _trait_int(v, lo, hi, dflt):
    """traits 数值防崩解析：正则抽首个整数 → clamp 到 [lo,hi] → 失败取默认。
    模型实测会返回 '材'、'10'、null、缺省——旧版 str(...)[0] 只取首字符且裸调 int()，
    非数字直接 ValueError 冲垮整条建世界流水线。"""
    if v is None:
        return dflt
    m = re.search(r"\d+", str(v))
    if not m:
        return dflt
    return max(lo, min(hi, int(m.group())))


def _traits_block(t):
    """秉性表 → 给角色 agent 的行为口径（数值本身不进正文，只塑造他怎么想怎么做）。"""
    if not isinstance(t, dict) or not t:
        return ""
    g = lambda k, d=3: _trait_int(t.get(k), 1, 3 if k == "scheme" else 5, d)
    iq, eq, sv, st, sc = g("iq"), g("eq"), g("survival"), g("startle"), g("scheme", 2)
    L = ["【你的秉性】（这不是设定表，这是你的脑子实际怎么转——数字永不进正文）"]
    L.append({1: "你只看得见眼前这一步，想不到别人下一步会怎么接。",
              2: "你能想到对方的下一步，但再往后就糊了。",
              3: "你能算两步：他会怎么答，我再怎么接。",
              4: "你能算三步，并且会预先埋一句留后路的话。",
              5: "你在说这句话时已经想好了三轮之后要落在哪里，眼下这句只是铺垫。"}[iq])
    L.append({1: "你读不出别人脸上的意思，常常一句话就把人得罪了，事后也不知道为什么。",
              2: "你能看出对方不高兴，但不知道怎么办，于是硬着头皮往下说。",
              3: "你看得出场面冷了，会换个说法。",
              4: "你知道每个人在意什么，说话前先挑好落点。",
              5: "你能一句话把人安抚下来，也能一句话精准地戳穿他最疼的地方——你清楚自己在做哪一件。"}[eq])
    L.append({1: "你把命看得比这件事轻——真到了要选，你会站着不动。",
              2: "你怕，但有比命更要紧的东西压着你。",
              3: "你怕死，跟常人一样：危险面前你先想怎么活着走出去，再想别的。",
              4: "你很惜命，形势不利时你先保自己，事后再找说法。",
              5: "你极度怕死，刀架到脖子上你什么都能说、什么人都能卖。"}[sv])
    L.append({1: "你容易被惊到——一点意外就会让你失口、忘了原本要说的话。",
              2: "遇上没料到的事，你会有片刻接不上话。",
              3: "意外会让你停一下，但你能接住。",
              4: "你见过不少事，很难被惊动，但真正超出经验的东西会让你露出破绽。",
              5: "你几乎不失态——见得太多了；但也正因如此，你偶尔会低估新东西的危险。"}[st])
    L.append({1: "你一条道走到黑，不留后手。",
              2: "你手上同时有明线和一条备用的说法。",
              3: "你同时经营明线、暗线和一条随时可弃的替身线，彼此不相通。"}[min(3, sc)])
    L.append("以上决定你**怎么谋划**：iq 低就别写出你算不到的深谋；eq 低就允许你说错话得罪人并且不自知；"
             "怕死就允许你退、拖、认栽；不易惊讶就别为小事失态。**违背秉性的聪明或勇敢一律是假的。**")
    return "\n".join(L) + "\n"


_PLACEHOLDER_PAT = re.compile(r"材料未详述|未详述|未描述|材料未提及|留白|无具体描述|暂无资料")
SOVEREIGN_TERMS = ("第一主角", "全书主角", "故事核心", "幕后主宰", "真正主角")
_GENERIC_ROLE_FRAGS = {"主角", "配角", "反派", "龙套", "次要人物", "主要人物", "关键人物", "当事人"}


def _role_fragments(role):
    """身份行切成语义片段（全半角标点+空白切分）：跨题材可比对的校验基准。
    滤掉叙事职能词（主角/配角这类放谁身上都成立）与过短碎片。"""
    frags = re.split(r"[，,、/·；;（）()\s—\-]+", str(role or ""))
    return [f.strip() for f in frags if len(f.strip()) >= 2 and f.strip() not in _GENERIC_ROLE_FRAGS]


def _cast_gate(c, own_role, peers=None):
    """角色卡质量闸门：空壳卡 / 串位卡在落盘前拦截。返回 (ok, reason)。
    own_role = 点名阶段名册里此人自己的身份行；peers = 名册其余人的身份行（串位交叉基准）。"""
    core = str(c.get("core", "") or "")
    role = str(c.get("role", "") or "")
    voice = str(c.get("voice", "") or "")
    psy = str(c.get("psyche", "") or "")
    body = core + role + psy
    hits = len(_PLACEHOLDER_PAT.findall(body))
    if len(_PLACEHOLDER_PAT.sub("", core).strip()) < 120 or hits >= 3:
        return False, "内核过薄或占位过多（空壳卡）"
    if len(_PLACEHOLDER_PAT.sub("", voice).strip()) < 30:
        return False, "声纹过薄"
    if psy.strip() and len(_PLACEHOLDER_PAT.sub("", psy).strip()) < 40:
        return False, "心象过薄（疑似全占位）"          # 典型病灶：心象整篇占位而内核/声纹看似正常
    # 串位检测①主权词（已知模式，快路径）
    if any(w in role + core[:200] for w in SOVEREIGN_TERMS) and not any(
            w in own_role for w in SOVEREIGN_TERMS):
        return False, "身份含不属于此人的主权称谓（疑似串位卡）"
    # 串位检测②名册交叉（任意题材）：卡的自我身份区声称了名册另一人 ≥2 个身份片段，
    # 而自己的身份片段一个没有——把「拿配角索引当校验基准」通用化：名册身份行就是现成的
    # 索引，不依赖任何用户文件；主权词表只对已知作品有效，这套对换一部小说照样生效。
    own_frags = _role_fragments(own_role)
    if own_frags and peers:
        claim = role + core[:200]
        if not any(f in claim for f in own_frags):
            for pr in peers:
                pf = [f for f in _role_fragments(pr) if f not in own_frags]
                if len(pf) >= 2 and sum(1 for f in pf if f in claim) >= 2:
                    return False, "身份与名册另一人高度重合（疑似串位卡：写成了别人的身份）"
    return True, ""


def _strip_placeholder(text):
    """落盘前剥离占位句，避免空壳文本污染后续所有 prompt。"""
    return _PLACEHOLDER_PAT.sub("", str(text or "")).strip()


def _write_cast_files(c):
    """角色三卡落盘（内核/声纹/心象）。返回 data.json 的 cast 条目。"""
    nm = (c.get("name") or "").strip()
    if not nm:
        return None
    sec = _strip_placeholder(c.get("secrets", ""))
    tr = c.get("traits") if isinstance(c.get("traits"), dict) else {}
    tv = lambda k, d=3: _trait_int(tr.get(k), 1, 3 if k == "scheme" else 5, d)
    core = _strip_placeholder(c.get("core", ""))
    open(os.path.join(ROOT_DIR, "角色", "%s.md" % nm), "w", encoding="utf-8").write(
        "---\ntype: core\nname: %s\nrole: %s\niq: %s\neq: %s\nsurvival: %s\nstartle: %s\nscheme: %s%s\n---\n"
        "\n# %s · 内核卡\n\n%s\n%s\n\n%s%s"
        % (nm, c.get("role", ""), tv("iq"), tv("eq"), tv("survival"), tv("startle"), tv("scheme", 2),
           ("\nsuspect: true" if c.get("suspect") else ""),
           nm, core
           + (("\n**习惯**（专属，跨轮自然复现，不需要改变局面）：" + _strip_placeholder(c.get("habits", "")))
              if c.get("habits") else "")
           + (("\n**私欲**（与主线无关，关键时刻与主线抢他）：" + _strip_placeholder(c.get("desire", "")))
              if c.get("desire") else ""),
           ("\n**秘密**：" + sec) if sec else "",
           _traits_block(tr), ("\n> 秉性依据：%s\n" % _strip_placeholder(tr.get("why", ""))) if tr.get("why") else ""))
    open(os.path.join(ROOT_DIR, "角色", "%s·声纹.md" % nm), "w", encoding="utf-8").write(
        "---\ntype: voice\nname: %s\n---\n\n# %s · 声纹卡\n\n%s\n"
        % (nm, nm, _strip_placeholder(c.get("voice", ""))))
    open(os.path.join(ROOT_DIR, "角色", "%s·心象.md" % nm), "w", encoding="utf-8").write(
        "---\ntype: psyche\nname: %s\nemo: 惧\ntier: 安\nupdated: 第0轮\n---\n\n# %s · 心象\n\n%s\n"
        % (nm, nm, _strip_placeholder(c.get("psyche", ""))))
    prof = _parse_core(c.get("core", ""))
    if sec:
        prof["hasSecret"] = True
    ent = {"name": nm, "role": c.get("role", ""), "state": "惧·安",
           "brief": (core.splitlines() or [""])[0][:60],
           "profile": prof, "traitWhy": _strip_placeholder(tr.get("why", ""))[:160],
           "traits": {k: tv(k, 2 if k == "scheme" else 3) for k in
                      ("iq", "eq", "survival", "startle", "scheme")}}
    if c.get("suspect"):
        ent["suspect"] = True
    if c.get("thin"):
        ent["thin"] = True
    return ent


def _auto_init(raw, title_hint, requirement, log, confirm=False):
    """独立 API 模式：三阶段自主建世界（摄取→世界+脊椎→角色→单元）。
    confirm=True 才允许覆盖有进度的局——UI 投放走这条（用户点了「建世界」即确认）。"""
    cfg = _llm_cfg()
    if not cfg:
        return False, "未接入 API"
    D0 = _load_data() or {}
    rnd0 = int(D0.get("meta", {}).get("round", 0) or 0)
    if rnd0 > 0 and not confirm:                    # 有进度的局，非用户明示不许重建
        return False, ("当前局已推演 %d 轮——建世界会归档并清空它。为防误毁，"
                       "非用户明示的建世界指令一律拒绝执行。" % rnd0)

    _pend = _pending() or {}
    _pfiles = [p for p in (_pend.get("files") or [])
               if os.path.exists(os.path.join(ROOT_DIR, p))]
    _raw_text = (raw or "").strip()
    if not _pfiles and len(_raw_text) < 20:
        return False, ("没有可用的建世界材料：请先在「投放新世界」中上传材料文件"
                       "（.txt / 富文本 / PDF）后再点建造，否则建出来的是无数据空壳。"
                       "这次建造已取消，当前世界未被动。")

    # 用户确认建造后先切换运行态，再做材料摄取。否则几十分钟的材料分析期间，
    # 页面仍显示旧世界，用户会误以为新世界没有开始或又加载了旧局。
    _set_progress("退出旧世界，准备空白库", 1)
    log("退出当前世界，准备新世界空白库…")
    arch = _archive_old_world((_load_data() or {}).get("meta", {}).get("title", ""))
    if isinstance(arch, str) and arch.startswith("归档校验失败"):
        log(arch)
        return False, arch

    digest, head = _ingest_materials(log)
    if not digest:
        # 有明确投放文件时，摄取失败必须中止；不能悄悄用未整理的预览继续建库。
        pending_files = (_pending() or {}).get("files") or []
        if pending_files:
            return False, "材料全量摄取失败：已停止建造，请检查 API 或重新提交材料"
        digest, head = "", raw
    # 全量摄取≠把同一批原文重复灌进每个阶段。原文已经逐文件、逐块读完并进入
    # map-reduce 纲要；世界/单元/世界书阶段统一使用这份完整纲要。角色阶段另取
    # “本人专属文件全文+提到本人段落”，因此既不丢源文，也不会让每个阶段重复
    # 发送十几万字导致网关长时间预填充。
    raw_files = _raw_files(head)
    source_index = "\n".join("《%s》：%d字（已全量摄取）" % (fn, len(body))
                             for fn, body in raw_files)
    base = ("【材料纲要（全量 map-reduce，不删条目）】\n%s\n\n【全量来源索引】\n%s\n\n"
            "【作者的剧情脊椎补充】\n%s\n【局名建议】%s" % (
               digest, source_index or "（无）", requirement or "（无）", title_hint or ""))
    log("建世界上下文：完整纲要 %d 字；原文 %d 字已在摄取阶段全部读过（%d 份），阶段间不重复发送"
        % (len(digest), len(head), len(raw_files)))
    for d in ("角色", "剧本", "推演", "02-世界书", "导出", "沙盘"):
        os.makedirs(os.path.join(ROOT_DIR, d), exist_ok=True)
    _set_progress("提炼世界观与剧情脊椎", 40)
    log("提炼世界与脊椎＋角色点名（并行发起）…")
    def _roster_call():
        return _llm([{"role": "system", "content": CAST_LIST_SYS}, {"role": "user", "content": base}],
                    cfg, max_tokens=5000, temperature=0.2, retries=1,
                    timeout=_BUILD_CALL_TIMEOUT, think=False)
    with ThreadPoolExecutor(max_workers=2) as _be:
        _rF = _be.submit(_roster_call)
        t1, e1 = _llm([{"role": "system", "content": WORLD2_SYS}, {"role": "user", "content": base}],
                      cfg, max_tokens=5000, temperature=0.35, retries=1,
                      timeout=_BUILD_CALL_TIMEOUT, think=False)
        W = _json_from(t1) or {}
        if e1 or not W.get("world"):
            return False, "世界层解析失败：" + (e1 or "输出不完整")
        title = (W.get("title") or title_hint or "新局").strip()
        sp = W.get("spine") or {}
        # 世界层立即落盘——左侧活图谱长出「世界观+脊椎」节点
        open(os.path.join(ROOT_DIR, "00-世界观.md"), "w", encoding="utf-8").write(
            "---\ntype: world\ntitle: %s\n---\n\n# 世界观 · %s\n\n%s\n" % (title, title, W.get("world", "")))
        L = ["---", "type: spine", "drift_budget: 2", "---", "", "# 剧情脊椎", "", "## 铁节点（必达）", ""]
        L += ["%d. %s" % (i + 1, x) for i, x in enumerate(sp.get("iron", []))] or ["（材料未给，待补）"]
        L += ["", "## 软节点（可漂移）", ""] + (["- " + x for x in sp.get("soft", [])] or ["（无）"])
        L += ["", "## 禁区（绝不可发生）", ""] + (["- " + x for x in sp.get("forbid", [])] or ["（无）"])
        if requirement:
            L += ["", "## 作者补充[用户补充]", "", requirement]
        open(os.path.join(ROOT_DIR, "01-剧情脊椎.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")
        if W.get("truth"):
            open(os.path.join(ROOT_DIR, "真相底稿.md"), "w", encoding="utf-8").write(
                "---\ntype: truth\naccess: 上帝专用——任何角色信封禁入\n---\n\n# 真相底稿\n\n%s\n" % W["truth"])
        _set_progress("三卡 0/? · 角色点名中", 55)
        t2, _e = _rF.result()
        C = _json_from(t2) or {}
    roster = [x for x in (C.get("cast") or [])
              if isinstance(x, dict) and (x.get("name") or "").strip()]
    if not roster:
        return False, "未能从材料中提取角色（请检查角色材料是否包含明确的人物设定）"
    log("点名 %d 人：%s" % (len(roster), "、".join(x["name"] for x in roster)))
    # 三卡生成：人与人之间互不依赖 → 并行；卡司数量以材料中的完整点名结果为准。
    # 并且每人只喂"他自己的那几段材料"：旧版给每人灌 28K 字全量纲要，既贵又吵——聚焦后又快又准。
    raw_files = _raw_files(head)

    def _digest_for_person(nm):
        """从完整摄取纲要中取与此人直接相关的全部条目，不重复发送无关条目。

        全量读取已经在摄取阶段完成；角色信封需要的是本人相关的全量证据，
        而不是把整份几十万字纲要重复塞给每一个角色。"""
        blocks = re.split(r"\n{2,}(?=### 《)", digest or "")
        hits = [b for b in blocks if nm and nm in b]
        return "\n\n".join(hits) or "（完整纲要中没有直接点名此人；不得拿其他人的经历补齐）"

    def _cast_ctx(nm):
        """给这个人他自己的全部材料：以他命名的整份文件全给，其余文件只给提到他的段落。

        旧版在 8000 字的截断窗口里搜名字，多数人搜不到，回退成"原文前 4000 字"= 别人的档案。
        现在按整份文件命中：材料/<人名>.txt 会完整进此人的信封，一个字不删。"""
        own, mentions = [], []
        for fn, body in raw_files:
            stem = os.path.splitext(fn)[0]
            if nm and (nm in stem or stem in nm):          # 以他命名的档案 → 整份全给
                own.append("《%s》（此人专属档案，全文）\n%s" % (fn, body))
                continue
            hit = [p for p in body.split("\n\n") if nm and nm in p]
            if hit:
                mentions.append("《%s》（提到他的段落）\n%s" % (fn, "\n\n".join(hit)))
        focus = "\n\n".join(own + mentions)
        if not focus:                                       # 材料里确实没有他 → 明说，不拿别人的顶替
            focus = "（材料中没有以「%s」为主的段落——只按纲要与身份行写，不得凭空杜撰经历）" % nm
        return ("【材料纲要·此人相关的全部条目】\n%s\n\n【全量来源索引】\n%s\n\n"
                "【此人相关材料原文（专属文件全文＋被提及段落）】\n%s\n\n"
                "【作者的剧情脊椎补充】\n%s\n【局名】%s"
                % (_digest_for_person(nm), source_index or "（无）", focus,
                   requirement or "（无）", title_hint or ""))

    done = [0]

    def _one_cast(ix):
        i, x = ix
        nm = (x.get("name") or "").strip()
        ctx = _cast_ctx(nm)
        own_role = str(x.get("role", "") or "")
        peers = [str(y.get("role", "") or "") for j, y in enumerate(roster) if j != i]
        for att in range(2):                                  # 解析失败/质量不过闸 → 自动重试一次
            t2, _e = _llm([{"role": "system", "content": CAST_ONE_SYS},
                           {"role": "user", "content": ctx + "\n【人物】%s（%s）" % (nm, x.get("role", ""))}],
                          cfg, max_tokens=5000, temperature=0.35, retries=1,
                          timeout=_BUILD_CALL_TIMEOUT, think=False)
            j = _json_from(t2) or {}
            cc = j.get("cast") if isinstance(j.get("cast"), list) else ([j] if j.get("name") else [])
            c = cc[0] if cc else None
            if c and (c.get("name") or "").strip():
                c["name"] = nm                                # 以点名名为准
                okq, why = _cast_gate(c, own_role, peers)
                if not okq:
                    if att == 1:                              # 二次仍不过闸：落盘但打标，别让单人卡死全局
                        c["thin" if "过薄" in why else "suspect"] = True
                        log("「%s」三卡二次未过质量闸（%s）——落盘并打标" % (nm, why))
                    else:
                        log("「%s」三卡未过质量闸（%s），重试…" % (nm, why))
                        continue
                done[0] += 1
                _set_progress("三卡 %d/%d（并行）" % (done[0], len(roster)),
                              55 + int(14 * done[0] / len(roster)))
                return c
            log("「%s」三卡第 %d 次未解析出%s" % (nm, att + 1, "，重试…" if att == 0 else "，跳过"))
        return None

    _set_progress("三卡 0/%d · 并行生成中" % len(roster), 55)
    cast = []
    with ThreadPoolExecutor(max_workers=min(_BUILD_CAST_WORKERS, len(roster))) as ex:
        for c in ex.map(_one_cast, list(enumerate(roster))):
            if not c:
                continue
            try:
                ent = _write_cast_files(c)                     # 单人落盘异常不得冲垮整条流水线
            except Exception as e:
                log("「%s」三卡落盘失败：%s（跳过此人，不影响名册其余）" % (c.get("name", "?"), e))
                continue
            if ent:
                cast.append(ent)
                log("✓ %s 三卡落盘（%d/%d）%s" % (c["name"], len(cast), len(roster),
                                                "｜⚠已打标" if (ent.get("suspect") or ent.get("thin")) else ""))
    if not cast:
        return False, "未能从材料中提取角色（请检查角色材料是否包含明确的人物设定）"
    _set_progress("切分单元剧本", 70)
    log("切分单元剧本…")
    t3, _e = _llm([{"role": "system", "content": UNIT2_SYS},
                   {"role": "user", "content": base + "\n【已提取角色】" + "、".join(c.get("name", "") for c in cast)}],
                  cfg, max_tokens=5000, temperature=0.35, retries=1,
                  timeout=_BUILD_CALL_TIMEOUT, think=False)
    Uj = _json_from(t3) or {}
    units = Uj.get("units") or [{"name": "单元一", "goal": W.get("spine", {}).get("iron", ["（待补）"])[0], "budget": 60}]
    # 结构化预估钳制：LLM 的 budget 只作参考，最终预算=结构估算带（虚高预算会拉坏节奏引力）
    for u in units:
        lo_, hi_, why_ = _estimate_unit_rounds(u, len(cast))
        u["estLo"], u["estHi"], u["estWhy"] = lo_, hi_, why_
        u["budget"] = hi_ if not (lo_ <= int(u.get("budget", 0) or 0) <= hi_) else int(u["budget"])
        log("单元「%s」预估 %d-%d 轮（%s）｜LLM 报 %s → 定 %d"
            % (u.get("name", ""), lo_, hi_, why_, u.get("budget", "?"), u["budget"]))
    # 单元剧本立即落盘——左侧活图谱长出「单元」节点
    for i, u in enumerate(units):
        _set_progress("剧本 %d/%d · %s" % (i + 1, len(units), u.get("name", "")),
                      70 + int(10 * i / max(1, len(units))))
        nm = u.get("name", "单元%d" % (i + 1))
        open(os.path.join(ROOT_DIR, "剧本", "%02d-%s.md" % (i + 1, nm)), "w", encoding="utf-8").write(
            "# 单元%02d · %s\n\n## 卡司\n在场：%s\n暗线：%s\n\n## 舞台\n%s\n\n## 开场态\n%s\n\n## 单元目标\n%s\n\n## 单元约束\n%s\n%s\n\n## 轮次预算\n最多 %d 轮（预估 %d-%d：%s）\n"
            % (i + 1, nm, "、".join(u.get("cast", []) or [c["name"] for c in cast]),
               "、".join(u.get("dark", []) or ["（无）"]), u.get("stage", ""), u.get("open", ""),
               u.get("goal", ""), "\n".join("- 必须：" + x for x in u.get("must", [])),
               "\n".join("- 禁止：" + x for x in u.get("forbid", [])), int(u.get("budget", 8) or 8),
               u.get("estLo", 8), u.get("estHi", 12), u.get("estWhy", "")))
    _set_progress("生成世界书", 80)
    log("生成世界书…")
    Lj = {}
    for att in range(2):                                   # 偶发解析失败自动重试一轮
        t4, _e4 = _llm([{"role": "system", "content": LORE2_SYS}, {"role": "user", "content": base}],
                       cfg, max_tokens=5000, temperature=0.3, retries=1,
                       timeout=_BUILD_CALL_TIMEOUT, think=False)
        Lj = _json_from(t4) or {}
        if Lj.get("lore"):
            break
        log("世界书第 %d 轮未解析出词条%s" % (att + 1, "，重试一次…" if att == 0 else "（跳过，不影响建库）"))
    # 世界书立即落盘——左侧活图谱长出「世界书词条」节点
    lore = []
    for e in (Lj.get("lore") or [])[:6]:
        nm = (e.get("name") or "").strip()
        if not nm:
            continue
        open(os.path.join(ROOT_DIR, "02-世界书", "%s.md" % nm), "w", encoding="utf-8").write(
            "---\ntype: lore\nname: %s\ntriggers: [%s]\nconstant: %s\n---\n\n# %s\n\n%s\n"
            % (nm, "、".join(e.get("triggers") or []), "true" if e.get("constant") else "false",
               nm, e.get("excerpt", "")))
        lore.append({"name": nm, "triggers": e.get("triggers") or [],
                     "constant": bool(e.get("constant")), "excerpt": (e.get("excerpt") or "")[:300], "hits": 0})
    _set_progress("写入世界", 92)
    log("写入世界…")
    open(os.path.join(ROOT_DIR, "03-推演配置.md"), "w", encoding="utf-8").write(
        "---\ntype: config\nunit_budget: %d\nmode: 独立API\n---\n\n# 推演配置\n\n每位角色独立 agent；每轮产出自动审校；收束由裁判判定。\n"
        % int(units[0].get("budget", 60) or 60))
    open(os.path.join(ROOT_DIR, "纪事.md"), "w", encoding="utf-8").write(
        "# 纪事 · %s\n\n> 正典编年史。一轮一段，客观镜头。\n\n## 第0段 · 开局态\n\n%s\n"
        % (title, (units[0].get("open") or units[0].get("stage") or W.get("world", ""))[:400]))
    nb = int(units[0].get("budget", 60) or 60)
    tot_lo = sum(int(u.get("budget", 60) or 60) for u in units)
    nodes = [{"id": c["name"], "group": "cast", "file": "角色/%s.md" % c["name"]} for c in cast]
    nodes += [{"id": u.get("name", ""), "group": "unit",
               "file": "剧本/%02d-%s.md" % (i + 1, u.get("name", ""))} for i, u in enumerate(units)]
    edges = []
    for i, u in enumerate(units):
        for nm in (u.get("cast") or [c["name"] for c in cast]):
            if any(n["id"] == nm for n in nodes):
                edges.append({"source": nm, "target": u.get("name", ""), "kind": "出场", "unitIndex": i})
    for a in range(len(cast)):
        for b in range(a + 1, min(len(cast), a + 4)):
            edges.append({"source": cast[a]["name"], "target": cast[b]["name"], "kind": "关系", "unitIndex": 0})
    D = {"meta": {"title": title, "round": 0, "unitName": units[0].get("name", ""),
                  "unitRound": "0/%d" % nb, "gravity": "顺", "engine": "NEST-DRAMA", "built": True,
                  "vaultPath": ROOT_DIR, "config": {"plannedRounds": nb}},
         "spine": ([{"kind": "铁", "label": x, "achieved": False} for x in sp.get("iron", [])] +
                   [{"kind": "软", "label": x, "achieved": False} for x in sp.get("soft", [])] +
                   [{"kind": "禁区", "label": x, "achieved": False} for x in sp.get("forbid", [])]),
         "cast": cast, "relations": [], "lore": lore,
         "graph": {"title": title, "unit": units[0].get("name", ""), "nodes": nodes, "edges": edges},
         "gaps": [], "levers": [], "menu": [],
         "forecast": {"total": "%d-%d" % (sum(u.get("estLo", 8) for u in units),
                                          sum(u.get("estHi", 12) for u in units)),
                      "perUnit": {u.get("name", ""): "%d-%d" % (u.get("estLo", 8), u.get("estHi", 12)) for u in units},
                      "why": {u.get("name", ""): u.get("estWhy", "") for u in units},
                      "remaining": "%d-%d" % (sum(u.get("estLo", 8) for u in units),
                                              sum(u.get("estHi", 12) for u in units))},
         "outcome": None, "feed": [],
         # budget/used 必须落成字段：旧版只把预算烤进 status 字符串，运行期读不到，
         # 剧本文件一旦没有「最多N轮」就退到默认 8，整局的阶段判定与进度显示全歪。
         "units": [{"name": u.get("name", ""), "budget": int(u.get("budget", 8) or 8), "used": 0,
                    "status": ("当前单元（0/%d）" % int(u.get("budget", 8) or 8)) if i == 0
                    else ("待推演（0/%d）" % int(u.get("budget", 8) or 8)),
                    "goal": u.get("goal", ""), "est": "%d-%d" % (u.get("estLo", 8), u.get("estHi", 12)),
                    "estWhy": u.get("estWhy", ""), "colorIndex": i} for i, u in enumerate(units)],
         "interviews": [], "reports": [], "exports": []}
    _save_data(D)
    _pending_clear()
    hist = _archives_store()                             # 新局登记为当前局（局史持久）
    hist["current"] = title
    _archives_save(hist)
    _set_progress("世界就绪", 100)
    log("世界就绪：%s（%d 人 / %d 单元 / 预计 %s 轮）%s"
        % (title, len(cast), len(units), D["forecast"]["total"], "｜旧局已移交回滚点" if arch else ""))
    return True, title


def _init_and_run(raw, title, req, then_run, log, confirm=False):
    """建世界 →（成功且 then_run）自动推演到本单元收束。同步执行，返回 (ok, 回执)。"""
    okk, msg = _auto_init(raw, title, req, log, confirm=confirm)
    if not okk:
        _build_fail_record(AUTO.get("stage", ""), msg)      # 失败留痕：阶段+原因可查、材料可重试
        return False, "建世界失败：%s（材料已留盘；重新提交指令即可自动重试，会话代跑已禁用）" % msg
    _build_fail_clear()
    if not then_run or AUTO["stop"]:
        return True, msg
    D = _load_data() or {}
    budget = int((D.get("meta", {}).get("config") or {}).get("plannedRounds", 8) or 8)
    log("自动开始推演（本单元 %d 轮上限）…" % budget)
    for i in range(budget):
        if AUTO["stop"]:
            return True, "%s（推演暂停于 %d/%d 轮）" % (msg, i, budget)
        ok, m2, closed = _auto_round(log)
        log(m2)
        if ok is None:                                   # 用户暂停：不是失败，别把回执写成红字
            return True, "%s（推演暂停于 %d/%d 轮）" % (msg, i, budget)
        if not ok:
            return False, "%s；推演失败：%s" % (msg, m2)
        if closed:
            if _all_closed() or not _advance_unit(log):
                return True, "%s；%s（全局终局）" % (msg, m2)
    return True, msg


def _auto_init_thread(raw, title, req, then_run=True, confirm=False):
    """前端直启的建世界线程（队列里对应的 init 指令由 mtime 守卫自动视为已消费）。"""
    def log(m):
        AUTO["log"] = (AUTO["log"] + [m])[-50:]
    my_gen = _next_gen()
    AUTO["running"] = True
    AUTO["stop"] = False
    AUTO["phase"] = "build"
    AUTO["err"] = ""
    AUTO["stageLimit"] = _BUILD_CALL_TIMEOUT * 2 + 60
    try:
        ok, msg = _init_and_run(raw, title, req, then_run, log, confirm=confirm)
        if not ok:
            AUTO["err"] = msg or "建世界失败"
            log("建世界失败：%s" % AUTO["err"])
        else:
            AUTO["err"] = ""
            log("建世界任务完成：%s" % (msg or "世界已就绪"))
    except Exception as e:                                    # 意外异常也留痕，不再留僵尸 building=true
        _build_fail_record(AUTO.get("stage", ""), repr(e))
        AUTO["err"] = "建世界异常中断：%r" % e
        log(AUTO["err"])
    finally:
        if AUTO.get("gen") == my_gen:
            AUTO["running"] = False
            AUTO["phase"] = ""


def _gravity_inject(text):
    """上帝注入：写入 data.json，下一轮导演提示携带、用后即焚。"""
    text = (text or "").strip()
    if not text:
        return False, "空注入"
    D = _load_data() or {}
    D.setdefault("meta", {})["gravityInject"] = text[:300]
    _save_data(D)
    return True, "已注入，下一轮生效"


def _interview(who, q, mode="戏内", log=None, timeout=None):
    """角色访谈。戏内=不破戏只用心象；吐真=扮演者卸甲（含秘密）；全局=上帝视角问答。
    timeout=None 走自适应（思考模型友好）。结果入 data.json interviews（最新在前），返回 (答, err)。"""
    cfg = _llm_cfg()
    if not cfg:
        return None, "未接入 API"
    who, q = (who or "").strip(), (q or "").strip()
    if not q:
        return None, "空问题"
    D = _load_data() or {}
    cast = D.get("cast", [])
    if who.isdigit() and int(who) < len(cast):        # 门面 agent_id 是索引 → 解析成名字
        who = cast[int(who)].get("name", "")
    if who != "全局" and who not in [c.get("name") for c in cast]:
        return None, "无此人：%s" % who
    if who == "全局":
        sys_p = ("你是NEST-DRAMA的上帝视角问答。据【世界】【真相底稿】【纪事】如实回答；"
                 "涉及尚未在场内公开的信息时明确标注「（尚未在场内公开）」。口吻：冷静的旁白者。\n"
                 "【世界】%s\n【真相底稿】%s\n【纪事】%s"
                 % (_strip_fm(_read("00-世界观.md"))[:1200],
                    _strip_fm(_read("真相底稿.md"))[:1500], _read("纪事.md")[-3000:]))
    else:
        core = _strip_fm(_read("角色/%s.md" % who))
        voice = _strip_fm(_read("角色/%s·声纹.md" % who))
        psy = _strip_fm(_read("角色/%s·心象.md" % who))
        if mode == "吐真":
            sys_p = ("你是「%s」的扮演者（吐真模式）：卸下角色伪装如实回答——藏着的事、对他人的真实看法、"
                     "轮次里没说出口的话。引用戏外信息时标「（戏外）」。\n"
                     "【内核】%s\n【声纹】%s\n【心象】%s\n【纪事】%s"
                     % (who, core[:2600], voice[:1200], psy[:2400], _read("纪事.md")[-3000:]))
        else:
            # 「只输出你说的话」：实测答案里混进（停顿两秒，眼神未抬）类括号舞台指示——
            # 访谈是录音稿不是剧本，舞台指示在这里就是 AI 腔
            sys_p = ("你是%s本人，接受一次戏内访谈。铁律：\n"
                     "1 视野：只用你心象里已有的信息回答。你不知道的事，不能当作知道——"
                     "但你是活人，可以猜：基于你已知的线索给出你的推断，并用你自己的口吻标明这是猜"
                     "（'我猜''要我说''说不准，但'）。猜测只能从你已知的线索推出来，"
                     "不许凭空冒出你不可能接触到的事实。\n"
                     "2 完全你的视角：你对人和事的判断带着你的偏见、旧账和立场——哪怕是错的。"
                     "别替别人客观，别修正你自己的偏见。\n"
                     "3 撒谎按你的谎言习惯来；不想答可以顶回去。保持声纹。\n"
                     "4 你不是单位发言人。答话带你此刻的情绪、立场和私心——被问到痛处会躲、会呛、"
                     "会突然多话；官腔套话（'作为执法人员，我的职责是''我不会回答假设性问题'）"
                     "只属于内核卡里明确写着官僚性格的人，你若不是，说人话。\n"
                     "5 只输出你说的话本身——不写任何括号舞台指示、动作描写、神态描写"
                     "（这是访谈录音稿，不是剧本）。"
                     "\n【内核】%s\n【声纹】%s\n【心象】%s"
                     % (who, core[:2600], voice[:1200], psy[:2400]))
    user_p = "【问题】%s\n（%s口吻，150-400字。）" % (q, "旁白者" if who == "全局" else who + "的")
    t, err = _llm([{"role": "system", "content": sys_p}, {"role": "user", "content": user_p}],
                  cfg, max_tokens=2600, temperature=0.75, timeout=timeout)
    if err or not t:
        return None, "访谈失败：%s" % (err or "空返回")
    a = _dp_local(t.strip())                             # 采访答案同样过毒编（本地层）
    if who != "全局" and mode == "戏内":
        # 硬约束兜底：戏内访谈是录音稿，（舞台指示）一律本地删——提示词已禁但模型偶尔仍写，
        # 删掉不损失任何"说出的话"。吐真/全局不删：它们的（戏外）（尚未在场内公开）是契约标记
        import re as _re
        a = _re.sub(r"[（(][^）)\n]{2,40}[）)]", "", a)
        a = _re.sub(r"\n{3,}", "\n\n", a).strip()
    D.setdefault("interviews", []).insert(0, {"who": who, "q": q, "mode": mode, "a": a,
                                              "at": time.strftime("%Y-%m-%d %H:%M:%S")})
    D["interviews"] = D["interviews"][:50]
    _save_data(D)
    return a, None


def _report_agent(log):
    """报告 Agent：大纲 → 分章 ReACT 工具循环（本地文件即工具）→ 报告落盘。"""
    cfg = _llm_cfg()
    if not cfg:
        return None, "未接入 API"
    D = _load_data()
    if not D:
        return None, "尚未建世界（无 data.json）"
    if int(D.get("meta", {}).get("round", 0) or 0) < 1:
        return None, "尚未推演：请先在「推演运行」页跑完至少一轮，再来生成报告（报告基于真实轮次纪事）"
    meta = D.get("meta", {})
    chron = _read("纪事.md")

    def t_chron(a):                                     # read_chronicle {a:"1-8"}
        import re as _re
        m = _re.match(r"(\d+)\s*-\s*(\d+)", str(a.get("a", "")))
        segs, cur, buf = [], None, []
        for ln in chron.splitlines():
            mm = _re.match(r"## 第(\d+)段", ln.strip())
            if mm:
                if cur is not None:
                    segs.append((cur, "\n".join(buf).strip()))
                cur, buf = int(mm.group(1)), [ln]
            elif cur is not None:
                buf.append(ln)
        if cur is not None:
            segs.append((cur, "\n".join(buf).strip()))
        if m:
            lo, hi = int(m.group(1)), int(m.group(2))
            # 过滤必须保留 (轮号, 段) 元组——旧版滤成 str 列表后又按二元组解包，
            # 带范围的 read_chronicle 一调用就 too many values to unpack，报告管线从没跑通过
            segs = [(n, s) for n, s in segs if lo <= n <= hi]
        return "\n\n".join(s for _, s in segs if s)[:5000] or "（无匹配纪事段）"

    def t_round(a):                                     # read_round {n:5}
        try:
            n = int(a.get("n", 0) or 0)
        except Exception:
            return "（轮数不合法）"
        p = os.path.join(ROOT_DIR, "推演", "第%03d轮.md" % n)
        return _strip_fm(open(p, encoding="utf-8").read())[:4500] if os.path.exists(p) else "（无第%d轮记录）" % n

    def t_psyche(a):                                    # read_psyche {name}
        nm = (a.get("name") or "").strip()
        ps = _read("角色/%s·心象.md" % nm)
        if not ps:
            return "（无此人心象）"
        return (_strip_fm(ps) + "\n【内核】" + _strip_fm(_read("角色/%s.md" % nm)))[:3000]

    def t_truth(a):                                     # read_truth {}
        return _strip_fm(_read("真相底稿.md"))[:4000] or "（无真相底稿）"

    def t_world(a):                                     # read_worldbook {}
        return "\n".join("【%s】%s" % (e.get("name", ""),
                                      (e.get("excerpt") or e.get("hit") or ""))[:250] for e in D.get("lore", [])) or "（空）"

    def t_iv(a):                                        # interview {name,q}
        ans, err = _interview((a.get("name") or "").strip(), a.get("q", ""), "吐真")
        return ans if not err else "访谈失败：%s" % err

    TOOLS = {"read_chronicle": t_chron, "read_round": t_round, "read_psyche": t_psyche,
             "read_truth": t_truth, "read_worldbook": t_world, "interview": t_iv}
    oj = _llm_json([{"role": "system", "content": REPORT_SYS},
                    {"role": "user", "content": "【局名】%s\n【脊椎】%s\n【单元与目标】%s\n【终局清单】%s\n"
                                                "【未回收信息差】%s\n【纪事】%s"
                     % (meta.get("title", ""),
                        "；".join(s.get("label", "") for s in D.get("spine", [])[:10]),
                        "；".join("%s→%s" % (u.get("name", ""), u.get("goal", "")) for u in D.get("units", [])),
                        json.dumps(D.get("outcome") or {}, ensure_ascii=False)[:1200],
                        "；".join(D.get("gaps", [])[:8]), chron[-6000:])}],
                   cfg, max_tokens=1200, temperature=0.4)
    secs = (oj or {}).get("sections") or []
    if not secs:
        return None, "报告大纲生成失败"
    title = ((oj or {}).get("title") or "《%s》推演报告" % meta.get("title", "群像")).strip()
    log("报告大纲就绪（%d 章）：%s" % (len(secs), "／".join(s.get("title", "") for s in secs)))
    md_secs = []
    for i, s in enumerate(secs):
        msgs = [{"role": "system", "content": SECTION_SYS},
                {"role": "user", "content": "【报告】%s\n【本章】%s——%s\n【可用轮次】1-%d\n开始。"
                 % (title, s.get("title", ""), s.get("focus", ""), int(meta.get("round", 0) or 0))}]
        final = ""
        for step in range(5):
            # 章节执笔是创作活（ReACT 里要边查边写），保留思考链
            j = _llm_json(msgs, cfg, max_tokens=2400, temperature=0.5, think=True)
            if not j:
                break
            if j.get("final"):
                final = j["final"]
                break
            fn = TOOLS.get(j.get("tool") or "")
            try:
                obs = fn(j.get("args") or {}) if fn else "无此工具：" + str(j.get("tool"))
            except Exception as e:                       # 单个工具坏了只坏这一步，不炸整章
                obs = "工具执行失败（%s）：%s——换个工具或直接出终稿。" % (j.get("tool"), e)
            log("报告·%s 第%d步 %s" % (s.get("title", "")[:10], step + 1, j.get("tool", "")))
            msgs.append({"role": "assistant", "content": json.dumps(j, ensure_ascii=False)})
            msgs.append({"role": "user", "content": "【工具结果】\n%s" % obs[:3200]})
        md_secs.append("## %s\n\n%s\n" % (s.get("title", "第%d章" % (i + 1)),
                                          final or "（本章工具循环未产出终稿）"))
        log("章节完成：%s" % s.get("title", ""))
    md = ("# %s\n\n> NEST-DRAMA · 推演报告｜%s 轮 · %d 单元 · %s\n\n%s\n---\n\n### 附：未回收的信息差\n\n%s\n"
          % (title, meta.get("round", 0), len(D.get("units", [])), time.strftime("%Y-%m-%d %H:%M"),
             "\n\n".join(md_secs), "\n".join("- " + g for g in D.get("gaps", [])[:10]) or "（无）"))
    name = "%s·推演报告.md" % title
    os.makedirs(os.path.join(ROOT_DIR, "导出"), exist_ok=True)
    os.makedirs(os.path.join(UI_DIR, "exports"), exist_ok=True)
    open(os.path.join(ROOT_DIR, "导出", name), "w", encoding="utf-8").write(md)
    open(os.path.join(UI_DIR, "exports", name), "w", encoding="utf-8").write(md)
    D.setdefault("reports", []).insert(0, {"id": "r%d" % int(time.time()), "title": title,
                                           "date": time.strftime("%Y-%m-%d %H:%M"), "md": md,
                                           "sections": [s.get("title", "") for s in secs]})
    D["reports"] = D["reports"][:12]
    _save_data(D)
    return name, None


def _cast_cards_for(desc, log):
    """续演新增角色：描述 → 三卡落盘并入 data.json。返回新增人数。"""
    cfg = _llm_cfg()
    if not cfg or not (desc or "").strip():
        return 0
    j = _llm_json([{"role": "system", "content": CAST2_SYS},
                   {"role": "user", "content": "【既有世界】%s\n【新增角色描述】\n%s\n只为描述中出现的人生成三卡。"
                    % (_strip_fm(_read("00-世界观.md"))[:1000], desc[:3000])}],
                  cfg, max_tokens=4000, temperature=0.35) or {}
    D = _load_data() or {"cast": []}
    known = {c.get("name") for c in D.get("cast", [])}
    added = 0
    for c in (j.get("cast") or []):
        nm = (c.get("name") or "").strip()
        if not nm or nm in known:
            continue
        D["cast"].append(_write_cast_files(c))
        known.add(nm)
        added += 1
    if added:
        _save_data(D)
        log("新增 %d 位角色三卡" % added)
    return added


def _dispatch(it, log):
    """api 模式指令直通执行（队列消费器调用）。返回 (ok, 回执)。"""
    t = it.get("type")
    p = it.get("payload") or {}
    if t == "init":
        raw = p.get("raw") or p.get("raw_preview") or ""
        if not raw:
            pend = _pending()
            raw = "\n\n".join(_read(f) for f in (pend or {}).get("files", []))
        AUTO["stop"] = False
        AUTO["phase"] = "build"
        AUTO["stageLimit"] = _BUILD_CALL_TIMEOUT * 2 + 60
        # confirm 由投放入口写入（用户点了「建世界」）；缺失=可疑的遗留指令，交 _auto_init 拒绝
        # then_run 缺省= True（旧契约：建完自动推演到收束）；投放路径显式带 False 才只建不推
        return _init_and_run(raw, p.get("title", ""), p.get("requirement", ""),
                             p.get("then_run", True), log,
                             confirm=bool(p.get("confirm")))
    if t == "beat":
        AUTO["stop"] = False
        n = max(1, int(p.get("n", 1) or 1))
        for i in range(min(n, 480)):
            if AUTO["stop"]:
                return True, "推演暂停（%d/%d 轮完成）" % (i, n)
            ok, msg, closed = _auto_round(log)
            log(msg)
            if ok is None:                               # 暂停
                return True, "推演暂停（%d/%d 轮完成）" % (i, n)
            if not ok:
                return False, "推演失败：%s" % msg
            if closed:
                if _all_closed() or not _advance_unit(log):
                    return True, ("%s——全部单元已收束，全局终局。剩余 %d 轮不再消耗，"
                                  "到报告页生成故事全录。" % (msg, n - i - 1))
                log("单元收束（%s）→ 自动进下一单元（剩余预算 %d 轮）" % (msg, n - i - 1))
        return True, "beat 完成（%d 轮）" % min(n, 480)
    if t == "pause":
        AUTO["stop"] = True
        return True, "已请求暂停"
    if t == "interview":
        a, err = _interview(p.get("who", ""), p.get("q", ""), p.get("mode", "戏内"), log)
        return (err is None), (a if err is None else err)
    if t == "report":
        name, err = _report_agent(log)
        return (err is None), (name if err is None else err)
    if t == "gravity":
        return _gravity_inject(p.get("text") or p.get("q") or "")
    if t == "continue-story":
        # 幂等：/cmd 已当场建好单元并把名字放进 payload，worker 只补深加工。
        # 旧版无条件再调一次 _continue_story——同一次点击生成两个剧本文件、两条 units（真实复现过）。
        unit = (p.get("unit") or "").strip()
        est = ""
        if not unit or not any(u.get("name") == unit for u in (_load_data() or {}).get("units", [])):
            unit, est = _continue_story(p.get("outline", ""), p.get("newCast", ""), int(p.get("rounds", 0) or 0))
        added = _cast_cards_for(p.get("newCast", ""), log)
        return True, "续演单元「%s」已立%s%s" % (
            unit, ("（预估 %s 轮）" % est) if est else "", "，新增 %d 位角色三卡" % added if added else "")
    if t == "config":
        D = _load_data() or {}
        cd = D.setdefault("meta", {}).setdefault("config", {})
        if p.get("plannedRounds"):
            try:
                cd["plannedRounds"] = max(1, int(p["plannedRounds"]))
            except (TypeError, ValueError):
                return False, "plannedRounds 不合法"
        _save_data(D)
        return True, "推演配置已保存（本单元预算 %s 轮）" % cd.get("plannedRounds", "—")
    if t == "reset-sim":                                 # 队列侧同权：端点有的清空/删除，队列也认
        n2 = _reset_sim()
        return True, "已清空 %d 个轮文件 · 纪事/心象/数据归零（世界库保留）" % n2
    if t == "delete-sim":
        okd, detail = _delete_sim()
        return okd, detail
    return False, "api 模式暂不支持该指令类型：%s" % t


def _queue_set(item_id, status, result=None):
    """改单条指令状态（加锁重读，防与 /cmd 并发写冲突）。result 为回执，前端指令回执页直接展示。"""
    with _lock:
        q = _load_queue()
        for it in q["queue"]:
            if it.get("id") == item_id:
                it["status"] = status
                if result is not None:
                    it["result"] = str(result)[:300]
        _save_queue(q)


def _hb_thread():
    """独立心跳线程：每 5 秒无条件跳一次，长 LLM 调用期间也保持 worker_alive=True。"""
    while True:
        AUTO["hb"] = time.time()
        time.sleep(5)


def _queue_worker():
    """队列消费器：api 模式每 5 秒取一条待处理指令直通执行；会话模式不碰（留给会话引擎）。
    心跳由 _hb_thread 独立维护；异常落 err 并继续，永不退出。"""
    def log(m):
        AUTO["log"] = (AUTO["log"] + [m])[-50:]
    while True:
        time.sleep(5)
        try:
            if not _llm_cfg():
                continue
            # 孤儿回收：进程重启会把「处理中」留在盘上；不在自动驾驶中即为孤儿，重置回待处理
            if not AUTO["running"]:
                q = _load_queue()
                orphans = [i for i in q["queue"] if i.get("status") == "处理中"]
                Dnow = _load_data() or {}
                built_now = bool(Dnow.get("meta", {}).get("built")) and int(Dnow.get("meta", {}).get("round", 0) or 0) > 0
                for o in orphans:
                    # 建世界指令绝不复活：它会归档旧局+清库重建。世界已在跑时复活它=静默毁局
                    # （进程重启留下的孤儿 init 一旦被消费，正在跑的局的全部进度即被清掉）
                    if o.get("type") == "init" and built_now:
                        _queue_set(o["id"], "已失效",
                                   "世界已建成且已推演 %d 轮——建世界指令不再复活（防误毁局）。"
                                   "要重建请在世界页重新投放材料。" % int(Dnow["meta"].get("round", 0)))
                        log("拒绝复活孤儿建世界指令 %s（当前局已推演 %d 轮）"
                            % (o["id"], int(Dnow["meta"].get("round", 0))))
                        continue
                    _queue_set(o["id"], "待处理")
                if orphans:
                    log("回收孤儿指令：%s（进程重启遗留）" % "、".join(o["id"] for o in orphans))
            q = _load_queue()
            pend = [i for i in q["queue"] if i.get("status") == "待处理"]
            if not pend:
                continue
            if AUTO["running"]:                        # 自动驾驶中：只放行暂停
                for it in (i for i in pend if i.get("type") == "pause"):
                    AUTO["stop"] = True
                    _queue_set(it["id"], "已处理", "自动驾驶暂停已生效")
                continue
            it = pend[0]
            if it.get("type") == "pause":               # 无自动驾驶在跑：空暂停直接销
                _queue_set(it["id"], "已处理", "当前无自动驾驶在跑")
                continue
            if it.get("type") == "init":                # 世界已在该指令之后建成 → 已消费
                try:
                    ts = time.mktime(time.strptime(it.get("ts", ""), "%Y-%m-%d %H:%M:%S"))
                    if os.stat(DATA_PATH).st_mtime > ts + 2:
                        _queue_set(it["id"], "已处理", "世界已就绪（前端直启建世界已覆盖此指令）")
                        continue
                except Exception:
                    pass
                for o in pend[1:]:                      # 同批 init 并局去重
                    if o.get("type") == "init":
                        _queue_set(o["id"], "已处理", "并入前一条建世界指令")
            _queue_set(it["id"], "处理中")
            log("消费指令 %s（%s）" % (it.get("id"), it.get("type")))
            AUTO["running"] = True
            ok, msg = False, ""                          # 预定义：_dispatch 抛异常时下面的 log 还要用
            try:
                ok, msg = _dispatch(it, log)
                _queue_set(it["id"], "已处理" if ok else "失败", msg)
            except Exception as e:
                import traceback
                msg = "执行异常：%s" % e
                log("指令 %s 异常：%s" % (it.get("id"), traceback.format_exc().strip().splitlines()[-1]))
                _queue_set(it["id"], "失败", msg)
            finally:
                AUTO["running"] = False
            log("指令 %s %s：%s" % (it.get("id"), "完成" if ok else "失败", (msg or "")[:120]))
        except Exception as e:
            AUTO["err"] = "队列消费异常：%s" % e
            AUTO["log"] = (AUTO["log"] + [AUTO["err"]])[-50:]


def _auto_beat(n):
    AUTO["running"] = True
    AUTO["stop"] = False
    AUTO["autoPaused"] = False
    AUTO["err"] = ""
    def log(m):
        AUTO["log"] = (AUTO["log"] + [m])[-50:]
    fails = 0
    total = max(1, min(int(n), 480))
    try:
        for i in range(total):
            AUTO["runLeft"] = total - i                  # 本次运行剩余轮（含当前轮）→ ETA 用真口径
            if AUTO["stop"]:
                log("已暂停（round 计数保留，可随时续跑）")
                break
            ok, msg, closed = _auto_round(log)
            if ok is None:                                   # 轮内阶段间暂停信号
                log(msg + "（round 计数保留，可随时续跑）")
                break
            log(msg)
            if not ok:
                fails += 1
                if fails >= 3:
                    AUTO["autoPaused"] = True
                    AUTO["err"] = "连续 3 次失败已自动暂停（%s）——点「开始/继续」从本轮续跑" % (msg or "")[:100]
                    log("连续 3 次失败——已自动暂停（round 计数保留），排查网络/网关后点「开始/继续」即可续跑")
                    break
                log("第 %d 次失败，15 秒后重试本轮：%s" % (fails, msg))
                time.sleep(15)
                continue
            fails = 0
            if closed:
                break
    finally:
        AUTO["running"] = False
        AUTO["pausing"] = False
        AUTO["runLeft"] = 0

def _delete_sim():
    """删除当前推演记录：先完整归档到回滚点（可恢复），再清库——history 卡片即消失。"""
    import shutil
    D0 = _load_data()
    if not D0:
        return True, "当前无推演记录"
    title = (D0.get("meta") or {}).get("title", "") or "已删除局"
    dst = _archive_old_world(title)
    for extra in (DATA_PATH, os.path.join(UI_DIR, "exports"), os.path.join(UI_DIR, "pending-init.json")):
        try:
            if os.path.isfile(extra):
                os.remove(extra)
            elif os.path.isdir(extra):
                shutil.rmtree(extra)
        except OSError:
            continue
    AUTO["stall"], AUTO["roundTimes"] = 0, []
    return True, "记录已删除 · 完整副本在 %s（可回滚）· 材料保留" % dst


def _reset_sim():
    """清空推演记录：轮文件/纪事/心象归零/data 复位——世界库与角色三卡保留。
    心象必须归零，否则重推时角色会"记住"被删除的轮次。"""
    import glob as _g2
    import re as _re3
    n_del = 0
    for f in _g2.glob(os.path.join(ROOT_DIR, "推演", "*.md")):
        os.remove(f)
        n_del += 1
    ch = os.path.join(ROOT_DIR, "纪事.md")
    if os.path.exists(ch):
        ct = open(ch, encoding="utf-8").read()
        ct = ct.split("\n## 第1段")[0]
        open(ch, "w", encoding="utf-8").write(ct.rstrip() + "\n")
    for f in _g2.glob(os.path.join(ROOT_DIR, "角色", "*·心象.md")):
        ct = open(f, encoding="utf-8").read()
        ct = _re3.sub(r"updated: .*", "updated: 第0轮", ct, count=1)
        ct = _re3.sub(r"emo: .*", "emo: 平", ct, count=1)
        ct = _re3.sub(r"tier: .*", "tier: 安", ct, count=1)
        ct = _re3.sub(r"(##\s*此刻（?[^）\n]*）?\n)([\s\S]*?)(\n##\s*打算)",
                      r"\1（推演记录已清空 · 回到开场状态）\3", ct, count=1)
        open(f, "w", encoding="utf-8").write(ct)
    D = _load_data() or {}
    D.setdefault("meta", {})["round"] = 0
    D["feed"], D["outcome"], D["exports"] = [], None, []
    for c in D.get("cast", []):
        c["state"] = ""
    for sp in D.get("spine", []):
        sp.pop("touchedRound", None)
    for u in D.get("units", []):
        if "已收束" in (u.get("status") or ""):
            u["status"] = "待推演"
    _save_data(D)
    for d2 in (os.path.join(UI_DIR, "exports"), os.path.join(ROOT_DIR, "导出")):
        if os.path.isdir(d2):
            for f in os.listdir(d2):
                if f.endswith(".txt"):
                    os.remove(os.path.join(d2, f))
    AUTO["stall"], AUTO["roundTimes"] = 0, []
    return n_del


def _story_tail(chars=1000):
    """当前故事结尾：纪事.md 尾部（最新若干段），供续演单元无缝衔接前情。"""
    p = os.path.join(ROOT_DIR, "纪事.md")
    if not os.path.exists(p):
        return "（尚无纪事——新单元从空白开场）"
    try:
        txt = open(p, encoding="utf-8").read().strip()
        return txt[-chars:] if txt else "（尚无纪事——新单元从空白开场）"
    except Exception:
        return "（纪事读取失败，新单元从空白开场）"


def _continue_story(outline, new_cast, rounds):
    """续演：新单元细纲落盘（只增不改）；自动携带「前情提要」= 当前故事结尾，推演无缝衔接。"""
    import glob as _g
    n = len(_g.glob(os.path.join(ROOT_DIR, "剧本", "*.md"))) + 1
    # 单元名：首行冒号/句号前的短语（旧版硬切 20 字，切出「…约苏蔓芝在档案室核」这种断名）
    _l0 = (outline.strip().splitlines() or ["新单元"])[0].strip("# ·").strip()
    import re as _re
    first = _re.split(r"[：:。；;，,]", _l0)[0].strip()[:14] or ("单元%02d" % n)
    fname = "%02d-%s.md" % (n, first)
    # 卡司：细纲里点到名的既有角色——细纲写明两人戏就不该全员上场（in_scene 按单元文件正文匹配）
    D0 = _load_data() or {}
    named = [c["name"] for c in D0.get("cast", []) if c.get("name") and c["name"] in outline]
    recap = _story_tail()
    body = ("# 单元%02d · %s\n\n（续演单元 · 世界观/既有角色/脊椎锁定，只增不改）\n\n"
            % (n, first)
            + ("## 卡司（本单元在场者）\n\n%s\n\n" % "、".join(named) if len(named) >= 2 else "")
            + "## 前情提要（当前故事结尾——新剧情必须从此无缝衔接）\n\n%s\n\n## 细纲\n\n%s\n"
            % (recap, outline.strip()))
    if new_cast and new_cast.strip():
        body += "\n## 新增角色（待引擎建三卡）\n\n%s\n" % new_cast.strip()
    os.makedirs(os.path.join(ROOT_DIR, "剧本"), exist_ok=True)
    open(os.path.join(ROOT_DIR, "剧本", fname), "w", encoding="utf-8").write(body)
    D = _load_data() or {"meta": {}, "units": [], "forecast": {}}
    cast_n = len(D.get("cast", [])) + (1 if new_cast else 0)
    # 细纲快扫按同一把结构尺：必须/反转从细纲文本里数
    u0 = {"goal": outline[:400], "must": [ln for ln in outline.splitlines() if ln.strip().startswith(("-", "·", "必须"))],
          "dark": [], "cast": []}
    lo, hi, why = _estimate_unit_rounds(u0, cast_n)
    est = "%d-%d" % (lo, hi)
    budget = int(rounds or hi)
    goal = next((ln.strip() for ln in outline.splitlines() if len(ln.strip()) > 6), outline[:120]) or "（续演单元）"
    D.setdefault("units", []).append({"name": first, "budget": budget, "used": 0,
                                      "status": "待推演（0/%d）" % budget, "goal": goal,
                                      "est": est, "colorIndex": n - 1})
    fc = D.setdefault("forecast", {})
    fc.setdefault("perUnit", {})[first] = est
    fc["remaining"] = est
    D.setdefault("meta", {})["unitName"] = first
    D["meta"]["unitRound"] = "0/%d" % budget
    D["meta"]["baton"] = ""                                  # 新单元重置接棒链，不继承上单元的棒
    D["meta"].pop("nextPlan", None)
    # 图谱接线：新单元建节点 + 全员出场边（unitIndex=新序号→罗盘/织线/星丛按单元换色继续显示）
    # 旧版只写 units 不碰 graph，续演后新单元在三个图里全部不存在。
    g = D.setdefault("graph", {})
    nodes, edges = g.setdefault("nodes", []), g.setdefault("edges", [])
    if not any(x.get("id") == first for x in nodes):
        nodes.append({"id": first, "group": "unit", "file": "剧本/" + fname})
    for c in D.get("cast", []):
        nm = c.get("name")
        if nm and not any(e.get("source") == nm and e.get("target") == first for e in edges):
            edges.append({"source": nm, "target": first, "kind": "出场", "unitIndex": n - 1})
    g["unit"] = first
    json.dump(D, open(os.path.join(UI_DIR, "data.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return first, est


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *a):  # 安静
        pass

    # ── REST 门面：把前端端点翻译到 数据JSON + 指令队列 ──
    def _facade(self, method, path, query, body):
        try:
            return self._facade_inner(method, path, query, body)
        except Exception as e:
            return self._json(500, {"success": False, "error": "门面处理异常：%s" % e})

    def _facade_inner(self, method, path, query, body):
        D = _load_data() or {}
        meta = D.get("meta", {})
        pend = _pending()
        built = bool(meta.get("built")) and not pend
        ok = lambda data: self._json(200, {"success": True, "data": data})

        # 图谱线
        if path == "/api/graph/ontology/generate" and method == "POST":
            files, fields = body  # multipart 已解析
            files, fields = (files or []), (fields or {})
            expanded = _expand_files(files)               # zip 展开、编码嗅探、同名去重
            texts, bad = [], []
            for name, text, err in expanded:
                if err:
                    bad.append("%s：%s" % (name, err))
                    texts.append("《%s》[解码失败: %s]" % (name, err))
                else:
                    texts.append("《%s》\n%s" % (name, text))
            raw = "\n\n".join(texts)
            if expanded and all(e for _, _, e in expanded):
                return self._json(422, {"success": False, "error": "没有一份材料能读出文字：" + "；".join(bad)[:400],
                                        "formats": FORMATS})
            title = fields.get("project_name", "") or "新局"
            req = fields.get("simulation_requirement", "")
            # 材料落盘（引擎与自动建世界共用）
            mat = os.path.join(ROOT_DIR, "材料")
            os.makedirs(mat, exist_ok=True)
            # 注：不在此处删旧材料——归档（_archive_old_world）在建世界线程里之后才跑，
            # 先删会让旧材料进不了回滚点。改由 _ingest_materials 只读本批投放文件（见 pending.files）
            saved = []
            for name, text, err in expanded:
                if err or not text.strip():
                    continue
                fn = os.path.splitext(name)[0] + ".txt"
                open(os.path.join(mat, fn), "w", encoding="utf-8").write(text)
                saved.append("材料/" + fn)
            if _auto_running_fatal():
                _reclaim_stale_run()
            auto = bool(_llm_cfg()) and not _auto_running()
            _build_fail_clear()                             # 新一轮投放即新一轮尝试：清掉旧失败痕
            json.dump({"title": title, "requirement": req, "files": saved,
                       "at": time.strftime("%Y-%m-%d %H:%M:%S"), "at_ts": time.time()},
                      open(PENDING_PATH, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            if auto:
                # 直启线程就是本次建造的唯一执行者；不再同时写一条 init 队列，
                # 避免失败后队列又偷偷重建一遍、成功后还要靠 mtime 猜测是否消费。
                threading.Thread(target=_auto_init_thread, args=(raw, title, req, False, True),
                                 daemon=True).start()
            else:
                if AUTO["running"]:
                    return self._json(409, {"success": False,
                                            "error": "建世界进行中：请等待当前建库完成或暂停后再投。"})
                _enqueue("init", {"title": title, "requirement": req, "files": saved,
                                   "raw_preview": raw[:600], "confirm": True,
                                   "then_run": False})
            return ok({"project_id": "qx", "status": "ontology_generated",
                       "project_name": title, "simulation_requirement": req,
                       "files": saved, "chars": sum(len(t) for _, t, e in expanded if not e),
                       "skipped": bad,
                       "mode": "独立API·自动建世界" if auto else "API未就绪·已入队待自动执行"})
        if path.startswith("/api/graph/task/"):
            if built:
                return ok({"status": "completed", "progress": 100,
                           "message": "世界已就绪", "result": {"graph_id": "qx-graph"}})
            # 失败判定：建造失败留痕（含直启线程路径）或最近一条 init 指令失败，且当前没在跑
            if not AUTO["running"]:
                bf = _build_fail_load()
                if bf:
                    return ok({"status": "failed", "progress": AUTO["pct"],
                               "error": "建世界失败于「%s」：%s（材料已留盘，重新投放即可重试）"
                                        % (bf.get("stage", "?"), bf.get("reason", ""))})
                for it in reversed(_load_queue()["queue"]):
                    if it.get("type") == "init":
                        if it.get("status") == "失败":
                            return ok({"status": "failed", "progress": AUTO["pct"],
                                       "error": it.get("result") or "建世界失败"})
                        break
            if AUTO["running"]:
                stage = AUTO["stage"] or (AUTO["log"][-1] if AUTO["log"] else "正在建世界…")
                el = int(time.time() - AUTO["stageAt"]) if AUTO["stageAt"] else 0
                msg = "%s（%d 秒）" % (stage, el) if el >= 3 else stage
                return ok({"status": "processing", "progress": AUTO["pct"] or 5, "message": msg})
            last = AUTO["log"][-1] if AUTO["log"] else ""
            if pend:
                return ok({"status": "processing", "progress": 25,
                           "message": last or ("材料已收下（%s）——队列将自动开始建库。"
                                               % "、".join(pend.get("files", []))[:80])})
            return ok({"status": "processing", "progress": 10, "message": "等待投放材料"})
        if path == "/api/archives" and method == "GET":
            _archives_rescan()                      # 每次打开先对一遍磁盘：索引丢了能自己长回来
            hist = _archives_store()
            D0 = _load_data() or {}
            cur = D0.get("meta", {})
            # 一个项目只显示一条：同名局折叠为最新一次，旧次数记 dupes（磁盘归档目录全部保留，可回滚）
            import glob as _fg

            def _disk_rounds(p):
                """磁盘上真有几个轮文件——折叠同名归档时按它挑，而不是按时间。
                实测：一次失败的重建会再归档一次已被清空的库，产出「新局_2」「新局_3」这种
                0 轮空壳；它们时间最新，旧规则「留最新那次」正好挑中空壳，
                用户 12 轮的那一份被折叠掉了，点进去什么都没有。"""
                try:
                    return len(_fg.glob(os.path.join(p or "", "推演", "第*轮.md")))
                except Exception:
                    return 0

            byt, order = {}, []
            for a in hist.get("archives", []):
                t = (a.get("title") or "未命名").strip()
                a = dict(a, exists=bool(a.get("path") and os.path.isdir(a["path"])))
                a["diskRounds"] = _disk_rounds(a.get("path"))
                if t not in byt:
                    byt[t] = dict(a, dupes=0, allIds=[a.get("id")])
                    order.append(t)
                else:
                    e = byt[t]
                    e["dupes"] += 1
                    e["allIds"].append(a.get("id"))
                    # 先比实际内容（空壳永远输），内容相同再比时间
                    better = (a["diskRounds"], a.get("archivedAt") or "") > \
                             (e.get("diskRounds", 0), e.get("archivedAt") or "")
                    if better:
                        keep = {"dupes": e["dupes"], "allIds": e["allIds"]}
                        byt[t] = dict(a, **keep)
            folded = sorted((byt[t] for t in order), key=lambda x: x.get("archivedAt") or "", reverse=True)
            # 历史区只是一组可删除的历史记录。归档路径、磁盘存在性和回滚点属于
            # 电脑内部实现，不作为 UI 数据返回，也不把它们变成用户可见功能。
            public = []
            for a in folded:
                public.append({k: a[k] for k in ("id", "title", "rounds", "units",
                                                  "archivedAt", "dupes", "allIds") if k in a})
            return ok({"current": {"title": cur.get("title", ""), "round": cur.get("round", 0),
                                   "units": len(D0.get("units", []))},
                       "archives": public, "total": len(hist.get("archives", []))})

        if path.startswith("/api/archives/") and method == "GET":
            # 历史局只读浏览：读归档目录里的那一份 data.json / 轮记录，全程不碰当前库。
            # 隔离靠两件事：① 只读，没有任何写路径 ② 路径必须落在归档根内（下面逐段核对），
            # 所以 id 里塞 ../ 也翻不出去。当前局与历史局在前端是两个互斥的显示态。
            seg = [x for x in path[len("/api/archives/"):].split("/") if x]
            hist = _archives_store()
            rec = next((a for a in hist.get("archives", []) if a.get("id") == seg[0]), None) if seg else None
            if not rec:
                return self._json(404, {"success": False, "error": "查无此归档记录"})
            base = os.path.realpath(rec.get("path") or "")
            if not base.startswith(os.path.realpath(_archive_root())) or not os.path.isdir(base):
                return self._json(404, {"success": False, "error": "归档目录已不存在（可在历史局里清理失效记录）"})
            if len(seg) >= 3 and seg[1] == "round":
                try:
                    rp = os.path.join(base, "推演", "第%03d轮.md" % int(seg[2]))
                except ValueError:
                    return self._json(400, {"success": False, "error": "轮号非法"})
                if os.path.realpath(rp) != rp or not os.path.isfile(rp):
                    return self._json(404, {"success": False, "error": "该轮记录不在归档里"})
                return ok({"round": int(seg[2]), "text": open(rp, encoding="utf-8").read()})
            dp = os.path.join(base, "data.json")
            if not os.path.isfile(dp):
                return self._json(404, {"success": False, "error": "这次归档没有留下 data.json（早于局史机制的旧归档）"})
            try:
                AD = json.load(open(dp, encoding="utf-8"))
            except Exception as e:
                return self._json(500, {"success": False, "error": "归档 data.json 损坏：%s" % e})
            AD.setdefault("meta", {})["archived"] = True          # 前端据此进只读态
            AD["meta"]["archiveId"] = rec.get("id")
            AD["meta"]["archivedAt"] = rec.get("archivedAt", "")
            AD["meta"]["archivePath"] = base
            import glob as _ag
            AD["meta"]["archiveRounds"] = len(_ag.glob(os.path.join(base, "推演", "第*轮.md")))
            return ok({"data": AD, "record": dict(rec, exists=True)})

        if path == "/api/archives" and method == "POST":
            b = body[1] if isinstance(body, tuple) else (body or {})
            act = b.get("action")
            if act == "prune":                      # 清理失效记录：磁盘归档已不存在的条目
                hist = _archives_store()
                keep = [a for a in hist.get("archives", [])
                        if a.get("path") and os.path.isdir(a["path"])]
                n = len(hist.get("archives", [])) - len(keep)
                hist["archives"] = keep
                _archives_save(hist)
                return ok({"pruned": n, "note": "已清理 %d 条失效记录（磁盘归档已不存在）" % n})
            if act == "restore":
                # 「只删记录」只是把归档标进 dismissed，目录还在磁盘上。旧版没有反向操作——
                # 一旦删过记录，那份归档就再也回不到列表里，哪怕它完好无损地躺着。
                hist = _archives_store()
                back = [p for p in (hist.get("dismissed") or []) if os.path.isdir(p)]
                hist["dismissed"] = [p for p in (hist.get("dismissed") or []) if p not in back]
                _archives_save(hist)
                n = _archives_rescan()
                return ok({"restored": n, "note": "已恢复 %d 份仍在磁盘上的归档" % n})
            return self._json(400, {"success": False, "error": "未知 action"})

        if path == "/api/archives" and method == "DELETE":
            b = body[1] if isinstance(body, tuple) else (body or {})
            ids = [x for x in (b.get("ids") or ([b["id"]] if b.get("id") else [])) if x]
            title = (b.get("title") or "").strip()
            hist = _archives_store()
            keep, gone = [], []
            for a in hist.get("archives", []):
                hit = (a.get("id") in ids) or (title and (a.get("title") or "").strip() == title)
                (gone if hit else keep).append(a)
            if not gone:
                return self._json(404, {"success": False, "error": "未找到要删除的历史记录"})
            hist["archives"] = keep
            # 删除历史记录只改索引，保留电脑上的项目文件；磁盘归档不是 UI 功能。
            dis = hist.setdefault("dismissed", [])
            for a in gone:
                if a.get("path") and a["path"] not in dis:
                    dis.append(a["path"])
            hist["dismissed"] = dis[-200:]
            _archives_save(hist)
            return ok({"deleted": len(gone), "note": "历史记录已删除"})
        if path == "/api/simulation" and method == "DELETE":
            # 当前项目删除是独立于历史记录删除的动作；前端完成后重新读取当前库，
            # 让项目从当前页面消失。API 配置和用量文件不在 _delete_sim 的清理范围内。
            if AUTO["running"]:
                return self._json(400, {"success": False,
                                        "error": "推演进行中：先暂停、等停稳后再删除当前项目"})
            deleted, detail = _delete_sim()
            return ok({"deleted": bool(deleted), "detail": detail})
        if path == "/api/simulation/start" and method == "POST":
            if _gate_needed():                          # 接入门：未配置直接拒，避免指令堆队
                return self._json(400, {"error": "未接入 API：请先在控制台完成 API 接入再开始推演"})
            # 与 /cmd beat 同守卫：终局后不空转、运行中不重复入队
            # （旧版此处无守卫——UI 的「开始/继续」能在全局终局后照跑，跑出 20/8 这种越界轮）
            if _all_closed():
                return self._json(200, {"success": False,
                                        "error": "全局已终局：所有单元收束完成，不再空转推演。"
                                                 "要继续故事请用报告页「继续故事推演」开新单元。"})
            if not _claim_start():                      # 原子抢占：多页签同秒双击不会入两个任务
                return ok({"started": False,
                           "note": "推演已在进行中 · 当前第 %d 轮（本页只是没抢到开跑权，"
                                   "进度照常显示）" % AUTO["round"]})
            _enqueue("beat", {"n": int((body[1] if isinstance(body, tuple) else body or {}).get("max_rounds", 1) or 1)})
            return ok({"started": True})
        if path == "/api/simulation/stop" and method == "POST":
            AUTO["stop"] = True                      # 直停：不绕队列，立刻生效
            _enqueue("pause", {"note": "门面 stop"})
            return ok({"stopped": True})
        return self._json(404, {"success": False, "error": "facade: 未映射端点 " + path})

    def _json(self, code, obj):
        body = json.dumps(_json_norm(code, obj), ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("X-NEST-Version", VERSION)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        """静态资产禁缓存：bundle/css/data 改了强刷即见。send_response 会重置头缓冲，
        故不能在下发前预置头，只能在 end_headers 收口时补。"""
        rel = self.path.lstrip("/").split("?")[0]
        if rel.startswith("assets/") or rel in ("data.json", "seal.svg", "ui-adjustments.js", "enhance.js", "enhance.css",
                                                "favicon.ico", "THIRD-PARTY-LICENSES.txt"):
            try:
                self.send_header("Cache-Control", "no-store")
            except Exception:
                pass
        super().end_headers()

    def do_GET(self):
        from urllib.parse import urlparse, parse_qs
        u = urlparse(self.path)
        if u.path == "/api/llm-config":
            st = _api_store()
            mask = lambda k: (k[:6] + "…" + k[-4:]) if len(k) > 12 else ("已设" if k else "")
            profiles = [{"id": p.get("id"), "name": p.get("name") or p.get("model", ""),
                         "base_url": p.get("base_url", ""), "model": p.get("model", ""),
                         "api_key_masked": mask(p.get("api_key", ""))} for p in st["profiles"]]
            return self._json(200, {"profiles": profiles, "current": st.get("current", ""),
                                    "mode": st.get("mode", "api"),
                                    "env": bool(os.environ.get("LLM_API_KEY")),
                                    "configured": bool(_llm_cfg(ignore_mode=True)),
                                    "active": bool(_llm_cfg())})
        if u.path.startswith("/api/round/"):
            try:
                rn = int(u.path.rsplit("/", 1)[1])
            except ValueError:
                return self._json(400, {"error": "轮次不合法"})
            rp = os.path.join(ROOT_DIR, "推演", "第%03d轮.md" % rn)
            if not os.path.exists(rp):
                return self._json(404, {"error": "第 %d 轮尚未生成" % rn})
            md = open(rp, encoding="utf-8").read()
            return self._json(200, {"round": rn, "md": md, "path": rp})
        if u.path == "/api/usage":
            try:
                usage = json.load(open(USAGE_PATH, encoding="utf-8"))
            except Exception:
                usage = {}
            cfg0 = _llm_cfg(ignore_mode=True) or {}
            return self._json(200, {"current_model": cfg0.get("model", ""),
                                    "project": _usage_proj(), "note": "token 为估算值（按 1.6 字/token 折算）",
                                    "usage": usage})
        if u.path == "/api/auto-status":
            return self._json(200, _auto_payload())
        if u.path in ("/api/health", "/api/version"):
            return self._json(200, _health_payload())
        if u.path == "/api/formats":
            return self._json(200, {"formats": FORMATS, "max_file_mb": MAX_FILE_BYTES // 1024 // 1024,
                                    "max_body_mb": MAX_BODY_BYTES // 1024 // 1024})
        if u.path in ("/api/schema", "/api/"):
            return self._json(200, _api_schema())
        if u.path.startswith("/api/"):
            return self._facade("GET", u.path, parse_qs(u.query), None)
        if self.path == "/events":
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Connection", "keep-alive")
            self.end_headers()
            conn = self.connection
            try:
                conn.settimeout(10.0)
            except Exception:
                pass
            last = _mtimes()
            last_ver = AUTO.get("ver", 0)
            last_push = 0.0
            try:
                self.wfile.write(b"event: hello\ndata: ok\n\n")
                self.wfile.flush()
                while True:
                    time.sleep(0.5)
                    sent = False
                    cur = _mtimes()
                    if cur != last:
                        # 分频道：data.json 变 -> data（前端整页刷新）；队列变 -> queue（只刷回执）
                        which = "data" if cur[0] != last[0] else "queue"
                        last = cur
                        self.wfile.write(("event: update\ndata: %s\n\n" % which).encode())
                        sent = True
                    ver = AUTO.get("ver", 0)
                    # 运行中每 ~2 秒无条件推一帧：tok_rate/秒表是连续量，不能只等阶段切换
                    force = (AUTO["running"] or AUTO.get("repairing")) and time.time() - last_push >= 2
                    if ver != last_ver or force:
                        # 进度即推：阶段/主笔/实时产出一变就到前端，不再等 2s 轮询
                        last_ver = ver
                        last_push = time.time()
                        try:
                            payload = json.dumps(_auto_payload(), ensure_ascii=False).encode("utf-8")
                        except Exception:
                            payload = b"{}"
                        self.wfile.write(b"event: progress\ndata: " + payload + b"\n\n")
                        sent = True
                    if not sent:
                        self.wfile.write(b": keepalive\n\n")
                    self.wfile.flush()
            except Exception:
                return
            finally:
                try:
                    self.wfile.close()
                except Exception:
                    pass
                try:
                    conn.close()
                except Exception:
                    pass
        # SPA fallback：非文件路径回 index.html（vue-router history 模式）
        fp = os.path.join(UI_DIR, self.path.lstrip("/").split("?")[0])
        if self.path != "/" and not os.path.exists(fp) and "." not in os.path.basename(u.path):
            self.path = "/index.html"
        if self.path.lstrip("/").split("?")[0] in ("", "index.html"):
            return self._serve_index()
        if u.path.startswith("/exports/"):
            return self._serve_export(u.path)
        # 静态白名单：ui/ 里只有前端资产可直出；运行态 .json（凭据/用量/局史/数据）一律 403。
        # 旧版对 .json 无拦截——api-config.json 明文密钥可被同机任意进程/网页匿名 GET。
        rel = self.path.lstrip("/").split("?")[0]
        if not (rel.startswith("assets/") or rel in ("seal.svg", "ui-adjustments.js", "enhance.js", "enhance.css",
                                                     "data.json", "favicon.ico",
                                                     "THIRD-PARTY-LICENSES.txt")):
            return self._json(403, {"error": "禁止访问：%s（运行态文件不外发）" % rel})
        return super().do_GET()

    def _serve_export(self, path):
        """导出 .txt 直接下载。
        旧版走 SimpleHTTPRequestHandler 的静态分支：Content-Type 只有 text/plain 没有 charset，
        浏览器按本地编码解 UTF-8 中文 → 满屏乱码；又没有 Content-Disposition，
        点了不是下载而是在标签页里打开。两处一并修掉。"""
        from urllib.parse import unquote, quote
        rel = unquote(path.lstrip("/"))
        base = os.path.realpath(os.path.join(UI_DIR, "exports"))
        fp = os.path.realpath(os.path.join(UI_DIR, rel))
        if not fp.startswith(base + os.sep) or not os.path.isfile(fp):   # 安全闸：不许越出 exports/
            return self._json(404, {"error": "导出文件不存在（可能已被清理，请重新生成）"})
        b = open(fp, "rb").read()
        fn = os.path.basename(fp)
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        # filename* 用 RFC 5987 编码，中文文件名在各浏览器都能正确落盘
        self.send_header("Content-Disposition",
                         "attachment; filename=\"export.txt\"; filename*=UTF-8''%s" % quote(fn))
        self.send_header("Content-Length", str(len(b)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(b)

    def _serve_index(self):
        """返回 index.html：未接入 API 时注入强制弹窗（接入门），并禁缓存确保状态即时。"""
        try:
            html = open(os.path.join(UI_DIR, "index.html"), encoding="utf-8").read()
        except OSError:
            return super().do_GET()
        b = _gate_inject(html).encode("utf-8")   # 状态条已内建于新前端顶栏，不再注入；接入门保留
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(b)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(b)

    def do_DELETE(self):
        """DELETE /api/archives {ids|title, purge}——历史记录删除（前端历史局抽屉的删除按钮）。"""
        from urllib.parse import urlparse
        u = urlparse(self.path)
        n = int(self.headers.get("Content-Length", 0) or 0)
        raw = self.rfile.read(n) if n else b""
        try:
            body = (None, json.loads(raw.decode("utf-8")) if raw else {})
        except Exception:
            body = (None, {})
        if u.path.startswith("/api/"):
            return self._facade("DELETE", u.path, {}, body)
        return self._json(404, {"error": "not found"})

    def do_POST(self):
        from urllib.parse import urlparse
        u = urlparse(self.path)
        if u.path.startswith("/api/"):
            ctype = self.headers.get("Content-Type", "")
            n = int(self.headers.get("Content-Length", 0) or 0)
            if n > MAX_BODY_BYTES:
                return self._json(413, {"error": "请求体超过 %d MB 上限，请分批投放材料" % (MAX_BODY_BYTES // 1024 // 1024)})
            raw = self.rfile.read(n) if n else b""
            if u.path == "/api/demo-save":
                # 演示片回传：浏览器录完 WebM 直接 POST 原始字节，落到 ui/exports/（本地服务，仅 127.0.0.1）
                fn = re.sub(r"[^A-Za-z0-9._-]", "_", (self.headers.get("X-Demo-Name") or "nest-drama-demo.webm"))[:80]
                d = os.path.join(UI_DIR, "exports"); os.makedirs(d, exist_ok=True)
                fp = os.path.join(d, fn)
                with open(fp, "wb") as f:
                    f.write(raw)
                return self._json(200, {"ok": True, "path": fp, "bytes": len(raw)})
            if ctype.startswith("multipart/form-data"):
                body = _parse_multipart(raw, ctype)          # (files, fields)
            else:
                try:
                    body = (None, json.loads(raw.decode("utf-8")) if raw else {})
                except Exception:
                    body = (None, {})
            if u.path == "/api/llm-config":
                b = body[1] if isinstance(body, tuple) else (body or {})
                st = _api_store()
                act = b.get("action", "save")
                if act == "mode":
                    if b.get("mode") == "session":
                        return self._json(403, {"ok": False, "error": "会话代跑已永久禁用：推演材料只走独立 API，请在上方完成接入"})
                    st["mode"] = "api"
                elif act == "select":
                    st["current"] = b.get("id", "")
                elif act == "delete":
                    st["profiles"] = [p for p in st["profiles"] if p.get("id") != b.get("id")]
                    if st.get("current") == b.get("id"):
                        st["current"] = st["profiles"][0]["id"] if st["profiles"] else ""
                else:                                            # save：新增或更新同名同模型档
                    base = (b.get("base_url") or "").strip()
                    model = (b.get("model") or "").strip()
                    key = (b.get("api_key") or "").strip()
                    if not (base and model and key):
                        return self._json(400, {"ok": False, "error": "三项都要填（链接/模型名/密钥）"})
                    same = next((p for p in st["profiles"]
                                 if p.get("base_url") == base and p.get("model") == model), None)
                    if same:
                        same["api_key"] = key
                        pid = same["id"]
                    else:
                        pid = "p%d" % (len(st["profiles"]) + 1)
                        while any(p.get("id") == pid for p in st["profiles"]):
                            pid += "x"
                        st["profiles"].append({"id": pid, "name": b.get("name") or model,
                                               "base_url": base, "model": model, "api_key": key})
                    st["current"] = pid
                    st["mode"] = "api"
                _api_save(st)
                return self._json(200, {"ok": True, "current": st.get("current", ""),
                                        "mode": st.get("mode"), "active": bool(_llm_cfg())})
            if u.path == "/api/llm-test":
                b = body[1] if isinstance(body, tuple) else (body or {})
                inline = {k: (b.get(k) or "").strip() for k in ("base_url", "model", "api_key")}
                cfg = inline if all(inline.values()) else _llm_cfg(ignore_mode=True)   # 弹窗先测后存
                text, err = _llm([{"role": "user", "content": "只回复两个字：正常"}],
                                 cfg=cfg, max_tokens=300, temperature=0, timeout=60, retries=0)
                return self._json(200, {"ok": not err, "reply": (text or "")[:20], "error": err})
            return self._facade("POST", u.path, {}, body)
        if self.path != "/cmd":
            return self._json(404, {"error": "not found"})
        try:
            n = int(self.headers.get("Content-Length", 0))
            cmd = json.loads(self.rfile.read(n).decode("utf-8"))
            assert isinstance(cmd.get("type"), str) and cmd["type"].strip()
        except Exception:
            return self._json(400, {"error": "bad command"})
        t = cmd.get("type")
        p = cmd.get("payload") or {}
        if t in ("init", "beat", "report", "interview", "gravity", "continue-story") and _gate_needed():
            return self._json(400, {"error": "未接入 API：请先在弹出的接入页完成 API 配置（会话代跑已禁用，不填无法启动）"})
        if t == "gravity-mode":
            # 引力档直通：low/medium/high，随时可改，下一轮开头读取即生效（本轮不追溯）
            if not _set_gravity_mode(p.get("mode")):
                return self._json(400, {"error": "mode 只能是 low/medium/high"})
            return self._json(200, {"ok": True, "mode": AUTO["gmode"],
                                    "note": "引力档已切到 %s——下一轮生效，本轮不受影响" % AUTO["gmode"]})
        if t == "interview" and _llm_cfg() and not AUTO["running"]:
            # 空闲时采访直跑（后台线程），不再等队列 5 秒轮询——用户点了发问 30-60 秒毫无动静，
            # 体验上就是"没反应"。推演中仍走队列（轮末消费，避免与推演线程并发写 data.json）。
            def _iv_bg(who=p.get("who", ""), q=p.get("q", ""), mode=p.get("mode", "戏内")):
                _set_progress("采访 · %s 回答中…" % who, 0)
                a, err2 = _interview(who, q, mode, lambda s: None)
                AUTO["log"] = (AUTO["log"] + ["采访 %s：%s" % (who, (err2 or "已回答"))])[-50:]
                _set_progress("采访 · %s %s" % (who, "已回答" if not err2 else "失败"), 100)
            threading.Thread(target=_iv_bg, daemon=True).start()
            return self._json(200, {"ok": True, "mode": "answering",
                                    "note": "%s 正在回答（30-60 秒，答案自动出现在下方采访记录）" % p.get("who", "")})
        if t == "turing-repair":
            if AUTO["running"]:
                return self._json(400, {"error": "推演进行中：修复会改写轮记录，先暂停再修"})
            if not _llm_cfg():
                return self._json(400, {"error": "未接入 API"})
            if AUTO.get("repairing"):
                return self._json(200, {"ok": True, "mode": "repairing", "note": "修复已在进行中"})

            def _rp_bg():
                AUTO["repairing"] = True
                AUTO["stop"] = False
                try:
                    b, e2 = _turing_repair(lambda s: AUTO.__setitem__(
                        "log", (AUTO["log"] + [s])[-50:]))
                    AUTO["log"] = (AUTO["log"] + [
                        ("图灵修复：%s" % e2) if e2 else
                        ("图灵修复完成：%s → %s" % (b.get("before", "—"), b.get("after", "—")))])[-50:]
                finally:
                    AUTO["repairing"] = False
            threading.Thread(target=_rp_bg, daemon=True).start()
            return self._json(200, {"ok": True, "mode": "repairing",
                                    "note": "正在按破绽修复语言层并自动复测——事实一字不改"})
        if t == "turing-retest":
            if not _llm_cfg():
                return self._json(400, {"error": "未接入 API"})
            D2 = _load_data() or {}
            res = _turing_audit(D2, _unit_ctx(D2), lambda s: AUTO.__setitem__(
                "log", (AUTO["log"] + [s])[-50:]))
            if not res:
                return self._json(400, {"error": "可抽样的过审回合不足（至少要 2 段）"})
            D2.setdefault("outcome", {})["turing"] = res
            _save_data(D2)
            return self._json(200, {"ok": True, "turing": res})
        if t == "export":
            name, err = _compile_report()
            if err:
                return self._json(400, {"error": err})
            from urllib.parse import quote as _q                # 中文名必须转义，否则前端 open() 拿到裸中文 URL
            return self._json(200, {"ok": True, "name": name, "download": "/exports/" + _q(name)})
        if t == "continue-story":
            if AUTO["running"]:
                return self._json(400, {"error": "推演进行中：先暂停当前推演，再开新单元"})
            if not (p.get("outline") or "").strip():
                return self._json(400, {"error": "新单元细纲必填——引擎要靠它知道这一段该发生什么"})
            unit, est = _continue_story(p.get("outline", ""), p.get("newCast", ""), int(p.get("rounds", 0) or 0))
            nr = int(p.get("rounds", 0) or 0)
            # 深加工（新增角色三卡）走队列；payload 带上已建单元名 → worker 幂等不重建
            _enqueue("continue-story", {"unit": unit, "outline": p.get("outline", ""),
                                        "newCast": p.get("newCast", ""), "rounds": nr})
            started = False
            if _llm_cfg() and nr > 0:                   # 独立 API：点了「开推」就真的开推，不再只入队
                threading.Thread(target=_auto_beat, args=(nr,), daemon=True).start()
                started = True
            return self._json(200, {"ok": True, "unit": unit, "forecast": est, "started": started})
        if t == "beat" and _all_closed():
            return self._json(200, {"ok": False, "error": "全局已终局：所有单元收束完成，不再空转推演。"
                                     "要继续故事请用报告页「继续故事推演」开新单元。"})
        if t == "beat" and not _claim_start():          # 同上：与门面 start 共用同一把抢占锁
            return self._json(200, {"ok": True, "mode": "推演已在进行中 · 当前第 %d 轮（%s/%s）——无需重复启动"
                                     % (AUTO["round"], AUTO["unitN"], AUTO["unitBudget"]),
                                   "round": AUTO["round"], "log": AUTO["log"][-3:]})
        if t == "beat" and _llm_cfg():
            n = int(p.get("n", 1) or 1)
            threading.Thread(target=_auto_beat, args=(n,), daemon=True).start()
            return self._json(200, {"ok": True, "mode": "独立API·自动驾驶", "n": min(n, 480)})
        if t == "pause" and AUTO["running"]:
            AUTO["stop"] = True
            AUTO["pausing"] = True                       # UI 即时反馈：正在断停
            return self._json(200, {"ok": True, "mode": "暂停指令已下达 · 当前步骤完成即停（≤1 个 LLM 调用）"})
        if t == "reset-sim":
            if AUTO["running"]:
                return self._json(400, {"error": "推演进行中：先点暂停、等停稳后再清空"})
            n = _reset_sim()
            return self._json(200, {"ok": True, "detail": "已清空 %d 个轮文件 · 纪事/心象/数据归零（世界库保留）" % n})
        if t == "delete-sim":
            if AUTO["running"]:
                return self._json(400, {"error": "推演进行中：先点暂停、等停稳后再删除"})
            ok, detail = _delete_sim()
            return self._json(200, {"ok": ok, "detail": detail})
        with _lock:
            q = _load_queue()
            seq = len(q["queue"]) + 1
            item = {
                "id": "c-%04d" % seq,
                "ts": time.strftime("%Y-%m-%d %H:%M:%S"),
                "status": "待处理",
                "type": cmd["type"].strip(),
                "payload": cmd.get("payload", {}),
            }
            q["queue"].append(item)
            _save_queue(q)
        return self._json(200, {"ok": True, "id": item["id"]})



class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

    def handle_error(self, request, client_address):
        """浏览器断开连接（SSE 关页/预连接取消）是常态噪音，静默之。"""
        exc = sys.exc_info()[1]
        if isinstance(exc, (ConnectionResetError, BrokenPipeError)):
            return
        super().handle_error(request, client_address)


def _repair_meta():
    """启动自愈：把被坏预算写脏的 meta.unitRound 分母校回真实预算。
    旧版剧本文件缺失时预算退到 8，会把 '21/8' 这种越界值反写进 meta 并一直显示在世界页。"""
    try:
        D = _load_data()
        if not D or not D.get("units"):
            return
        U = _unit_ctx(D)                                # 内部已按可信度回填 units[].budget/used
        want = "%d/%d" % (U["used"], U["budget"])
        dirty = False
        if str(D.get("meta", {}).get("unitRound", "")) != want:
            D["meta"]["unitRound"] = want
            dirty = True
        for u in D.get("units", []):                    # status 里的分母同样被坏预算写脏过
            st, b = str(u.get("status") or ""), u.get("budget")
            if b and "/" in st and st.rstrip("）").split("/")[-1] != str(b):
                head, _, tail = st.partition("/")
                u["status"] = "%s/%d）" % (head, int(b))
                dirty = True
        if dirty:
            _save_data(D)
            print("自愈：单元进度/状态分母校正为 %s" % want)
    except Exception:
        pass


def _resolve_zombie_build():
    """启动自愈：building=true 且 built=false 且无待办、无失败留痕、不在跑 → 孤儿态。
    旧版会永远停在“建设中”，页面转圈无提示；现在复位为 idle 并留一条可见提示。"""
    try:
        D = _load_data()
        if not D:
            return
        meta = D.setdefault("meta", {})
        if (meta.get("building") and not meta.get("built")
                and not os.path.exists(PENDING_PATH) and not _build_fail_load()):
            meta["building"] = False
            meta["buildNote"] = ("上次建世界中断且无待办可续（%s）——请重新投放材料"
                                 % time.strftime("%Y-%m-%d %H:%M"))
            _save_data(D)
            print("自愈：孤儿建造态已复位（building=true→false）")
    except Exception:
        pass


if __name__ == "__main__":
    os.chdir(UI_DIR)
    if not os.path.exists(QUEUE_PATH):
        _save_queue({"queue": []})
    _repair_meta()
    _resolve_zombie_build()
    threading.Thread(target=_hb_thread, daemon=True).start()       # 心跳（独立线程，长 LLM 期间不断）
    threading.Thread(target=_queue_worker, daemon=True).start()   # 队列消费器（api 模式）
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print("群像控制台: http://localhost:%d  （Ctrl+C 停止）" % PORT)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
