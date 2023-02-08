---
title: "Creating A Docs As Code Pipeline"
date: 2023-01-20T16:58:09+08:00
publishdate: 2023-02-08T13:00:09+08:00
tags: ['docs-as-code']
comments: true
draft: false

---

Have you thought about managing docs as code?

Before you publish written content, you wanna check spelling, lint markdown, improve prose, and fix broken links. The idea of docs-as-code is to version control, build, test, and deploy your documentation using pull requests, continuous integration and continuous deployment. The value is you can make reading and writing easier and more fun though standardising language, formatting and style.

Inspired by the practical how tos on [docslikecode.com](https://www.docslikecode.com/), I decided to get hands on keyboard and explore it myself.

I had a conversation with chatgpt on this. The back and forth enabled a few thought iterations. What came out was the simplest thing that could possibly work.

This approach uses a builder image specialised for your docs-as-code workflow. You can pre-install and configure your docs-as-code tools in the image. Finally, use them in synergy in a build pipeline for catching typos, standardising format, improving prose, and catching broken links.

Here's the write up... [How To Create A Docs As Code Build Pipeline](../../how-to/create-a-docs-as-code-build-pipeline/)

Its super easy to get started. Consider investing in docs as code as a part of your software product strategy. It might be the difference between a good and bad developer experience!
