export default function Introduction() {
  return (
    <div className="space-y-6 md:space-y-8">
      <p
        className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wide rise-in"
        style={{ animationDelay: '0s' }}
      >
        Tech Lead at Idexx &middot; open to Principal / Staff &amp; contracts &middot; Auckland, NZ
        &middot; remote
      </p>

      <h1 className="hero-headline rise-in" style={{ animationDelay: '0.1s' }}>
        I build highly scalable distributed systems, and lead the engineering teams that ship them.
      </h1>

      <p
        className="text-lg text-muted-foreground max-w-2xl leading-snug rise-in"
        style={{ animationDelay: '0.2s' }}
      >
        Twelve years deep in distributed systems and crypto infrastructure. Recently:{' '}
        <a
          href="https://github.com/wezzcoetzee/grvt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent transition-colors"
        >
          GRVT TypeScript SDK
        </a>
        ,{' '}
        <a
          href="https://github.com/wezzcoetzee/hyperliquid-cli"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent transition-colors"
        >
          Hyperliquid CLI
        </a>
        ,{' '}
        <a
          href="https://tradinglab.vip"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent transition-colors"
        >
          Trading Lab
        </a>
        .
      </p>
    </div>
  );
}
