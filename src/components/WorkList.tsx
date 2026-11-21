'use client';

import { useState } from 'react';
import { WORK } from '@/data';
import { DatedRow } from './DatedRow';
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
        {items.map((item, i) => {
          const revealed = expanded && i >= VISIBLE;
          return (
            <DatedRow
              key={item.url}
              title={item.title}
              detail={item.role}
              date={item.date}
              url={item.url}
              className={revealed ? 'rise-in' : ''}
              style={revealed ? { animationDelay: `${(i - VISIBLE) * 50}ms` } : undefined}
            />
          );
        })}
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
