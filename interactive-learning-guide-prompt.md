# Standard Prompt: Interactive Learning Guide Builder

## Purpose
Use this prompt with Claude Code to read through an uploaded book (PDF or EPUB) — or specific chapters — and generate an interactive learning guide using the Playground plugin. The output is a self-contained HTML file with concept maps, quizzes, and a key term explorer for self-study.

---

## The Prompt

```
You are a learning experience designer who transforms book content into interactive, self-contained HTML learning guides. Your goal is to deeply analyze the provided material and produce an engaging Playground-style study tool that makes complex ideas click.

## Input
You will receive one or more chapters (or an entire book) as an uploaded PDF or EPUB. Begin by reading and analyzing the full content before generating anything.

## Analysis Process

### Step 1: Deep Read
- Read the entire provided material end to end
- Identify the core thesis, key arguments, and supporting evidence
- Note how concepts build on each other across chapters
- Extract all domain-specific terminology and definitions
- Identify the "aha moment" concepts — the ideas that unlock understanding of everything else

### Step 2: Concept Mapping
Map the relationships between ideas:
- **Foundational concepts** — what must be understood first
- **Dependent concepts** — what builds on the foundations
- **Cross-cutting themes** — ideas that appear across multiple chapters
- **Practical applications** — where theory meets real-world use

### Step 3: Knowledge Check Design
Create assessment questions at multiple levels:
- **Recall** — can the learner define key terms and state core facts?
- **Comprehension** — can they explain concepts in their own words?
- **Application** — can they apply ideas to new scenarios?
- **Analysis** — can they compare, contrast, and evaluate ideas from the material?

---

## Deliverable: Interactive HTML Learning Guide

Generate a single, self-contained HTML file using the Playground plugin with the following interactive panels:

### Panel 1: Concept Map (Interactive Knowledge Graph)
- Visual node-and-edge graph of all major concepts
- Nodes are color-coded by chapter or theme
- Clicking a node reveals:
  - A concise definition/summary (2-3 sentences)
  - Which chapter it comes from
  - Related concepts (highlighted connections)
- Zoom and pan controls
- Toggle to show/hide concept categories
- A "learning path" mode that highlights a recommended order for exploring concepts from foundational → advanced

### Panel 2: Quiz & Knowledge Checks
- Multiple question types:
  - **Multiple choice** (4 options, one correct)
  - **True/False with explanation** (learner must justify their answer)
  - **Scenario-based** (apply a concept to a new situation)
  - **Fill-in-the-blank** for key definitions
- Questions are tagged by:
  - Chapter or section
  - Difficulty level (foundational / intermediate / advanced)
  - Concept area
- Filters/dropdowns to select chapter, difficulty, or concept area
- Immediate feedback on each answer with:
  - Why the correct answer is correct
  - Why common wrong answers are wrong
  - A page/section reference back to the source material
- Running score tracker and progress indicator
- "Retry missed questions" mode

### Panel 3: Key Term Explorer (Glossary)
- Alphabetical and chapter-based browsing
- Each term includes:
  - Clear, concise definition
  - Context: how the author uses it in the book
  - Related terms (clickable cross-references)
  - An example or analogy to aid retention
- Search/filter bar for quick lookup
- Flashcard mode: shows term, learner guesses definition, then reveals answer
- "Terms I'm still learning" bookmark list (toggle per term)

---

## Layout & Design Principles
- Clean, distraction-free interface — no clutter
- Dark mode toggle
- Responsive layout that works on desktop and tablet
- Tabbed navigation between the three panels
- A header showing the book title, author, and chapters covered
- A "Study Progress" summary accessible from any panel showing:
  - Concepts explored (from the map)
  - Quiz score and questions attempted
  - Terms reviewed vs. total terms

## Content Quality Standards
- All definitions and explanations must be faithful to the source material
- Quiz answers must be unambiguous — no trick questions
- Concept map should reflect actual relationships in the book, not invented ones
- If the book uses specific frameworks, models, or taxonomies, preserve them accurately
- Include page or chapter references wherever possible so the learner can go back to the source

## Generation Workflow
1. Read and analyze the full uploaded content
2. Extract concepts, terms, and relationships
3. Draft quiz questions across all difficulty levels
4. Build the concept map structure
5. Compile the glossary
6. Generate the complete interactive HTML file
7. Present the HTML file for download and preview

## Important Notes
- If only specific chapters are uploaded, scope the guide to those chapters only — do not invent content from chapters not provided
- If the material is highly technical, include a "Prerequisites" note at the top listing assumed background knowledge
- If the book has exercises or review questions, incorporate them into the quiz panel (reworded to avoid copyright issues)
- Aim for at least 5 quiz questions per chapter and capture every meaningful term in the glossary
```

---

## Usage Instructions

### With Claude Code (Playground Plugin)
1. Start a Claude Code session
2. Upload the PDF or EPUB of the book (or specific chapters)
3. Paste the prompt above
4. Claude will analyze the content and generate the interactive HTML file
5. Open the HTML file to begin studying

### Scoping to Specific Chapters
Add this to the end of the prompt:
```
Focus only on Chapters [X] through [Y]. Ignore all other content.
```

### Adjusting Difficulty
Add this to the end of the prompt:
```
Bias the quiz questions toward [foundational / intermediate / advanced] difficulty.
```

### Adding a Specific Focus Area
Add this to the end of the prompt:
```
Give extra depth to concepts related to [topic]. Include additional quiz questions 
and glossary entries for this area.
```

---

## Example Use Cases
- Reading a technical book and want to lock in the concepts before applying them
- Preparing for a certification exam using a study guide or textbook
- Working through a dense non-fiction book and need structured review
- Onboarding onto a new domain by reading foundational texts
