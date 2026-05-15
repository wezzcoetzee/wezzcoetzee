export function Footer() {
  return (
    <footer>
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Wesley Coetzee</p>
          <p className="section-marker">−36.8485° s, 174.7633° e</p>
        </div>
      </div>
    </footer>
  );
}
