import { router } from '@core/routing/router';
import { useTheme } from '@core/themes/themeHooks';
import LoaderSpinner from '@pages/Main/components/LoaderSpinner/LoaderSpinner';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import styles from './core/themes/Theme.module.scss';

export default function App() {
  const isDarkTheme = useTheme();

  return (
    <div className={isDarkTheme ? styles.darkTheme : undefined} data-testid="theme-container">
      <div className="App">
        <RouterProvider router={router} fallbackElement={<LoaderSpinner />} />
      </div>
    </div>
  );
}