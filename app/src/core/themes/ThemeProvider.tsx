import { ReactNode, useCallback, useState } from 'react';
import ThemeContext from './ThemeContext';
import ThemeUpdateContext from './ThemeUpdateContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkTheme, toggleDarkTheme] = useState(false);

  const toggleTheme = useCallback(() => {
    toggleDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }, []);

  return (
    <ThemeUpdateContext.Provider value={toggleTheme}>
      <ThemeContext.Provider value={darkTheme}>{children}</ThemeContext.Provider>
    </ThemeUpdateContext.Provider>
  );
}
