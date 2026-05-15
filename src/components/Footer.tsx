export function Footer() {
  return (
    <footer>
      <div className="container py-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Wesley Coetzee
        </p>
      </div>
    </footer>
  );
}
