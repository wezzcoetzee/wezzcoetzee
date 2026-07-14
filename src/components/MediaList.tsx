import { MEDIA } from '@/data';
import { SectionHeading } from './SectionHeading';

export function MediaList() {
  return (
    <section aria-labelledby="media-heading">
      <SectionHeading id="media-heading">MEDIA</SectionHeading>

      <ul>
        {MEDIA.map((item) => (
          <li key={item.url} className="border-b border-border">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 py-4"
            >
              <span className="text-primary transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-accent">
                {item.title}
              </span>
              <span className="shrink-0 text-sm text-muted-foreground">{item.source}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
