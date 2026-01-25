# Plan: Create README.md for docs-as-code Builder Image Repository

## Context

This plan is for creating a comprehensive README.md for the **docs-as-code builder image repository** (the repository containing the Containerfile/Dockerfile that builds `ghcr.io/doughgle/docs-as-code:main`).

## Objective

Transform the README.md into comprehensive open source product documentation that:
1. Introduces the docs-as-code image as an open source product
2. Highlights time, cost, and quality benefits of the image
3. Highlights time, cost, and quality benefits of docs-as-code principles
4. Links to relevant articles on https://www.douglashellinger.com/
5. Provides clear usage examples and getting started instructions

## Complete README.md Content

Below is the complete README.md content to be created in the docs-as-code builder image repository:

---

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

- **[Docs-as-code Build Pipeline Explained](https://www.douglashellinger.com/explainer/docs-as-code-build-pipeline-explained/)** - Detailed explainer of tools and trade-offs

## 🎯 Common Use Cases

### Local Development

Run Hugo server with live reload:

```sh
docker run -it --rm \
  --name docs \
  -v $(pwd):/src \
  -p 1313:1313 \
  ghcr.io/doughgle/docs-as-code:main \
  hugo server --buildDrafts --navigateToChanged
```

### Interactive Shell

Execute tools interactively:

```sh
docker run -it --rm \
  --name docs \
  -v $(pwd):/src \
  ghcr.io/doughgle/docs-as-code:main \
  bash
```

Then run any of the included tools:
- `markdownlint-cli2 '**/*.md'` - Lint markdown files
- `mdspell '**/*.md'` - Check spelling
- `write-good *.md` - Analyze prose readability
- `hugo build` - Build static site
- `htmltest` - Validate HTML and links

### CI/CD Pipeline

Use in GitHub Actions workflow:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    container: ghcr.io/doughgle/docs-as-code:main
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Lint markdown
        run: markdownlint-cli2 '**/*.md'
      
      - name: Build site
        run: hugo --minify
      
      - name: Test HTML
        run: htmltest
```

## 🛠️ Building the Image

The image is based on `klakegg/hugo:ext-alpine-ci` with additional tools installed.

See the [How To Create a Docs as Code Build Pipeline](https://www.douglashellinger.com/how-to/create-a-docs-as-code-build-pipeline/) guide for detailed instructions on building and publishing the image.

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Issues and pull requests are welcome! This image is designed to help the docs-as-code community.

## 🌟 Get Started Today

1. Pull the image: `docker pull ghcr.io/doughgle/docs-as-code:main`
2. Start writing: Mount your content directory and run Hugo server
3. Automate: Use in your CI/CD pipeline for automated quality checks

Check out the [getting started guide](https://www.douglashellinger.com/how-to/create-a-docs-as-code-build-pipeline/) to learn more!

---

## Implementation Steps

1. Navigate to the correct repository (the one containing the Containerfile for the docs-as-code image)
2. Replace or create the README.md with the above content
3. Commit and push the changes
4. Verify the README renders correctly on GitHub

## Notes

- The article titles are preserved exactly as they appear in the source files to match what's published on douglashellinger.com
- The README is optimized for readability on GitHub with emoji section markers
- All existing functionality (usage examples) is preserved while adding comprehensive product documentation
- The structure follows best practices for open source project README files
