import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

const EMAIL = 'info@wezzcoetzee.com';

const SECONDARY_LINKS: { label: string; href: string }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wesleycoetzee/' },
  { label: 'GitHub', href: 'https://github.com/wezzcoetzee' },
  { label: 'X', href: 'https://x.com/wezzcoetzee' },
  { label: 'Medium', href: 'https://medium.com/@wezzcoetzee' },
  { label: 'CV', href: 'https://cv.wezzcoetzee.com' },
];

export default function ConnectSection() {
  return (
    <section className="space-y-10">
      <h2>Get in touch</h2>

      <div className="max-w-2xl space-y-8">
        <p className="text-lg text-foreground">
          Open to Principal or Staff roles and short contracts in distributed systems and crypto
          infrastructure. Auckland-based, remote anywhere.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href={`mailto:${EMAIL}?subject=Hello%20Wesley`}
            className="group inline-flex items-center justify-between gap-6 border border-foreground px-6 py-4 text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <span className="font-mono text-sm">{EMAIL}</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="https://cv.wezzcoetzee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            or read the CV &rarr;
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {SECONDARY_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
