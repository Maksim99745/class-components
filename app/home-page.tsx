'use client';

import { useTheme } from 'components/core/themes/themeHooks';
import { ThemeProvider } from 'components/core/themes/ThemeProvider';
import MainPage from 'components/Main/MainPage';
import { CharactersData } from 'components/models/character';
import { Provider } from 'react-redux';
import store from 'store/store';
import styles from '../components/core/themes/Theme.module.scss';

type HomeProps = {
  charactersData: CharactersData;
  characterDetails: CharactersData | null;
};

function HomePage({ charactersData, characterDetails }: HomeProps) {
  const isDarkTheme = useTheme();
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className={isDarkTheme ? styles.darkTheme : undefined} data-testid="theme-container">
          <MainPage charactersData={charactersData} characterDetails={characterDetails} />;
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default HomePage;
