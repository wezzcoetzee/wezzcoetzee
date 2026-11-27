import Image from 'next/image';
import { GlassCard } from './liquid-glass';
import { ThemeToggle } from './ThemeToggle';

/** Sticky glass pill: the page bends through its rim as it scrolls underneath. */
export function SiteHeader() {
  return (
    <header className="fade-in sticky top-4 z-40 -mx-4">
      <GlassCard
        tint={0.35}
        blur={2}
        className="flex items-center justify-between rounded-full px-4 py-2.5"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 overflow-hidden rounded-full ring-1 ring-border">
            <Image
              src="/avatar.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="1.75rem"
              priority
            />
          </div>
          <span className="font-medium text-primary">Wesley Coetzee</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden sm:flex items-center gap-2 text-xs tracking-widest text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-online" aria-hidden="true" />
            AUCKLAND, NZ
          </span>
          <ThemeToggle />
        </div>
      </GlassCard>
    </header>
  );
}
