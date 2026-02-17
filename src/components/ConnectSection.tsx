'use client';

import { useState } from 'react';
import SocialCard from '@/components/SocialCard';
import { CONTACTS } from '@/data';

const INITIAL_CONTACT_COUNT = 4;

export default function ConnectSection() {
  const [showAll, setShowAll] = useState(false);
  const hasMoreContacts = CONTACTS.length > INITIAL_CONTACT_COUNT;
  const visibleContacts = showAll ? CONTACTS : CONTACTS.slice(0, INITIAL_CONTACT_COUNT);

  return (
    <section id="connect" className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-display font-semibold">Connect</h2>
        <div className="h-px flex-1 divider" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {visibleContacts.map((contact, index) => (
          <SocialCard
            key={`contact-${index}`}
            contact={contact}
            index={index >= INITIAL_CONTACT_COUNT ? index - INITIAL_CONTACT_COUNT : index}
          />
        ))}
      </div>

      {hasMoreContacts && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group"
          >
            {showAll ? 'View less' : 'View more'}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={showAll ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
