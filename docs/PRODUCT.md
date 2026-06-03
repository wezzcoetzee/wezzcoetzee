# Product

## Register

brand

## Users

Recruiters, founders/collaborators, and technical peers — visiting in roughly equal measure, all wearing a professional lens. Recruiters scan for seniority signal in seconds. Founders look for someone they'd trust with a hard, ambiguous problem. Peers evaluate taste and craft, and decide whether to follow, cite, or refer. The site has to land all three reads simultaneously without pandering to any of them.

## Product Purpose

A personal portfolio for Wesley Coetzee — Principal Engineer working in distributed systems and blockchain. Its job is to compress "who this person is, what they've built, and whether to reach out" into a few minutes of attention. Success is an inbound message about a role or project from someone who already feels they know the bar before they hit send.

## Brand Personality

Precise, minimal, confident.

Voice is plainspoken and senior: no hedging, no marketing varnish, no performative humility. Tone leans editorial rather than promotional. Where there's emotion, it's quiet — credibility first, then intrigue, then approachability. The interface should feel like a senior engineer's notebook, not a sales page.

## Anti-references

- **Notion-clone resume pages.** Bullet-list resumes styled as a webpage with no point of view. If this site reads like a structured CV in HTML, it has failed.
- **SaaS marketing surfaces.** Hero metric, three-up feature grid, gradient buttons, testimonial carousel, "Trusted by" logo strip. None of that vocabulary belongs here.
- **Generic dev-portfolio defaults.** Black background, neon accent, Inter everywhere, "Hi, I'm X" h1, tech-logo wall as a personality substitute.
- **Maximalist novelty.** 3D heroes, scroll-jacking, WebGL for its own sake. Craft, not spectacle.

## Design Principles

1. **The work is the argument.** Show projects, writing, and decisions; don't describe them in adjectives. If a claim needs a label like "senior" or "expert," cut it and let the artifact carry the weight.
2. **Earned attention.** Nothing animates, decorates, or interrupts unless it improves comprehension or hierarchy. Restraint is the default; flourish has to justify itself.
3. **Typography over chrome.** Hierarchy, mood, and rhythm come from a single Geist sans family and spacing — not from cards, borders, or color accents.
4. **One-read clarity for three audiences.** Every surface should read coherently to a recruiter, a founder, and a peer in a single pass. No section that only makes sense to one of them.
5. **Make contact obvious, never loud.** The desired outcome is an inbound message. Reach-out should be findable from any screen without ever being the loudest element on it.

## Accessibility & Inclusion

WCAG AA baseline across both themes, with visible focus states on every interactive element. Honor `prefers-reduced-motion` (already wired through globals.css) — entrance animations collapse to near-zero duration. Both dark (default) and warm-light themes must hold contrast independently; light mode is not a degraded mode. No information conveyed by color alone.
