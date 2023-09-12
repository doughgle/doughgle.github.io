---
title: "Standardising Private Registry Configuration"
date: 2023-09-12T22:05:12+08:00
publishdate: 2023-09-12T22:05:12+08:00
tags: ['kubernetes', 'oci', 'container', 'runtime', 'registry', 'cri', 'distribution']
comments: true
draft: false
---

IT Ops has evolved since the time-honoured practice of "turn it off and on again!"

Aisha's a Kubernetes Platform Engineer. Every day, she upgrades and rolls back helm charts.

Some days, Platform Engineers just wanna experiment with a new public Helm Chart.

Today, Aisha's exploring a Kubernetes Network Plugin to enable teams to define network policies of their architecture within the kubernetes cluster.

She picks the Tigera Operator for Calico Chart and installs it.

Ah. `ErrImagePull`. The Kubernetes Cluster can't pull from the *public* internet.

Aisha overrides the image refs in the chart values to pull images from the *private registry*.

Hmmm. It works for some images, but not for others. Are those images defined in sub-charts? CRDs? Or somewhere else..?

It can be tedious to update image refs until a public chart works on an air-gapped cluster.

What alternatives do we have?

Aisha wants to make it easier to experiment with public charts.

The story examines another common use case that invokes OCI Registry and Runtime: [Pull a Public Helm Chart](../../explainer/container-oci-registry/pull-a-public-helm-chart/).

You can apply the learnings to:

+ 🤹‍♀️ eliminate the toil of overriding `registry` for helm charts
+ 🔬 open clusters for experimentation, but close for untrusted registries

---

#Kubernetes #OCI #HelmCharts #ContainerRegistry #Containerd #RegistryMirror