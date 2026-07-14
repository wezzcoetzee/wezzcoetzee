const LINKS = [
  { label: 'Email', href: 'mailto:info@wezzcoetzee.com' },
  { label: 'GitHub', href: 'https://github.com/wezzcoetzee' },
  { label: 'X', href: 'https://x.com/wezzcoetzee' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wesleycoetzee/' },
  { label: 'CV', href: 'https://cv.wezzcoetzee.com' },
];

export function SocialLinks() {
  return (
    <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
