import { ReactNode } from 'react';
import styles from '../core/themes/Theme.module.scss';
import { useTheme } from '../core/themes/themeHooks';

export default function LayoutPage({ children }: { children: ReactNode }) {
  const isDarkTheme = useTheme();
  return (
    <div className={isDarkTheme ? styles.darkTheme : undefined} data-testid="theme-container">
      <div className="App">
        <main>{children}</main>
      </div>
    </div>
  );
}
