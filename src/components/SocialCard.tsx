'use client';

import type { ReactNode } from 'react';

declare global {
  interface Window {
    gtag?: (command: 'event', action: string, params: Record<string, string>) => void;
  }
}

export type ItemIcon = {
  icon?: ReactNode;
  link: string;
  name?: string;
  target: string;
  description: string;
};

interface SocialCardProps {
  contact: ItemIcon;
  index: number;
}

export default function SocialCard({ contact, index }: SocialCardProps) {
  const sendGoogleAnalyticsEvent = (
    link: string,
    analyticData: {
      action: string;
      category: string;
      label: string;
      value: string;
    }
  ) => {
    if (window.gtag) {
      window.gtag('event', analyticData.action, {
        event_category: analyticData.category,
        event_label: analyticData.label,
        value: analyticData.value,
      });
    }

    window.open(link, '_blank');
  };

  return (
    <button
      type="button"
      className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"
      onClick={() =>
        sendGoogleAnalyticsEvent(contact.link, {
          action: 'click',
          category: 'social',
          label: 'external',
          value: contact.name!,
        })
      }
      aria-label={`Visit ${contact.name} - ${contact.description}`}
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s forwards`,
      }}
    >
      <div className="card-minimal p-6">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 flex items-center justify-center border border-border text-muted-foreground">
              {contact.icon || <div className="w-6 h-6 bg-muted-foreground/30" />}
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-display text-xl font-semibold transition-colors duration-300 capitalize leading-tight text-foreground">
                {contact.name || 'Visit Link'}
              </h3>

              <div className="flex-shrink-0 transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {contact.description}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
