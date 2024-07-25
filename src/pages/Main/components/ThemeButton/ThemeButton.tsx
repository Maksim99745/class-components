import { useTheme, useThemeUpdate } from '@core/themes/themeHooks';

export function ThemeButton() {
  const isDarkTheme = useTheme();
  const updateTheme = useThemeUpdate();
  return (
    <label htmlFor="themeButton">
      <input
        type="checkbox"
        id="themeButton"
        style={{ cursor: 'pointer' }}
        name="themeButton"
        checked={isDarkTheme}
        onChange={() => updateTheme()}
      />
      Dark theme
    </label>
  );
}
