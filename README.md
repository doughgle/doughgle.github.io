## Create new article

Use a [page bundle](https://gohugo.io/content-management/page-bundles/), but specify the `index.md` with markdown extension.

```sh
$ hugo new how-to/enable-hdmi-on-thinkpad-x1-extreme-gen-4/index.md
Content "/media/dough/Storage/repos/exercises/personal-website/write/content/how-to/enable-hdmi-on-thinkpad-x1-extreme-gen-4/index.md" created
```

## Run Hugo server

Show content that is still in draft status.
Use the same docs-as-code container that is used in CI/CD.

```sh
$ docker run -it --rm \
  --name docs \
  -v $(pwd):/src \
  -p 1313:1313 \
  ghcr.io/doughgle/docs-as-code:main \
  hugo server --buildDrafts --navigateToChanged
```

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