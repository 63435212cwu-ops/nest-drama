# NEST-DRAMA Ensemble Engine

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

[中文](README.md) ｜ **English**

Turn novel characters into living people: every character is an independent simulated mind — knowing only what they should know, fearing what they should fear, speaking in their own voice. The plot is a gravity field, not a rail: characters act freely, and the world pulls the story toward its milestones using only in-world means.

## First: what it is — and what it isn't

It is **not** a "one-click, write-me-a-whole-novel" tool.

It is a **story-unit simulation engine**: your story is split into units, and the engine plays them out one unit at a time, each until it lands. Two ways to use it —

- **Single story**: one story, one or a few units, played to a close
- **Serialized / volume stories**: units chain together like episodes; character states, old scores, and relationships carry across units

## How it plays out

**Step 1 · Build the world.** Drop your setting materials (plain text) in. After reading everything, the engine sets the worldview, buries a "truth manuscript" only it knows, and files three cards for every character — who they are (core), how they talk (voice), and what's on their mind right now (psyche). Then it cuts the story into units, each with its own goal and round budget.

**Step 2 · Play, unit by unit.** Every round runs like a film set: a script supervisor stages the scene and picks who's on; whoever's turn it is speaks and acts on their own agenda, the others react. A supervising editor reviews each draft — anything that doesn't read like human prose gets killed and rewritten. A referee keeps books every round: goal progress, who's starved for screen time, who's circling in place.

**Step 3 · You direct.** Step in whenever you like (see next section). When a unit closes, the baton passes to the next one — or stop to interview characters and export the transcript.

## Why the characters feel alive

- **Everyone knows only what they should**: characters can't see each other's minds or schemes; information gaps are real
- **Characters carry private baggage**: a few things unrelated to the plot hang in each life — a stomachache all morning, an unanswered text, someone they can't stop thinking about. At key moments, these compete with the plot for their attention
- **No railroading**: milestones are reached through in-world means — a piece of news delivered to the right ears, pressure put on the table. No fabrication, no rewriting of hearts

## Where you can step in

| You can | What it does |
|---|---|
| Gravity mode (loose / medium / tight) | How hard the world pulls the story toward the goal |
| God inject | Slip one plot instruction into a round; burns after use |
| Pause | Stop the auto-run anytime |
| Interview | Question a character in-story, or press for the truth |
| Continue / export | Pick up after a unit closes, or export the full transcript |

## Getting started

1. Have Python 3 installed (nothing else — zero dependencies)
2. Run `python3 ui/serve.py`, open `http://localhost:8787`
3. Fill in your own LLM API key in the console → drop in your materials → hit "Build world"

**Preparing materials**: throw in what you already have — worldview, character bios, outlines, backstory, as plain text. One world, one set of materials; mixing several books into one build muddies the flavor.

**If it gets interrupted**: no need to start over. Resubmit and it picks up where it left off; unchanged materials are not re-billed.

## Where your stuff lives

- Everything you feed in and everything it writes stays in **this folder on your own machine** — no server involved
- Your API key lives in your home directory (`~/.nest-drama/`), never inside the project or its git history
- Engine code and your creative data are strictly separated: handing this project to someone else **cannot carry your manuscripts**

## For the technically curious (skippable)

- Engine: `ui/serve.py`, pure Python standard library, zero third-party deps; language layer `ui/dupian.py`: zero-token mechanical AI-tics detection
- Integration tests: `python3 ui/test_serve.py` — full pipeline plus failure paths, mocked LLM, costs nothing
- Release packaging: `python3 pack-release.py` — hard separation of engine and user data, with an automatic privacy scan

## License

AGPL-3.0 (full text in [LICENSE](LICENSE)). In plain words: use it free, modify it, even make money with it — but modified versions, and online services built on it, must stay equally open to their users. Third-party licenses for the frontend are listed in `ui/THIRD-PARTY-LICENSES.txt`.
