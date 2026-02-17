export function CornerBrackets({ children, style, className }: { children: React.ReactNode, style?: React.CSSProperties, className?: string }) {
  return (
    <div className={`relative border ${className || ''}`} style={style}>
      <span className="absolute -top-px -left-px z-10 h-3 w-3 border-t-1 border-l-1 border-foreground" />
      <span className="absolute -top-px -right-px z-10 h-3 w-3 border-t-1 border-r-1 border-foreground" />
      <span className="absolute -bottom-px -left-px z-10 h-3 w-3 border-b-1 border-l-1 border-foreground" />
      <span className="absolute -bottom-px -right-px z-10 h-3 w-3 border-b-1 border-r-1 border-foreground" />
      {children}
    </div>
  );
}
