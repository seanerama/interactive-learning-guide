# Usage Guide: Chunked Interactive Learning Guide Builder

## What This Is

A three-prompt pipeline that processes a book one chapter at a time using Claude Code, then compiles everything into an interactive HTML learning guide with concept maps, quizzes, and a glossary explorer.

Each session reads only one chapter, keeping the context window lean. Structured data files are passed between sessions as the relay baton.

---

## What You Need

- The book as a single PDF or EPUB file
- Claude Code (with Playground plugin for the final build)
- These three prompt files:
  - `agent-0-init.md` — First session
  - `agent-n-chapter.md` — Repeated for each subsequent chapter
  - `agent-final-build.md` — Final session

---

## The Pipeline

```
┌─────────────────────────────────────────────────────────┐
│  Session 1: Agent 0 (Init)                              │
│  Upload: book.pdf                                       │
│  Reads: Preface + Chapter 1                             │
│  Creates: summary.md, learning-data.json, progress.md   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Session 2: Agent N (Chapter 2)                         │
│  Upload: book.pdf + summary.md + learning-data.json     │
│          + progress.md                                  │
│  Reads: Chapter 2 only                                  │
│  Updates: all three shared files                        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Session 3: Agent N (Chapter 3)                         │
│  Upload: book.pdf + updated shared files                │
│  Reads: Chapter 3 only                                  │
│  Updates: all three shared files                        │
└──────────────────────┬──────────────────────────────────┘
                       │
                      ...repeat for each chapter...
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Final Session: Build Agent                             │
│  Upload: summary.md + learning-data.json + progress.md  │
│  Reads: shared files only (no book needed)              │
│  Creates: interactive-learning-guide.html               │
└─────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Instructions

### Session 1: Initialize

1. Open a new Claude Code session
2. Upload the full book (PDF or EPUB)
3. Copy and paste the contents of `agent-0-init.md`
4. Claude will:
   - Scan the table of contents
   - Read the preface/introduction and Chapter 1
   - Create three files: `summary.md`, `learning-data.json`, `progress.md`
5. **Download all three files** and save them in a working folder

### Session 2 through N: Process Each Chapter

6. Open a **new** Claude Code session
7. Upload:
   - The full book (same PDF or EPUB)
   - `summary.md` (latest version)
   - `learning-data.json` (latest version)
   - `progress.md` (latest version)
8. Open `agent-n-chapter.md` and **replace the two placeholders**:
   - `[CHAPTER NUMBER]` → the chapter number to process (e.g., `2`)
   - `[CHAPTER TITLE]` → the chapter title (e.g., `Getting Started with APIs`)
9. Paste the modified prompt
10. Claude will:
    - Read only the assigned chapter
    - Append new data to all three shared files
11. **Download the updated versions** of all three files, replacing the previous versions in your working folder
12. Repeat steps 6-11 for every remaining chapter

### Final Session: Build the Guide

13. Open a **new** Claude Code session
14. Upload only the three shared files (you do NOT need the book this time):
    - `summary.md`
    - `learning-data.json`
    - `progress.md`
15. Copy and paste the contents of `agent-final-build.md`
16. Claude will:
    - Validate all the accumulated data
    - Build the complete interactive HTML learning guide
17. **Download the HTML file** — open it in any browser to start studying

---

## Important Tips

### Always Use the Latest Files
Each session updates the shared files. Always upload the most recent versions. If you accidentally upload stale files, you'll lose data from intermediate chapters.

### Keep a Backup After Each Session
Before starting the next session, keep a copy of the shared files in case something goes wrong. A simple folder structure:

```
my-book-guide/
├── book.pdf
├── prompts/
│   ├── agent-0-init.md
│   ├── agent-n-chapter.md
│   └── agent-final-build.md
├── after-ch1/
│   ├── summary.md
│   ├── learning-data.json
│   └── progress.md
├── after-ch2/
│   ├── summary.md
│   ├── learning-data.json
│   └── progress.md
├── after-ch3/
│   └── ...
└── final/
    ├── summary.md
    ├── learning-data.json
    ├── progress.md
    └── interactive-learning-guide.html
```

### If a Session Fails Mid-Process
Don't try to patch partially updated files. Go back to the previous chapter's backup and re-run the failed session from scratch.

### For Very Long Chapters
If a chapter is unusually long (50+ pages) and you're still hitting context limits, you can split it across two sessions. In the first session, modify the prompt to say:

```
Read ONLY the first half of Chapter [N] (pages X through Y).
Note in progress.md that this chapter is partially processed.
```

Then in the next session:

```
Read ONLY the second half of Chapter [N] (pages Y through Z).
Complete the processing for this chapter.
```

### For Short Books (Under ~8 Chapters)
You may be able to process 2-3 short chapters per session. Modify the Agent N prompt to say:

```
Read Chapters [X] through [Y]. Process each chapter separately 
with its own concepts, questions, and terms, but do it all in 
this single session.
```

### Adjusting Quiz Depth
Add to any chapter agent prompt:
```
Generate 8-10 quiz questions for this chapter instead of the 
standard 5. Include at least 2 scenario-based questions.
```

### Adding a Focus Area
Add to any chapter agent prompt:
```
Give extra attention to concepts related to [topic]. Extract 
additional quiz questions and glossary entries in this area.
```

### Skipping Chapters
If some chapters aren't relevant, simply skip them. Mark them in progress.md as:
```
- [~] Chapter 7: [Title] — SKIPPED (not relevant)
```

The build agent will work with whatever chapters were processed.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Agent reads beyond its assigned chapter | Re-run the session. The prompt explicitly says to stop, but occasionally it needs reinforcement. Add "STOP after Chapter X. Do not continue." at the end of the prompt. |
| JSON is invalid after a session | Open `learning-data.json` in a JSON validator (jsonlint.com). Common issues: trailing commas, missing brackets. Fix manually or re-run the session. |
| Duplicate glossary terms appear | The build agent will catch and deduplicate these. Or fix manually in the JSON between sessions. |
| Build agent says chapters are missing | Check `progress.md` — if chapters are marked incomplete, process them before running the build agent. |
| HTML file is too large to render smoothly | This can happen with 20+ chapter books. Ask the build agent to split into multiple HTML files (one per section of chapters). |
| Cross-chapter relationships are weak | This usually means summary.md isn't detailed enough. You can manually enrich the "Critical Context" sections between sessions to give future agents more to work with. |

---

## What the Final Output Looks Like

The interactive HTML learning guide has three tabs:

1. **Concept Map** — Visual graph of all concepts across all chapters, color-coded, clickable, filterable, with a learning path mode
2. **Quiz** — All quiz questions with filtering by chapter, difficulty, and concept area. Immediate feedback, score tracking, retry mode
3. **Glossary** — Searchable term explorer with flashcard mode, bookmarking, and cross-references

It's a single HTML file that opens in any browser. No server, no install, no dependencies.
