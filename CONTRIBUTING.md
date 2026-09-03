# 贡献指南 · Contributing

感谢你的关注。NEST-DRAMA 是纯标准库的 Python 项目，贡献门槛很低，但有几条硬规矩。

## 提交前

1. 运行全部测试并确保 0 失败：`python3 ui/test_serve.py`（模拟 LLM，无 API 成本）
2. 不引入第三方 Python 依赖——"零依赖"是产品承诺
3. 不提交任何创作数据、运行态或凭据（`.gitignore` 已覆盖；`python3 pack-release.py` 会做隐私终检，任一命中即中止）
4. 测试用例里的人名、地名、作品名请用中性占位（如 阿青 / 老周 / 州牧府），不要用真实作品里的名字

## 代码风格

- Python：标准库、类型清晰的函数、注释说"为什么"而不是"做什么"
- 前端：不改 `ui/assets/` 构建产物；界面增强一律写在 `ui/enhance.js` / `ui/enhance.css`，只用 CSS 变量与全局类名覆盖
- 反 AI 腔规则（`ui/dupian.py`）：每条规则必须带 `ev` 证据字段（语料 / 论文 / 用户裁定），与实测冲突的教条不进库

## 提 PR

- 一个 PR 只做一件事，标题写清"改了什么、为什么"
- 涉及用户可见行为的改动，请同步更新 `CHANGELOG.md` 与 README（中英两份）
- 版本号只在 `ui/serve.py` 的 `VERSION` 改一处

## English

- Run `python3 ui/test_serve.py` (0 failures) before submitting
- No third-party Python dependencies
- Never commit creative data, runtime state or credentials; `pack-release.py` enforces a privacy scan
- Keep frontend changes in `ui/enhance.js` / `ui/enhance.css`; don't edit build artifacts
- One PR, one purpose; update `CHANGELOG.md` and both READMEs for user-visible changes
