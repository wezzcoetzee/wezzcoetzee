import { CornerBrackets } from './CornerBrackets';

export function Footer() {
  return (
    <footer>
      <div className="container mx-auto pb-4">
        <CornerBrackets showCorners={true}>
          <div className="bg-card/80 px-6 py-4">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} wezzcoetzee
            </p>
          </div>
        </CornerBrackets>
      </div>
    </footer>
  );
}
