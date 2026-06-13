---
title: "What Is BPF? BPF Explained Using 1000 Most Used English Words"
date: 2026-06-12T16:32:41+08:00
publishdate: 2026-06-12T16:32:41+08:00
tags: ['ebpf', 'linux', 'devsecops', 'observability', 'ai']
comments: true
draft: true
---

eBPF (extended Berkeley Packet Filter) is a safe way to run small pieces of work inside the heart of Linux. Before eBPF, if you wanted Linux to do something new, you had to change the very thing that is Linux — a slow, hard way that could take years. Or you used things that help but could only see a small part of what was going on. eBPF changed all of that. Now you can put a small piece of work inside the deepest part of a Linux computer, and it runs in a safe way — the heart of Linux checks it first to make sure it will not break anything.

For the first time, you can watch every new piece of work starting, every stored thing opened, every way computers talk to each other, every read and write to the part of the computer that keeps what you know — without changing what tells the computer what to do that is already running. No starting again. No new forms. No slowing down. Even across many far-away groups of computers and many places running Kubernetes.

For people who lead devsecops teams and are looking into AI that acts on its own, eBPF is the ground to build your watching and being-safe plan on. It is already in every new Linux. The question is not whether to use it — it is how fast you start.

## How We Got Here

In 2014, Alexei Starovoitov had an idea. Working at PLUMgrid, he wanted to find a way to put small, safe pieces of work inside the heart of Linux — the deepest part of the computer that controls everything.

His idea was big. The heart of Linux is the most important and most carefully guarded part of any computer that runs Linux. For good reason: if something goes wrong there, the whole computer can break. Only about a hundred people in the world really understood how to change it. Alexei's idea was to let anyone write a small piece of work that could run there, in a safe way.

But early on, they hit a problem. After several hours of what the computers were sending to each other, the whole computer would break. Alexei realized something important: you can't trust the thing that builds what tells the computer what to do. The heart of Linux has to check everything on its own before it lets anything run. That is how the verifier came to be — a checker inside Linux that makes sure nothing bad can happen before a piece of work runs. The word "verifier" may be new, but the idea is easy: Linux checks each piece of work first, like a guard at the door.

There was another problem. The people who guard Linux did not want a big change that made people worry. Alexei was told: make it look like something that is already there. So he took an old thing called BPF (Berkeley Packet Filter — a way to look at what moves between computers) and made it "extended." He called it eBPF. He made his new idea look like a small step forward to something people already knew, rather than a huge change.

He put his first change out there. Silence. One person asked a small question. No answer.

Then Daniel Borkmann saw it. He was going about his day, working on small fixes for Linux, when he found this change. He understood right away how powerful it could be. He walked into Thomas Graf's office and said: "This looks amazing. Can I work on this?"

Thomas, at Red Hat, felt the same way. A huge number of lights went off when he saw what eBPF could do. Together, Alexei and Daniel started pushing the changes, piece by piece. Not the whole thing at once — just small pieces, one at a time, so the group could see that each step was safe.

The group that worked on the way computers talk pushed back hard. They felt that what they already had was enough. So Alexei made a good move: he changed direction. Instead of showing eBPF only for the way computers talk to each other, he showed it for watching — for seeing what Linux was doing from the inside.

That is when Brendan Gregg entered the story. Brendan was at Netflix, trying to find a way to watch what was happening inside the computers running the huge thing that works for everyone. He had tried over ten different Linux things that help you watch, and they were all about half done. None could do everything he needed.

When Alexei came to Netflix and showed him eBPF, Brendan made a deal: if Alexei would add a way to watch things inside Linux, Brendan would write all the things that help people actually use it. That deal changed everything. Brendan made BCC — a set of over a hundred things that help you watch, which made eBPF real for people who were not deep inside the heart of Linux. Later, bpftrace made it even easier to use: you could write one line and see what was happening.

The big moment came in 2017. At DockerCon, Brendan, Thomas, and Liz Rice all happened to be on the same place talking about eBPF. After that, the group grew fast — people joined, started using it, started building on it.

Then Facebook showed the world what eBPF could really do. Their Katran thing that shares work between computers used eBPF and XDP to handle 15,000,000 pieces of what the computers know each second, spending just a tiny part of a second on each — ten times as fast as the old way.

Cilium came next, made by Thomas and Daniel, to bring eBPF's power to everyone — not just the huge businesses with their own teams deep inside Linux. Cilium made eBPF work for boxes and Kubernetes, with being safe built in from the start. Google started using Cilium for GKE and Anthos. Microsoft started working on eBPF for Windows. The eBPF Foundation was formed with Netflix, Google, Isovalent, and Microsoft.

And then, after years of work, David Miller — the person who decided what went into the way computers talk in Linux — said yes and wrote: "Merged, thanks." Just two words. But it meant everything.

As Alexei Starovoitov said: "If in the past the whole kernel would be maybe a hundred programmers across the world, now a hundred thousand people in the world can program the kernel thanks to BPF."

## Watching Every Part of Your Computers

Before eBPF, watching what your Linux computers were doing was hard. You could read stored what the computer knows in /proc — but it only showed a small part of the picture, and reading it took a lot of work from the computer. You could add watching what tells the computer what to do inside your things that run — but that meant changing running what tells the computer what to do, which could go wrong. Or you could use the old things that help you watch — but they were half done, each one only doing part of the job.

eBPF changed this completely. Now, with a single line, you can see:

- `execsnoop` — every new piece of work starting on your computer
- `opensnoop` — every stored thing being opened
- `tcpconnect` — every way computers talk starting up
- `biolatency` — how long reads and writes to the part that keeps what you know take, shown as a picture
- `runqlat` — how long things wait before they can run
- `tcpretrans` — when ways computers talk have to try again
- `profile` — where your computer spends its time

All of this without changing any of what tells the computer what to do, without starting anything again, and without slowing down the things that are already running. What the computer knows is picked up and brought together right there, inside the heart of Linux, so it is fast and complete.

For teams running many far-away groups of computers and Kubernetes groups, this is a big deal. Instead of adding watching what tells the computer what to do to every thing that runs — which means changing what tells the computer, starting again, and hoping nothing breaks — you have one set of things that help you watch everything from the outside. Brendan Gregg has over a hundred of these where he writes about eBPF. BCC gives you things that help with many parts. bpftrace gives you easy one-line answers for quick questions.

As Brendan Gregg said in the movie about eBPF, it is "like putting JavaScript into the kernel." It takes the heart of Linux — once a shut box that only a hundred people in the world could change — and makes it something anyone can watch and work with.

## Watching AI That Acts on Its Own

Now think about AI things that help — those pieces of work that act on their own, deciding what to do, calling other pieces of work, starting new things, and reaching out to other computers without you telling them to. They are different from usual things that run. They do not follow a fixed way of doing things. They decide what to do next from what they see. They call other things that help, start new pieces of work, and join one call after another in ways you can't always know ahead of time.

The old ways of watching don't work here. You would need to guess every way an AI thing that helps could go, or add watching what tells the computer what to do inside the AI thing that helps — which means changing the AI thing that helps, which is exactly the kind of chance of something going wrong you want to avoid when you are already dealing with something you can't completely know ahead of time.

eBPF watches from outside the AI thing that helps — from the heart of Linux. It sees:

- Every stored thing the AI thing that helps opens
- Every way it talks to other computers
- Every new piece of work it starts
- Every tiny part of a second of CPU it uses
- Every piece of memory it touches

This gives you four things you can't get any other way:

**Full tracking of what happened.** You can see what things the AI thing that helps called, in what order, and how long each step took. Not what the AI thing that helps says it did — what it actually did, at the deepest part of the computer.

**What you pay.** Which AI thing that helps used how much CPU, memory, the part that keeps what you know, and ways computers talk? When you have many AI things that help running, this matters. eBPF can tell you exactly who used what, because it watches from the heart of Linux where everything has to go through.

**Finding problems when something goes wrong.** When an AI thing that helps does something you did not expect — and it will — eBPF shows you exactly what happened. Not what the AI thing that helps wrote down (which may be missing or wrong), but the real picture from the computer.

**Lines that keep things safe.** You can watch for AI things that help opening stored things they should not open, making ways to talk to computers they should not talk to, or starting new pieces of work they should not start. eBPF sees all of this because it sits under everything, in the heart of Linux where every act has to go through.

The point is not that eBPF takes the place of your other things that help you watch. The point is that it gives you something no other way can: complete, full seeing into AI things that help — without changing what tells them what to do, without their help, and without trusting them to tell you what they did.

For a person who leads a devsecops team, this changes the whole picture. You can bring in AI things that help with more trust, because you have a way to see everything they do, even when they surprise you.

## Building Your Plan on eBPF

eBPF is not something you buy. It is already inside every new Linux — in your computers, in your Kubernetes groups, even in Android phones. The question is how fast you put it to work.

Here is a way to think about it:

**Know what you already have.** eBPF is already running in your Linux computers. You do not need to add a new thing. You need to start using what is already there.

**Start with things that are known to work.** Cilium is used by Google, Amazon, and others for Kubernetes ways computers talk and being safe. It is the most used and tried way to bring eBPF into your world. Start there, and you get better ways computers talk and being safe as a first step.

**Build what you know from the ground up.** Try bpftrace one-line answers on a computer you use for trying things. Run `execsnoop` and see every new piece of work starting. Run `opensnoop` and see every stored thing being opened. These are not just for fun — they are the same things that help you watch that the most important businesses in the world use to run their computers.

**Make the big move about watching AI things that help.** eBPF is the only way to get full seeing into AI things that help without changing what tells them what to do. As AI that acts on its own grows, this becomes not just useful but something you must have. The people who lead will build this watching into their AI plan now, and they will have a real edge.

As the movie about eBPF puts it: "It's not an evolution, it's a revolution." The heart of Linux — once a shut box that only a hundred people in the world could change — is now something a hundred thousand people can work with. Brendan Gregg, who has been at the heart of this from the start, puts it completely: "We can do in one hour what would normally take weeks."

That is not a small step forward. That is a change in what is possible. And for people thinking about the next ten years of the way computers work — especially with AI things that help becoming real — eBPF is the ground that makes it all watchable, safe, and fast.