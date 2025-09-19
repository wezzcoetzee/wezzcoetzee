"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "system") {
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    }

    if (actualTheme === "dark") {
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    }

    return (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    );
  };

  const getTooltip = () => {
    if (theme === "system") return "System theme";
    return theme === "dark" ? "Dark mode" : "Light mode";
  };

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 group"
      title={getTooltip()}
      aria-label={`Switch to ${
        theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
      } theme`}
    >
      <div className="text-foreground group-hover:text-primary transition-colors">
        {getIcon()}
      </div>
      
      {/* Theme indicator dots */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
        <div
          className={`w-1 h-1 rounded-full transition-colors ${
            theme === "light" ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        />
        <div
          className={`w-1 h-1 rounded-full transition-colors ${
            theme === "dark" ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        />
        <div
          className={`w-1 h-1 rounded-full transition-colors ${
            theme === "system" ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        />
      </div>
    </button>
  );
}