import { CornerBrackets } from './CornerBrackets';

export function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-6 md:px-12 pb-4">
        <CornerBrackets>
          <div className="mx-auto max-w-7xl bg-card/80 px-6 py-4">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} wezzcoetzee
          </p>
          </div>
        </CornerBrackets>
      </div>
    </footer>
  );
}
