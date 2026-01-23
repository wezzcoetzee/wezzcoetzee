'use client';

import { useEffect, useState } from 'react';

type AboutSectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
};

function AboutSection({ icon, title, children, delay }: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="relative bg-card card-interactive p-6 transition-all duration-600 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="card-shadow-offset" />
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 relative">
          <div className="icon-container">
            <div className="icon-color">{icon}</div>
          </div>
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="font-display text-xl font-semibold mb-3 text-secondary">
            {title}
          </h3>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-display font-semibold">About</h2>
        <div className="h-px flex-1 section-divider" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <AboutSection
          delay={0.1}
          title="Journey"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
              />
            </svg>
          }
        >
          <p>
            10+ years in software engineering, from junior developer to Tech Lead
            and Engineering Manager. Built casino platforms at Derivco, Virtual
            Power Plants at Eneco, and now leading mass communications at Idexx.
          </p>
          <p>
            Won the Tesla Innovation Award in 2017 and spoke at GoTo Amsterdam
            2024. Now based in Auckland, still hands-on with code.
          </p>
        </AboutSection>

        <AboutSection
          delay={0.2}
          title="Expertise"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          }
        >
          <p>
            Full-stack with C#, TypeScript, and Go. Deep experience in distributed
            systems, event-driven architecture, and cloud infrastructure on Azure
            and AWS.
          </p>
          <p>
            Comfortable across the stack - from React and Next.js frontends to
            Kafka-driven microservices and Kubernetes deployments.
          </p>
        </AboutSection>

        <AboutSection
          delay={0.3}
          title="Leadership"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
          }
        >
          <p>
            Led cross-functional teams of developers and automation engineers.
            Focus on mentorship, clear communication, and creating environments
            where engineers grow.
          </p>
          <p>
            Experience orchestrating migrations, establishing CI/CD pipelines, and
            improving engineering processes across organisations.
          </p>
        </AboutSection>
      </div>
    </section>
  );
}
