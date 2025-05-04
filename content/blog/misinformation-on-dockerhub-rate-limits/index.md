---
title: "Misinformation on Dockerhub Rate Limits"
date: 2025-05-04T15:52:13+08:00
publishdate: 2025-05-04T22:52:13+08:00
tags: ['dockerhub', 'kubernetes', 'rate', 'limit', '429', 'Too Many Requests', 'oci', 'container', 'runtime', 'registry', 'cri', 'distribution']
comments: true
draft: false
---

In April 2025, Docker Inc withdrew plans to further constrain [Docker Hub Rate Limits](https://www.docker.com/blog/revisiting-docker-hub-policies-prioritizing-developer-experience/).

So rate limits remain unchanged at:

|Account Type|Limit|
|---|--:|
|anonymous users| 100 pulls per 6 hours per IP address|
|authenticated users| 200 pulls per 6 hour period|
|Users with a paid Docker subscription| Unlimited pulls (up from 5000 pulls per day)|

But misinformation remains in AI responses, search results and registry vendor blogs.

---

Docker Inc's backtrack suggests strong feedback from customers and community. Seems many container runtime environments still depend on Docker Hub.

I wrote a story to illustrate the impact of Docker Hub rate limits on a Kubernetes cluster. (Link to full explainer article in the comments).

You can apply the learnings to:

- 🛑 reduce the risk of Denial of Service due to rate limits

- ⏳ reduce container startup time, and in turn, pod readiness

- 💰 reduce egress and storage costs

In the story, 36 Kube Workers pull 3 new public images from Dockerhub.

Pretty soon, we're seeing `ErrImagePulls`.

The SREs call it "Degraded". SecOps call it "Denial of Service". The Users call it "Down"!

On a fresh Worker, the image doesn't exist. Workers don't share images with each other by default.

Because of that, the Container Runtime on the Worker must pull the Image from a Registry.

Because of that, we got a 429 Too Many Requests response from DockerHub!

The full explainer article is [here](https://www.douglashellinger.com/explainer/container-oci-registry/pull-a-public-container-image/). First is an explainer on how OCI image pulls work.
If you wanna jump to the rate limit story, start from "More Clusters, More Image Pulls".
