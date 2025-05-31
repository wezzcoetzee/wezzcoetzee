export type ContactIcon = {
    icon: any;
    link: string;
    name: string;
    target: string;
    description: string;
  };

interface SocialCardProps {
  contact: ContactIcon;
}

export default function SocialCard({ contact }: SocialCardProps) {
  return (
    <a
      href={contact.link}
      target={contact.target}
      className="block p-6 rounded-lg shadow-md hover:bg-beige transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {contact.icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 capitalize">
            {contact.name}
          </h3>
          <p className="mt-1 text-gray-600">
            {contact.description}
          </p>
        </div>
      </div>
    </a>
  );
} 