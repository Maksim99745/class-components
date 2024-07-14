import LoaderSpinner from '@components/LoaderSpinner';
import { useEffect, useState } from 'react';
import { CharactersData } from '../../models/character';
import ErrorButton from './components/ErrorButton';
import Pagination from './components/Pagination';
import { Results } from './components/Results';
import { Search } from './components/Search';
import { useInitFromLocalStorage } from './hooks/useInitFromLocalStorage';
import styles from './MainPage.module.scss';
import { getNewPageData } from './methods/getNewPageData';
import { getCharacters } from './methods/useGetCharacter';

function MainPage() {
  const [characters, setCharacters] = useState<CharactersData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [initialQuery, setInitialQuery] = useInitFromLocalStorage('class-component');

  const updateSearchingStatus = (value: boolean): void => {
    setIsSearching(value);
  };

  const search = async (searchQuery: string): Promise<void> => {
    updateSearchingStatus(true);
    setInitialQuery(searchQuery);
    const charactersData = await getCharacters({ query: searchQuery });
    setCharacters(charactersData);

    updateSearchingStatus(false);
  };

  const changePage = async (pageNumber: number): Promise<void> => {
    if (currentPage !== pageNumber) {
      updateSearchingStatus(true);
      setCurrentPage(pageNumber);
      const charactersData = await getNewPageData({ pageNumber });
      setCharacters(charactersData);
      updateSearchingStatus(false);
    }
  };

  useEffect(() => {
    search(initialQuery);
  }, []);

  return (
    <div className={styles.mainPage}>
      <div className={styles.nameContainer}>
        <p>Find your favorite The Star Wars character!</p>
        <ErrorButton />
      </div>
      <Search search={search} />
      {!isSearching && <Results characters={characters} />}
      {!isSearching && (
        <Pagination charactersData={characters} currentPageNumber={currentPage} changePage={changePage} />
      )}
      {isSearching && <LoaderSpinner />}
    </div>
  );
}

export default MainPage;
