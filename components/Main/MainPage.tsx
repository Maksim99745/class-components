import { CharactersData } from 'components/models/character';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import { CharactersView } from './components/CharacterView/CharactersView';
import ErrorButton from './components/ErrorButton/ErrorButton';
import FavoritesToolBar from './components/FavoritesToolBar/FavoritesToolBar';
import Pagination from './components/Pagination/Pagination';
import { Search } from './components/Search/Search';
import { ThemeButton } from './components/ThemeButton/ThemeButton';
import styles from './MainPage.module.scss';

type MainPageProps = {
  charactersData: CharactersData;
  characterDetails: CharactersData | null;
};

function MainPage({ charactersData, characterDetails }: MainPageProps) {
  return (
    <div className={styles.mainPage}>
      <ThemeButton />
      <div className={styles.nameContainer}>
        <h3>Find your favorite The Star Wars character!</h3>
        <ErrorButton />
      </div>
      <div>
        <Search />
      </div>
      <div className={styles.resultsBlock}>
        <CharactersView charactersData={charactersData} />
        <CharacterDetails characterDetails={characterDetails} />
      </div>
      <span role="presentation">
        <Pagination charactersData={charactersData} />
      </span>
      <FavoritesToolBar />
    </div>
  );
}

export default MainPage;
