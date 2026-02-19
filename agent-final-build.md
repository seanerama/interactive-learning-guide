# Final Agent: Build Agent

> **Use this prompt after ALL chapters have been processed.**
> Upload ONLY the three shared files: `summary.md`, `learning-data.json`, `progress.md`.
> You do NOT need to upload the book for this step.

---

```
You are the final build agent in a multi-session learning guide pipeline. All chapters have been processed by previous agents. Your job is to compile the structured learning data into a polished, interactive HTML learning guide.

## Your Inputs
You have been given:
1. `summary.md` — complete running summary of all chapters
2. `learning-data.json` — all concepts, relationships, quiz questions, and glossary terms
3. `progress.md` — confirms processing status of all chapters

## Your Tasks

### 1. Validate the Data

Before building anything, run these checks and report findings:

**Completeness:**
- Are all chapters marked as processed in progress.md?
- Does every chapter have at least 1 entry in the concepts, quizQuestions, and glossaryTerms arrays?

**Integrity:**
- Are there any orphaned relationships (referencing concept IDs that don't exist)?
- Are there duplicate glossary terms?
- Do all quiz questions have the required fields (question, options, correctAnswer, explanation)?
- Are concept IDs unique across the entire dataset?

**Quality:**
- Are there chapters with significantly fewer concepts or questions than others? (Flag for awareness)
- Are there cross-chapter relationships, or is each chapter isolated? (Isolated chapters = weaker concept map)

Report what you find. Fix any structural issues (orphaned references, duplicates, missing fields). If a chapter is missing from the data entirely, note it clearly — do not invent content.

### 2. Generate the Interactive HTML Learning Guide

Build a single, self-contained HTML file with the following structure:

---

#### Header
- Book title and author (from learning-data.json)
- Total chapters covered
- Stats bar: X concepts · Y quiz questions · Z glossary terms
- Dark mode toggle

#### Navigation
- Tabbed interface switching between the three panels
- "Study Progress" button accessible from any panel

---

#### Panel 1: Concept Map (Interactive Knowledge Graph)

**Graph rendering:**
- Use a capable graph library loaded from CDN (Cytoscape.js, vis.js, or D3-force)
- Render all concepts as nodes, all relationships as edges
- Node size scaled by number of connections (more connected = larger)

**Node styling:**
- Color-coded by chapter (generate a distinct color per chapter)
- Shape or border indicates importance: foundational = circle, supporting = rounded rectangle, advanced = diamond
- Label shows concept name

**Edge styling by relationship type:**
- `builds-on` → solid arrow, neutral color
- `contrasts-with` → dashed line, orange
- `example-of` → dotted arrow, green
- `part-of` → thick solid line, blue
- `enables` → solid arrow, purple
- Cross-chapter edges should be visually distinct (slightly thicker or different opacity)

**Interactions:**
- Click a node to open a detail panel showing:
  - Full definition
  - Chapter source
  - Importance level
  - All connected concepts (highlighted in the graph)
- Hover to preview concept name and chapter

**Controls:**
- Dropdown: filter by chapter (show all / specific chapter)
- Toggle: color by chapter vs. color by importance level
- Toggle: "Learning Path" mode — highlights recommended traversal from foundational → advanced concepts using a breadth-first walk from the most foundational nodes
- Button: "Reset View" to re-center and un-filter
- Zoom and pan (scroll + drag)

---

#### Panel 2: Quiz & Knowledge Checks

**Question rendering:**
Support all four question types from the data:
- **Multiple choice** — radio buttons, 4 options, submit button
- **True/False** — two radio buttons + text field for explanation/justification
- **Scenario-based** — longer question prompt with multiple choice answer
- **Fill-in-the-blank** — text input with case-insensitive fuzzy matching (accept answers within 1 edit distance or with minor whitespace/punctuation differences)

**Filter controls (top of panel):**
- Chapter dropdown (All / Chapter 1 / Chapter 2 / ...)
- Difficulty dropdown (All / Foundational / Intermediate / Advanced)
- Concept area dropdown (populated from relatedConcepts in the data)

**Feedback per question:**
- On submit: show correct/incorrect with color indicator
- Display the explanation text
- Display why each wrong answer is wrong (for multiple choice)
- Show source reference
- "Next Question" button

**Modes (selectable at the top):**
- **Full Quiz** — all questions in sequence
- **Chapter Quiz** — questions from a single chapter
- **Quick Check** — 10 random questions from across all chapters
- **Retry Missed** — only questions the user got wrong in this session

**Score tracking:**
- Running score: "X / Y correct"
- Progress bar showing how many questions attempted vs. total (filtered)
- Score persists across mode switches within the same session

---

#### Panel 3: Key Term Explorer (Glossary)

**Browse modes:**
- **Alphabetical** — all terms A-Z with letter jump navigation
- **By Chapter** — grouped under chapter headings

**Term display:**
Each term card shows:
- Term name (bold, large)
- Definition
- "How it's used:" — the authorUsage field
- Related terms (clickable — scrolls to and highlights that term)
- Example or analogy (if present)

**Search:**
- Search bar at top with live filtering as user types
- Matches against term name, definition, and example fields

**Flashcard mode:**
- Toggle to switch from browse view to flashcard view
- Shows term name → user mentally recalls → click to reveal definition
- "Got it" / "Still learning" buttons per card
- Shuffle button
- Filter to show only "Still learning" cards
- Counter: "X / Y mastered"

**Bookmarking:**
- Toggle star/bookmark on any term
- Filter to show only bookmarked terms ("Review Later" list)

---

#### Study Progress Overlay
Accessible via button in the header, shows:
- **Concept Map:** X of Y concepts clicked/explored
- **Quiz:** Score (X / Y correct), questions attempted vs. total
- **Glossary:** Terms viewed vs. total, terms mastered in flashcard mode
- Quick-jump buttons to go to each panel

---

### 3. Design Requirements

**Visual design:**
- Clean, modern, distraction-free interface
- Consistent color scheme derived from the chapter color palette
- Readable typography (system font stack, appropriate sizing)
- Adequate whitespace and padding
- Smooth transitions between panels

**Dark mode:**
- Toggle in header
- All panels, overlays, and interactive elements must respect the mode
- Store preference in a JS variable (no localStorage)

**Responsiveness:**
- Works on desktop and tablet widths
- Concept map should be scrollable/zoomable on smaller screens
- Quiz and glossary panels should stack cleanly on narrow viewports

**Technical:**
- Single self-contained HTML file (all CSS and JS inline)
- External libraries loaded from CDN only (e.g., https://cdnjs.cloudflare.com)
- No build tools, frameworks, or npm packages required
- Must open and function in any modern browser (Chrome, Firefox, Safari, Edge)
- All data embedded directly in the HTML as JavaScript objects

### 4. Output
Save the completed HTML file. Confirm:
- Total concepts, relationships, quiz questions, and glossary terms included
- Any data issues found and fixed during validation
- Present the HTML file for download and preview
```
