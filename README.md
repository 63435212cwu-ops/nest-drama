# NEST-DRAMA

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**English** ｜ [中文](README_CN.md)

A unit-story creation engine: build a world for a work, then let independent characters act within it to drive the plot — producing unit stories, unit plots, and volume plots for long- or medium-form novels, or short stories on their own. Runs fully offline with zero third-party dependencies.

<p>
  <img src="docs/star-cluster.png" alt="Star Cluster (3D)" width="49%">
  <img src="docs/character-galaxy.png" alt="Character Galaxy" width="49%">
</p>

## Features

- **Unit-based writing** — story is organized into unit stories, unit plots, and volume plots; assists long/medium novels, also writes short stories directly
- **Independent characters** — each character only knows what they should know, and acts and speaks in their own voice
- **World-driven plot** — milestones are reached through in-world causality, not authorial forcing
- **Live galaxy atlas** — the world becomes a growing solar-system-style 3D graph; click a character on the wall to lock onto their planet, double-click a planet to dive into that character's own galaxy
- **Author control** — gravity mode, god-inject, pause, interview, continue/export
- **Cinematic rendering** — built-in post-processing for the galaxy: ACES / AgX / Neutral tone mapping, exposure, bloom, grain, vignette, chromatic aberration, anamorphic flare, four color grades; procedural nebula backdrop (fbm galactic band + dark dust) and near-field star dust; widescreen cinema mode with captions, one-click PNG export; rendering pauses off-screen and adapts resolution to frame rate
- **"Minimal luxe" preset** — one click for the gilded grade (gold highlights, navy shadows), AgX, low bloom, faded links, shorter comet tails, quiet labels (zero-presence characters only show their tag on hover/select), breathing camera (slow FOV drift when idle), and a gold hairline frame in fullscreen; tail span and link density are also individually adjustable
- **Warp transitions** — entering/leaving a character galaxy, switching units, and camera reset trigger radial streaks + exposure flash + FOV punch + a title card; selecting a planet gives a light pulse
- **Numeric ledger (zero token)** — quantities spoken in the text (5,200 suits of armor, 1,200 shi of grain…) are booked automatically and injected into every agent next round; silently changing a number gets the draft killed and re-rolled, while openly disputing or correcting it is allowed and logged
- **Normalized enforcement** — the "dense tells" kill is now length-normalized (≥10 hits, or ≥5 hits at ≥4/1000 chars); tell-list v4 adds hesitation clichés, personified silence, vague referents, syllable-by-syllable speech, blurred time, memory triggers; stats layer warns on em-dash / ellipsis addiction
- **Day / night themes** — paper (light) and cinema (dark), or follow the system; global keyboard shortcuts, instant cast search, round-complete toasts, tab title tracks the story
- **Local-first** — pure Python standard library, zero third-party dependencies; data and API key stay on your machine

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

## UI & shortcuts

Top-right: theme (◐ system / ☀ light / ☾ dark) and the shortcut sheet (?). "◈ 画质" in the galaxy corner opens the cinematic panel; all preferences persist in the browser.

| Key | Action | Key | Action |
|---|---|---|---|
| `1`–`4` | World / Config / Run / Report | `F` | Galaxy fullscreen |
| `C` | Cinema mode (letterbox, HUD hidden) | `Space` | Pause / resume orbit |
| `R` | Reset camera | `U` | Switch unit system |
| `Enter` | Dive into selected character | `⌫` | Back to cluster |
| `G` | Cinematic panel | `S` | Export galaxy PNG |
| `/` | Focus cast search | `T` | Cycle theme |
| `H` | History | `Esc` | Step back out |

## Input formats & API

Materials are parsed with the standard library only (`GET /api/formats` lists them): plain text with encoding sniffing (UTF-8/BOM, UTF-16/32, GB18030, Big5), `.docx`, `.odt`, `.epub` (spine order), `.html`, `.rtf`, `.zip` (recursively expanded, `__MACOSX` skipped, duplicate names de-duplicated), and best-effort `.pdf` (text-based only; unreadable PDFs fail loudly with a hint). Limits: 64 MB per file, 512 MB per request; a batch with zero readable files returns 422 with the format list.

`GET /api/schema` is a machine-readable endpoint index and `GET /api/health` reports version, model status, run state, and ledger sizes. Every JSON response carries `ok`/`success` and, on failure, `error`; responses include an `X-NEST-Version` header. The single source of the version is `VERSION` in `ui/serve.py`, which the release packer also reads.

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
ui/enhance.js / .css     UI layer: themes, cinematic post-processing, shortcuts, cast search
ui/assets/                      Frontend build artifacts
ui/THIRD-PARTY-LICENSES.txt     Third-party licenses for the frontend
pack-release.py                 Release packaging, with automated privacy scan
docs/                           Screenshots and project docs
材料/                           Materials folder (empty skeleton ships with the package)
```

## Tests

```bash
python3 ui/test_serve.py
```

Covers the full pipeline and failure paths, using a mocked LLM with no real-call cost.

## License

[AGPL-3.0](LICENSE). Free to use, modify, and commercialize — but modified versions, and online services built on it, must be open to users under the same license. Third-party frontend licenses are listed in `ui/THIRD-PARTY-LICENSES.txt`.