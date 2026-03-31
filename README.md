# Interactive Learning Guide

> Transform books, slides, transcripts, and technical content into interactive HTML learning tools — powered by Claude Code.

Upload your material, run a slash command, get back a **single HTML file** you can open in any browser. No server, no build tools, no dependencies.

---

## Install

```bash
npx interactive-learning-guide --claude
```

Installs slash commands into Claude Code. Works globally by default — available in every session.

**Other runtimes:**

```bash
npx interactive-learning-guide --opencode     # OpenCode
npx interactive-learning-guide --gemini       # Gemini CLI
npx interactive-learning-guide --codex        # Codex CLI
npx interactive-learning-guide --all          # All runtimes
```

**Uninstall:**

```bash
npx interactive-learning-guide --claude --uninstall
```

---

## Quick Start

Start a new Claude Code session after installing.

### Books (PDF or EPUB)

```
/ilg:book
```

Upload your book and run the command. Short books are processed in a single pass. Long books are **automatically chunked** — the tool scans the table of contents, detects chapter boundaries, and processes each chapter sequentially via sub-agents. You don't need to do anything different regardless of book length.

### Slides, Transcripts, Data Sheets, Install Guides

```
/ilg:multiformat
```

Upload your content and run the command. Supports combining multiple files in one session (e.g., a slide deck + its transcript for complementary depth).

---

## What You Get

A single, self-contained HTML file with three interactive panels:

### Concept Map
Visual knowledge graph of all ideas and how they connect. Color-coded by chapter or section, filterable by importance, with a guided learning path mode that walks you from foundational to advanced concepts.

### Quiz Engine
Multiple choice, true/false, scenario-based, and fill-in-the-blank questions. Immediate feedback with explanations for both correct and incorrect answers. Filter by chapter, difficulty, or concept area. Includes score tracking and a retry-missed mode.

### Glossary Explorer
Searchable term dictionary with flashcard mode, mastery tracking, and bookmarking. Browse alphabetically or by chapter. Each term includes the definition, how the author uses it, related terms, and an example or analogy.

**Plus:** dark mode toggle, responsive layout (desktop + tablet), study progress tracking across all panels.

---

## Commands

| Command | Description |
|---------|-------------|
| `/ilg:book` | Process a book (PDF/EPUB) — auto-chunks long books |
| `/ilg:multiformat` | Process slides, transcripts, data sheets, install guides |
| `/ilg:start` | Choose a workflow interactively |
| `/ilg:status` | Show chunked pipeline progress |
| `/ilg:help` | Show all commands and usage |

### Manual Chunked Pipeline (Advanced)

For fine-grained control over long book processing:

| Command | Description |
|---------|-------------|
| `/ilg:init` | Read preface + Chapter 1, create relay files |
| `/ilg:chapter [N]` | Process a specific chapter |
| `/ilg:build` | Compile relay files into the final HTML guide |

---

## Options

Append to any command:

```
--focus "topic"                    Give extra depth to a specific area
--difficulty foundational          Bias quiz questions toward a difficulty level
--chapters 3-7                     Scope to specific chapters
--quiz-depth 10                    Questions per chapter (default: 5)
--audience "beginners"             Adjust depth for target audience
```

---

## Supported Content Types

| Type | What It Extracts |
|---|---|
| **Books** (PDF/EPUB) | Thesis, arguments, concept progression, cross-chapter relationships |
| **Slide Decks** | Narrative arc, expanded bullets, speaker notes, slide flow as concept progression |
| **Transcripts** | Teaching moments, analogies, Q&A insights, speaker emphasis patterns |
| **Product Data Sheets** | Spec hierarchies, branded term mappings, comparison structures, compatibility |
| **Install / Config Guides** | Dependency chains, decision points, prerequisites, warnings, config parameters |

Multiple content types can be combined in a single `/ilg:multiformat` session for richer output.

---

## How It Works

1. **Scan** — Reads your content and identifies structure (chapters, sections, slides)
2. **Analyze** — Extracts concepts, relationships, terminology, and teaching moments
3. **Generate** — Creates quiz questions across difficulty levels, builds the concept map, compiles the glossary
4. **Build** — Produces a single HTML file with all data embedded, graph library loaded from CDN

For long books, steps 1-3 happen per-chapter via sub-agents, with structured relay files carrying context between chapters. The final build compiles everything into one file.

---

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (or OpenCode, Gemini CLI, Codex CLI)
- Your source material as PDF, EPUB, or other supported format
- Node.js >= 16.7.0

---

## License

MIT
