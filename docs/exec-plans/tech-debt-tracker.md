# Tech Debt Tracker

## Active Debt

### No Test Coverage

**Impact**: Medium
**Location**: Entire codebase

No unit tests, integration tests, or end-to-end tests exist. For a static portfolio site, the risk is low — the CI build step catches type errors and broken imports. However, tests would catch regressions in structured data generation and component rendering.

**Resolution**: Add Vitest for unit tests on data structures and JSON-LD output. Consider Playwright for smoke tests on the built static site.

### No Error Boundary

**Impact**: Low
**Location**: `src/app/layout.tsx`

No React error boundary wraps the application. A rendering error in any client component will crash the entire page. Static sites are less prone to runtime errors, but an error boundary would provide a graceful fallback.

**Resolution**: Add a root error boundary component wrapping the children in `layout.tsx`.

### Dead `optimizePackageImports` Config

**Impact**: None (cosmetic)
**Location**: `next.config.ts` line 10

```typescript
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
},
```

Neither `lucide-react` nor `@radix-ui/react-icons` are installed as dependencies. This config does nothing.

**Resolution**: Remove the `experimental.optimizePackageImports` block from `next.config.ts`.
