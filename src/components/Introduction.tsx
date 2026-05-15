import Image from 'next/image';

export default function Introduction() {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <div className="relative shrink-0 rise-in" style={{ animationDelay: '0s' }}>
          <div className="relative w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-full ring-1 ring-border">
            <Image
              src="/avatar.jpg"
              alt="Wesley Coetzee"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40vw, 12rem"
              priority
            />
          </div>
        </div>

        <div className="space-y-8 flex-1 min-w-0">
          <p className="section-marker rise-in" style={{ animationDelay: '0.05s' }}>
            wesley coetzee · principal engineer
          </p>

          <h1 className="max-w-3xl rise-in" style={{ animationDelay: '0.15s' }}>
            I build highly scalable distributed systems, and lead the engineering teams that ship
            them.
          </h1>

          <dl
            className="flex flex-col sm:flex-row gap-x-10 gap-y-4 text-sm rise-in"
            style={{ animationDelay: '0.25s' }}
          >
            <div>
              <dt className="section-marker mb-1">currently</dt>
              <dd className="text-foreground">Tech Lead, Idexx</dd>
            </div>
            <div>
              <dt className="section-marker mb-1">open to</dt>
              <dd className="text-foreground">Principal / Staff &amp; contracts</dd>
            </div>
            <div>
              <dt className="section-marker mb-1">based in</dt>
              <dd className="text-foreground">Auckland, NZ &middot; remote</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
