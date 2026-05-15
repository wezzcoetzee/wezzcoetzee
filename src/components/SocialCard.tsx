import type { ReactNode } from 'react';
import { ArrowRightIcon } from './Icons';

export type ItemIcon = {
  icon?: ReactNode;
  link: string;
  name?: string;
  target: string;
  description: string;
};

interface SocialCardProps {
  contact: ItemIcon;
}

export default function SocialCard({ contact }: SocialCardProps) {
  return (
    <a
      href={contact.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full h-full"
      aria-label={`Visit ${contact.name} - ${contact.description}`}
    >
      <div className="card-minimal p-6 h-full">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-muted-foreground">
            {contact.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="capitalize leading-tight text-foreground">
                {contact.name || 'Visit Link'}
              </h3>

              <div className="flex-shrink-0 transition-all duration-300 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 text-muted-foreground">
                <ArrowRightIcon className="w-5 h-5" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {contact.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
