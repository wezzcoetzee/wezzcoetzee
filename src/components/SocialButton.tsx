"use client";

import { ContactIcon } from "./SocialCard";

export default function SocialButton(props: { contact: ContactIcon }) {
  const { contact } = props;

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
    <div className="flex justify-center">
      <a
        href="#"
        className="p-2 rounded-full shadow-md bg-beige hover:shadow-lg transition-shadow duration-200 ease-in-out"
        onClick={() =>
          sendGoogleAnalyticsEvent(contact.link, {
            action: "click",
            category: "social",
            label: "external",
            value: contact.name ?? "unknown",
          })
        }
      >
        {contact.icon}
      </a>
    </div>
  );
}
