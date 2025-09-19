'use client';

export type ContactIcon = {
  icon?: any;
  link: string;
  name?: string;
  target: string;
  description: string;
};

interface SocialCardProps {
  contact: ContactIcon;
}

export default function SocialCard({ contact }: SocialCardProps) {
  const sendGoogleAnalyticsEvent = (
    link: string,
    analyticData: {
      action: string;
      category: string;
      label: string;
      value: string;
    }
  ) => {
    try {
      (window as any).gtag('event', analyticData.action, {
        event_category: analyticData.category,
        event_label: analyticData.label,
        value: analyticData.value,
      });
    } catch (e: any) {
      console.error('No Google Analytics detected');
    }

    window.open(link, '_blank');
  };

  return (
    <button
      type="button"
      className="group relative block w-full p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-lg hover:scale-[1.02] hover:bg-card/70 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
      onClick={() =>
        sendGoogleAnalyticsEvent(contact.link, {
          action: 'click',
          category: 'social',
          label: 'external',
          value: contact.name!,
        })
      }
      aria-label={`Visit ${contact.name} - ${contact.description}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
          {contact.icon || <div className="w-6 h-6 rounded bg-primary/20" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-card-foreground capitalize group-hover:text-primary transition-colors duration-200">
            {contact.name || 'Visit Link'}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{contact.description}</p>
        </div>
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg
            className="w-4 h-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
