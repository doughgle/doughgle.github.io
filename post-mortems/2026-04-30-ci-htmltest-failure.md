# Post-Mortem: CI htmltest Failure After Blog Post Push

**Date:** 2026-04-30  
**Severity:** Medium — build blocked, no production impact (site not updated)  
**Status:** In Progress  
**Author:** SRE

---

## Summary

After pushing commit `9cdc712` ("blog: Evaluating AI Agents course review"), the CI pipeline failed at the **Test HTML** step. `htmltest` reported 50 errors in 173 documents. The site was not deployed. No previously published content was affected.

---

## Timeline

| Time | Event |
|------|-------|
| Pre-incident | Blog post authored locally with `hugo server` (livereload active) |
| ~2026-04-29 | Commit `9cdc712` pushed to `origin/main` with new blog post |
| ~2026-04-29 | CI pipeline triggered; `hugo --minify` succeeded |
| ~2026-04-29 | `htmltest` step failed: 50 errors in 173 documents |
| 2026-04-30 | Incident investigation begun; local reproduction attempted |
| 2026-04-30 | Root causes identified; post-mortem written |

---

## Impact

- CI build blocked on `main` branch
- Static site not updated/deployed
- No reader-facing impact (live site unchanged)

---

## Root Causes

### RC-1: Relative inter-article links in the first paragraph of articles

Several articles begin their first paragraph with relative links to sibling articles (e.g., "see [previous article](../playing-ctf-challenges-coop-with-copilot/)"). Hugo generates article summaries from the first `summaryLength` words of content. When these summaries are rendered on **list pages** (e.g., `tags/ctf/index.html`, `blog/index.html`), the relative links resolve against the list page's directory, not the article's directory — producing broken paths that `htmltest` flags as missing targets.

**Affected articles (confirmed):**
- `content/blog/playing-ctf-challenges-coop-with-copilot-part-2/index.md` — opens with `[previous article](../playing-ctf-challenges-coop-with-copilot/)`
- `content/blog/playing-ctf-challenges-coop-with-copilot-part-3/index.md` — opens with `[Part 1](..)` and `[Part 2](..)` links
- `content/blog/publishing-docs-as-code/index.md` — opens with `[Part 3](../../how-to/publish-markdown-document-to-medium/)`
- `content/explainer/container-oci-registry/pull-a-public-helm-chart/index.md` — early reference to `../../../how-to/proxy-public-chart-repositories-as-oci-artefacts/`

### RC-2: Relative image references in article summaries

Some articles embed images in their opening paragraphs (e.g., `![caption](image.png)`). When the summary appears on a list or tag page, the page-relative image path breaks.

**Affected articles (confirmed):**
- `content/blog/analysing-a-docs-as-code-pipeline/index.md` — opens with `![hard to read sentence](hard-to-read-passive-voice.png)`
- `content/food/piri-piri-prawns/index.md` — contains `![alt text](image.png)` within summary range

### RC-3: New blog post changed pagination, surfacing latent broken links

The new post ("Evaluating AI Agents") is tagged `AI`, a tag shared with the CTF Part 2 and Part 3 articles. Adding it shifted article positions across paginated list and tag pages, causing articles with RC-1 and RC-2 issues to appear on **page 1** of `blog/index.html` and `tags/ai/index.html` — pages that `htmltest` had previously checked successfully (the broken summaries were on later pages, which happen to be checked by htmltest too, but the new post's addition to the AI tag created a new `tags/ai/` first page showing these articles).

### RC-4: External URL returning 403

The new article links to `https://learn.deeplearning.ai/courses/evaluating-ai-agents/information`, which returns HTTP 403. This URL is not in the `IgnoreURLs` list in `.htmltest.yml`.

A pre-existing pattern in `.htmltest.yml` ignores `medium.com/@*` (user profile URLs) but does not cover Medium publication URLs like `medium.com/itnext/...`, which also 403.

---

## Contributing Factors

- **No local htmltest run before push.** The pre-publish workflow ran `hugo server` for preview but did not run `htmltest` locally. The CI is the first place htmltest runs.
- **`config/` directory is untracked.** Local builds use `config/_default/hugo.yaml` (which lacks `markup.goldmark.renderer.unsafe: true`) while CI uses only `config.yaml`. This divergence makes local reproduction non-trivial and injects a livereload script tag into locally-built pages (from `hugo server` artifacts), masking the true failure set.
- **`summaryLength: 25` is short enough to include problematic first-paragraph content** but long enough to capture multi-sentence opens — including cross-article links and images.
- **`IgnoreURLs` patterns are too narrow.** Medium publication URLs and new course platforms (deeplearning.ai) require manual additions when new articles link to them.

---

## What Went Well

- CI caught the regressions before the site deployed to production
- `htmltest` output was precise enough to pinpoint failing pages and links
- Local reproduction (using the docs-as-code container) was possible once the `config/` divergence was understood

---

## Next Steps

### Immediate (fix CI)

|Status| ID | Action | Owner | File(s) |
|---|----|--------|-------|---------|
| [ ] | N1 | Change relative inter-article links to site-root-relative paths (`/blog/...`) in opening paragraphs of affected articles | Author | RC-1 articles above |
| [ ] | N2 | Move `image.png` and `hard-to-read-passive-voice.png` references after a `<!--more-->` marker, or add `description` front matter to prevent them from appearing in the generated summary | Author | RC-2 articles above |
| ✅ | N3 | Add `learn.deeplearning.ai` to `IgnoreURLs` in `.htmltest.yml` | Author | `.htmltest.yml` |
| ✅ | N4 | Broaden the `medium.com` ignore pattern to cover publication URLs (e.g., `medium.com/[^@].*`) | Author | `.htmltest.yml` |

### Short-term (prevent recurrence)

|Status| ID | Action |
|----|--------|
| [ ] | S1 | Add `htmltest` to the local pre-publish checklist (run inside the docs-as-code container before pushing) |
| ✅ | S2 | Commit the `config/` directory (or consolidate into `config.yaml`) to eliminate the local/CI config divergence |
| [ ] | S3 | Consider overriding `postbox.html` to use `{{ .Summary \| plainify }}` so HTML is stripped from all list-page summaries, making relative link placement in articles irrelevant to htmltest |
| [ ] | S4 | Add a pre-push git hook that runs `htmltest` in the container on changed content |

### Long-term

|Status| ID | Action |
|----|--------|
| [ ] | L1 | Define a content convention: opening paragraphs should not contain relative links or inline images — use site-root-relative links and place images after the summary break |
| [ ] | L2 | Evaluate whether `canonifyURLs: true` in `config.yaml` can be used to convert root-relative links to absolute URLs (would cause `IgnoreURLs: douglashellinger.com` to skip them) |
| [ ] | L3 | Add a scheduled `htmltest` run or cache-busting strategy to catch newly-broken external links before authors notice |

---

## Lessons Learned

1. **Content conventions matter at build time.** Markdown feels like plain text, but rendered summaries inherit full HTML — including relative links that break context.
2. **Local/CI config parity is essential.** The untracked `config/` directory was a significant barrier to faithful local reproduction.
3. **Pagination is a hidden dependency.** Adding a new article can surface latent broken links that were previously on unchecked or later-checked pages.
4. **`IgnoreURLs` needs maintenance.** External URLs that require authentication or have WAF blocking are common; the ignore list should be updated as part of authoring new articles.

---

## Test Run Results (2026-05-02)

**Environment:** `ghcr.io/doughgle/docs-as-code:main` (vale v3.14.1, markdownlint-cli2 v0.22.0, htmltest v0.17.0, hugo v0.154.5+extended)
**Branch:** `main` (HEAD: `5fe3046`)
**Build:** `hugo --minify` ✅ succeeded — 194 pages, 15 paginator pages, 154 non-page files
**htmltest:** ✘ **64 errors in 234 documents**

> **Note:** A local untracked scratch file (`content/explainer/container-oci-registry/pull-a-public-helm-chart/excerpts.md`) caused `hugo --minify` to panic (`unknown type *hugolib.pageMetaSource`). This file is not in git and would not affect CI. It was temporarily excluded to complete the run.

### Error Summary by Root Cause

| ID | Description | Errors | Status | Action |
|----|-------------|--------|--------|--------|
| RC-1 | Relative inter-article links in summaries (on list/tag pages) | 39 | Open | N1 |
| RC-2 | Relative image refs in summaries (on list/tag pages) | 5 | Open | N2 |
| RC-3 | Pagination surfaced latent broken links | — | Open | N1, N2 (subsumed in RC-1/RC-2 counts) |
| RC-4 | External URL 403 (deeplearning.ai) | 0 | Fixed ✅ | N3 done |
| N3 | Add `learn.deeplearning.ai` to `IgnoreURLs` | — | Fixed ✅ | Done |
| N4 | Broaden `medium.com` ignore pattern | — | Fixed ✅ | Done |
| S2 | Commit `config/` directory | — | Fixed ✅ | Done (5fe3046) |

### RC-1 Detail (39 errors across 20 list/tag pages)

Relative CTF article links (`../playing-ctf-challenges-coop-with-copilot/`, `../playing-ctf-challenges-coop-with-copilot-part-2/`) appear in summaries on: `blog/index.html`, `tags/ai/`, `tags/ctf/`, `tags/cybersecurity/`, `tags/github/`, `tags/overthewire/`, `tags/problem-solving/`, `tags/programming/`, `tags/security/`, `tags/stream-cipher/`.

Relative OCI proxy link (`../../../how-to/proxy-public-chart-repositories-as-oci-artefacts/`) appears in summaries on: `explainer/index.html`, `tags/crd/`, `tags/cri/`, `tags/kubernetes/`, `tags/distribution/`, `tags/oci/`, `tags/registry/`, `tags/runtime/`.

Other RC-1 links: `../../how-to/publish-markdown-document-to-medium/` on `blog/page/2/`, `../create-a-docs-as-code-build-pipeline/` on `how-to/page/2/`.

### RC-2 Detail (5 errors across 5 list/tag pages)

| Page | Missing asset |
|------|--------------|
| `blog/page/2/index.html` | `hard-to-read-passive-voice.png` |
| `food/index.html` | `image.png` |
| `tags/docs-as-code/index.html` | `hard-to-read-passive-voice.png` |
| `tags/food/index.html` | `image.png` |
| `tags/writing/index.html` | `hard-to-read-passive-voice.png` |

### Pre-existing / Out-of-scope Errors (20 errors)

These errors are not mapped to RC-1–RC-4 and appear to be pre-existing issues:
- `http://host.docker.internal:4040/` links (local dev artefact in pyroscope article) — 4 errors
- `http://creativecommons.org/` non-HTTPS — 4 errors
- `https://doughellinger.com/` DNS failure (typo domain) — 1 error
- `git@github.com:...` SSH URL not parseable by htmltest — 1 error
- `https://gitlab.com/gitlab-de/unmaintained/docker-hub-limit-exporter/` 403 — 2 errors
- `https://community.openvpn.net/...` 403 — 1 error
- `https://www.dnsleaktest.com/` DNS failure — 1 error
- `tutorial/index.html` missing CSS/JS assets — 5 errors
- `image.png` missing in pyroscope article (article-level, not summary) — 1 error
