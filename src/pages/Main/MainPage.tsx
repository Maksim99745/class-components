import { useState } from 'react';
import { CharactersData } from '../../models/character';
import ErrorButton from './components/ErrorButton';
import { Results } from './components/Results';
import { Search } from './components/Search';
import styles from './MainPage.module.scss';

function MainPage() {
  const [characters, setCharacters] = useState<CharactersData | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const updateSearchingStatus = (value: boolean): void => {
    setIsSearching(value);
  };

  const updateSearchResult = (newCharacters: CharactersData): void => {
    setCharacters(newCharacters);
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.nameContainer}>
        <p>Find your favorite The Star Wars character!</p>
        <ErrorButton />
      </div>
      <Search updateSearchResult={updateSearchResult} updateSearchingStatus={updateSearchingStatus} />
      <Results characters={characters} />
      {isSearching && <div className={styles.loader} />}
    </div>
  );
}

export default MainPage;
