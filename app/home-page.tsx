'use client';

import MainPage from 'components/Main/MainPage';
import { CharactersData } from 'components/models/character';
import { Provider } from 'react-redux';
import store from 'store/store';
import styles from '../components/core/themes/Theme.module.scss';
import { useTheme } from '../components/core/themes/themeHooks';

type HomeProps = {
  charactersData: CharactersData;
  characterDetails: CharactersData | null;
};

function HomePage({ charactersData, characterDetails }: HomeProps) {
  const isDarkTheme = useTheme();
  return (
    <Provider store={store}>
      <div className={isDarkTheme ? styles.darkTheme : undefined} data-testid="theme-container">
        <MainPage charactersData={charactersData} characterDetails={characterDetails} />;
      </div>
    </Provider>
  );
}

export default HomePage;
