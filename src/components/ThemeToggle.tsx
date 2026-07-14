'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

const SYSTEM_LIGHT = '(prefers-color-scheme: light)';

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(SYSTEM_LIGHT);
  listeners.add(onStoreChange);
  media.addEventListener('change', onStoreChange);
  window.addEventListener('storage', onStoreChange);

  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener('change', onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

/** Mirrors the first-paint script in layout.tsx: stored preference wins, else system. */
function getSnapshot(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) return stored;
  return window.matchMedia(SYSTEM_LIGHT).matches ? 'light' : 'dark';
}

/** No theme is known until the client reads localStorage, so render the placeholder. */
function getServerSnapshot(): null {
  return null;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    listeners.forEach((listener) => listener());
  }

  if (theme === null) {
    return <div className="w-5 h-5" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {theme === 'dark' ? (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path
            strokeLinecap="round"
            d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
}
