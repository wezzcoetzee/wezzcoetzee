# Search Console fixes — two PRs to open

Both branches are committed on your laptop but **not pushed** — this session has no
GitHub credentials (your macOS keychain isn't available to it).

## 1. Push both branches

```bash
cd ~/Development/public-repositories/wezzcoetzee
git push -u origin fix/work-url-redirects

cd ~/Development/public-repositories/printable-cv
git push -u origin fix/cv-canonical-urls
```

## 2. Open the PRs

After pushing, GitHub prints a "Create a pull request" link. Or use these:

- https://github.com/wezzcoetzee/wezzcoetzee/compare/main...fix/work-url-redirects
- https://github.com/wezzcoetzee/printable-cv/compare/main...fix/cv-canonical-urls

---

# PR 1 — wezzcoetzee

**Title:** `fix: 301 legacy /work/* URLs to their current destinations`

**Body:**

Google Search Console reports 10 URLs under **Not found (404)** for this site,
first detected 25 Jul 2026:

```
/work/                          /work/email-verification/
/work/beth-stack/               /work/grvt-sdk/
/work/printable-cv/             /work/risk-management/
/work/solana-dca-bot/           /work/solidity-tips-and-tricks/
/work/trading-lab/              /work/weth-permit-exploit/
```

These are the case-study routes removed in d53cc91 ("Simplify portfolio into a
single-page home experience"). They're still indexed, and any inbound links to
them are dead.

### Why `_redirects` and not `next.config.ts`

The site builds with `output: 'export'`, so Next's `redirects()` config is ignored
at build time. Cloudflare Pages reads a `_redirects` file from the deployed
directory instead. `public/` is copied into `out/`, which is what the workflow
publishes — so `public/_redirects` is the right home for these.

### Mapping

Each slug 301s to the destination the homepage now links to (GitHub repo, article,
or live site). Four slugs retired before the redesign — `tokengochi`,
`tradingview-mcp`, `hyperliquid-cli`, `claude-code-config` — are covered too, since
they were live at some point. `risk-management` has no surviving destination and
falls back to `/`, as does a catch-all `/work/*` splat for anything unlisted.

Both bare and trailing-slash forms are listed, since the indexed URLs use trailing
slashes (`trailingSlash: true`).

### Verification

- `tsc --noEmit` passes
- All 28 rules are well-formed 3-field lines
- **Not build-verified** — `bun run build` couldn't run in the sandbox (no network,
  and `node_modules` was installed on macOS so the Linux SWC binary is missing)

### After merge

Once deployed, hit **Validate Fix** on the "Not found (404)" report in Search
Console so Google reprocesses these rather than waiting for a natural recrawl.

---

# PR 2 — printable-cv

**Title:** `fix: point CV canonical URLs at cv.wezzcoetzee.com`

**Body:**

Every canonical signal in this app declares `https://www.wezzcoetzee.com` — the
main site, not this one. The effect is that the CV subdomain tells Google it's a
duplicate of the main site, so it can't rank on its own.

Visible in Search Console today: `cv.wezzcoetzee.com/sitemap.xml` reports "Success"
but its single entry is `https://www.wezzcoetzee.com`, and effectively nothing from
this app is indexed under its own host.

### Changes

| File | Field |
|---|---|
| `layout.tsx` | `metadataBase` |
| `layout.tsx` | `openGraph.url` |
| `page.tsx` | `alternates.canonical` |
| `sitemap.ts` | the sitemap entry |
| `robots.ts` | the declared sitemap location |

`resume-data.tsx` is intentionally unchanged — `personalWebsiteUrl` really does
point at the main site.

### Verification

- `tsc --noEmit` passes
- **Not build-verified** — same sandbox limitation as above

### After merge

Once deployed, resubmit `https://cv.wezzcoetzee.com/sitemap.xml` in Search Console
so Google picks up the corrected host.
