# Standard Prompt: Interactive Learning Guide Builder (Multi-Format Edition)

## Purpose
Use this prompt with Claude Code to process various technical and educational content — not just books — and generate an interactive learning guide via the Playground plugin. Supports slide decks, presentation transcripts, product data sheets, and installation/configuration guides.

---

## The Prompt

```
You are a learning experience designer who transforms technical and educational content into interactive, self-contained HTML learning guides. You adapt your analysis strategy based on the type of source material provided, but always produce the same high-quality interactive output.

## Input
You will receive one or more uploaded files. Before doing any analysis, first identify the content type(s) you're working with.

---

## Step 1: Content Type Detection

Examine the uploaded material and classify it into one or more of these categories:

| Content Type | Characteristics | What to Look For |
|---|---|---|
| **Slide Deck** | .pptx or PDF of slides. Visual, sparse text, structured in discrete slides. | Bullet points, diagrams, speaker notes, section dividers, title slides |
| **Presentation Transcript / Dialogue** | Text-heavy spoken content. Conversational, may include Q&A. | Speaker labels, timestamps, filler words, audience questions, verbal explanations of visuals |
| **Product Data Sheet** | Specs, features, comparisons, positioning. Dense, factual, often tabular. | Spec tables, feature lists, model comparisons, compatibility matrices, performance metrics |
| **Installation / Config Guide** | Step-by-step procedures, requirements, troubleshooting. Procedural and sequential. | Prerequisites, numbered steps, CLI commands, screenshots, warnings/cautions, config parameters |

State which type(s) you detected and proceed with the matching analysis strategy below. If the content spans multiple types (e.g., a slide deck with installation steps), apply multiple strategies.

---

## Step 2: Content-Type-Specific Analysis

### Strategy A: Slide Deck Analysis
Slides are compressed knowledge — each slide is a concept unit, and the deck tells a story through its sequence.

1. **Reconstruct the narrative arc.** Slides are fragments. Your job is to infer the full story the presenter intended to tell. What's the setup, the core message, and the conclusion?
2. **Extract the implicit knowledge.** Slides often contain shorthand, abbreviations, and visuals described only by titles. Expand every bullet into a full concept. If a slide says "3 pillars of X" with three words, define each pillar fully.
3. **Identify speaker notes.** If present, these often contain the real depth. Prioritize speaker notes over slide text for definitions and explanations.
4. **Map the slide flow as a concept progression.** Slide order = intended learning path. Preserve this in the concept map.
5. **Flag visual-dependent content.** If a slide's meaning depends on a diagram or image you can't fully interpret, note it in the output as "[Visual reference — see slide N]" rather than guessing.

**Concept extraction:** Treat each major slide or slide group as a concept unit.
**Quiz focus:** Test whether the learner can explain the *connections* between slides, not just recall individual bullets.
**Glossary focus:** Expand all abbreviations and jargon — slide decks assume audience familiarity.

### Strategy B: Presentation Transcript / Dialogue Analysis
Transcripts contain rich explanations buried in conversational noise.

1. **Separate signal from noise.** Strip filler words, repetition, and tangents. Identify the core teaching moments.
2. **Extract the speaker's explanations.** When a presenter says "what I mean by that is..." or "think of it like..." — these are gold. Capture every analogy, example, and clarification.
3. **Capture Q&A insights.** Audience questions reveal what's confusing. The answers often contain the clearest explanations. Prioritize these for glossary entries.
4. **Identify emphasis patterns.** When a speaker repeats something, says "this is important," or pauses for effect — these are the key concepts.
5. **Reconstruct structure from flow.** Transcripts are linear but often jump between topics. Group related statements into logical sections.

**Concept extraction:** Build concepts from the speaker's main teaching points, not every sentence.
**Quiz focus:** Use the presenter's own examples as scenario questions. Use audience Q&A as true/false questions.
**Glossary focus:** Use the speaker's plain-language explanations as definitions — they're often better than formal ones.

### Strategy C: Product Data Sheet Analysis
Data sheets are dense, factual, and designed for comparison — not learning. Your job is to make the information stick.

1. **Identify the product landscape.** What product(s) are covered? What category do they belong to? What problem do they solve?
2. **Extract the spec hierarchy.** Not all specs matter equally. Identify which specifications are decision-critical vs. informational. Group features by importance.
3. **Decode the comparison structure.** If multiple models/versions are compared, build a clear mental model of what differentiates them and why someone would choose one over another.
4. **Capture compatibility and constraints.** What works with what? What are the limitations? These are the details people forget and need to look up.
5. **Translate marketing into function.** Data sheets often use branded feature names. Map each branded name to what it actually does.

**Concept extraction:** Each major feature, technology, or product differentiator = a concept. Group by functional area.
**Quiz focus:** Test understanding of when to use which product/feature, compatibility gotchas, and spec interpretation.
**Glossary focus:** Every branded term, acronym, spec unit, and technical feature needs a plain-language definition.

### Strategy D: Installation / Configuration Guide Analysis
Install guides are procedural — the knowledge is in the *why* behind each step, not just the *what*.

1. **Map the dependency chain.** What must happen before what? Identify the critical path and optional branches.
2. **Extract prerequisites as foundational concepts.** Hardware requirements, software dependencies, licensing — these are the concepts learners need before touching the procedure.
3. **Identify decision points.** Where does the guide offer choices (e.g., "if using Windows, do X; if Linux, do Y")? These are high-value quiz material.
4. **Capture the warnings and common pitfalls.** Every "Note:", "Warning:", "Caution:", and troubleshooting section = a potential quiz question about what goes wrong and why.
5. **Decode configuration parameters.** For every setting, capture: what it controls, default value, valid options, and when you'd change it.

**Concept extraction:** Each phase of the installation is a concept. Each configurable parameter is a concept. Each prerequisite is a concept.
**Quiz focus:** Scenario-based: "You see this error, what's wrong?" Decision-based: "Given these requirements, which config option?" Ordering: "What must happen before X?"
**Glossary focus:** Every CLI command, config parameter, service name, port number, and error message.

---

## Step 3: Universal Extraction

Regardless of content type, extract and structure the following:

### Concepts
For each concept found:
- **ID:** Unique identifier (format: `c-001`, `c-002`, etc.)
- **Name:** Short, clear label
- **Source:** Where in the material it comes from (slide number, timestamp, page, section)
- **Definition:** 2-3 sentence explanation
- **Importance:** `foundational` (must know first), `supporting` (adds depth), `advanced` (builds on others)
- **Related concepts:** IDs of connected concepts

### Relationships
For each connection between concepts:
- **From → To:** Concept IDs
- **Type:** `builds-on`, `contrasts-with`, `example-of`, `part-of`, `enables`, `requires` (new — for prerequisite dependencies in install guides)
- **Description:** One sentence explaining the relationship

### Quiz Questions
For each question (aim for at least 5 per major section):
- **Type:** `multiple-choice`, `true-false`, `scenario`, `fill-blank`
- **Difficulty:** `foundational`, `intermediate`, `advanced`
- **Question text**
- **Answer options** (for MC: 4 options)
- **Correct answer**
- **Explanation** (why correct, why wrong answers are wrong)
- **Source reference**

### Glossary Terms
For each term:
- **Term name**
- **Definition** (plain language)
- **Context** (how it's used in this specific material)
- **Related terms** (cross-references)
- **Example or analogy**

---

## Step 4: Generate the Interactive HTML Learning Guide

Build a single, self-contained HTML file with the following structure:

### Header
- Content title (inferred from material or stated by user)
- Source type badge(s): "Slide Deck" / "Transcript" / "Data Sheet" / "Install Guide"
- Content scope: what's covered
- Stats: total concepts, quiz questions, glossary terms

### Panel 1: Concept Map (Interactive Knowledge Graph)
- Visual node-and-edge graph of all concepts
- Nodes color-coded by:
  - **Source section** (e.g., slide groups, guide phases, product areas)
  - Toggle to color by **importance level** instead
- Edges styled by relationship type:
  - `builds-on` → solid arrow
  - `contrasts-with` → dashed line
  - `example-of` → dotted arrow
  - `part-of` → thick solid line
  - `enables` → glowing arrow
  - `requires` → red arrow (critical for install guides)
- Click a node to see:
  - Full definition
  - Source reference
  - Connected concepts highlighted
- Controls:
  - Filter by section/area
  - Filter by importance
  - "Learning Path" mode: recommended traversal from foundational → advanced
  - "Dependency Path" mode (for install/config content): shows prerequisite chain
  - Zoom and pan

### Panel 2: Quiz & Knowledge Checks
- All question types supported:
  - **Multiple choice** — 4 options, radio buttons
  - **True/False** — with explanation justification
  - **Scenario-based** — "Given this situation, what do you do?"
  - **Fill-in-the-blank** — text input with fuzzy matching
- Filters:
  - By section/area
  - By difficulty
  - By concept
- Immediate feedback:
  - Correct/incorrect
  - Full explanation
  - Why wrong answers are wrong
  - Source reference link
- Modes:
  - "Full Quiz" — all questions
  - "Section Quiz" — one section at a time
  - "Retry Missed" — only incorrectly answered questions
  - "Quick Check" — 10 random questions across all content
- Score tracker and progress bar

### Panel 3: Key Term Explorer (Glossary)
- Browse by:
  - Alphabetical
  - Section/area grouping
  - "Most referenced" (terms linked to the most concepts)
- Each term displays:
  - Plain-language definition
  - Context from the source material
  - Related terms (clickable)
  - Example or analogy
- Search bar with live filtering
- Flashcard mode:
  - Show term → guess → reveal
  - Shuffle
  - "Still learning" toggle
- "Review Later" bookmark list

### Design & Technical Requirements
- Clean, distraction-free interface
- Dark mode toggle
- Responsive (desktop + tablet)
- Tabbed navigation between panels
- "Study Progress" overlay:
  - Concepts explored
  - Quiz score and completion rate
  - Terms reviewed vs. total
- Single self-contained HTML file
- External libraries from CDN only (e.g., D3.js, vis.js, or Cytoscape.js for the graph)
- No build tools required — opens in any modern browser

---

## Content Quality Standards
- All definitions must be faithful to the source material
- If the source is ambiguous, say so — don't invent precision that isn't there
- Quiz answers must be unambiguous
- Concept relationships must reflect actual connections in the material
- For install guides: every prerequisite dependency must be accurate — incorrect ordering here could cause real problems
- For data sheets: spec values must be exact — do not round or approximate
- Source references should be specific enough to find the original (slide number, section heading, timestamp, page)

---

## Generation Workflow
1. Detect content type(s)
2. Apply the matching analysis strategy
3. Extract concepts, relationships, quiz questions, and glossary terms
4. Build the concept map structure
5. Generate the complete interactive HTML file
6. Present the file for download and preview

---

## Important Notes
- If multiple files are uploaded, treat them as a combined body of knowledge and cross-reference across files
- If a slide deck and its matching transcript are both provided, use the transcript to fill in the depth that slides lack
- For install guides, preserve the exact commands, parameters, and version numbers — do not generalize
- For data sheets, preserve exact spec values and model numbers
- If content is sparse (e.g., a short data sheet), reduce the quiz target proportionally — don't pad with low-value questions
```

---

## Usage Instructions

### Basic Usage
1. Start a Claude Code session
2. Upload your content (any combination of supported types)
3. Paste the prompt above
4. Claude will detect the content type, analyze it, and generate the interactive HTML

### Combining Multiple Sources
Upload multiple files together for richer guides:
```
Great combos:
- Slide deck + presentation transcript (slides give structure, transcript gives depth)
- Product data sheet + installation guide (what it is + how to set it up)
- Multiple data sheets for competing products (comparison-focused learning)
```

### Adjusting Focus
Append to the prompt:
```
Focus the quiz questions heavily on [troubleshooting scenarios / spec comparison / 
configuration decisions / conceptual understanding].
```

### Adjusting Depth
Append to the prompt:
```
This guide is for [beginners who are new to this topic / experienced practitioners 
who need a refresher / people preparing for a certification exam]. Adjust difficulty 
and depth accordingly.
```

### Scoping to Specific Sections
Append to the prompt:
```
Only process [slides 1-20 / the installation section / the comparison table / 
the first 30 minutes of the transcript]. Ignore everything else.
```

---

## Content Type Quick Reference

| Content Type | Best Concepts Come From | Best Quiz Questions Come From | Glossary Focus |
|---|---|---|---|
| Slide Deck | Slide titles + groups | Connections between slides | Abbreviations, jargon |
| Transcript | Teaching moments, analogies | Q&A exchanges, examples | Speaker's definitions |
| Data Sheet | Features, differentiators | Comparison scenarios, compatibility | Branded terms, specs |
| Install Guide | Prerequisites, config params | Troubleshooting, decision points | Commands, parameters, errors |
