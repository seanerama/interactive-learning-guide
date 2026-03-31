# Interactive Learning Guide

Transform books, slides, transcripts, data sheets, and technical guides into interactive, self-contained HTML learning tools — powered by Claude Code.

## Install

```bash
npx interactive-learning-guide --claude
```

This installs slash commands and workflows into your Claude Code config. Use `--global` (default) for all projects or `--local` for the current directory only.

### Other runtimes

```bash
npx interactive-learning-guide --opencode    # OpenCode
npx interactive-learning-guide --gemini      # Gemini CLI
npx interactive-learning-guide --codex       # Codex CLI
npx interactive-learning-guide --all         # All runtimes
```

### Uninstall

```bash
npx interactive-learning-guide --claude --uninstall
```

## Usage

After installing, start a Claude Code session and run:

```
/ilg:help
```

### Quick Start: Books

1. Upload a PDF or EPUB
2. Run `/ilg:book`
3. Download the generated HTML file

Long books are automatically chunked and processed chapter by chapter — you don't need to do anything different.

### Quick Start: Slides, Transcripts, Data Sheets

1. Upload your content (any combination)
2. Run `/ilg:multiformat`
3. Download the generated HTML file

## Commands

| Command | Description |
|---------|-------------|
| `/ilg:start` | Choose a workflow interactively |
| `/ilg:book` | Process a book — auto-chunks long books |
| `/ilg:multiformat` | Process slides, transcripts, data sheets, install guides |
| `/ilg:init` | Start chunked pipeline (preface + Chapter 1) |
| `/ilg:chapter [N]` | Process next chapter in chunked pipeline |
| `/ilg:build` | Final build — compile relay files into HTML |
| `/ilg:status` | Show chunked pipeline progress |
| `/ilg:help` | Show all commands and usage |

## Options

Add these to any command:

```
--focus "topic"                    Extra depth on a specific area
--difficulty foundational          Bias quiz difficulty
--chapters 3-7                     Scope to specific chapters
--quiz-depth 10                    Questions per chapter (default: 5)
--audience "beginners"             Adjust depth for target audience
```

## Output

All workflows produce a single HTML file with three interactive panels:

- **Concept Map** — Visual knowledge graph with click-to-explore nodes, chapter filtering, importance filtering, and learning path mode
- **Quiz Engine** — Multiple choice, true/false, scenario, and fill-in-the-blank with immediate feedback, wrong-answer explanations, and source references
- **Glossary Explorer** — Searchable term dictionary with flashcard mode, mastery tracking, and bookmarking

Plus: dark mode, responsive layout, study progress tracking, zero dependencies.

## Content Types

| Type | Analysis Focus |
|---|---|
| Books (PDF/EPUB) | Thesis, arguments, concept progression across chapters |
| Slide Decks | Narrative reconstruction, expanded bullets, speaker notes |
| Transcripts | Teaching moments, analogies, Q&A insights |
| Product Data Sheets | Spec hierarchies, branded terms, comparison structure |
| Install/Config Guides | Dependency chains, decision points, warnings |

## License

MIT
