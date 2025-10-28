---
title: "Introducing Outline Eclipsed Vscode Extension"
date: 2025-10-28T21:50:20+08:00
publishdate: 2025-10-28T22:45:20+08:00
tags: [vscode, extension,  reorder, drag-drop, markdown, navigation, reorder, tree-view]
comments: true
draft: false
---

Do you write in markdown? Do you use vscode? (but deep down you miss Eclipse)

What if you wanna re-order sections of your documents? Do you cut-paste sections? Or Alt + Up/Down? Or Something else?

Perhaps you get AI to do that? You just prompt AI with an ordered list describing how you want the sections, wait for AI to "think", burn some non-renewables, squander some tokens. If you just wanna move some text, you may also decide that's too much waste.

If you remember Eclipse IDE, you probably remember the how it felt to reorganize code just by dragging and dropping elements in the Outline view. Kinda like the feeling when magnets snap an object into it's place.

---

## Introducing *Outline Eclipsed*

An outline view for VS Code that lets you drag and drop to reorganize your document structure.

🪐 A VS Code extension that provides an interactive outline tree view for markdown files. Inspired by the Eclipse IDE, Outline Eclipsed lets you reorder sections by dragging and dropping headings.

💡 Reorganizing long documents is tedious. Instead of cutting and pasting text blocks, just drag headings in the tree view. Nested sections move together automatically. The editor highlights and scrolls to show exactly what moved. You stay focused on structure, not on selecting text ranges.

⏩ Install from the VS Code Marketplace and open any markdown file. The "Outline Eclipsed" view appears in the Explorer sidebar. Click headings to navigate. Drag them to reorganize.

### Demo

![demo](https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/afa8a690-2e99-4f3f-8091-0471213bb984.gif?ClientID=sulu&Date=1761467805&Signature=b3c03e96e6468db8e83b3227cc3748f051df2334)

### Features

- **Drag & Drop Reordering**: Drag headings to reorder sections. Nested headings move with their parent automatically.
- **Bidirectional Sync**: Click a heading to jump to that section. Move your cursor, and the tree highlights the current heading.
- **Visual Feedback**: After dragging, the editor auto-scrolls and highlights the moved section for 3 seconds.
- **Real-Time Updates**: The tree refreshes automatically as you edit the document.
- **Hierarchical View**: See your document structure at a glance with expandable/collapsible nested headings.

## Try It Out

Install "Outline Eclipsed" in the Extensions view (`Ctrl+Shift+X`).

```bash
ext install douglashellinger.outline-eclipsed
```

+ Marketplace: [douglashellinger.outline-eclipsed](https://marketplace.visualstudio.com/items?itemName=douglashellinger.outline-eclipsed)
+ Github Repo: [github.com/doughgle/outline-eclipsed](https://github.com/doughgle/outline-eclipsed)

### How to Use It

1. Open a markdown file
2. Find "Outline Eclipsed" in the Explorer sidebar
3. Click any heading to navigate to that section
4. Drag and drop headings to reorganize sections
5. Watch the editor highlight and scroll to show the moved content

That's it. No thinking. No energy. No AI tokens burned.

## Feed Back

It's my first vscode extension. I'd really appreciate your feedback.
Does it help you re-org markdown? Do you need this for other languages? Found a bug? Share in the comments or on [GitHub Issues](https://github.com/doughgle/outline-eclipsed).

#vscode #extension #productivity #reorder, #drag-drop, #markdown, #outline #navigation