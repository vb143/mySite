'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';
import { themes, type ThemeVariant } from '@/lib/themes';

declare global {
  interface Window {
    __nextThemesScriptWarningFiltered?: boolean;
  }
}

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  if (!window.__nextThemesScriptWarningFiltered) {
    window.__nextThemesScriptWarningFiltered = true;
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
        return;
      }
      originalConsoleError(...args);
    };
  }
}

interface ThemeContextType {
  themeVariant: ThemeVariant;
  setThemeVariant: (variant: ThemeVariant) => void;
  currentTheme: typeof themes.cinematic;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface CustomThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(() => {
    if (typeof window === 'undefined') return 'cinematic';

    const saved = localStorage.getItem('theme-variant') as ThemeVariant;
    if (saved && themes[saved]) return saved;

    return 'cinematic';
  });

  useEffect(() => {
    localStorage.setItem('theme-variant', themeVariant);

    // Apply CSS custom properties for the current theme
    const theme = themes[themeVariant];
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply font families
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);
    root.style.setProperty('--font-mono', theme.fonts.mono);

    // Apply effects classes
    root.classList.toggle('film-grain', theme.effects.filmGrain);
    root.classList.toggle('parallax-enabled', theme.effects.parallax);
    root.classList.toggle('blur-enabled', theme.effects.blur);
    root.classList.toggle('glow-enabled', theme.effects.glow);
  }, [themeVariant]);

  const currentTheme = themes[themeVariant];

  return (
    <NextThemesProvider {...props}>
      <ThemeContext.Provider
        value={{
          themeVariant,
          setThemeVariant,
          currentTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}
