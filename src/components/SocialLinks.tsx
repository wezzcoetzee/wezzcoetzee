import { GlassButtonGroup, GlassButtonGroupItem } from './liquid-glass';

const LINKS = [
  { label: 'Email', href: 'mailto:info@wezzcoetzee.com' },
  { label: 'GitHub', href: 'https://github.com/wezzcoetzee' },
  { label: 'X', href: 'https://x.com/wezzcoetzee' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wesleycoetzee/' },
  { label: 'CV', href: 'https://cv.wezzcoetzee.com' },
];

/** Floating glass dock pinned to the bottom of the viewport; the page scrolls under it. */
export function SocialLinks() {
  return (
    <nav
      aria-label="Elsewhere"
      className="fade-in fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4 [animation-delay:240ms]"
    >
      <GlassButtonGroup material="clear" tint={0.3}>
        {LINKS.map((link) => (
          <GlassButtonGroupItem key={link.href} asChild>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium">
              {link.label}
            </a>
          </GlassButtonGroupItem>
        ))}
      </GlassButtonGroup>
    </nav>
  );
}
