---
name: upgoer5-explainer
description: Use when creating, evaluating, or refining UpGoer5 constraint-based explainers
  — explanations using only the ten hundred (1000) most common English words.
---

# UpGoer5 Explainer

## Overview

Write explanations using only the ten hundred (1000) most common English words (xkcd #1133). The `upgoer5-validator` CLI tool checks compliance against the canonical word list.

## Prerequisites

- Python >=3.10, pip, git
- `pip install git+https://github.com/doughgle/upgoer5-validator.git`
- Run `scripts/setup.sh` to automate installation

## Strategy: Preserve Meaning with Single-Quoting

The validator automatically exempts `'single-quoted'` terms. Use this to preserve domain vocabulary and proper nouns without losing meaning or color:

- **Domain concepts:** `'encryption'`, `'attribute'`, `'policy'`, `'Death Star'`
- **Proper nouns:** `'Luke Skywalker'`, `'Tatooine'`, `'Rebel Alliance'`
- **Abbreviations on first use:** `'ABE'` (Attribute Based Encryption), then use `'ABE'` thereafter

**Prefer single-quoting over rephrasing** for any term that carries domain-specific meaning. Only rephrase when the concept has a straightforward plain-English equivalent. This keeps the explainer accurate while maintaining compliance.

## Permitted Exceptions

These are automatically exempt (matching validator behavior):

- `'single-quoted'` terms — **preferred strategy for domain terms and proper nouns**
- Acronyms (explained on first use)
- Well-known proper nouns (Linux, Google, Kubernetes, etc.)
- Person/company/project names
- `Mr.`/`Ms.` + surname
- Content inside code blocks (<code>```</code>), inline code (`` ` ``), URLs, HTML tags

## Modes

### 1. Create

**Inputs** (clarify one at a time if missing):
- Topic
- Audience (who is the reader? context, role)
- Length (target word count; default ~1500)
- Sources (reference material; web-search if none given)

**Workflow:**
1. Clarify missing inputs one at a time
2. Research the topic
3. Draft the explainer in markdown
4. **Validate:** `upgoer5 check <file.md>` — this is required, not optional
5. **If FAIL:** fix each non-permitted word. Prefer single-quoting domain terms first (`'term'`); only rephrase when no domain meaning is lost.
6. **Re-validate immediately** after every fix. Do not batch changes without checking.
7. **Repeat 5-6 until PASS.** No shortcuts — every output must pass the validator.
8. Output final explainer

**CRITICAL:** DO NOT skip the validator. DO NOT deliver output that has not passed `upgoer5 check`. Writing simpler language by hand is not sufficient — only the validator confirms compliance.

### 2. Evaluate

**Input:** Path to an explainer markdown file

**Workflow:**
1. Run `upgoer5 check <file.md>`
2. Report: PASS or FAIL, total words, permitted count, non-permitted words + locations
3. No qualitative scoring

### 3. Refine

**Input:** Path to a draft explainer, optional edit instructions

**Workflow:**
1. Run Evaluate to establish baseline
2. For each non-permitted word, rephrase the sentence or single-quote exempt it
3. Re-run `upgoer5 check` after each fix
4. Incorporate user edit instructions during fixes
5. Iterate until PASS, then output corrected explainer + evaluation summary

### Iteration Rule (Create + Refine)

```
loop:
  result = upgoer5 check <file>
  if result == PASS: break
  for each violation in result:
    if term is a domain concept or proper noun:
      single-quote it ('term') to preserve meaning
    else:
      rephrase the sentence with simpler words
  save file
```

No maximum iteration limit; continue until PASS.

**Red flags — STOP and run the validator:**
- "I'll write it simply enough that it should pass" — the validator is the only authority
- "I'll fix everything and check at the end" — check after each change
- "The meaning is clear enough" — single-quote to preserve meaning while passing
- "It's mostly compliant" — a FAIL is a FAIL; keep iterating

## Clarifying Questions (Create Mode)

Ask one at a time, only if input isn't already provided:

1. **Topic:** "What should the UpGoer5 explainer be about?"
2. **Audience:** "Who is this for? What's their role and context?"
3. **Length:** "Target word count? (default ~1500)"
4. **Sources:** "Any reference material to study, or should I search the web?"
