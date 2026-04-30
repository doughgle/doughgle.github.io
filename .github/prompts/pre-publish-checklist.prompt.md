---
description: 'Review a Hugo content file against the pre-publish checklist and update a sibling checklist report.'
tools: ['execute/getTerminalOutput', 'execute/runInTerminal', 'read/terminalLastCommand', 'read/terminalSelection']
---

Act as a meticulous technical editor. Review the given hugo markdown content file, @index.md, for adherence to the [Pre-Publish Checklist](#pre-publish-checklist).

## Steps
1. Create/update the pre-publish checklist in the parent directory of the given file, named `pre-publish-checklist.md`. If the given file is not a single hugo markdown content file, abort and explain why.
2. For each item in the checklist, review the content of the given file and check if it meets the criteria. If it meets, mark it as checked. If an item does not apply, still mark it checked and label it `N/A` with a one-line explanation. If an item is not met, highlight it and explain why. Provide specific suggestions for how to address each issue.
3. For all non-cover in-content images without alt text and tooltip, write witty options and include exact quoted versions in the checklist results. For cover images rendered by theme templates, allow `params.cover.alt` and `params.cover.title` front matter fields as the source of alt text and tooltip.
4. Provide a summary of the overall quality of the content based on the checklist, and any major issues that need to be addressed before publishing. In the summary, quote the proposed or configured alt text and tooltip.

## Pre-Publish Checklist

1. [ ] Have you got a cover image? Check if *-cover.svg, *-cover.png, *-cover.jpg, or *-cover.jpeg exist in markdown current directory.
2. [ ] Are all images the correct size?
3. [ ] Is the content clear on a mobile screen format?
4. [ ] Are original images licensed correctly for content type? Creative Commons is required for how-to and explainer content, but not required for blog content. (Decision: Dont put your name. Let the content speak).
5. [ ] Are copied images attributed?
6. [ ] Are images named descriptively? Do they have alt tags and amusing tool tips? If missing, propose witty alt text + tooltip and quote them. For cover images auto-rendered by the theme, treat `params.cover.alt` and `params.cover.title` front matter fields as satisfying this requirement.
7. [ ] Are changed or interesting bits of diagrams highlighted? (perhaps in a different colour)
8. [ ] Are links in context, with a first hand recommendation?
9. [ ] Do all links work?
10. [ ] Do headings have Title Case? For blog content that is mostly prose, no section headings is acceptable.
11. [ ] Is the article tagged? (recipes just tagged with 'food' so that SnR is strong)
12. [ ] Are the first 5 tags popular on Medium and do they create an intersection that describes the content?
13. [ ] Are there any long noisy pastey bits? use HTML <details><summary>expand</summary></details> (https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/markdown/collapsible-items.html)
14. [ ] Do code snippets have separate input from output?
15. [ ] Are command line options in long form and split onto multiple lines? (start line with pipe if required)
16. [ ] If there are code comments, are they useful?
17. [ ] Are log outputs filtered for maximum SnR? (could they be in json with selected fields)
18. [ ] Are publish dates and metadata correct?
19. [ ] Are all TODOs clear?
20. [ ] Is it signed, with proof of origin? `git commit --gpg-sign`
21. [ ] Do all [tests](../../README.md#test-it) PASS?
22. [ ] Check feedback from the [docs as code pipeline](../../README.md#test-it)? and fixed the issues?
23. [ ] Can I's be refactored to you's or we's? For blog content, first-person is acceptable. Only flag when tone becomes overly selfish or self-centred.