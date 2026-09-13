# -*- coding: utf-8 -*-
import os, sys, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _harness import *

import io, zipfile, zlib

m, root = load_engine()


def raises(fn, *a, **k):
    try:
        fn(*a, **k)
        return None
    except ValueError as e:
        return str(e)
    except Exception as e:
        return "OTHER:" + repr(e)


def zbytes(mapping):
    bio = io.BytesIO()
    with zipfile.ZipFile(bio, "w") as z:
        for name, data in mapping.items():
            if isinstance(data, str):
                data = data.encode("utf-8")
            z.writestr(name, data)
    return bio.getvalue()


def has(f, k):
    return (isinstance(f, dict) and k in f) or hasattr(f, k)


# ---------- _decode_text ----------
bom_txt = "驿站守夜名单"
check("UTF-8 BOM", bom_txt in m._decode_text(b"\xef\xbb\xbf" + bom_txt.encode("utf-8")))
check("UTF-16 BOM", bom_txt in m._decode_text(bom_txt.encode("utf-16")))
check("UTF-32 BOM", bom_txt in m._decode_text(bom_txt.encode("utf-32")))
check("GB18030", bom_txt in m._decode_text(bom_txt.encode("gb18030")))
big5_txt = "驛站與守夜"
check("Big5", big5_txt in m._decode_text(big5_txt.encode("big5")))
long_txt = "守夜名单落到县令案头共四十字以确保嗅探准确无误他说此刻打算" * 1
long_txt = "这是一段足够长的中文文本用于无BOM的UTF十六进制小端自动嗅探测试共四十个汉字左右"
check("无BOM UTF-16-LE", long_txt in m._decode_text(long_txt.encode("utf-16-le")))
check("UTF-8 容错", "你好" in m._decode_text("你好".encode("utf-8") + b"\xff"))

# ---------- docx ----------
docx_xml = ('<?xml version="1.0" encoding="UTF-8"?>'
            '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'
            '<w:p><w:r><w:t>第一段落</w:t></w:r></w:p>'
            '<w:p><w:r><w:t>第二</w:t><w:tab/><w:t>制表</w:t><w:br/><w:t>换行后</w:t></w:r></w:p>'
            '</w:body></w:document>')
docx_raw = zbytes({"word/document.xml": docx_xml})
dout = m._decode_docx(docx_raw)
check("docx两段文字", "第一段落" in dout and "第二" in dout and "换行后" in dout)
check("docx制表", "\t" in dout and "制表" in dout)
seg = dout[dout.find("第一段落"):dout.find("第二")] if dout.find("第二") > 0 else ""
check("docx段间换行", "\n" in seg)
e = raises(m._decode_docx, zbytes({"word/other.xml": "<x/>"}))
check("docx缺document.xml", e is not None and ".docx" in e)

# ---------- odt ----------
odt_xml = ('<?xml version="1.0" encoding="UTF-8"?>'
           '<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" '
           'xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"><office:body><office:text>'
           '<text:p>第一段落</text:p><text:h>大标题</text:h>'
           '<text:p>行一<text:line-break/>行二<text:tab/>后制表<text:s text:c="3"/>尾</text:p>'
           '</office:text></office:body></office:document-content>')
odt_raw = zbytes({"content.xml": odt_xml})
oout = m._decode_odt(odt_raw)
check("odt段落", "第一段落" in oout)
check("odt标题", "大标题" in oout)
check("odt换行", "\n" in oout)
check("odt制表", "\t" in oout)
check("odt三空格", "制表   尾" in oout)
e = raises(m._decode_odt, zbytes({"dummy.txt": "x"}))
check("odt缺content.xml", e is not None and "content.xml" in e)

# ---------- epub ----------
container = ('<?xml version="1.0"?><container><rootfiles><rootfile full-path="OEBPS/content.opf" '
             'media-type="application/oebps-package+xml"/></rootfiles></container>')
opf = ('<?xml version="1.0"?><package><manifest>'
       '<item id="p1" href="page1.xhtml" media-type="application/xhtml+xml"/>'
       '<item id="p2" href="page2.xhtml" media-type="application/xhtml+xml"/>'
       '</manifest><spine><itemref idref="p2"/><itemref idref="p1"/></spine></package>')
epub_raw = zbytes({
    "META-INF/container.xml": container,
    "OEBPS/content.opf": opf,
    "OEBPS/page1.xhtml": "<html><body><p>第一页文字甲</p></body></html>",
    "OEBPS/page2.xhtml": "<html><body><p>第二页文字乙</p></body></html>",
})
eout = m._decode_epub(epub_raw)
check("epub书脊顺序", eout.find("第二页文字乙") != -1 and eout.find("第二页文字乙") < eout.find("第一页文字甲"))
epub_nc = zbytes({
    "a.xhtml": "<html><body><p>甲页文字</p></body></html>",
    "b.xhtml": "<html><body><p>乙页文字</p></body></html>",
})
nout = m._decode_epub(epub_nc)
check("epub无container按名排序", nout.find("甲页文字") != -1 and nout.find("甲页文字") < nout.find("乙页文字"))
e = raises(m._decode_epub, zbytes({"OEBPS/img.png": b"\x89PNG"}))
check("epub无正文", e is not None and "epub" in e.lower())

# ---------- html ----------
html_raw = ('<html><head><style>SECRETSTYLE</style><script>SECRETSCRIPT</script></head><body>'
            '<p>第一&amp;段</p><div>第二段</div>'
            '<table><tr><td>甲</td><td>乙</td></tr></table></body></html>')
hout = m._decode_html(html_raw.encode("utf-8"))
check("html去script", "SECRETSCRIPT" not in hout)
check("html去style", "SECRETSTYLE" not in hout)
check("html实体反转义", "第一&段" in hout)
check("html成段", "第一&段" in hout and "第二段" in hout and "\n" in hout)
check("html表格制表", "甲\t乙" in hout)

# ---------- rtf ----------
rtf = (b"{\\rtf1\\ansi{\\fonttbl{\\f0 Song;}}\\pard "
       b"\\'d6\\'d0\\'ce\\'c4\\par \\u20013 ?abc\\par}")
rout = m._decode_rtf(rtf)
check("rtf单字节中文", "中文" in rout)
midx = rout.find("中")
check("rtf u转义跳替代符", "中abc" in rout or (midx != -1 and rout[midx + 1:midx + 4] == "abc"))
check("rtf换行", "\n" in rout)
check("rtf跳过fonttbl", "Song" not in rout)

# ---------- pdf ----------
sentence = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
plain = b"%PDF-1.4\n1 0 obj<<>>stream\nBT (" + sentence + b") Tj ET\nendstream\nendobj"
check("pdf明文流", "ABCDEFGHIJKLMNOPQRSTUVWXYZ" in m._decode_pdf(plain))
comp = zlib.compress(b"BT (" + sentence + b") Tj ET")
zraw = b"%PDF-1.4\n1 0 obj<</Filter/FlateDecode>>stream\n" + comp + b"\nendstream\nendobj"
check("pdf zlib流", "ABCDEFGHIJKLMNOPQRSTUVWXYZ" in m._decode_pdf(zraw))
hexs = "".join("%02x" % b for b in bytes(range(1, 41)))
graw = b"%PDF-1.4\n1 0 obj<<>>stream\nBT <" + hexs.encode() + b"> Tj ET\nendstream\nendobj"
e = raises(m._decode_pdf, graw)
check("pdf乱码", e is not None and "PDF" in e)

# ---------- _decode_bytes ----------
e = raises(m._decode_bytes, "旧.doc", b"\xd0\xcf\x11\xe0")
check("_decode_bytes .doc", e is not None and "另存为" in e)
e = raises(m._decode_bytes, "表.xlsx", b"PK\x03\x04junk")
check("_decode_bytes .xlsx", e is not None and "不能作为单份材料" in e)
old_max = m.MAX_FILE_BYTES
m.MAX_FILE_BYTES = 4096
e = raises(m._decode_bytes, "big.txt", b"a" * 5000)
m.MAX_FILE_BYTES = 64 * 1024 * 1024
check("_decode_bytes 上限", e is not None and "上限" in e)
check("_decode_bytes 未知扩展嗅探", "嗅探文本" in m._decode_bytes("x.xyz", "嗅探文本".encode("utf-8")))

# ---------- _expand_files ----------
raw = zbytes({"__MACOSX/._x.txt": "junk", ".DS_Store": "junk", "a.txt": "甲文件", "sub/b.md": "乙文件"})
items = m._expand_files([("bundle.zip", raw)])
names = sorted(it[0] for it in items)
check("展开过滤macos", len(items) == 2 and all(it[2] is None for it in items))
check("展开保留文件", names == ["a.txt", "b.md"])

z2 = zbytes({"深.txt": "深层文本"})
items = m._expand_files([("外层.zip", zbytes({"内层.zip": z2}))])
check("嵌套zip深度2", any(it[0] == "深.txt" and "深层文本" in it[1] for it in items))

z4 = zbytes({"leaf.txt": "叶"})
z3 = zbytes({"z4.zip": z4})
zz2 = zbytes({"z3.zip": z3})
z1 = zbytes({"z2.zip": zz2})
items = m._expand_files([("z1.zip", z1)])
check("嵌套zip深度4不展开", any(it[2] and "不能作为单份材料" in it[2] for it in items))

items = m._expand_files([("bad.zip", b"not a zip at all")])
check("坏zip", len(items) == 1 and items[0][2] is not None and "不是有效的 zip" in items[0][2])

items = m._expand_files([("t.zip", zbytes({"d1/a.txt": "一", "d2/a.txt": "二"}))])
dnames = [it[0] for it in items]
check("同名去重", "a.txt" in dnames and "a-2.txt" in dnames)

items = m._expand_files([("t.zip", zbytes({"../evil/名?字.txt": "内容"}))])
check("文件名净化", len(items) == 1 and items[0][0] == "名_字.txt")

items = m._expand_files([("t.zip", zbytes({"坏.doc": b"\xd0\xcf\x11\xe0", "好.txt": "正常文本".encode("utf-8")}))])
docit = [it for it in items if it[0].endswith(".doc")]
txtit = [it for it in items if it[0].endswith(".txt")]
check("展开doc项错误", len(docit) == 1 and docit[0][1] == "" and docit[0][2] and "另存为" in docit[0][2])
check("展开同批txt正常", len(txtit) == 1 and "正常文本" in txtit[0][1] and not txtit[0][2])

# ---------- _parse_multipart ----------
body, ctype = multipart(files=[("甲.txt", "文件甲内容".encode("utf-8")), ("乙.bin", b"\x00\x01\x02")],
                        fields={"标题": "值一", "备注": "中文备注"})
files, fields = m._parse_multipart(body, ctype)
check("multipart文件数", len(files) == 2)
check("multipart文件内容", files[0][0] == "甲.txt" and files[0][1] == "文件甲内容".encode("utf-8"))
check("multipart字段", fields.get("标题") == "值一" and fields.get("备注") == "中文备注")

# ---------- _norm_text ----------
check("norm CRLF", m._norm_text("a\r\nb") == "a\nb")
check("norm 零宽与BOM", m._norm_text("a\x00b\ufeffc\u200bd") == "abcd")
check("norm NBSP", m._norm_text("a\u00a0b") == "a b")
check("norm 压空行", "\n\n\n" not in m._norm_text("a\n\n\n\nb") and "a" in m._norm_text("a\n\n\n\nb"))

# ---------- 形状 ----------
check("FORMATS形状", isinstance(m.FORMATS, (list, tuple)) and len(m.FORMATS) >= 8 and all(has(f, "ext") and has(f, "how") for f in m.FORMATS))
check("ZIP_SKIP形状", isinstance(m.ZIP_SKIP, tuple))

done(min_pass=30)
