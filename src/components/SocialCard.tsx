"use client";

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
          (window as any).gtag("event", analyticData.action, {
            event_category: analyticData.category,
            event_label: analyticData.label,
            value: analyticData.value,
          });
        } catch (e: any) {
          console.error("No Google Analytics detected");
        }
    
        window.open(link, "_blank");
      };
    
  return (
    <a
        href="#"
        target={contact.target}
        className="block p-6 rounded-lg shadow-md hover:bg-off-white transition-colors"
        onClick={() =>
            sendGoogleAnalyticsEvent(contact.link, {
            action: "click",
            category: "social",
            label: "external",
            value: contact.name!,
        })}
    >
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-2">
            <div className="flex-shrink-0">
              {contact.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 capitalize">
              {contact.name}
            </h3>
          </div>
          <p className="mt-1 text-gray-600">
            {contact.description}
          </p>
        </div>
      </div>
    </a>
  );
} 