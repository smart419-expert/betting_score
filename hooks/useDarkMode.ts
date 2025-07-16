import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'theme-dark';

export default function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage and system preference
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(STORAGE_KEY, next ? 'true' : 'false');
      return next;
    });
  }, []);

  return [isDark, toggleDark];
} 