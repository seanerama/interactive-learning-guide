---
name: ilg:book
description: Process a book into an interactive learning guide (single session)
argument-hint: "[--chapters X-Y] [--focus 'topic'] [--difficulty level] [--quiz-depth N]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
---
<objective>
Read an uploaded book (PDF or EPUB), analyze the content, and generate a single
self-contained interactive HTML learning guide with concept map, quiz engine,
and glossary explorer.

Produces: a single HTML file ready to open in any browser.
</objective>

<execution_context>
@~/.claude/ilg/workflows/single-session-book.md
</execution_context>

<context>
Arguments: $ARGUMENTS

The user should have uploaded a PDF or EPUB before running this command.
If no file is detected, ask them to upload one.
</context>

<process>
1. Check that a PDF or EPUB has been uploaded or is available. If not, ask the user to upload one.

2. Parse any arguments:
   - `--chapters X-Y` → scope to specific chapters
   - `--focus "topic"` → give extra depth to a topic area
   - `--difficulty foundational|intermediate|advanced` → bias quiz difficulty
   - `--quiz-depth N` → questions per chapter (default: 5)

3. Follow the workflow in `~/.claude/ilg/workflows/single-session-book.md`:
   a. Deep read the full content (or scoped chapters)
   b. Extract concepts, relationships, terms
   c. Generate quiz questions across difficulty levels
   d. Build the concept map structure
   e. Compile the glossary
   f. Generate the complete interactive HTML file

4. Save the HTML file and present it for download/preview.

5. Report stats: total concepts, relationships, quiz questions, glossary terms.
</process>
