import LoaderSpinner from '@components/LoaderSpinner';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CharactersData } from '../../models/character';
import ErrorButton from './components/ErrorButton';
import Pagination from './components/Pagination';
import { Results } from './components/Results';
import { Search } from './components/Search';
import { useInitFromLocalStorage } from './hooks/useInitFromLocalStorage';
import styles from './MainPage.module.scss';
import { getCharacters } from './methods/getCharacter';
import { getNewPageData } from './methods/getNewPageData';

function MainPage() {
  const [characters, setCharacters] = useState<CharactersData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [initialQuery, setInitialQuery] = useInitFromLocalStorage('class-component');
  const location = useLocation();
  const navigate = useNavigate();

  const updateSearchingStatus = (value: boolean): void => {
    setIsSearching(value);
  };

  const search = async (searchQuery: string): Promise<void> => {
    updateSearchingStatus(true);
    setInitialQuery(searchQuery);
    const charactersData = await getCharacters({ query: searchQuery });
    setCharacters(charactersData);
    setCurrentPage(1);
    updateSearchingStatus(false);
  };

  const changePage = async (pageNumber: number): Promise<void> => {
    if (currentPage !== pageNumber) {
      updateSearchingStatus(true);
      navigate(`/?page=${pageNumber}`);
      setCurrentPage(pageNumber);
      const charactersData = await getNewPageData({ pageNumber });
      setCharacters(charactersData);
      updateSearchingStatus(false);
    }
  };

  const closeDetails = () => {
    const isDetailsOpened = location.pathname.includes('details');
    if (isDetailsOpened) {
      navigate('/');
    }
  };

  useEffect(() => {
    search(initialQuery);
  }, []);

  return (
    <div className={styles.mainPage} onClick={() => closeDetails()} role="presentation">
      <div className={styles.nameContainer}>
        <h3>Find your favorite The Star Wars character!</h3>
        <ErrorButton />
      </div>

      <Search search={search} />
      <div className={styles.resultsBlock}>
        {!isSearching && (
          <div className={styles.resultsBlock}>
            <Results characters={characters} />
          </div>
        )}
        <Outlet />
      </div>

      {!isSearching && (
        <Pagination charactersData={characters} currentPageNumber={currentPage} changePage={changePage} />
      )}
      {isSearching && <LoaderSpinner />}
    </div>
  );
}

export default MainPage;
