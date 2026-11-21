import { MEDIA } from '@/data';
import { DatedRow } from './DatedRow';
import { SectionHeading } from './SectionHeading';

export function MediaList() {
  return (
    <section aria-labelledby="media-heading">
      <SectionHeading id="media-heading">MEDIA</SectionHeading>

      <ul>
        {MEDIA.map((item) => (
          <DatedRow
            key={item.url}
            title={item.title}
            detail={item.source}
            date={item.date}
            url={item.url}
          />
        ))}
      </ul>
    </section>
  );
}
