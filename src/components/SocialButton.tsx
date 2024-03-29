"use client";
import { ContactIcon } from "./Header";

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
    <div>
      <a
        href="#"
        onClick={() =>
          sendGoogleAnalyticsEvent(contact.link, {
            action: "click",
            category: "social",
            label: "external",
            value: contact.name,
          })
        }
      >
        {contact.icon}
      </a>
      {/* <a href={contact.link} target="_blank">
                {contact.icon}
              </a> */}
    </div>
  );
}
