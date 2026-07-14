'use client';

import { useState } from 'react';
import { WORK } from '@/data';
import { SectionHeading } from './SectionHeading';

const VISIBLE = 5;

export function WorkList() {
  const [expanded, setExpanded] = useState(false);

  const items = expanded ? WORK : WORK.slice(0, VISIBLE);
  const hidden = WORK.length - VISIBLE;

  return (
    <section aria-labelledby="work-heading">
      <SectionHeading id="work-heading">WORK</SectionHeading>

      <ul>
        {items.map((item, i) => (
          <li
            key={item.url}
            className={`border-b border-border ${expanded && i >= VISIBLE ? 'rise-in' : ''}`}
            style={
              expanded && i >= VISIBLE ? { animationDelay: `${(i - VISIBLE) * 50}ms` } : undefined
            }
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 py-4"
            >
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-primary transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-accent">
                  {item.title}
                </span>
                <span className="text-sm italic text-muted-foreground">{item.role}</span>
              </span>
              <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                {item.year}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-4 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          {expanded ? '− Show less' : `+ ${hidden} more`}
        </button>
      )}
    </section>
  );
}
