import { formatShipDate, type ShipDate } from '@/data/ship-date';

type DatedRowProps = {
  title: string;
  /** Italic context beside the title: a project's one-liner, an article's publication. */
  detail: string;
  date: ShipDate;
  url: string;
  className?: string;
  style?: React.CSSProperties;
};

export function DatedRow({ title, detail, date, url, className = '', style }: DatedRowProps) {
  return (
    <li className={`border-b border-border ${className}`} style={style}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-baseline justify-between gap-4 py-4"
      >
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-primary transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-accent">
            {title}
          </span>
          <span className="text-sm italic text-muted-foreground">{detail}</span>
        </span>
        <time dateTime={date} className="shrink-0 text-sm text-muted-foreground tabular-nums">
          {formatShipDate(date)}
        </time>
      </a>
    </li>
  );
}
