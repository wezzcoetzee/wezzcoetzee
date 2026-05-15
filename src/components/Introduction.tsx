import Image from 'next/image';

export default function Introduction() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10 md:gap-y-8">
      <div className="md:col-span-8 space-y-6 md:space-y-8">
        <h1 className="hero-headline rise-in" style={{ animationDelay: '0s' }}>
          I build highly scalable distributed systems, and lead the engineering teams that ship
          them.
        </h1>

        <p
          className="text-lg text-muted-foreground max-w-2xl leading-snug rise-in"
          style={{ animationDelay: '0.15s' }}
        >
          Twelve years deep in distributed systems and crypto infrastructure. Recently: Eneco Virtual Power Plant and Idexx Mass Communications.
        </p>
      </div>

      <div
        className="md:col-span-4 md:col-start-9 md:pt-3 md:border-l md:border-border md:pl-6 space-y-6 rise-in"
        style={{ animationDelay: '0.25s' }}
      >
        <div className="hidden md:block">
          <div className="relative w-20 h-20 overflow-hidden rounded-full ring-1 ring-border">
            <Image
              src="/avatar.jpg"
              alt="Wesley Coetzee"
              fill
              className="object-cover"
              sizes="5rem"
              priority
            />
          </div>
        </div>

        <dl className="grid grid-cols-3 md:grid-cols-1 gap-x-6 gap-y-5 text-sm">
          <div>
            <dt className="font-mono text-xs text-muted-foreground tracking-wide mb-1">
              currently
            </dt>
            <dd className="text-foreground">Tech Lead, Idexx</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted-foreground tracking-wide mb-1">open to</dt>
            <dd className="text-foreground">Principal / Staff &amp; contracts</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-muted-foreground tracking-wide mb-1">
              based in
            </dt>
            <dd className="text-foreground">Auckland, NZ &middot; remote</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
