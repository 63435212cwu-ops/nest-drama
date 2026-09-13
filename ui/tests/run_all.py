# -*- coding: utf-8 -*-
# NEST-DRAMA 全套测试入口 · AGPL-3.0-only
"""一条命令跑完全部测试（都是 mock LLM，零 API 成本）：

    python3 ui/tests/run_all.py          # 集成套件 ui/test_serve.py + ui/tests/test_*.py

每个测试文件独立进程运行（各自沙盒），末尾汇总 PASS/FAIL 数；任一文件退出码非 0 → 本脚本退出码 1。
`-s` 关闭用户 site-packages：本机若装了会打印噪音的 usercustomize 也不会混进输出。
"""
import glob
import os
import re
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
UI = os.path.dirname(HERE)


def run(path):
    t0 = time.time()
    p = subprocess.run([sys.executable, "-s", path], cwd=os.path.dirname(UI),
                       stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    out = p.stdout.decode("utf-8", "replace")
    m = re.search(r"(\d+) PASS · (\d+) FAIL", out)
    if m:
        npass, nfail = int(m.group(1)), int(m.group(2))
    else:                                              # 旧集成套件的汇总格式
        npass = len(re.findall(r"^PASS ", out, re.M))
        nfail = len(re.findall(r"^FAIL ", out, re.M))
    return p.returncode, npass, nfail, time.time() - t0, out


def main():
    files = [os.path.join(UI, "test_serve.py")] + sorted(glob.glob(os.path.join(HERE, "test_*.py")))
    total_p = total_f = 0
    bad = []
    for f in files:
        rc, npass, nfail, secs, out = run(f)
        total_p += npass
        total_f += nfail
        mark = "✓" if rc == 0 else "✗"
        print("%s %-32s %4d PASS %3d FAIL  %5.1fs" % (mark, os.path.relpath(f, os.path.dirname(UI)), npass, nfail, secs), flush=True)
        if rc != 0:
            bad.append(f)
            tail = [ln for ln in out.splitlines() if ln.startswith("FAIL") or "Traceback" in ln or "Error" in ln][-12:]
            for ln in tail:
                print("    " + ln)
    print("\n合计 %d PASS · %d FAIL · %d 个文件%s" % (total_p, total_f, len(files),
                                                   ("，失败：" + "、".join(os.path.basename(b) for b in bad)) if bad else ""))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
