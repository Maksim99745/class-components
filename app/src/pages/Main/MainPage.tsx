import { useNavigation } from '@remix-run/react';
import { CharactersData } from 'app/src/models/character';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import { CharactersView } from './components/CharacterView/CharactersView';
import FavoritesToolBar from './components/FavoritesToolBar/FavoritesToolBar';
import LoaderSpinner from './components/LoaderSpinner/LoaderSpinner';
import Pagination from './components/Pagination/Pagination';
import { Search } from './components/Search/Search';
import { ThemeButton } from './components/ThemeButton/ThemeButton';
import styles from './MainPage.module.scss';

export const DEFAULT_SEARCH_VALUE = '';

type MainPageProps = {
  charactersData: CharactersData;
  characterDetails: CharactersData | null;
};

function MainPage({ charactersData, characterDetails }: MainPageProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className={styles.mainPage}>
      <ThemeButton />
      <div className={styles.nameContainer}>
        <h3>Find your favorite The Star Wars character!</h3>
      </div>
      <div>
        <Search />
      </div>
      <div className={styles.resultsBlock}>
        {!isLoading && <CharactersView charactersData={charactersData} />}
        {isLoading && <LoaderSpinner />}
        {!isLoading && <CharacterDetails characterDetails={characterDetails} />}
      </div>

      <span role="presentation">{!isLoading && <Pagination charactersData={charactersData} />}</span>
      <FavoritesToolBar />
    </div>
  );
}

export default MainPage;
