---
title: "Exploring Oci Registries By Use Case"
date: 2023-08-06T17:15:06+08:00
publishdate: 2023-08-11T07:15:06+08:00
tags: ['kubernetes', 'oci', 'container', 'runtime', 'registry', 'cri', 'distribution']
comments: true
draft: false
---

Imagine an organisation has 6 application teams.
Each team has their own Kubernetes cluster so they can operate independently on their own cadence.
Each cluster has access to pull images from the public internet.

In this story, 36 Kube Workers pull 3 new public images from Dockerhub.
Pretty soon, we're seeing `ErrImagePulls`.

The SREs call it "Degraded".
SecOps call it "Denial of Service".
The Users simply call it "Down"!

On a fresh Worker, the image doesn't exist.
Workers don't share images with each other by default.

Because of that, the Container Runtime on the Worker must pull the Image from a Registry.

Because of that, we got a 429 Too Many Requests response from DockerHub!

Its a contrived example using a Kubernetes Job to create many pods in parallel.

Yet, if you're using GitOps at scale, that can happen - apparently even if you're using a private registry cache (more on this in a future chapter)!

More importantly, the story challenges us to dig deeper into the most common use case of an OCI Registry - [Pull a Public Image](../../explainer/container-oci-registry/pull-a-public-container-image/) - and learn how an Image gets from Registry to Runtime.

You can apply the learnings to:

- ⏳ reduce container startup time, and in turn, pod readiness
- 🛑 reduce the risk of Denial of Service due to rate limits
- 💰 reduce egress and storage costs
