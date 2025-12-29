'use client';

import { useState } from 'react';

export type ContactIcon = {
  icon?: any;
  link: string;
  name?: string;
  target: string;
  description: string;
};

interface SocialCardProps {
  contact: ContactIcon;
  index: number;
}

export default function SocialCard({ contact, index }: SocialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
      className="group relative block w-full text-left focus:outline-none overflow-hidden"
      onClick={() =>
        sendGoogleAnalyticsEvent(contact.link, {
          action: 'click',
          category: 'social',
          label: 'external',
          value: contact.name!,
        })
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Visit ${contact.name} - ${contact.description}`}
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s forwards`,
      }}
    >
      {/* Card background */}
      <div
        className="relative bg-card border-2 transition-all duration-300 p-6"
        style={{
          borderColor: isHovered ? 'rgba(203, 213, 225, 0.5)' : 'rgba(71, 85, 105, 0.3)',
          boxShadow: isHovered
            ? '0 0 20px rgba(203, 213, 225, 0.3), inset 0 0 15px rgba(203, 213, 225, 0.05)'
            : '0 0 10px rgba(71, 85, 105, 0.2)',
        }}
      >
        {/* Offset chrome shadow element */}
        <div
          className="absolute inset-0 border-2 -z-10 transition-all duration-300"
          style={{
            top: isHovered ? '8px' : '6px',
            left: isHovered ? '8px' : '6px',
            borderColor: 'rgba(148, 163, 184, 0.25)',
            boxShadow: isHovered ? '0 0 15px rgba(203, 213, 225, 0.25)' : '0 0 8px rgba(148, 163, 184, 0.15)',
          }}
        />

        <div className="flex items-start gap-5">
          {/* Icon */}
          <div className="flex-shrink-0 relative">
            <div
              className="w-12 h-12 flex items-center justify-center border transition-all duration-300 chrome-shimmer"
              style={{
                transform: isHovered ? 'rotate(0deg)' : 'rotate(-5deg)',
                background: isHovered
                  ? 'linear-gradient(145deg, #cbd5e1, #e2e8f0, #94a3b8)'
                  : 'rgba(203, 213, 225, 0.1)',
                borderColor: isHovered ? 'rgba(226, 232, 240, 0.5)' : 'rgba(203, 213, 225, 0.25)',
                boxShadow: isHovered
                  ? '0 0 15px rgba(203, 213, 225, 0.5), inset 0 0 10px rgba(241, 245, 249, 0.3)'
                  : '0 0 8px rgba(148, 163, 184, 0.2)',
              }}
            >
              <div
                className="transition-colors duration-300"
                style={{
                  color: isHovered ? '#0f172a' : '#cbd5e1',
                }}
              >
                {contact.icon || <div className="w-6 h-6" style={{ background: 'rgba(203, 213, 225, 0.3)' }} />}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3
                className="font-display text-xl font-semibold transition-all duration-300 capitalize leading-tight"
                style={{
                  color: isHovered ? '#e2e8f0' : '#cbd5e1',
                  textShadow: isHovered ? '0 0 10px rgba(226, 232, 240, 0.5)' : 'none',
                }}
              >
                {contact.name || 'Visit Link'}
              </h3>

              {/* Arrow */}
              <div
                className="flex-shrink-0 transition-all duration-300"
                style={{
                  opacity: isHovered ? 1 : 0.4,
                  transform: isHovered ? 'translate(4px, -4px)' : 'translate(0, 0)',
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{
                    color: '#cbd5e1',
                    filter: isHovered ? 'drop-shadow(0 0 5px rgba(203, 213, 225, 0.6))' : 'none',
                  }}
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
