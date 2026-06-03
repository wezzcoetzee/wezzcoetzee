type AboutBlockProps = {
  title: string;
  children: React.ReactNode;
};

function AboutBlock({ title, children }: AboutBlockProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-foreground">{title}</h3>
      <div className="text-base text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <section className="space-y-10">
      <h2>About</h2>

      <div className="space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-lg text-foreground leading-relaxed">
            10+ years in software engineering, from junior developer to Tech Lead and Principal
            Software Engineer. Built casino platforms at Derivco, a Virtual Power Plant at Eneco,
            and now leading mass communications at Idexx.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Won the Tesla Innovation Award in 2017 and spoke at GoTo Amsterdam 2024. Auckland-based,
            still hands-on with code every week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <AboutBlock title="Expertise">
            <p>
              Full-stack with C#, TypeScript, and Go. Deep experience in distributed systems,
              event-driven architecture, and cloud infrastructure on Azure and AWS.
            </p>
            <p>
              Comfortable across the stack, from React and Next.js frontends to Kafka-driven
              microservices and Kubernetes deployments. Recent focus: crypto exchange SDKs, on-chain
              tooling, and smart-contract security.
            </p>
          </AboutBlock>

          <AboutBlock title="Leadership">
            <p>
              Led cross-functional teams of developers and automation engineers. Focus on
              mentorship, clear communication, and environments where engineers grow.
            </p>
            <p>
              Experience orchestrating migrations, establishing CI/CD pipelines, and improving
              engineering processes across organisations.
            </p>
          </AboutBlock>
        </div>
      </div>
    </section>
  );
}
