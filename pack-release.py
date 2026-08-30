# -*- coding: utf-8 -*-
# NEST-DRAMA 发布打包器 · Copyright (C) 2026 63435212cwu-ops
# SPDX-License-Identifier: AGPL-3.0-only（全文见随包 LICENSE）
"""发布打包：引擎与库数据分离，产出可上传的干净发布包。

用法:  python3 pack-release.py
产出:  dist/nest-drama-<版本>-<日期>.zip

原则（按严苛顺序执行）:
  1. 白名单复制——只有 ENGINE_FILES 里的引擎文件进包，其余一概不知晓；
  2. 库数据（材料/角色/推演/归档等）与运行态（data.json/局史/用量）从不接触打包器；
  3. 包内只附空 材料/ 骨架，引擎启动自建其余目录；
  4. 打包完成后对产物树做隐私终检，任一命中即删除产物并中止（宁可不出包）。
"""
import getpass
import os
import re
import shutil
import sys
import time
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
UI = os.path.join(HERE, "ui")
VERSION = "v1.0.0"

ENGINE_FILES = [                                   # 发布白名单：引擎本体，别无其他
    "ui/serve.py",
    "ui/dupian.py",
    "ui/test_serve.py",
    "ui/index.html",
    "ui/ui-adjustments.js",
    "ui/seal.svg",
    "ui/THIRD-PARTY-LICENSES.txt",
    "ui/assets/index-Dbzr5ZOw.js",
    "ui/assets/index-DPnICO7N.css",
    "README.md",
    "README_CN.md",                                # 中文版门面：中文用户入口（默认英文在 README.md）
    "docs/star-cluster.png",                       # README 介绍图：主星丛
    "docs/character-galaxy.png",                   # README 介绍图：角色星系
    "LICENSE",                                     # AGPL-3.0：分发必须随附协议全文
    ".gitignore",                                  # 解包即是可 git init 的完整仓库
]

PRIVACY_PATTERNS = [                               # 终检：任一命中即中止
    (re.compile(rb"/Users/|/home/[a-z]+/"), "本机绝对路径"),
    (re.compile(re.escape(getpass.getuser()).encode("utf-8"), re.I), "本机用户名"),
    (re.compile(rb"sk-[A-Za-z0-9]{16,}"), "密钥形态"),
    (re.compile(rb"(?:api[_-]?key|token|secret)['\"]?\s*[:=]\s*['\"][A-Za-z0-9_\-]{16,}['\"]"),
     "明文凭据赋值"),
]

# 私有词表：本机 ~/.nest-drama/privacy-words.txt（一行一词）。打包器会把词表里的词
# 一并纳入终检——词表本身在用户主目录，永远不进仓库、不进发布包。
for _w in (open(os.path.expanduser("~/.nest-drama/privacy-words.txt"), encoding="utf-8")
           .read().splitlines() if os.path.exists(os.path.expanduser(
               "~/.nest-drama/privacy-words.txt")) else []):
    _w = _w.strip()
    if _w and not _w.startswith("#"):
        PRIVACY_PATTERNS.append((re.compile(re.escape(_w).encode("utf-8")), "私有词（本机词表）"))


def main():
    stamp = time.strftime("%Y%m%d")
    dist = os.path.join(HERE, "dist")
    staging = os.path.join(dist, "nest-drama-%s-%s" % (VERSION, stamp))
    zip_path = staging + ".zip"
    shutil.rmtree(staging, ignore_errors=True)
    if os.path.exists(zip_path):
        os.remove(zip_path)
    os.makedirs(staging)

    missing = [f for f in ENGINE_FILES if not os.path.isfile(os.path.join(HERE, f))]
    if missing:
        print("中止：引擎文件缺失 %r" % missing)
        sys.exit(1)

    for rel in ENGINE_FILES:
        dst = os.path.join(staging, rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(os.path.join(HERE, rel), dst)
    os.makedirs(os.path.join(staging, "材料"), exist_ok=True)   # 空骨架：开箱即用

    # 隐私终检——扫的是产物树，不是源目录：确保"打进包里的"确实干净
    hits = []
    for root, _dirs, files in os.walk(staging):
        for fn in files:
            fp = os.path.join(root, fn)
            blob = open(fp, "rb").read()
            for pat, why in PRIVACY_PATTERNS:
                m = pat.search(blob)
                if m:
                    hits.append((os.path.relpath(fp, staging), why, m.group()[:40].decode("utf-8", "replace")))
    if hits:
        print("中止：隐私终检命中 %d 处，产物已删除" % len(hits))
        for f, why, frag in hits:
            print("  [%s] %s → %r" % (why, f, frag))
        shutil.rmtree(staging)
        sys.exit(1)

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(staging):
            dirs.sort()
            for fn in sorted(files):
                fp = os.path.join(root, fn)
                zf.write(fp, os.path.join(os.path.relpath(root, dist), os.path.relpath(fp, root)))
        zf.write(os.path.join(staging, "材料"), os.path.join(os.path.relpath(staging, dist), "材料") + "/")
        # zip 空目录占位，解包后开箱即用

    size = os.path.getsize(zip_path)
    n = sum(1 for i in zipfile.ZipFile(zip_path).infolist() if not i.filename.endswith("/"))
    print("发布包就绪: dist/%s  (%d 文件 / %.1f MB)" % (
        os.path.basename(zip_path), n, size / 1048576.0))
    print("含: 引擎(%s) + 前端产物 + 集成测试 + README + 空材料骨架" % VERSION)
    print("不含: 库数据/运行态/凭据/系统垃圾——已通过隐私终检（0 命中）")


if __name__ == "__main__":
    main()
