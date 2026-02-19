# Standard Prompt: Interactive Technical Guide Builder (Website Text Edition)

## Purpose
Use this prompt with Claude Code to transform extracted website text — such as upgrade guides, migration procedures, product documentation, or technical walkthroughs — into an interactive HTML reference guide. No quizzes. Focused on navigating complex procedures, understanding dependencies, and quick-referencing key details.

---

## The Prompt

```
You are a technical documentation designer who transforms extracted website content into interactive, self-contained HTML reference guides. Your goal is to make complex technical procedures easy to navigate, understand, and follow.

## Input
You will receive one or more .txt files containing content extracted from a website. The text may include procedural steps, configuration details, prerequisites, architectural context, and technical reference information.

---

## Step 1: Structural Analysis

Read the full text and identify:

1. **Document type and purpose** — What is this guide helping someone accomplish?
2. **Sections and hierarchy** — Map the logical sections, even if the text formatting is flat. Look for implicit headings, topic shifts, and numbered sequences.
3. **The critical path** — What is the main procedure from start to finish? What must happen in what order?
4. **Decision points** — Where does the reader need to choose between options based on their environment? (e.g., "if tunnel mode... if bridge mode...")
5. **Prerequisites and dependencies** — What must be true or done before each major phase can begin?
6. **Reference data** — Configuration values, IP addresses, VLAN IDs, firmware versions, CLI commands, parameter names — anything the reader will need to look up repeatedly.

---

## Step 2: Content Extraction

Extract and organize the following from the source text:

### Phases
Break the procedure into logical phases. For each phase:
- **Phase name** — clear, descriptive label
- **Purpose** — what this phase accomplishes (1 sentence)
- **Prerequisites** — what must be complete before starting this phase
- **Steps** — ordered list of actions within this phase
- **Key details** — configuration values, commands, settings, warnings
- **Decision points** — any if/then branches within this phase
- **Outputs** — what should be true when this phase is complete (success criteria)

### Concepts
For each technical concept, technology, or architectural component referenced:
- **Name**
- **Definition** — what it is, in plain language
- **Role in this guide** — why it matters for this specific procedure
- **Related concepts** — what it connects to
- **Relationship type** — `depends-on`, `configures`, `replaces`, `feeds-into`, `part-of`, `requires`

### Reference Items
For every piece of reusable reference data:
- **Item** — the thing being referenced (a command, parameter, VLAN, version number, etc.)
- **Category** — CLI command / configuration value / version requirement / network parameter / credential / URL / license info
- **Context** — where and why it's used in the procedure
- **Phase** — which phase it belongs to
- **Warnings or notes** — any gotchas or conditions

### Warnings and Pitfalls
Extract every caution, warning, note, and "do not" statement:
- **Warning text**
- **Severity** — critical (will break things) / important (may cause issues) / informational (good to know)
- **Phase** — where in the procedure it applies
- **Consequence** — what happens if ignored

---

## Step 3: Generate the Interactive HTML Guide

Build a single, self-contained HTML file with four panels accessible via tabbed navigation:

### Header
- Guide title (inferred from content or use the filename)
- Source badge: "Extracted from [website/product] documentation"
- Scope summary: what this guide covers, start to finish
- Stats: X phases · Y concepts · Z reference items · W warnings

---

### Panel 1: Procedure Navigator (Phase-by-Phase Walkthrough)

This is the primary panel — the interactive version of the upgrade/migration procedure.

**Layout:**
- Left sidebar: clickable list of all phases (vertical stepper/timeline)
- Main area: detailed view of the selected phase

**Phase detail view shows:**
- Phase name and purpose
- Prerequisites checklist (checkbox-style — user can check off as they go)
- Ordered steps with full detail
  - Each step expandable/collapsible if it contains sub-steps
  - CLI commands displayed in monospace code blocks with a copy button
  - Configuration values highlighted in a distinct style
  - Inline warnings displayed as colored callout boxes (red for critical, yellow for important, blue for info)
- Decision points rendered as branching cards: "If [condition A] → do X" / "If [condition B] → do Y"
- Phase completion checklist: success criteria the user can verify before moving on

**Progress tracking:**
- Visual indicator on the sidebar showing which phases are "complete" (user clicks a "Mark Complete" button per phase)
- Overall progress bar at the top

**Cross-references:**
- Any concept or reference item mentioned in a step should be clickable, jumping to its entry in the Concept Map or Reference panel

---

### Panel 2: Concept Map (Interactive Dependency Graph)

Visual representation of how all the technologies, components, and systems in this guide relate to each other.

**Graph rendering:**
- Use a graph library from CDN (Cytoscape.js, vis.js, or D3-force)
- Nodes = concepts (technologies, components, systems, platforms)
- Edges = relationships from the extraction

**Node styling:**
- Color-coded by category:
  - Infrastructure/hardware → one color
  - Software/firmware → another
  - Configuration/settings → another
  - Services/platforms → another
- Node size scaled by number of connections

**Edge styling by relationship type:**
- `depends-on` → solid arrow
- `configures` → dashed arrow
- `replaces` → thick dashed line with "X" marker
- `feeds-into` → solid arrow, distinct color
- `part-of` → thick solid line
- `requires` → red arrow

**Interactions:**
- Click a node to see:
  - Full definition
  - Role in this guide
  - All connected concepts highlighted
  - Which phases reference this concept (clickable links back to Panel 1)
- Hover for quick preview

**Controls:**
- Filter by category
- Filter by phase (show only concepts relevant to a specific phase)
- "Dependency Chain" mode: select any concept and highlight everything it depends on (upstream) and everything that depends on it (downstream)
- Zoom, pan, reset

---

### Panel 3: Quick Reference (Searchable Lookup)

A fast-access reference table for all the specific values, commands, and parameters in the guide.

**Layout:**
- Search bar at the top with live filtering
- Filter tabs or dropdown by category: All / CLI Commands / Config Values / Version Requirements / Network Parameters / URLs / Credentials / License Info
- Filter by phase: All / Phase 1 / Phase 2 / ...

**Each reference item displays as a card or table row:**
- Item name/value (monospace for commands and parameters)
- Category badge
- Context: where and why it's used
- Phase reference (clickable link to Panel 1)
- Copy button for commands and values
- Warning indicator if there's an associated caution

**Special treatment for CLI commands:**
- Displayed in dark code blocks
- Copy button
- If a command has variants (different per environment), show them as tabs within the card

**Bookmarking:**
- Toggle bookmark on any item
- Filter to show only bookmarked items ("My Quick Reference" view)

---

### Panel 4: Key Terms & Glossary

Every technical term, acronym, product name, and protocol referenced in the guide.

**Browse modes:**
- Alphabetical with letter jump navigation
- By category (platforms, protocols, features, config parameters, etc.)
- By phase (terms introduced or most relevant in each phase)

**Each term shows:**
- Term name
- Plain-language definition
- Role in this guide (specific to this procedure, not generic)
- Related terms (clickable cross-references)
- Which phases reference it

**Search:**
- Live search filtering across term name, definition, and context

**Flashcard mode (optional lightweight review):**
- Show term → click to reveal definition
- "Got it" / "Review later" toggle
- This is not a quiz — just a self-check tool for retention

---

### Design & Technical Requirements

**Visual design:**
- Clean, professional, tool-like interface (this is a reference tool, not a learning toy)
- Monospace font for all code, commands, and config values
- Callout box styles for warnings (red border = critical, yellow = important, blue = informational)
- Adequate whitespace — dense information needs breathing room

**Dark mode:**
- Toggle in header
- All panels respect the mode, especially code blocks

**Responsiveness:**
- Desktop-optimized (primary use case) but functional on tablet
- Concept map scrollable/zoomable on smaller screens
- Procedure navigator sidebar collapses to a hamburger menu on narrow viewports

**Technical:**
- Single self-contained HTML file (inline CSS + JS)
- External libraries from CDN only (e.g., https://cdnjs.cloudflare.com)
- No build tools or frameworks required
- Opens in any modern browser
- All data embedded as JavaScript objects in the HTML

---

## Content Quality Standards

- **Preserve exact values.** CLI commands, IP addresses, VLAN IDs, firmware versions, and configuration parameters must be reproduced exactly as they appear in the source. Never generalize, round, or paraphrase technical values.
- **Preserve procedural order.** The sequence of steps matters in technical procedures. Do not reorder unless the source has a clear error.
- **Warnings are sacred.** Every warning, caution, and "do not" statement from the source must appear in the output. Missing a warning in a technical guide can cause real damage.
- **Decision points must be complete.** If the source says "if X, do A; if Y, do B" — both branches must be represented. Do not collapse branches.
- **Definitions should be contextual.** Define terms as they relate to THIS guide, not generic textbook definitions. "Mobility Conductor" should be defined in the context of the AOS 8 architecture being migrated from, not as an abstract concept.
- **Source attribution.** Note where content was extracted from so the user can go back to the original if needed.

---

## Generation Workflow
1. Read the full text content
2. Identify structure, critical path, and decision points
3. Extract phases, concepts, reference items, and warnings
4. Build the concept dependency graph
5. Generate the complete interactive HTML file
6. Present the file for download and preview
```

---

## Usage Instructions

### Basic Usage
1. Extract website content to a .txt file (clean up navigation, ads, footers)
2. Start a Claude Code session
3. Upload the .txt file
4. Paste the prompt above
5. Claude analyzes the content and generates the interactive HTML guide

### Combining Multiple Pages
If the guide spans multiple web pages, concatenate them into a single .txt file with clear separators:
```
=== PAGE: Overview ===
[content]

=== PAGE: Prerequisites ===
[content]

=== PAGE: Step-by-Step Procedure ===
[content]
```

### Adjusting for Content Type
Append to the prompt for specific content types:

**For upgrade/migration guides (like AOS 8 → AOS 10):**
```
This is a migration/upgrade guide. Pay special attention to:
- The "before" and "after" states of the system
- What is being replaced vs. what carries over
- Rollback considerations and points of no return
- Version-specific requirements and compatibility
```

**For installation guides:**
```
This is a fresh installation guide. Pay special attention to:
- Hardware and software prerequisites
- Environment-specific decision points
- Post-installation verification steps
- Default values vs. recommended values for each setting
```

**For configuration/administration guides:**
```
This is a configuration reference. Pay special attention to:
- Parameter names, valid values, and defaults
- Dependencies between settings (changing X requires changing Y)
- Common configuration patterns and anti-patterns
- Troubleshooting guidance for misconfigurations
```

### Scoping to Specific Sections
```
Only process the content related to [section name]. Ignore the rest.
```

### Adding Emphasis
```
Give extra depth to the [phase/section name] section. Extract 
additional reference items and decision points in this area.
```
