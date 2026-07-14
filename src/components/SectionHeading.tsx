type SectionHeadingProps = {
  id: string;
  children: React.ReactNode;
};

export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2 id={id} className="mb-2 text-xs tracking-widest text-muted-foreground">
      <span className="text-accent" aria-hidden="true">
        #{' '}
      </span>
      {children}
    </h2>
  );
}
