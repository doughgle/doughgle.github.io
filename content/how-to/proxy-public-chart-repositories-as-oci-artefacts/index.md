---
title: "How To Pull And Verify Any Public Helm Chart From An OCI Registry"
date: 2023-09-17T16:29:44+08:00
publishdate: 2023-10-12T22:30:44+08:00
tags: ['helm', 'chart', 'oci', 'proxy', 'verify', 'kubernetes', 'gpg', 'sigstore']
comments: true
draft: true
---

**When you wanna pull a public helm chart from an OCI registry...**

Some public charts aren't yet published as OCI artifacts. For those charts, one elegant solution is to use the open source [Helm Chart OCI Proxy](https://github.com/container-registry/helm-charts-oci-proxy).

It enables you to pull any public helm chart as an OCI Image.

You don't need to add a helm repo at the helm client. If you're using a central binary repository to aggregate helm repos, you don't need to add a helm repo there either!

The Helm Chart Proxy OCI Registry is publicly hosted at `chartproxy.container-registry.com` and free to use *.

This How To Guide shows you the steps..!

> \* Helm Chart OCI Proxy is licensed under GNU Affero General Public License v3.0 - always read the license.

### You'll Need

+ Helm >= v3.8
+ Cosign v2+

## 1. Check If The Chart Is Already Published As An OCI Artifact

For example, the [Prometheus Community Helm Charts](https://github.com/orgs/prometheus-community/packages?repo_name=helm-charts) are already published to GitHub Container Registry (GHCR).

![Github Packages Showing Prometheus Chart Packaged As Oci Artifact](./github-packages-chart-as-oci-image.drawio.svg "OCI Registry as Storage")

If the chart is available as an OCI artifact, you can pull the chart directly from the OCI registry with:

```sh
helm pull \
  oci://ghcr.io/prometheus-community/charts/prometheus \
  --version 25.1.0
```

```sh
Pulled: ghcr.io/prometheus-community/charts/prometheus:25.1.0
Digest: sha256:6802170c564274eff6408f1bdc91705a395a027dae1e981504c776845ca1965f
```

That's it!

Alternative public OCI Registries to check for charts:

1. [AWS ECR Public Gallery](https://gallery.ecr.aws/search?searchTerm=chart&verified=verified&page=1): Some AWS/Partner Helm Charts are available. For example the [Karpenter Helm Chart](https://gallery.ecr.aws/karpenter/karpenter).
1. [Dockerhub](https://hub.docker.com/): For example, all [Bitnami Helm Charts](https://hub.docker.com/u/bitnamicharts) are available.

If the chart isn't already published as an OCI artifact, read on...

## 2. Construct The OCI Chart Reference

### 2.1 Copy The Helm Repository URL

Example Chart: **tigera-operator**

From [artifacthub.io -> Install page](https://artifacthub.io/packages/helm/projectcalico/tigera-operator?modal=install), copy **docs.projectcalico.org/charts/** (omit the **<https://>**)

![Install Dialog On artifacthub.io Showing Steps To Use Classic Helm Repo](./artifacthub-install-helm-chart-from-helm-repo.drawio.svg "OCI Chart Refs: two (steps) become one")

### 2.2 Append The Helm Repo URL To The Chart Proxy Registry URL

`oci://chartproxy.container-registry.com/`**docs.projectcalico.org/charts/**

### 2.3 Append The Chart Name

`oci://chartproxy.container-registry.com/docs.projectcalico.org/charts/`**tigera-operator**

Now you have an OCI chart ref that can be used with Helm v3.8 or greater.

![Diagram Showing Anatomy Of An Oci Chart Reference](./1-public-chart-oci-image-reference-cover.drawio.svg "OCI Chart Ref: That's it!")

## 3. Pull From OCI Registry Using The OCI Chart Reference

Now pull the `tigera-operator` chart from `chartproxy.container-registry.com` using the oci chart reference.

Use `--version` to specify the chart version in the helm client (not OCI image tag).

```sh
helm pull \
  oci://chartproxy.container-registry.com/docs.projectcalico.org/charts/tigera-operator \
  --version 3.26.1
```

```sh
Pulled: chartproxy.container-registry.com/docs.projectcalico.org/charts/tigera-operator:3.26.1
Digest: sha256:1e72052d066b8bcf3adbc5de201e05728b3be75c55b83506f78fc6691a2ce9c2
```

## 4. Verify The Chart's Signature

Verify the chart comes from a **trusted publisher** and is **unmodified** *before* you install it!

You can verify this in one step by verifying the chart is signed by a trusted publisher.

Depending on the chart's signing method, verify using 1 of these 3 methods:

1. Verify Using Cosign
1. Verify The Provenance Layer In OCI Image
1. Verify Using The Provenance File Stored In Classic Helm Repo

### 4.1. Verify Using Cosign

Some charts may use the [Sigstore](https://www.sigstore.dev/) ecosystem to sign and verify.

For example, the latest cloudbees-core chart can be verified with:

```sh
cosign verify --key https://cdn.cloudbees.com/keyring/cloudbees.pub helm.cloudbees.com/cloudbees-core:3.14250.0_ba76d23d3618
```

```sh
[{"critical":{"identity":{"docker-reference":"helm-internal.artifacts.cloudbees.com/cloudbees-core"},"image":{"docker-manifest-digest":"sha256:b7aab6f5a3e87035eb5af8cfbe2280d4cd564d1f6c643d6f4007586348d4f435"},"type":"cosign container image signature"},"optional":{"Bundle":{"SignedEntryTimestamp":"MEUCIFW76mN5GK6PfIMzbqtYKKecCNtxUIXsq2EwQJPPmJIoAiEAvRpja9pFs0hmwpeFlCeEt5BMvrtQIfSEMJ09j8w9Il8=","Payload":{"body":"eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiJjNjI5YjVhZDAxNjQ4MWE4MDQzMWFhNzVjODFmMjk3OGJmZGM1YWQyMjQ2YTAwMmVhYzg1MWFkMGE3OWRmMDcyIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FVUNJUUNmdEFuaFE1VUFRODdZNEtqOURVbHVjM05LcXR4RHJhM3pGYkxWbnROK2lRSWdiUlY5UloyZjNqeWcrYUNrZDNpRWZtT0lyUmtUdUNtMUhuMGNOOE5wd3Y4PSIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCUVZVSk1TVU1nUzBWWkxTMHRMUzBLVFVacmQwVjNXVWhMYjFwSmVtb3dRMEZSV1VsTGIxcEplbW93UkVGUlkwUlJaMEZGYVVsRU1UaE1OR2R1ZEhCbVJXUmFVekl3SzB0WVpUVTVOalZqYWdwSmVrRTFjalJZTWxST1VVcFFiVWx1VGpkbmJXTlJaMngxWWxKblprRXZkMDVNZEd4cEx6TjNVak5xWlhCbFNIVnNZak16VTJKWGIwNTNQVDBLTFMwdExTMUZUa1FnVUZWQ1RFbERJRXRGV1MwdExTMHRDZz09In19fX0=","integratedTime":1694639884,"logIndex":36228316,"logID":"c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d"}}}}]

Verification for helm.cloudbees.com/cloudbees-core:3.14250.0_ba76d23d3618 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - The signatures were verified against the specified public key
```

> Note: replace `+` for `_` in the OCI Image Tag (OCI tags dont support the + that's typically used to denote build metadata of a version in semver).

The [Cloudbees Docs](https://docs.cloudbees.com/docs/cloudbees-ci/latest/cloud-secure-guide/helm-verification) explains it.

### 4.2. Verify The Provenance Layer In OCI Image

The provenance file should be built in to the OCI Image as a Layer. For example the [Image Manifest for ArgoCD](https://github.com/argoproj/argo-helm/pkgs/container/argo-helm%2Fargo-cd/129237573?tag=5.46.6)

```sh
helm pull --verify oci://ghcr.io/argoproj/argo-helm/argo-cd --version 5.46.6
```

```sh
Pulled: ghcr.io/argoproj/argo-helm/argo-cd:5.46.6
Digest: sha256:28b4cb53a4f188501779808f4cc40d71b7a51f7bfa39b8ac3ca9f6b523c1c198
Pulled: ghcr.io/argoproj/argo-helm/argo-cd:5.46.6
Digest: sha256:28b4cb53a4f188501779808f4cc40d71b7a51f7bfa39b8ac3ca9f6b523c1c198
Signed by: Argo Helm maintainers <cncf-argo-security@lists.cncf.io>
Using Key With Fingerprint: 2B8F22F57260EFA67BE1C5824B11F800CD9D2252
Chart Hash Verified: sha256:4422d42afae57c4b7a4d006e132068fd2cf6debf008e48132df1c9582e161fd2
```

If no provenance layer exists, we'll see "Error: failed to fetch provenance":

```sh
helm pull \
--verify \
oci://chartproxy.container-registry.com/argoproj.github.io/argo-helm/argo-cd \
--version 5.46.6
```

```sh
Pulled: chartproxy.container-registry.com/argoproj.github.io/argo-helm/argo-cd:5.46.6
Digest: sha256:c34662902fcd868e184849fdfc6d1fbc42bee770029d6a69520eb0671d5f74f1
Error: failed to fetch provenance "oci://chartproxy.container-registry.com/argoproj.github.io/argo-helm/argo-cd:5.46.6.prov"
```

We can see this explicitly by pulling with the `--prov` option:

```sh
helm pull \
--prov \
oci://chartproxy.container-registry.com/argoproj.github.io/argo-helm/argo-cd \
--version 5.46.6
```

```sh
Pulled: chartproxy.container-registry.com/argoproj.github.io/argo-helm/argo-cd:5.46.6
Digest: sha256:d0139e91f899dd9502923ce0714b1a2eff2a07909fdf84e77aa78d6e733cb146
WARNING: Verification not found for oci://chartproxy.container-registry.com/argoproj.github.io/argo-helm/argo-cd: manifest does not contain a layer with mediatype application/vnd.cncf.helm.chart.provenance.v1.prov
```

This time, Helm clarifies that the layer is missing: "manifest does not contain a layer with mediatype application/vnd.cncf.helm.chart.provenance.v1.prov"

> ### Side Quest: Query Public Chart Manifest
>
> You can query an OCI chart manifest from the public chart proxy like this:
>
> ```sh
> curl https://chartproxy.container-registry.com/v2/argoproj.github.io/argo-helm/argo-cd/manifests/5.46.6 \
>   --silent \
>   --location \
>   | jq
> ```
>
> ```json
> {
>   "schemaVersion": 2,
>   "mediaType": "application/vnd.oci.image.manifest.v1+json",
>   "config": {
>     "mediaType": "application/vnd.cncf.helm.config.v1+json",
>     "digest": "sha256:44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a",
>     "size": 2
>   },
>   "layers": [
>     {
>       "mediaType": "application/vnd.cncf.helm.chart.content.v1.tar+gzip",
>       "digest": "sha256:4422d42afae57c4b7a4d006e132068fd2cf6debf008e48132df1c9582e161fd2",
>       "size": 148855,
>       "annotations": {
>         "org.opencontainers.image.title": "argo-cd-5.46.6.tgz"
>       }
>     }
>   ],
>   "annotations": {
>     "org.opencontainers.image.created": "2023-10-10T09:12:15Z"
>   }
> }
> ```

One observation is the [Helm Chart OCI Proxy](https://github.com/container-registry/helm-charts-oci-proxy) only provides the `tgz` layer. Config (the contents of `Chart.yaml`) and the provenance layer are not provided.

### 4.3. Verify Using The Provenance File Stored In Classic Helm Repo (hack)

#### 4.3.1 Get The Public Key

Find the public key from artifacthub.io signed icon:

![Screenshot of artifacthub.io highlighting signed chart icon](./artifacthub-signed-icon.drawio.svg "Like Rocking Horse $hit: A Signed icon in colour!")

#### 4.3.2 Convert The Key Into GnuPG Format

Download the key and convert it from OpenPGP ASCII Armor format into GPG binary format.

That's the format supported by helm. See Colin Wilson's [Verifying Signed Helm Charts](https://colinwilson.uk/2022/02/07/verifying-signed-helm-charts/) for an explainer.

```sh
curl https://argoproj.github.io/argo-helm/pgp_keys.asc \
  | gpg --dearmor > ~/.gnupg/pubring.gpg
```

```sh
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1680  100  1680    0     0   4253      0 --:--:-- --:--:-- --:--:--  4242
```

#### 4.3.3 Download the Provenance File Separately

Download the chart's provenance file separately from the HTTP repo:

```sh
curl -LO https://github.com/argoproj/argo-helm/releases/download/argo-cd-5.46.6/argo-cd-5.46.6.tgz.prov
```

```sh
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100  1920  100  1920    0     0   1782      0  0:00:01  0:00:01 --:--:--     0
```

#### 4.3.4 Verify The Chart Package

Finally, verify the packaged chart locally using the public key

```sh
helm verify argo-cd-5.46.6.tgz
```

```sh
Signed by: Argo Helm maintainers <cncf-argo-security@lists.cncf.io>
Using Key With Fingerprint: 2B8F22F57260EFA67BE1C5824B11F800CD9D2252
Chart Hash Verified: sha256:4422d42afae57c4b7a4d006e132068fd2cf6debf008e48132df1c9582e161fd2
```

---

## Pull A Public Chart From An Air-Gapped Environment

If you're in an air-gapped environment, you can put a private oci registry proxy in front of the public chart proxy.

That way, requests to the public chart proxy are de-duplicated and charts are cached logically closer to their point of use.

Here's a example using [k3d](https://k3d.io/v5.6.0/usage/registries/#creating-a-registry-proxy-pull-through-registry) to prototype a pull-through registry.

```sh
k3d registry create chartproxy-container-registry-com-mirror \
--image docker.io/library/registry:2 \
--port 0.0.0.0:5007 \
--proxy-remote-url https://chartproxy.container-registry.com \
--volume /tmp/reg:/var/lib/registry \
--volume $(pwd)/registry-config.yml:/etc/docker/registry/config.yml \
--no-help
```

```sh
INFO[0000] Creating node 'k3d-chartproxy-container-registry-com-mirror' 
INFO[0000] Successfully created registry 'k3d-chartproxy-container-registry-com-mirror' 
INFO[0000] Starting Node 'k3d-chartproxy-container-registry-com-mirror' 
INFO[0000] Successfully created registry 'k3d-chartproxy-container-registry-com-mirror'
```

### Install Argocd Chart Using Air-Gapped Chart Proxy

```sh
kubectl create ns argo
namespace/argo created
```

Then, from a push-based deployer machine:

```sh
helm upgrade my-argo-cd \
oci://localhost:5007/argoproj.github.io/argo-helm/argo-cd \
--namespace argo \
--install \
--debug
```

---

Thank you for reading this article right to the end.
If you enjoyed it and if you think others can benefit, please like and share!

If you'd like to learn from a hands-on-keyboard tutorial for this chapter, let me know on [LinkedIn](https://www.linkedin.com/in/doughellinger/).

If you foresee a problem, have an alternative solution, I'd appreciate your feedback. Again, reach me on [LinkedIn](https://www.linkedin.com/in/doughellinger/).

Special thank you to [Dan Polencic](https://www.linkedin.com/in/danielepolencic/). Appreciate the reviews and all your feedback!

Look out for the next Chapter on Exploring OCI Registries...
