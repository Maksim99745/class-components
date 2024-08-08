import { useTheme } from '@core/themes/themeHooks';
import MainPage from '@pages/Main/MainPage';
import type { MetaFunction } from '@remix-run/node';
import styles from '../../src/core/themes/Theme.module.scss';
import '../App.css';
import '../index.scss';

export const meta: MetaFunction = () => [
  { title: 'New Remix App' },
  { name: 'description', content: 'Welcome to Remix!' },
];

export default function Index() {
  const isDarkTheme = useTheme();
  return (
    <div className={isDarkTheme ? styles.darkTheme : undefined} data-testid="theme-container">
      <div className="App">
        <MainPage />;
      </div>
    </div>
  );
}
