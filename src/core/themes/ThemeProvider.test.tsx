import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import ThemeContext from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';
import ThemeUpdateContext from './ThemeUpdateContext';

function TestComponent() {
  const darkTheme = useContext(ThemeContext);
  const toggleTheme = useContext(ThemeUpdateContext);

  return (
    <div>
      <span data-testid="theme">{darkTheme ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme} type="button">
        Toggle Theme
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('should provide initial theme as light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should toggle theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeElement = screen.getByTestId('theme');
    const toggleButton = screen.getByText('Toggle Theme');

    fireEvent.click(toggleButton);
    expect(themeElement.textContent).toBe('dark');

    fireEvent.click(toggleButton);
    expect(themeElement.textContent).toBe('light');
  });
});
