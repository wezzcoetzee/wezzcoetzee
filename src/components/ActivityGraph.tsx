'use client';

import { useEffect, useState } from 'react';
import { SectionHeading } from './SectionHeading';

const GITHUB_USER = 'wezzcoetzee';
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

type Day = {
  date: string;
  count: number;
  level: number;
};

type Status = 'loading' | 'ready' | 'error';

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** The API returns days starting on a Sunday, so a flat chunk of 7 is one column. */
function toWeeks(days: Day[]): Day[][] {
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

/** Label a column only when its first day starts a month we haven't labelled yet. */
function monthLabels(weeks: Day[][]): (string | null)[] {
  let previous = -1;
  return weeks.map((week) => {
    const month = new Date(week[0].date).getMonth();
    if (month === previous) return null;
    previous = month;
    return MONTHS[month];
  });
}

export function ActivityGraph() {
  const [days, setDays] = useState<Day[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const controller = new AbortController();

    fetch(CONTRIBUTIONS_API, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Contributions API returned ${res.status}`);
        return res.json();
      })
      .then((data: { contributions: Day[] }) => {
        setDays(data.contributions);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setStatus('error');
      });

    return () => controller.abort();
  }, []);

  if (status === 'error') return null;

  const weeks = toWeeks(days);
  const months = monthLabels(weeks);

  return (
    <section aria-labelledby="activity-heading">
      <SectionHeading id="activity-heading">ACTIVITY</SectionHeading>

      <div className="overflow-x-auto pb-2">
        <div
          className="inline-flex gap-2 pt-2"
          style={{ opacity: status === 'loading' ? 0 : 1, transition: 'opacity 0.4s ease' }}
        >
          <div className="flex flex-col gap-[2px] pt-[16px] text-[10px] leading-[10px] text-muted-foreground">
            {DAY_LABELS.map((label, i) => (
              <span key={i} className="h-[10px]">
                {label}
              </span>
            ))}
          </div>

          <div>
            <div className="flex gap-[2px] h-[16px] text-[10px] text-muted-foreground">
              {weeks.map((week, i) => (
                <span key={week[0].date} className="w-[10px] shrink-0">
                  {months[i]}
                </span>
              ))}
            </div>

            <div className="flex gap-[2px]">
              {weeks.map((week) => (
                <div key={week[0].date} className="flex flex-col gap-[2px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                      className="w-[10px] h-[10px] rounded-[2px]"
                      style={{ backgroundColor: `var(--color-level-${day.level})` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
