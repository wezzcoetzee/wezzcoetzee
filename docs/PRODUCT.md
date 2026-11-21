# Product

## Register

brand

## Users

Recruiters, founders/collaborators, and technical peers, visiting in roughly equal measure, all reading with a professional lens. Recruiters scan for seniority signal in seconds. Founders look for someone they'd trust with a hard, ambiguous problem. Peers judge taste and craft, and decide whether to follow, cite, or refer. Many arrive from GitHub or X after seeing one specific tool, so the page is often a second impression, not a first. It has to land all three reads at once without pandering to any of them.

## Product Purpose

The personal site of Wesley Coetzee, an engineer building AI agents and the tools around them, grounded in years of distributed systems and crypto infrastructure work (currently Tech Lead at Idexx). Its job is to show what he is building right now and make it worth coming back to. Success is a follow: a visitor subscribes on X or GitHub because the stream of shipped experiments looks like it will keep being interesting. Inbound role or project messages are a welcome second-order effect.

## Brand Personality

Precise, curious, confident.

Voice is plainspoken and senior: no hedging, no marketing varnish, no performative humility. Tone leans editorial rather than promotional. Where there's emotion, it's quiet: credibility first, then intrigue, then approachability. The interface should feel like a live workbench inside a senior engineer's notebook: restrained, but visibly in motion, with new experiments landing often enough that a return visit shows something new.

Reference: the Linear changelog, for its cadence. Every entry is dated and earns its place, and the steady rhythm of releases is itself the signal.

## Anti-references

- **Notion-clone resume pages.** Bullet-list resumes styled as a webpage with no point of view. If this site reads like a structured CV in HTML, it has failed.
- **SaaS marketing surfaces.** Hero metric, three-up feature grid, gradient buttons, testimonial carousel, "Trusted by" logo strip. None of that vocabulary belongs here.
- **Generic dev-portfolio defaults.** Black background, neon accent, Inter everywhere, "Hi, I'm X" h1, tech-logo wall as a personality substitute.
- **Maximalist novelty.** 3D heroes, scroll-jacking, WebGL for its own sake. Craft, not spectacle.

## Design Principles

1. **The work is the argument.** Show projects, writing, and decisions; don't describe them in adjectives. If a claim needs a label like "senior" or "expert", cut it and let the artifact carry the weight.
2. **Show the cadence.** Recency is part of the credibility. Dated entries, newest first, a visible sense of what shipped lately. A stale page reads as a stalled builder.
3. **Restraint by default.** Nothing animates, decorates, or interrupts unless it improves comprehension or hierarchy. Hierarchy, mood, and rhythm come from type and spacing, not from cards, borders, or colour.
4. **One read, three audiences.** Every surface should read coherently to a recruiter, a founder, and a peer in a single pass. No section that only makes sense to one of them.
5. **Following is findable, never loud.** The desired outcome is a follow. Ways to follow and reach out should be findable from any screen without ever being the loudest element on it.

## Accessibility & Inclusion

WCAG AA baseline across both themes, with visible focus states on every interactive element. Honor `prefers-reduced-motion` (already wired through globals.css): entrance animations collapse to near-zero duration. Both dark (default) and light themes must hold contrast independently; light mode is not a degraded mode. No information conveyed by color alone.
