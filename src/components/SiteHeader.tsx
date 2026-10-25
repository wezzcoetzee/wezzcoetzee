import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative w-7 h-7 overflow-hidden rounded-full ring-1 ring-border">
          <Image src="/avatar.jpg" alt="" fill className="object-cover" sizes="1.75rem" priority />
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
    </header>
  );
}
