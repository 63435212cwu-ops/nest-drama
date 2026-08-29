# NEST-DRAMA

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**English** ｜ [中文](README_CN.md)

A unit-story creation engine: build a world for a work, then let independent characters act within it to drive the plot — producing unit stories, unit plots, and volume plots for long- or medium-form novels, or short stories on their own. Runs fully offline with zero third-party dependencies.

## Features

- **Unit-based writing** — story is organized into unit stories, unit plots, and volume plots; assists long/medium novels, also writes short stories directly
- **Independent characters** — each character only knows what they should know, and acts and speaks in their own voice
- **World-driven plot** — milestones are reached through in-world causality, not authorial forcing
- **Live galaxy atlas** — the world becomes a growing node graph; Star Cluster (3D) and Relationship Matrix views
- **Author control** — gravity mode, god-inject, pause, interview, continue/export
- **Local-first** — pure Python standard library, zero third-party dependencies; data and API key stay on your machine

> **Note:** For the best galaxy-atlas rendering, avoid creating an excessive number of characters — an overly large cast causes the graph to appear sparse and out of proportion.

## Install

Requires **Python 3** (no other dependencies).

```bash
# Clone the repo or unpack the release package, then simply run:
python3 ui/serve.py
```

## Usage

1. Start the engine: `python3 ui/serve.py`
2. Open `http://localhost:8787` in your browser
3. In the console: enter your LLM API key → import your materials → click **Build world**

**Materials.** Plain text is enough — worldview, character bios, outline, prior story. Use one self-contained set of materials per world; don't mix multiple works into a single world.

**Interruptions.** Resubmit to resume from where it left off; unchanged materials are not re-billed.

## Data & privacy

- Materials you feed in and the content it generates are all stored in the local directory; nothing passes through any server
- Your API key lives in your home directory `~/.nest-drama/`, outside the project folder and version control
- Engine code and your creative data are strictly separated; handing the project to someone else cannot carry away your manuscripts

## Directory structure

```
ui/serve.py                     Engine core: simulation + HTTP server (REST + SSE)
ui/dupian.py                    Language layer: zero-token detection of mechanical "AI tics"
ui/test_serve.py                Integration tests (mocked LLM)
ui/index.html                   Frontend
ui/assets/                      Frontend build artifacts
ui/THIRD-PARTY-LICENSES.txt     Third-party licenses for the frontend
pack-release.py                 Release packaging, with automated privacy scan
材料/                           Materials folder (empty skeleton ships with the package)
```

## Tests

```bash
python3 ui/test_serve.py
```

Covers the full pipeline and failure paths, using a mocked LLM with no real-call cost.

## License

[AGPL-3.0](LICENSE). Free to use, modify, and commercialize — but modified versions, and online services built on it, must be open to users under the same license. Third-party frontend licenses are listed in `ui/THIRD-PARTY-LICENSES.txt`.