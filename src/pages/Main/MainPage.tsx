import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CharactersData } from '../../models/character';
import ErrorButton from './components/ErrorButton';
import LoaderSpinner from './components/LoaderSpinner';
import Pagination from './components/Pagination';
import { Results } from './components/Results';
import { Search } from './components/Search';
import { useInitFromLocalStorage } from './hooks/useInitFromLocalStorage';
import styles from './MainPage.module.scss';
import { getCharacters } from './methods/getCharacter';
import { getNewPageData } from './methods/getNewPageData';

const ITEMS_PER_PAGE = 10;
const getPagesAmount = (itemAmount: number): number => Math.ceil(itemAmount / ITEMS_PER_PAGE);

function MainPage() {
  const [characters, setCharacters] = useState<CharactersData | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const currentPage = Number(searchParams.get('page'));
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
    updateSearchingStatus(false);
  };

  const changePage = async (pageNumber: number): Promise<void> => {
    updateSearchingStatus(true);
    const charactersData = await getNewPageData({ pageNumber });
    setCharacters(charactersData);
    updateSearchingStatus(false);
  };

  const toPrevPage = () => {
    setSearchParams({ page: String(currentPage - 1) });
  };
  const toNextPage = () => {
    setSearchParams({ page: String(currentPage + 1) });
  };

  const closeDetails = () => {
    const isDetailsOpened = location.pathname.includes('details');
    if (isDetailsOpened) {
      navigate(`/?page=${currentPage}`);
    }
  };

  useEffect(() => {
    search(initialQuery);
  }, []);

  useEffect(() => {
    changePage(currentPage || 1);
  }, [currentPage]);

  return (
    <div className={styles.mainPage}>
      <div className={styles.nameContainer} onClick={() => closeDetails()} role="presentation">
        <h3>Find your favorite The Star Wars character!</h3>
        <ErrorButton />
      </div>

      <Search search={search} />
      <div className={styles.resultsBlock} role="presentation">
        {!isSearching && (
          <div className={styles.resultsBlock} onClick={() => closeDetails()} role="presentation">
            <Results characters={characters} />
          </div>
        )}
        <Outlet />
      </div>

      {!isSearching && (
        <span onClick={() => closeDetails()} role="presentation">
          <Pagination
            currentPage={currentPage}
            toPrevPage={toPrevPage}
            toNextPage={toNextPage}
            left={currentPage === 1}
            right={currentPage === getPagesAmount(characters?.count ?? 1)}
            amountOfPages={getPagesAmount(characters?.count ?? 1)}
          />
        </span>
      )}
      {isSearching && <LoaderSpinner />}
    </div>
  );
}

export default MainPage;
