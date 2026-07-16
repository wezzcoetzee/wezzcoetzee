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
      className="group text-muted-foreground hover:text-foreground transition-colors"
    >
      {/* Remounting on theme change restarts the entry animation. */}
      <span key={theme} className="icon-swap block">
        {theme === 'dark' ? (
          <svg
            className="w-5 h-5 transition-transform duration-300 ease-out group-hover:rotate-90 group-active:scale-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="3.25" fill="currentColor" stroke="none" />
            <path d="M12 3.5v2.75M12 17.75v2.75M3.5 12h2.75M17.75 12h2.75" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 transition-transform duration-300 ease-out group-hover:-rotate-12 group-active:scale-90"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
