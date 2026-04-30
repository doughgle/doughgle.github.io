---
title: "Evaluating AI Agents Deeplearning.ai Course"
date: 2026-04-29T17:00:47+08:00
publishdate: 2026-04-29T17:00:47+08:00
tags: ['AI', 'Agents', 'Evaluation', 'Observability', 'O11y', 'Software Testing']
params:
  cover:
    alt: "A bootcamp instructor with a clipboard side-eyeing a robot AI agent mid obstacle course."
    title: "No push-ups required, but this AI agent still has to pass every eval station."
comments: true
draft: false
---

The need to engineer specialised Agents to be effective (best results) and efficient (least waste) is growing. AI inference costs will increase as they accelerate towards energy limits. Worth learning how to evaluate and improve systems built around LLMs. I'm starting from the beginning.

[Evaluating AI Agents](https://learn.deeplearning.ai/courses/evaluating-ai-agents/information) course on DeepLearning.ai from Arize AI helps you learn a systematic process to evaluate and improve AI agents. 

The course decomposes an Agent into Router, Tools/Skills, and Context/Memory Components.

It explains three techniques you can apply to evaluate agents:
1. Code-based evaluations: Apply existing software testing techniques to the components. ISTQB Standard Testing principles still apply! Works best for specific outputs exact, reproducible results.
2. LLM-as-a-Judge: Use a separate language model to classify outputs and label them. i.e. clear/unclear, relevant/irrelevant, usable/unusable. Works best for subjective analysis, open-ended, qualitative tasks.
3. Human feedback: Thumbs up/down, labels, in-context surveys, outputs or providing feedback.

Some things you can apply the techniques to evaluate:
+ Tool Call Decisions: Did the Router choose the correct tool given the Tool Definitions? Did it select the correct skill given the Skill Descriptions? Did it call the tool correctly with the expected inputs?
+ Behaviour: Did the model stay within System Prompt guidelines and behave consistently as expected?
+ Convergence: Did the agent choose a path corresponding to the baseline number of steps observed to execute a particular task?
+ Trajectory: How many different paths did the agent try before completing a particular task?

Probably a noob's understanding, but I found it reassuring that existing software testing techniques are applicable. And "evals" are just test cases. Tests that quantify results as a score, rather than a boolean pass/fail.

If you're learning about Agent evaluation and observability, I recommend the course. If you have any recommendations on the topic, I'd love to hear them.