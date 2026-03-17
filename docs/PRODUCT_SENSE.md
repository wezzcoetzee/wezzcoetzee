# Product Sense

## What This Is

Personal portfolio site for Wesley Coetzee — Tech Lead and Principal Software Engineer based in Auckland, NZ. Hosted at [wezzcoetzee.com](https://wezzcoetzee.com).

## Purpose

Showcase professional identity, featured projects, and social presence to recruiters, collaborators, and the broader tech community.

## Core User Flow

```
Visitor lands on homepage
  → Reads introduction (hero section)
  → Scrolls to About section
  → Browses Featured Work (project cards)
  → Clicks a project → Case Study detail page
  → Scrolls to Connect section → follows social links
```

There is one user type: the visitor. There are no accounts, no forms, no user-generated content.

## Site Sections

| Section | Purpose |
|---------|---------|
| Introduction | Hero with name, title, tagline |
| About | Professional background |
| Featured Work | Grid of project cards linking to case studies |
| Case Study (`/work/[slug]/`) | Detailed project page with description, tech, highlights, links |
| Connect | Social links (LinkedIn, GitHub, Medium, X, CV, StackOverflow) |

## What This Is NOT

- Not a CMS — content is hardcoded in TypeScript files
- Not a blog — articles are hosted externally (Medium, CoinsBench)
- Not a web app — no user interaction beyond navigation
- Not dynamic — fully static, no server-side rendering at request time
- Not a SaaS product — no features, no roadmap, no pricing

## Content Update Process

To add a new project: add an entry to the `PROJECTS` array in `src/data/projects.ts`. The case study page, sitemap, and structured data update automatically at build time.

To update social links: edit the `CONTACTS` array in `src/data/index.tsx`.
