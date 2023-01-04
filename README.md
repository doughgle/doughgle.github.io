## Create new article

Use a [page bundle](https://gohugo.io/content-management/page-bundles/), but specify the `index.md` with markdown extension.

```sh
$ hugo new how-to/enable-hdmi-on-thinkpad-x1-extreme-gen-4/index.md
Content "/media/dough/Storage/repos/exercises/personal-website/write/content/how-to/enable-hdmi-on-thinkpad-x1-extreme-gen-4/index.md" created
```

## Run Hugo server

Show content that is still in draft status.

```sh
$ hugo server --buildDrafts 
Start building sites … 
hugo v0.99.0-1de333e7a3fc863672ec6d6cd53ba66dbcdd2305+extended linux/amd64 BuildDate=2022-05-16T08:10:56Z VendorInfo=gohugoio

                   | EN  
-------------------+-----
  Pages            | 20  
  Paginator pages  |  0  
  Non-page files   |  5  
  Static files     |  4  
  Processed images |  0  
  Aliases          |  7  
  Sitemaps         |  1  
  Cleaned          |  0  

Built in 35 ms
Watching for changes in /media/dough/Storage/repos/exercises/personal-website/write/{archetypes,content,data,layouts,static,themes}
Watching for config changes in /media/dough/Storage/repos/exercises/personal-website/write/config.yaml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```