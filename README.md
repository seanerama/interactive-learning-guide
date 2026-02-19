# Interactive Learning Guide Builder

Transform books, slide decks, transcripts, data sheets, and technical guides into interactive, self-contained HTML learning tools — powered by Claude.

## What It Does

Upload your learning material, run a prompt, and get back a **single HTML file** you can open in any browser. No server, no install, no dependencies.

The output includes three interactive panels:

- **Concept Map** — Visual knowledge graph of all ideas and how they connect. Color-coded by chapter/section, filterable, with a guided learning path mode.
- **Quiz Engine** — Multiple choice, true/false, scenario-based, and fill-in-the-blank questions with immediate feedback, wrong-answer explanations, and source references.
- **Glossary Explorer** — Searchable term dictionary with flashcard mode, bookmarking, and cross-references.

## Three Frameworks

This repo contains three prompt frameworks. Pick the one that fits your use case.

### 1. Standard Prompt — Single Session, Books

**File:** [`interactive-learning-guide-prompt.md`](interactive-learning-guide-prompt.md)

**Best for:** Books or chapter sets that fit within a single context window.

Upload a PDF/EPUB, paste the prompt, and Claude handles everything in one session — reading, analysis, concept extraction, quiz generation, and HTML output.

**Quick start:**
1. Open a Claude Code session
2. Upload your book (PDF or EPUB)
3. Paste the contents of `interactive-learning-guide-prompt.md`
4. Download the generated HTML file

### 2. Chunked Pipeline — Multi-Session, Books

**Files:** [`agent-0-init.md`](agent-0-init.md) · [`agent-n-chapter.md`](agent-n-chapter.md) · [`agent-final-build.md`](agent-final-build.md) · [`usage-guide.md`](usage-guide.md)

**Best for:** Long books that exceed a single context window.

A three-stage pipeline that processes one chapter per session, passing structured data files between sessions as relay batons:

```
Agent 0 (Init)          → Reads preface + Ch.1, creates relay files
Agent N (per chapter)   → Reads one chapter, appends to relay files  (repeat)
Build Agent (final)     → Compiles everything into the interactive HTML
```

Three relay files carry context across sessions:
- `summary.md` — Running narrative summary
- `learning-data.json` — Structured concepts, quizzes, glossary, relationships
- `progress.md` — Chapter index and processing status

See [`usage-guide.md`](usage-guide.md) for detailed step-by-step instructions.

### 3. Multi-Format Prompt — Single Session, Various Content Types

**File:** [`interactive-learning-guide-multiformat.md`](interactive-learning-guide-multiformat.md)

**Best for:** Non-book content or mixed-format material.

Extends the standard prompt with automatic content type detection and specialized analysis strategies for:

| Content Type | Analysis Focus |
|---|---|
| Slide Decks | Reconstruct narrative arc, expand terse bullets, use speaker notes |
| Transcripts / Dialogues | Extract teaching moments, analogies, Q&A insights |
| Product Data Sheets | Decode spec hierarchies, map branded terms to functions |
| Install / Config Guides | Map dependency chains, capture decision points and warnings |

Supports combining multiple sources in one session (e.g., slides + transcript for complementary depth).

## Framework Comparison

| | Standard | Chunked Pipeline | Multi-Format |
|---|---|---|---|
| **Sessions** | 1 | 1 per chapter + build | 1 |
| **Input** | Books (PDF/EPUB) | Books (PDF/EPUB) | Slides, transcripts, data sheets, install guides |
| **Best for** | Short-medium books | Long books | Non-book technical content |
| **Complexity** | Low | Medium | Low |
| **Output** | Single HTML file | Single HTML file | Single HTML file |

## Output Features

All three frameworks produce the same interactive HTML artifact:

- **Concept Map** with graph visualization (Cytoscape.js / vis.js / D3), click-to-explore nodes, chapter filtering, importance filtering, and learning path mode
- **Quiz Engine** with 4 question types, difficulty filtering, chapter filtering, score tracking, retry-missed mode, and detailed feedback per question
- **Glossary Explorer** with alphabetical and chapter-based browsing, live search, flashcard mode with mastery tracking, and bookmarking
- **Dark mode** toggle
- **Responsive** layout (desktop + tablet)
- **Zero dependencies** — single HTML file, opens in any modern browser

## Requirements

- [Claude Code](https://claude.ai) with Playground plugin (for HTML generation)
- Your source material as PDF, EPUB, or other supported format

## Tips

- **Adjusting quiz depth:** Add `Generate 8-10 quiz questions per chapter instead of the standard 5` to any prompt
- **Adding a focus area:** Add `Give extra attention to concepts related to [topic]` to any prompt
- **Scoping chapters:** Add `Focus only on Chapters X through Y` to narrow scope
- **Adjusting difficulty:** Add `Bias the quiz questions toward [foundational / intermediate / advanced] difficulty`
- **Very long chapters:** Split across two sessions using page ranges (see [usage-guide.md](usage-guide.md))

## License

MIT
