# Docs-as-Code Builder Image

A pre-configured Docker image with everything you need to write, build, test, and publish high-quality documentation using docs-as-code principles.

## 🚀 Quick Start

```sh
docker run -it --rm \
  --name docs \
  -v $(pwd):/src \
  -p 1313:1313 \
  ghcr.io/doughgle/docs-as-code:main \
  hugo server --buildDrafts --navigateToChanged
```

Visit http://localhost:1313 to see your live-reloading documentation site.

## 💡 Why This Image?

### Time Benefits

- **Zero setup time**: Pre-installed and configured tools mean you can start writing immediately
- **Consistent environments**: Same container works locally, in CI/CD, and across your team
- **Fast feedback loops**: Live reload for instant preview of changes
- **Automated checks**: Spell checking, linting, and link validation happen automatically

### Cost Benefits

- **Free and open source**: No licensing fees, no vendor lock-in
- **Reduced maintenance**: One image to update, not multiple tools on each machine
- **Lower training costs**: Team members use the same environment with the same tools
- **Minimal resource usage**: Lightweight Alpine Linux-based image

### Quality Benefits

- **Comprehensive tooling**: Hugo, spell checker, markdown linter, prose analyzer, and link checker in one image
- **Consistent standards**: Same checks run everywhere - locally and in CI/CD
- **Catch errors early**: Find typos, style issues, and broken links before publishing
- **Professional output**: Built-in best practices for documentation

## 📖 Why Docs-as-Code?

Docs-as-code applies software development practices to documentation:

### Time Benefits

- **Version control**: Track changes, revert mistakes, and collaborate with confidence
- **Automation**: Build, test, and deploy docs automatically through CI/CD pipelines
- **Reusable workflows**: Write once, publish to multiple platforms (web, PDF, Medium, etc.)
- **Parallel work**: Multiple authors can work simultaneously using branches

### Cost Benefits

- **Reduced rework**: Catch issues before they reach production
- **Self-service**: Writers can preview and publish without depending on web teams
- **Scalability**: Same process works for one page or thousands
- **Free tooling**: Leverage open source tools like Git, Hugo, and GitHub Actions

### Quality Benefits

- **Automated testing**: Spell check, style guide enforcement, link validation
- **Consistency**: Standardized formatting, terminology, and structure
- **Reviewability**: Pull requests enable peer review before publishing
- **Evolution**: Documentation improves incrementally through small, reviewed changes

## 🔧 What's Included

This image bundles these essential docs-as-code tools:

- **[Hugo Extended](https://gohugo.io/)** - Fast static site generator
- **[htmltest](https://github.com/wjdp/htmltest)** - HTML and link validation
- **[markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)** - Markdown linting
- **[markdown-spellcheck](https://github.com/lukeapage/node-markdown-spellcheck)** - Spell checking
- **[write-good](https://github.com/btford/write-good)** - Prose readability analysis

## 📚 Learn More

Explore in-depth guides and examples on how to use docs-as-code:

### Getting Started

- **[How To Create a Docs as Code Build Pipeline](https://www.douglashellinger.com/how-to/create-a-docs-as-code-build-pipeline/)** - Step-by-step guide to set up your first docs-as-code pipeline

### Deep Dives

- **[Creating A Docs As Code Pipeline](https://www.douglashellinger.com/blog/creating-a-docs-as-code-pipeline/)** - Why docs-as-code matters and how it makes reading and writing easier

- **[Analysing A Docs As Code Pipeline](https://www.douglashellinger.com/blog/analysing-a-docs-as-code-pipeline/)** - Understanding the tools, techniques, and trade-offs

- **[Publishing Docs as Code](https://www.douglashellinger.com/blog/publishing-docs-as-code/)** - Complete series overview with links to all parts

### Advanced

- **[How To Publish Markdown Document to Medium](https://www.douglashellinger.com/how-to/publish-markdown-document-to-medium/)** - Automate publishing from markdown to Medium

- **[Docs as Code Build Pipeline Explained](https://www.douglashellinger.com/explainer/docs-as-code-build-pipeline-explained/)** - Detailed explainer of tools and trade-offs

## 🎯 Common Use Cases

### Create New Article

Use a [page bundle](https://gohugo.io/content-management/page-bundles/) for your content:

```sh
$ hugo new how-to/enable-hdmi-on-thinkpad-x1-extreme-gen-4/index.md
Content "/media/dough/Storage/repos/exercises/personal-website/write/content/how-to/enable-hdmi-on-thinkpad-x1-extreme-gen-4/index.md" created
```

### Run Hugo Server

Show content that is still in draft status:

```sh
$ docker run -it --rm \
  --name docs \
  -v $(pwd):/src \
  -p 1313:1313 \
  ghcr.io/doughgle/docs-as-code:main \
  hugo server --buildDrafts --navigateToChanged
```

Example output:

```
Start building sites … 
hugo v0.107.0-2221b5b30a285d01220a26a82305906ad3291880+extended linux/amd64 BuildDate=2022-11-24T13:59:45Z VendorInfo=hugoguru

                   | EN  
-------------------+-----
  Pages            | 40  
  Paginator pages  |  1  
  Non-page files   | 13  
  Static files     |  4  
  Processed images |  0  
  Aliases          | 15  
  Sitemaps         |  1  
  Cleaned          |  0  

Built in 37 ms
Watching for changes in /src/{archetypes,content,data,layouts,static,themes}
Watching for config changes in /src/config.yaml
Environment: "production"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 0.0.0.0)
Press Ctrl+C to stop
```

### Interactive Tool Usage

Execute tools interactively:

```sh
docker run -it --rm \
  --name test \
  -v $(pwd):/src \
  ghcr.io/doughgle/docs-as-code:main \
  bash
```

### CI/CD Testing

Run GitHub Workflow locally (depends on [act gh extension](https://github.com/nektos/act)):

```sh
gh act -W .github/workflows/medium.yml \
  --input file="content/blog/hello-world/index.md" \
  --secret MEDIUM_INTEGRATION_TOKEN
```

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Issues and pull requests are welcome! This image is designed to help the docs-as-code community.

## 🌟 Get Started Today

1. Pull the image: `docker pull ghcr.io/doughgle/docs-as-code:main`
2. Start writing: Mount your content directory and run Hugo server
3. Automate: Use in your CI/CD pipeline for automated quality checks

Check out the [getting started guide](https://www.douglashellinger.com/how-to/create-a-docs-as-code-build-pipeline/) to learn more!