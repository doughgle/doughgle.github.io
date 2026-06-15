# What Is eBPF? — Explainer Specification

## Audience

**Who:** Frankie — senior devsecops EM, multi-cloud K8s, exploring AI agent engineering.

**Why he cares:** He thinks about leverage — amplifying his team's output and the people he influences. He balances strategic architecture with grounded first steps. Time, cost, quality are his framing.

**What he needs:** Enough understanding to decide where eBPF fits, explain it to his team, and take a first step.

---

## Length & Depth

~2000 words. Moderate technical depth:

- Cover: hooks, verifier (safety), programs + maps
- Do NOT cover: BTF, CO-RE, tail calls, helper API details, JIT internals
- Exclude: kernel module comparison deep-dive, eBPF for Windows, step-by-step coding tutorials

---

## Constraints

Full natural vocabulary (no UpGoer5). Peer-to-peer tone — no oversimplification, no hype.

---

## Structure

### In the large

The whole article follows **What? → So What? → Now What?**

### In the small

Each section follows **What? → So What? → Now What?** internally (implicit structural guide — section headers are pronounceable, poetic, memorable, not "What? / So What? / Now What?" labels).

### Blueprint

**Lede** (~250 words, no heading)
- Distilled What/So What/Now What of the entire article
- Opens with the AI agent observability challenge as a hook
- Closes with: eBPF is the answer worth understanding

**Section 2 — "What Is eBPF?"** (deeper than lede)
- WHAT: Kernel role — the program between hardware and apps. eBPF defined as small, safe programs running inside the kernel.
- SO WHAT: Programmability without risk. The verifier proves safety before execution — not confidence, proof.
  - Optional concrete illustration: mention Meta's Katran (3x throughput, 7x less CPU vs IPVS) as "this is what eBPF enables."
- NOW WHAT: Key concepts to carry forward:
  - Hooks — tracepoints, kprobes, XDP. Doors into kernel events.
  - Verifier — proves termination, memory safety, no kernel crashes.
  - Programs + Maps — kernel-side logic, user-side data sharing.

**Section 3 — "Snooping Executions with execsnoop"** (bridges concepts → practice)
- Introduces `execsnoop` from BCC as a concrete eBPF program Frankie could run today.
- Include a system architecture diagram:
  - User space: bcc Python tool
  - Maps: event ring buffer (shared data structure)
  - Kernel: eBPF program attached to `tracepoint:syscalls:sys_enter_execve` hook
- Walk through the flow: hook fires → eBPF reads PID + command name → writes to map → user space polls and prints
- Annotate where each concept (hook, verifier, program, map) lives in the architecture
- Conclude: this is the pattern — small verified program, zero app changes, instant answer

**Section 4 — "The Observability Difference"** (quantified value)
- WHAT: Observability defined — ask hard questions without shipping new code.
- SO WHAT — Linux infra observability (before vs after):
  - Writer chooses exactly **2 case studies** from the story pool below to illustrate the use case.
  - Focus: what did they gain in time/cost/quality terms?
  - Story pool (all foundation-backed with official source links):
    - **Netflix (noisy neighbor)** — P99 run queue latency: 83us baseline vs 131ms spike. eBPF overhead <600ns per hook. Source: netflixtechblog.com/noisy-neighbor-detection-with-ebpf-64b1f4b3bbdd
    - **Seznam.cz (Cilium L4LB)** — 72x less CPU than IPVS, doubled throughput. CNCF case study. Source: cncf.io/case-studies/seznam/
    - **OVHcloud (Cilium/Hubble)** — Cilium/eBPF for managed K8s at scale (44 data centers). CNCF case study Feb 2026. Source: cncf.io/case-studies/ovhcloud/
    - **Rakuten Mobile (Sauron eBPF)** — eBPF + AI agents for 5G anomaly detection. Reduced MTTD/MTTR. Linux Foundation case study. Source: linuxfoundation.org/hubfs/eBPF/eBPF%20Rakuten%20Case%20Study.pdf
    - **Meta (Strobelight)** — 20% CPU reduction, 15K servers saved. eBPF Foundation case study. Source: ebpf.foundation/case-study-metas-strobelight-leverages-ebpf-to-reduce-cpu-cycles-and-server-demands-by-up-to-20/
    - **LinkedIn (Skyfall)** — 70% Kafka log reduction, 100% flow coverage. Linux Foundation eBPF In Production report (Feb 2026).
    - **groundcover (AI agent mode)** — Full-stack eBPF observability with AI agent mode for autonomous troubleshooting, token tracking, hallucination detection. Source: youtube.com/watch?v=hW1DATUf6wM
- SO WHAT — AI agent observability (climax):
  - Three specific problems eBPF solves:
    1. Shifting behavior — agents change paths each run, static instrumentation can't keep up
    2. Cross-boundary — agents span files, APIs, databases, processes in one workflow
    3. Speed — agents complete tasks in seconds; observability must not slow them
  - Reference AgentSight (github.com/eunomia-bpf/agentsight) as a concrete example of eBPF-based AI agent tracing with <3% overhead
- NOW WHAT: Pattern — one host-level program sees everything. No per-pod sidecars, no per-app instrumentation, no code changes.

**Section 5 — "Starting Today"** (actionable)
- WHAT: Three tools Frankie's team can use now.
- SO WHAT: What each unlocks:
  - **Cilium** — K8s networking + security + Hubble observability. Chosen by Google Cloud for their managed K8s.
  - **BCC (BPF Compiler Collection)** — Ready-made tracing tools: `execsnoop`, `tcplife`, `tcpconnect`, `biolatency`, and 100+ more. github.com/iovisor/bcc
  - **bpftrace** — "The awk of eBPF." High-level scripting for ad-hoc investigation, one-liner commands. github.com/bpftrace/bpftrace
- NOW WHAT: Start here:
  - BCC tutorial: github.com/iovisor/bcc/blob/master/docs/tutorial.md
  - bpftrace intro: bpftrace.org/hol/intro

**Section 6 — "A Bigger Picture"** (closing, deeper than lede)
- Kernel as programmable substrate — not a fixed black box
- Alexei Starovoitov: from ~100 kernel contributors to 100,000+ BPF program authors
- Return to the AI agent observability challenge as payoff: eBPF enables trust in autonomous systems by watching from underneath, not instrumenting from inside
- Closing call: Frankie's teams can start today without changing a single app

---

## Study Sources (for the writer)

The writer must study these before drafting:

| Source | Purpose |
|---|---|
| `resources/` directory (documentary CSV, highlights, summary, quotes) | Context and trusted opinions |
| brendangregg.com/ebpf.html | Authoritative reference |
| github.com/iovisor/bcc | Tool for execsnoop section |
| github.com/iovisor/bcc/blob/master/docs/tutorial.md | BCC tutorial reference |
| github.com/bpftrace/bpftrace | Tool for Starting Today section |
| bpftrace.org/hol/intro | bpftrace intro reference |

**Case study sources** (consult to select the 2 for Section 4):

| Company | Source URL |
|---|---|
| Netflix (noisy neighbor) | netflixtechblog.com/noisy-neighbor-detection-with-ebpf-64b1f4b3bbdd |
| Seznam.cz (Cilium L4LB) | cncf.io/case-studies/seznam/ |
| OVHcloud (Cilium/Hubble) | cncf.io/case-studies/ovhcloud/ |
| Rakuten Mobile (Sauron eBPF) | linuxfoundation.org/hubfs/eBPF/eBPF%20Rakuten%20Case%20Study.pdf |
| Meta (Strobelight) | ebpf.foundation/case-study-metas-strobelight-leverages-ebpf-to-reduce-cpu-cycles-and-server-demands-by-up-to-20/ |
| LinkedIn (Skyfall) | Linux Foundation "eBPF In Production" report (Feb 2026) |
| groundcover (AI agent mode) | youtube.com/watch?v=hW1DATUf6wM |
| AgentSight (bonus reference) | github.com/eunomia-bpf/agentsight |
