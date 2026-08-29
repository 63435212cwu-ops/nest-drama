# NEST-DRAMA Ensemble Engine

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

[中文](README.md) ｜ **English**

NEST-DRAMA is a unit-story creation engine. It works from unit stories and unit plots as its basic units, with volume plots as the structural spine — built to support long- and medium-form novel writing, and equally suited to writing short stories directly: build a world for a work first, then let the characters act within it to move the plot.

## Purpose & Usage

NEST-DRAMA's output path is not "one-click generation of a full-length novel." Its basic output unit is the plot unit: you create unit stories and unit plots first, then weave them into volume plots that form a larger narrative structure, supporting the progress of long- and medium-form novels.

It is also well suited to writing short stories directly. To create, first build a self-contained world for a work, then let the characters act within it on their own, advancing the plot and making the causality pay off.

Two organizational modes —

- **Single story**: one story, one or a few units, played to a close
- **Serialized / volume stories**: units chain together like episodes; character states, old scores, and relationships carry across units

## How it works

**Step 1 · Build the world.** Provide your setting materials (plain text). After reading them all, the engine establishes the worldview, lays down a "truth manuscript" known only to itself, and files three cards per character — core identity (who they are), voice (how they speak), and current psyche (what's on their mind). It then splits the story into units, each with its own goal and round budget.

**Step 2 · Play unit by unit.** Each round runs like a staged scene: a script supervisor sets up the scene and decides who appears; the character whose turn it is acts and speaks on their own agenda, while the others react. A supervising editor reviews each draft and sends back anything that reads stilted, repetitive, or that over-reaches into psychological description. A referee keeps the books each round — goal progress, screen-time balance, and any aimless looping.

**Step 3 · You direct.** You can step in at any point during the run (see "Intervention options" below). When a unit closes, the next one begins automatically — or you can pause to interview a character or export the full transcript.

## Where character believability comes from

- **Characters know only what they should**: they cannot see one another's minds or schemes; information gaps are real — only what a character knows can influence what they do
- **Characters carry life outside the plot**: each one has small, unrelated concerns hanging in their life — a half-day of stomachache, an unanswered message, someone they can't stop thinking about — which compete with the main plot at key moments
- **The plot advances through in-world means**: milestones are reached by delivering news to the right ears, putting pressure on the table, and so on — no fabrication, no rewriting of hearts

## The galaxy atlas

Each time the engine saves, it also renders the world as a living graph — the galaxy atlas in the left panel is not a static diagram but a star map that grows with the story:

- **Nodes map to world entities**: the worldview + plot spine, each unit, and each worldbook entry become a node; a character appearing in a unit spawns an "appearing" edge
- **Colored by unit, progress at a glance**: nodes and edges are tinted per unit, showing at a glance which volume the run has reached and who appears in each unit
- **Two views**: Star Cluster (3D) presents the graph as a rotatable constellation; Relationship Matrix lays character connections out as a matrix, for studying who relates to whom
- **Always current**: connections appear and update live as you build the world, switch units, or continue a story; they re-fetch on reconnect, so what you see is always the latest state

## Intervention options

| Option | What it does |
|---|---|
| Gravity mode (loose / medium / tight) | How strongly the world pulls the story toward its goal |
| God inject | Inject one plot instruction into a round; discarded after use |
| Pause | Stop the auto-run at any time |
| Interview | Question a character in-story, or press for the truth |
| Continue / export | Resume after a unit closes, or export the full transcript |

## Getting started

1. Install Python 3 (no other dependencies)
2. Run `python3 ui/serve.py` and open `http://localhost:8787`
3. Enter your LLM API key in the console → import your materials → click "Build world"

**Preparing materials**: provide what you already have — worldview, character bios, outline, prior story — as plain text. Use one self-contained set of materials per world; mixing works from different books into a single world muddies the result.

**Resuming after an interruption**: no need to start over. Resubmit and it continues from where it left off; materials that have not changed are not re-billed.

## Data & privacy

- Materials you feed in and the content it generates are all stored in the local directory; nothing passes through any server
- Your API key lives in your home directory (`~/.nest-drama/`), never inside the project folder or in version control
- Engine code and your creative data are strictly separated: even handing this project to someone else cannot carry away your manuscripts

## Technical notes

- Engine core `ui/serve.py`: pure Python standard library, zero third-party dependencies; language layer `ui/dupian.py`: zero-token detection of mechanical "AI tics"
- Integration tests `python3 ui/test_serve.py`: cover the full pipeline and failure paths, with a mocked LLM and no real-call cost
- Release packaging `python3 pack-release.py`: hard separation of engine and user data, with an automated privacy scan after packaging

## License

Licensed under [AGPL-3.0](LICENSE). In summary: you are free to use, modify, and commercialize it — but modified versions, and online services built on it, must be made available to users under the same license. Third-party licenses for the frontend are listed in `ui/THIRD-PARTY-LICENSES.txt`.