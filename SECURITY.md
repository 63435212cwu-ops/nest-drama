# 安全与隐私 · Security

## 设计边界

- 服务只监听 `127.0.0.1:8787`，不对外网开放；没有账号体系，也不应直接暴露到公网
- API 密钥存于 `~/.nest-drama/api-config.json`，不进项目目录；静态文件只放行白名单（index / assets / enhance / data.json / seal.svg），其余一律 403
- `/api/health` 只报库名，不报绝对路径
- 发布包由 `pack-release.py` 按白名单生成，并对产物做隐私终检（本机路径、用户名、密钥形态、私有词表）

## 报告漏洞

若你发现密钥泄露、越权读取、路径穿越或任何隐私问题，请**不要**公开提 Issue，改用 GitHub 的私密安全报告（仓库 Security → Report a vulnerability），或在 Issue 中只写"有安全问题，请联系"并等待维护者私信。

我们会在 7 天内回应，修复后在 CHANGELOG 中致谢（如你愿意）。

## 支持的版本

只维护最新发布版本（见 Releases）。

## English

Local-only service on `127.0.0.1:8787`; no auth layer — do not expose it to the internet. Keys live in `~/.nest-drama/`, outside the repo. Static files are allow-listed; `/api/health` never reveals absolute paths. Release zips are built from a whitelist and pass an automated privacy scan.

To report a vulnerability, use GitHub's private security reporting (Security → Report a vulnerability) rather than a public issue. We respond within 7 days. Only the latest release is supported.
