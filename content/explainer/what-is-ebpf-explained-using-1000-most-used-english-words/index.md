---
`title`: "What Is `eBPF`? `eBPF` `Explained` `Using` 1000 `Most` `Used` `English` `Words`"
`date`: `2026`-`06`-`14``T``10`:`00`:`00`+`08`:`00`
`publishdate`: `2026`-`06`-`14``T``10`:`00`:`00`+`08`:`00`
`tags`: [`ebpf`, `linux`, `devsecops`, `observability`, `ai`]
`comments`: `true`
`draft`: `true`
---

'eBPF' 'makes' a big 'change' in how we see what is inside 'Linux' . Imagine a tiny, safe piece of work put right into the heart of the 'kernel' — the 'deepest' part of the 'computer' that 'controls' every single thing — and it can tell you, in real time, what is really 'happening' . No 'change' to 'running' 'code' . No 'restart' . Almost no 'cost' . For 'observability' of your 'Linux' 'infrastructure' and for 'observability' of 'AI' 'agents' that act on their own, 'eBPF' 'gives' you something no other 'approach' can: the full truth about what your 'computer' is actually 'doing' , seen from inside, without 'trusting' any 'application' to 'report' on 'itself' . And 'eBPF' is already in every new 'Linux' . The only question is how fast you start to 'use' it.

## What Is `eBPF`?

'eBPF' 'lets' you put small, safe 'pieces' of work deep inside the 'Linux' 'kernel' . The 'kernel' is the 'core' of every 'Linux' 'computer' . It 'decides' everything: how 'things' talk to each other, how 'memory' is 'used' , how work 'gets' done. Before 'eBPF' , if you 'wanted' the 'kernel' to do something new, you had to 'change' the 'kernel' 'itself' . That could take 'years' . Or you 'used' 'tools' that could only see a small part of what was 'going' on, from outside, at great 'cost' .

'eBPF' 'changed' all of that. You write a small piece of work. Before it 'runs' , a part of 'Linux' 'called' the 'verifier' 'checks' it to make sure it is safe. If it is not safe, it does not 'run' . End of story. This 'makes' 'eBPF' safe by 'design' — not safe by hope.

As 'Alexei' 'Starovoitov' said in the 'eBPF' 'documentary' : "If in the past the whole 'kernel' would be maybe a hundred 'programmers' across the world, now a hundred 'thousand' people in the world can 'program' the 'kernel' 'thanks' to 'BPF' ." ([`Unlocking` the `Kernel` `documentary`](https://youtu.be/Wb_vD3XZYOA?si=q4dbyWfPR_TDa5Ja))

### So What?

Here is why this is a big deal: 'eBPF' 'takes' the 'kernel' — a 'closed' box that only a hundred people in the world could 'change' — and 'opens' it to everyone. You do not need to be a 'kernel' 'programmer' to see what your 'infrastructure' is 'doing' . You write a small, safe piece of work, and 'Linux' 'runs' it right there, inside, where everything 'happens' . No 'waiting' for 'years' . No 'risk' of 'breaking' the 'kernel' . No need to 'change' 'running' 'code' .

For 'observability' , this is huge. Before 'eBPF' , you had three bad 'choices' : read from `/proc` — but that 'gave' you only a small picture and 'cost' a lot from the 'computer' . Add 'observability' 'code' inside your 'applications' — but that meant 'changing' 'running' 'code' , which could go wrong. Or 'use' old 'tools' — but each one only did part of the job, and they were often half done.

'eBPF' 'gives' you one way to see everything from inside the 'kernel' , with almost no 'cost' . 'Brendan' 'Gregg' 'built' over a hundred 'eBPF' 'observability' 'tools' . 'BCC' 'gives' you 'tools' for many 'parts' of 'Linux' . 'bpftrace' 'lets' you ask quick 'questions' with one line. ([`Brendan Gregg` `eBPF` `page`](https://www.brendangregg.com/ebpf.html#eBPF))

### Now What?

'eBPF' is already in every new 'Linux' . It is not something you add — it is something you 'use' . Start with what is already there. 'Run' `execsnoop` and watch every new piece of work start. 'Run' `opensnoop` and watch every 'file' open. These are not play 'things' — they are the same 'tools' the 'biggest' 'businesses' in the world 'use' to 'run' their 'infrastructure' .

## `Observability` of `Linux` `Infrastructure`

### What?

'eBPF' 'observability' for 'Linux' 'infrastructure' is this: you see everything that 'happens' inside your 'servers' and 'Kubernetes' 'clusters' . Every 'process' that 'starts' , every 'file' that 'opens' , every 'network' 'connection' that is made, every read and write to 'disk' , every 'CPU' wait — all from inside the 'kernel' , without 'changing' any 'running' 'code' .

With 'eBPF' , you can see all of this with one line:

- `execsnoop` — every new 'process' 'starting'
- `opensnoop` — every 'file' 'opening'
- `tcpconnect` — every 'network' 'connection' 'starting'
- `biolatency` — how long 'disk' 'reads' and 'writes' take
- `runqlat` — how long 'things' wait before they can 'run'
- `tcpretrans` — when 'network' 'connections' have to try again
- `profile` — where your 'CPU' 'spends' its time

### So What?

Three 'things' make this 'powerful' :

**Full picture.** Before 'eBPF' , you had to pick: 'use' 'tools' that only 'gave' you part of the picture, or add 'code' inside your 'applications' and hope it did not break anything. 'eBPF' 'sees' from inside the 'kernel' , where everything has to pass through. Nothing is 'hidden' . Every 'process' , every 'network' 'call' , every 'file' open — all of it, in one place.

**Low 'cost' .** 'eBPF' 'tools' 'run' inside the 'kernel' with almost no 'cost' . They do not add 'delay' . They do not 'use' much 'memory' . They do not need you to 'change' or 'restart' anything. This is very different from old 'observability' 'tools' that had to be 'added' to 'code' and could slow 'things' down.

**No trust 'needed' .** 'eBPF' does not ask 'applications' to 'report' on themselves. It 'sees' what they are actually 'doing' , at the 'kernel' 'level' . You do not have to trust that every 'application' was 'built' to tell you the truth — you can see for yourself.

For 'devsecops' 'groups' 'running' 'multi-cloud' , 'multi-region' 'Kubernetes' , this is strong. One way to see everything across all your 'infrastructure' , without 'changing' 'running' 'code' , without 'restart' , and without 'trusting' 'applications' to be 'honest' .

### Now What?

If you are 'running' 'Kubernetes' today, 'Cilium' is the most 'used' and 'battle-tested' way to bring 'eBPF' into your world. 'Google' 'uses' it for 'GKE' and 'Anthos' . It 'gives' you better 'networking' and 'security' as a first step, and 'observability' 'comes' with it. Start there.

Then build from the ground up. Try 'bpftrace' 'one-line' 'answers' on a 'server' you 'use' for 'trying' 'things' . These are the same 'tools' the most important 'businesses' in the world 'use' to 'run' their 'computers' . ([`Brendan Gregg` `eBPF` `page`](https://www.brendangregg.com/ebpf.html#eBPF))

## `Observability` of `AI` `Agents`

### What?

'AI' 'agents' are different from normal 'software' . They do not follow a set way of 'doing' 'things' . They decide what to do next from what they see. They 'call' other 'agents' and 'APIs' , start new 'processes' , and 'chain' 'calls' together in 'ways' you 'cannot' always know ahead of time.

'eBPF' 'observability' for 'AI' 'agents' is this: you see everything an 'AI' 'agent' 'does' — every 'file' it 'opens' , every 'network' 'call' it 'makes' , every 'process' it 'starts' , every 'CPU' 'cycle' it 'uses' , every piece of 'memory' it 'touches' — from the 'kernel' , without 'touching' the 'agent' at all.

### So What?

This is where 'eBPF' 'goes' from 'helpful' to 'essential' . Here is why, side by side with old 'approaches' :

**Old 'approach' : 'logging' inside the 'agent' .** You add 'code' to the 'agent' so it 'writes' down what it 'does' . But 'AI' 'agents' decide on the fly. They may not 'write' down everything. They may not 'write' down the right 'things' . And when something 'goes' wrong, the 'log' is often 'missing' or wrong because the 'agent' did not know it was 'doing' something important. 'Adding' 'code' inside the 'agent' also 'adds' 'risk' — exactly what you want to stay away from with something you 'cannot' 'fully' 'predict' .

**Old 'approach' : 'distributed' 'tracing' from outside.** You 'use' 'distributed' 'tracing' 'tools' that follow 'requests' across 'services' . But 'AI' 'agents' do not always follow a 'request' . They may start new work on their own, 'call' 'things' that are not 'traced' , or make 'connections' you did not plan for. 'Tracing' only 'sees' what it was told to see.

**'eBPF' : see from under, not from inside.** 'eBPF' 'sits' in the 'kernel' , under everything. It 'sees' every 'file' open, every 'network' 'connection' , every 'process' start — whether the 'agent' 'reports' it or not, whether the 'agent' is 'aware' or not. This 'gives' you four 'things' you 'cannot' get any other way:

1. **Full 'tracking' of what 'happened' .** You can see what 'agents' 'called' , in what order, and how long each step took. Not what the 'agent' 'says' it did — what it actually did, at the 'deepest' part of the 'computer' .

2. **What you pay.** Which 'agent' 'used' how much 'CPU' , 'memory' , 'disk' , and 'network' ? When you have many 'agents' 'running' , this 'matters' . 'eBPF' can tell you exactly who 'used' what, because it 'sees' from the 'kernel' where everything has to pass through.

3. **When something 'goes' wrong.** When an 'agent' 'does' something you did not expect — and it will — 'eBPF' 'shows' you exactly what 'happened' . Not what the 'agent' 'wrote' down, but the real picture from the 'computer' .

4. **`Lines` that keep 'things' safe.** You can watch for 'agents' 'opening' 'files' they should not open, 'making' 'network' 'connections' they should not make, or 'starting' 'processes' they should not start. 'eBPF' 'sees' all of this because it 'sits' under everything, in the 'kernel' where every act has to pass through.

### Now What?

For a 'leader' in 'devsecops' 'thinking' about 'AI' 'agents' , this 'changes' the whole picture. You can bring 'AI' 'agents' into your 'infrastructure' with more trust, because you have a way to see everything they do — even when they surprise you.

The 'groups' that lead will build 'eBPF' 'observability' into their 'AI' plan now. As 'agentic' 'AI' 'grows' , the 'agents' will get more 'autonomous' and more 'complex' . Old 'things' — 'logging' , 'tracing' , 'adding' 'code' inside — will not be enough. 'eBPF' is the only way to get full, deep sight into 'AI' 'agents' without 'changing' their 'code' and without 'trusting' them to be 'honest' about what they did.

## Key `eBPF` `Concepts` to Know

To decide, put to work, and get the full 'value' of 'eBPF' , here are the 'concepts' you need to know:

**The 'kernel' .** The 'deepest' part of 'Linux' that 'controls' everything. Every 'file' open, every 'network' 'packet' , every 'process' start 'passes' through the 'kernel' . 'eBPF' 'lets' you put small 'pieces' of work right here, where everything 'happens' .

**The 'verifier' .** Before any 'eBPF' 'program' 'runs' , the 'kernel' 'checks' it to make sure it is safe. It will not let anything 'run' that could break the 'kernel' . This is what 'makes' 'eBPF' safe by 'design' . The 'verifier' was 'born' from a hard 'lesson' : you 'cannot' trust the thing that 'builds' the 'code' . The 'kernel' has to check everything on its own.

**'Maps' .** 'eBPF' 'programs' can share what they find through 'data' 'structures' 'called' 'maps' . This is how 'eBPF' 'tools' bring 'data' from inside the 'kernel' out to where you can see it.

**'Hook' 'points' .** 'eBPF' 'programs' 'attach' to set 'places' in the 'kernel' — when a 'process' 'starts' , when a 'file' 'opens' , when a 'network' 'packet' 'comes' in. You pick the 'place' where you want to see, and 'eBPF' 'runs' your 'program' there.

**'Helpers' .** 'eBPF' 'programs' can 'call' 'helper' 'functions' 'given' by the 'kernel' to do 'things' like read 'process' 'data' , 'send' 'packets' , or store 'data' in 'maps' .

## `eBPF` in the World

The story of 'eBPF' is a story of small 'steps' that 'added' up to something big. It 'started' when 'Alexei' 'Starovoitov' had the idea to put small, safe 'programs' inside the 'Linux' 'kernel' . He came to see early on that you 'cannot' trust the 'compiler' — the 'kernel' has to check everything 'itself' . That is how the 'verifier' came to be.

'Daniel' 'Borkmann' saw the power of the idea and came on 'board' . 'Thomas' 'Graf' felt the same — "a 'million' 'lights' went off" when he saw what 'eBPF' could do. Together, they 'moved' the 'changes' forward, piece by piece, so the 'community' could see each step was safe.

The 'networking' 'community' 'pushed' back at first. So 'Alexei' 'changed' direction: instead of 'showing' 'eBPF' only for 'networking' , he 'showed' it for 'tracing' — for 'seeing' what 'Linux' was 'doing' from inside. 'Brendan' 'Gregg' at 'Netflix' made a deal: if 'Alexei' would add 'tracing' to 'eBPF' , 'Brendan' would 'build' the 'tools' that made it real for people. 'BCC' — over a hundred 'observability' 'tools' — was 'born' . 'bpftrace' made it even 'easier' .

Then 'Facebook' 'showed' what 'eBPF' could do at 'scale' : 'Katran' with 'XDP' 'handled' 'fifteen' 'million' 'packets' 'per' second — ten 'times' as fast as the old way. ([`Unlocking` the `Kernel` `documentary`](https://youtu.be/Wb_vD3XZYOA?si=q4dbyWfPR_TDa5Ja))

'Cilium' brought 'eBPF' to 'Kubernetes' and 'containers' , with 'security' 'built' in from the start. 'Google' 'started' 'using' it. 'Microsoft' 'started' 'working' on 'eBPF' for 'Windows' . The 'eBPF' 'Foundation' was 'formed' .

And then, after 'years' of work, 'David' 'Miller' — the person who 'decided' what went into 'Linux' 'networking' — 'wrote' : "`Merged`, 'thanks' ." Two 'words' . But it meant everything.

As the 'documentary' 'puts' it: "It is not an 'evolution' , it is a 'revolution' ." ([`Unlocking` the `Kernel` `documentary`](https://youtu.be/Wb_vD3XZYOA?si=q4dbyWfPR_TDa5Ja))

## The Case for `eBPF` Now

For 'Frankie' — a 'devsecops' 'leader' with 'multi-cloud' , 'multi-region' 'Kubernetes' 'infrastructure' , part 'owner' of a 'private' 'fintech' , and someone 'looking' into 'agentic' 'AI' — here is why 'eBPF' 'matters' now:

**Your 'Linux' 'infrastructure' is already 'running' it.** Every new 'Linux' 'kernel' has 'eBPF' 'built' in. You do not need to buy anything or add anything. You need to start 'using' what is already there.

**Your 'Kubernetes' 'clusters' can be 'safer' and more 'observable' .** 'Cilium' — 'used' by 'Google' , 'Amazon' , and 'others' — 'brings' 'eBPF' 'networking' and 'security' to 'Kubernetes' with almost no 'cost' . Better 'networking' , better 'security' , and full 'observability' as a 'result' .

**Your 'AI' 'agents' need a different kind of 'observability' .** 'AI' 'agents' are 'autonomous' . They decide what to do on their own. Old 'ways' — 'logging' inside the 'agent' , 'tracing' from outside — do not work well for 'things' that 'change' their own 'path' . 'eBPF' 'sees' from under, not from inside. It does not need the 'agent' to be 'honest' . It does not need you to 'change' the 'agent' . It just 'sees' everything, because everything 'passes' through the 'kernel' .

**The 'groups' that lead will build 'eBPF' 'observability' into their 'AI' plan now.** Not next year. Not after something 'goes' wrong. Now. Because when 'agentic' 'AI' 'becomes' normal, the 'groups' that can see what their 'agents' are actually 'doing' — not what the 'agents' say they are 'doing' — will have a real edge.

'eBPF' is not a small step forward. It is a 'change' in what is possible. And for 'groups' 'thinking' about the next ten 'years' of 'infrastructure' — especially with 'AI' 'agents' 'becoming' real — 'eBPF' is the ground that 'makes' it all 'observable' , safe, and fast.