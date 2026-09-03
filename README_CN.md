# NEST-DRAMA

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Release](https://img.shields.io/github/v/release/63435212cwu-ops/nest-drama)](https://github.com/63435212cwu-ops/nest-drama/releases/latest)
[![Python 3.9+](https://img.shields.io/badge/Python-3.9%2B-3776AB.svg)](#安装)

[English](README.md) ｜ **中文**

单元剧情创作引擎：先为作品建立一个世界，再让独立角色在世界内自主行动、推动剧情，产出单元故事、单元剧情与卷集剧情——辅助长篇、中篇创作，也可直接写短篇。纯 Python 标准库，零第三方依赖，数据与密钥只留在本机。

<p>
  <img src="docs/star-cluster.png" alt="星丛（3D）：一个单元即一个恒星系，角色是行星" width="49%">
  <img src="docs/character-galaxy.png" alt="角色星系：潜入单个角色，看他走过的每一轮" width="49%">
</p>

## 下载

- **发布包**（推荐）：[Releases](https://github.com/63435212cwu-ops/nest-drama/releases/latest) → 下载 `nest-drama-vX.Y.Z-日期.zip`，解压即用，内含空的 `材料/` 骨架
- **源码**：`git clone https://github.com/63435212cwu-ops/nest-drama.git`

版本变更见 [CHANGELOG.md](CHANGELOG.md)。

## 安装与运行

需要 **Python 3.9+**，无需安装任何依赖。

```bash
python3 ui/serve.py
# 浏览器打开 http://localhost:8787
```

1. 在控制台填入你的大模型接入（OpenAI 兼容接口：链接 / 模型名 / 密钥）
2. 导入创作材料——世界观、人物设定、大纲、已写正文，纯文本即可
3. 点「建世界」，然后开始推演

一个世界只放一部作品的材料。推演中断后重新提交即可从断点续跑，未改动的材料不重复计费。

## 它是怎么工作的

1. **建世界**：从材料里提炼世界观、剧情脊椎（必达 / 弹性节点）与角色三卡（内核 / 声纹 / 心象）
2. **推演**：每轮由场记选出驱动者与被指向者，各角色作为独立 agent 只看自己该看的信息，按自身性格行动；监修官审"人会不会这么做"，毒编机检零 token 拦"AI 腔"，数目账保证说出口的数字前后一致
3. **收束**：剧情节点靠世界内因果自然达成，作者随时可注入、访谈、暂停、续演、导出

## 特性

- **角色独立**——每个角色只掌握其应知信息，按自身人格、恐惧与视野说话行事
- **世界驱动**——剧情脊椎是引力场而非铁轨；节点通过世界内手段自然达成
- **反 AI 腔**——零 token 机检 + 定点补丁 + 监修官三层执法，按篇幅归一判定，含跨轮口癖与数目一致性核对
- **材料读取**——txt / md / docx / odt / epub / html / rtf / zip / 尽力版 pdf，多编码自动嗅探
- **星丛图谱**——太阳系式 3D 图随剧情生长：单元是恒星系，角色是行星，日心距是活跃度；双击潜入角色星系看每一轮
- **电影级画质**——ACES / AgX / Neutral 影调、辉光、颗粒、光斑、色调风格（含鎏金）、程序化星云、跃迁动画、影院模式、PNG 导出；"极简奢华"一键预设
- **作者可控**——引力档、上帝注入、暂停、访谈、续演、导出；历史局归档与回滚
- **日/夜双主题 + 全站快捷键**——按 `?` 查看快捷键表
- **本地优先**——材料、稿件、密钥不出本机；发布打包器自带隐私终检

## 快捷键

| 键 | 作用 | 键 | 作用 |
|---|---|---|---|
| `1`–`4` | 世界 / 配置 / 推演 / 报告 | `F` | 星丛全屏 |
| `C` | 影院模式 | `Space` | 公转 暂停 / 继续 |
| `R` | 镜头复位 | `U` | 切换单元星系 |
| `Enter` | 进入所选角色星系 | `⌫` | 返回星丛 |
| `G` | 画质面板 | `S` | 导出 PNG |
| `/` | 卡司检索 | `T` | 切换主题 |
| `H` | 历史局 | `Esc` | 逐层退出 |

## API

本地 REST + SSE，`GET /api/schema` 给出完整端点清单与约定；`GET /api/health` 报版本、模型状态、运行态与轮次；`GET /api/formats` 报材料格式与大小上限。所有 JSON 响应含 `ok` / `success`，失败含 `error`，并带 `X-NEST-Version` 头。

## 数据与隐私

- 材料与生成内容全部存于项目目录本地，不经过任何服务器
- API 密钥存于用户主目录 `~/.nest-drama/`，不进项目目录、不入版本控制
- 引擎代码与创作数据严格分离；`pack-release.py` 只打包白名单引擎文件并做隐私终检

## 目录结构

```
ui/serve.py                  引擎核心：推演 + HTTP 服务（REST + SSE）
ui/dupian.py                 语言层：零 token 反 AI 腔机检 + 数目账
ui/test_serve.py             集成测试（模拟 LLM，无调用成本）
ui/index.html                前端页面
ui/assets/                   前端构建产物（Vue + three.js）
ui/enhance.js / .css         界面进化层：双主题、电影级后期、快捷键、卡司检索
ui/ui-adjustments.js         历史区行为补丁
ui/THIRD-PARTY-LICENSES.txt  前端第三方许可
pack-release.py              发布打包（白名单 + 隐私终检）
docs/                        截图
材料/                        创作材料目录（随包分发空骨架）
```

## 测试

```bash
python3 ui/test_serve.py
```

## 参与与安全

- 贡献指南：[CONTRIBUTING.md](CONTRIBUTING.md) · 行为准则：[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- 安全与隐私问题：[SECURITY.md](SECURITY.md)
- Bug 与建议：[Issues](https://github.com/63435212cwu-ops/nest-drama/issues)

## 许可证

[AGPL-3.0](LICENSE)。可自由使用、修改与商用；修改后的版本及基于本项目提供的在线服务，须以同等许可向用户开源。前端第三方许可见 `ui/THIRD-PARTY-LICENSES.txt`。
