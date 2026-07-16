import { SectionHeading } from './SectionHeading';

const GITHUB_USER = 'wezzcoetzee';

/** ghchart renders a fixed 663x104 SVG; the cells stay legible only at native size. */
const CHART_WIDTH = 663;
const CHART_HEIGHT = 104;

export function ActivityGraph() {
  return (
    <section aria-labelledby="activity-heading">
      <SectionHeading id="activity-heading">ACTIVITY</SectionHeading>

      <div className="overflow-x-auto pb-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- third-party SVG, not optimisable by next/image under static export */}
        <img
          src={`https://ghchart.rshah.org/${GITHUB_USER}`}
          alt={`GitHub contribution activity for ${GITHUB_USER} over the last year`}
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          className="gh-chart mt-2 max-w-none"
        />
      </div>
    </section>
  );
}
