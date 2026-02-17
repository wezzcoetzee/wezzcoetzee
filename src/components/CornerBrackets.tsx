export function CornerBrackets({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border">
      <span className="absolute -top-px -left-px z-10 h-3 w-3 border-t-2 border-l-2 border-foreground" />
      <span className="absolute -top-px -right-px z-10 h-3 w-3 border-t-2 border-r-2 border-foreground" />
      <span className="absolute -bottom-px -left-px z-10 h-3 w-3 border-b-2 border-l-2 border-foreground" />
      <span className="absolute -bottom-px -right-px z-10 h-3 w-3 border-b-2 border-r-2 border-foreground" />
      {children}
    </div>
  );
}
