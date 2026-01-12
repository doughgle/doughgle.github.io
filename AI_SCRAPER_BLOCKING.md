# AI Scraper Blocking Solutions for GitHub Pages

This document outlines the implemented solutions and additional recommendations for blocking AI LLM scrapers while allowing traditional search engine indexing on this Hugo site hosted on GitHub Pages.

## Implemented Solutions

### 1. robots.txt Configuration
**Location:** `static/robots.txt`

A comprehensive robots.txt file has been created based on official bot documentation that:
- **Allows** traditional search engines (Google, Bing, DuckDuckGo, Yahoo, Baidu, Yandex, etc.)
- **Blocks** known AI LLM scrapers including:
  - OpenAI (GPTBot, ChatGPT-User) - verified against official OpenAI documentation
  - Google AI (Google-Extended, GoogleOther) - per Google's official crawler documentation
  - Anthropic (ClaudeBot, anthropic-ai, Claude-Web) - per Anthropic's official bot documentation
  - Meta AI (FacebookBot, Meta-ExternalAgent, Meta-ExternalFetcher)
  - Common Crawl (CCBot, omgili, omgilibot)
  - Perplexity AI (PerplexityBot)
  - Amazon (Amazonbot)
  - Bytedance/TikTok (Bytespider)
  - Apple AI (Applebot-Extended) - for AI training only, regular Applebot allowed
  - Cohere (cohere-ai)
  - And many other known AI/ML crawlers

**Note:** Only official, documented user agents are included. Duplicate and unofficial variants have been removed.

The file is placed in the `static/` directory, which Hugo automatically copies to the root of the published site.

### 2. Meta Tags in HTML Headers
**Location:** `layouts/partials/_shared/head.html`

Meta tags have been added to all pages that:
- **Allow** traditional search engines with full indexing permissions
- **Block** the same AI scrapers listed in robots.txt using `noindex, nofollow` directives
- Include `<link rel="license">` for machine-readable Creative Commons license information

This provides a second layer of protection in case scrapers ignore robots.txt.

### 3. Creative Commons License (CC-BY 4.0)
**Locations:** 
- `layouts/partials/_shared/head.html` - Machine-readable license link
- `layouts/partials/_shared/footer.html` - Human-readable license notice
- `layouts/shortcodes/cc-by.html` - Reusable shortcode for content

Following Stack Overflow's approach, all original content on the site is licensed under Creative Commons Attribution 4.0 International License by default:
- Visible license badge and text in the footer of every page
- Machine-readable license link in HTML head section
- Clear attribution requirements for content reuse
- Shortcode available for inline use: `{{</* cc-by */>}}`

This licensing approach:
- Protects your intellectual property rights
- Allows legitimate sharing with proper attribution
- Complements the AI scraper blocking by establishing legal terms
- Makes your licensing intent clear to both humans and machines

## Additional Recommendations

### 3. Server-Level Blocking (GitHub Pages Limitation)
**Status:** Not applicable for GitHub Pages

GitHub Pages does not provide access to server configuration files (Apache .htaccess or Nginx config). If you migrate to a different hosting solution, you could implement:

- **User-Agent Blocking:** Configure the web server to return 403 Forbidden or 404 Not Found responses for known AI bot user agents
- **Rate Limiting:** Implement aggressive rate limiting for suspicious traffic patterns
- **IP-based Blocking:** Block known IP ranges associated with AI scraping operations

### 4. Cloudflare or CDN Protection
**Status:** Recommended for consideration

If you use Cloudflare or another CDN in front of GitHub Pages:
- Enable Cloudflare's Bot Fight Mode
- Create custom WAF rules to block specific user agents
- Use rate limiting rules
- Monitor analytics for suspicious crawling patterns

### 5. Content Delivery Network (CDN) with Bot Management
**Status:** Optional enhancement

Services like Cloudflare, Fastly, or Akamai offer sophisticated bot management:
- Machine learning-based bot detection
- Challenge pages for suspicious requests
- Geographic blocking if needed
- Real-time traffic analysis

### 6. Monitoring and Analytics
**Status:** Recommended

Implement monitoring to detect AI scrapers:
- Review Google Analytics or similar tools for unusual user agents
- Monitor server logs (if migrating from GitHub Pages)
- Set up alerts for traffic spikes from non-traditional user agents

### 7. Legal Protections
**Status:** Optional

Consider adding:
- Terms of Service explicitly prohibiting AI scraping
- Copyright notices on all pages
- DMCA notices for unauthorized use

### 8. Dynamic Content Generation
**Status:** Not applicable for static sites

For dynamic applications, you could:
- Implement JavaScript challenges
- Use CAPTCHAs for suspicious patterns
- Serve different content based on user agent detection

## Current Limitations on GitHub Pages

GitHub Pages is a static hosting service with the following constraints:
1. No server-side configuration access
2. No ability to customize HTTP headers beyond what Hugo generates
3. No server-side user agent blocking
4. Limited to HTML meta tags and robots.txt for bot control

## Effectiveness Notes

### What Works Well:
- **robots.txt:** Respected by well-behaved bots (most major AI companies claim to respect it)
- **Meta tags:** Provide additional protection for compliant crawlers
- **Hugo integration:** Automatically applied to all pages during build

### Limitations:
- **Voluntary compliance:** Both robots.txt and meta tags rely on scrapers honoring them
- **Bad actors:** Malicious scrapers may ignore these directives entirely
- **New bots:** New AI services may not be in our block list yet

## Maintenance

This configuration should be reviewed periodically:
1. **Monthly:** Check for new AI scraper user agents to add
2. **After major AI announcements:** Update when new AI services launch
3. **Monitor effectiveness:** Review analytics for scraping patterns

## References

- [OpenAI GPTBot documentation](https://platform.openai.com/docs/bots)
- [Google Extended documentation](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)
- [Anthropic Claude bots](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Common Crawl robots.txt](https://commoncrawl.org/big-picture/frequently-asked-questions/)
- [Dark Visitors AI Bot Directory](https://darkvisitors.com/) - Comprehensive list of AI bots with official documentation
- [Creative Commons CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) - License details and legal code
- [Stack Overflow licensing approach](https://stackoverflow.com/help/licensing) - Inspiration for CC licensing implementation

## Testing

To verify the implementation:
1. Check that robots.txt is accessible at: https://www.douglashellinger.com/robots.txt
2. Inspect any page source to verify meta tags are present in the `<head>` section
3. Use online robots.txt validators
4. Monitor server logs for bot activity (when available)

## Future Enhancements

If requirements change or GitHub Pages adds new features, consider:
1. Implementing a Content Security Policy (CSP) if GitHub Pages supports custom headers
2. Using a custom domain with Cloudflare for enhanced protection
3. Migrating to a platform with more granular bot control if needed
