# Agent 0: Initialization Agent

> **Use this prompt in your first Claude Code session.**
> Upload the full book (PDF or EPUB) alongside this prompt.

---

```
You are the first agent in a multi-session learning guide pipeline. You have been given a complete book. Your job is to read ONLY the preface/introduction and Chapter 1, extract structured learning data, and create the foundational files that subsequent agents will build on.

IMPORTANT: Do NOT read beyond Chapter 1. You must stay within your assigned scope to keep the context window lean. Later agents will handle the remaining chapters.

## Your Tasks

### 1. Scan the Table of Contents
Before reading any content, locate the table of contents and record:
- Book title and author
- Total number of chapters
- All chapter titles and page numbers (if available)

This information is critical for the progress tracker and for future agents to know where their chapter starts and ends.

### 2. Read and Analyze (Preface/Introduction + Chapter 1 ONLY)
- Read the preface/introduction to understand the book's overall purpose, audience, and structure
- Read Chapter 1 thoroughly
- Identify the author's core thesis and what the book promises to deliver
- Extract all key concepts, terms, and relationships from Chapter 1
- Stop reading after Chapter 1 ends

### 3. Create: progress.md

```markdown
# Learning Guide Progress Tracker

## Book Info
- **Title:** [Book Title]
- **Author:** [Author Name]
- **Total Chapters:** [number]
- **Book Purpose:** [1-2 sentence summary of what the book aims to teach]

## Chapter Index
[List ALL chapters with titles and page numbers from the table of contents]
1. Chapter 1: [Title] — Pages [X-Y]
2. Chapter 2: [Title] — Pages [X-Y]
3. Chapter 3: [Title] — Pages [X-Y]
...

## Processing Status
- [x] Preface/Introduction
- [x] Chapter 1: [Title]
- [ ] Chapter 2: [Title]
- [ ] Chapter 3: [Title]
...

## Processing Notes
- [Any notes for the next agent about themes to watch for, the author's writing style, structural patterns, etc.]
```

### 4. Create: summary.md

```markdown
# Running Summary: [Book Title]

## Book Overview
[2-3 paragraph summary of the book's purpose, audience, and approach based on the preface/introduction. Include the author's stated goals, who the book is for, and how it's organized.]

---

## Chapter 1: [Chapter Title]

### Key Ideas
- [Bullet list of the 3-7 most important ideas from this chapter]

### How It Connects
[Brief note on what this chapter sets up for the rest of the book]

### Critical Context for Later Chapters
[Anything a future agent MUST know to correctly process subsequent chapters — foundational definitions, frameworks introduced, assumptions the author makes, terminology conventions]
```

### 5. Create: learning-data.json

```json
{
  "book": {
    "title": "",
    "author": "",
    "totalChapters": 0,
    "purpose": ""
  },
  "chapters": [
    {
      "number": 1,
      "title": "",
      "summary": ""
    }
  ],
  "concepts": [
    {
      "id": "c1-001",
      "name": "",
      "chapter": 1,
      "definition": "",
      "importance": "foundational | supporting | advanced",
      "relatedConcepts": []
    }
  ],
  "relationships": [
    {
      "from": "c1-001",
      "to": "c1-002",
      "type": "builds-on | contrasts-with | example-of | part-of | enables",
      "description": ""
    }
  ],
  "quizQuestions": [
    {
      "id": "q1-001",
      "chapter": 1,
      "difficulty": "foundational | intermediate | advanced",
      "type": "multiple-choice | true-false | scenario | fill-blank",
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": 0,
      "explanation": "",
      "whyWrongAnswers": {
        "1": "",
        "2": "",
        "3": ""
      },
      "sourceReference": "Chapter 1, p. XX or section name",
      "relatedConcepts": ["c1-001"]
    }
  ],
  "glossaryTerms": [
    {
      "id": "t1-001",
      "term": "",
      "chapter": 1,
      "definition": "",
      "authorUsage": "",
      "relatedTerms": [],
      "example": ""
    }
  ]
}
```

### 6. Extraction Targets for Chapter 1
- **Concepts:** Every meaningful concept (typically 5-15 per chapter)
- **Relationships:** How concepts connect to each other within the chapter
- **Quiz questions:** At least 5, spread across difficulty levels
- **Glossary terms:** Every domain-specific or author-defined term

### 7. Before You Finish
Confirm:
- [ ] All three files are created and saved
- [ ] The chapter index in progress.md lists ALL chapters from the table of contents
- [ ] JSON is valid and well-structured
- [ ] You did NOT read beyond Chapter 1

State which chapter the next agent should process and any guidance for them.
```
