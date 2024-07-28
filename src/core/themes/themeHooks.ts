import { useContext } from 'react';
import ThemeContext from './ThemeContext';
import ThemeUpdateContext from './ThemeUpdateContext';

export const useTheme = () => useContext(ThemeContext);
export const useThemeUpdate = () => useContext(ThemeUpdateContext);
