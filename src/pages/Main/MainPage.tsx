import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from 'src/store/store';
import { useGetCharacterByNameQuery, useGetCharactersByPageQuery } from '../../store/api/api';
import { CharactersView } from './components/CharacterView/CharactersView';
import ErrorButton from './components/ErrorButton/ErrorButton';
import FavoritesToolBar from './components/FavoritesToolBar/FavoritesToolBar';
import LoaderSpinner from './components/LoaderSpinner/LoaderSpinner';
import Pagination from './components/Pagination/Pagination';
import { Search } from './components/Search/Search';
import { useInitFromLocalStorage } from './hooks/useInitFromLocalStorage';
import { useMainPageActions } from './hooks/useMainPageActions';
import styles from './MainPage.module.scss';

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const currentPage = Number(searchParams.get('page'));
  const [query, setQuery] = useInitFromLocalStorage('class-component');
  const favorites = useSelector((state: RootState) => state.favorites);
  const location = useLocation();
  const navigate = useNavigate();
  const { updateCharacters } = useMainPageActions();

  const { data: searchResult, isFetching: isSearching } = useGetCharacterByNameQuery(query);
  const { data: pageData, isFetching: isPageLoading } = useGetCharactersByPageQuery(String(currentPage));

  const isBusy = isSearching || isPageLoading;

  useEffect(() => {
    updateCharacters(searchResult);
  }, [searchResult]);

  useEffect(() => {
    updateCharacters(pageData);
  }, [pageData]);

  const updateQuery = (searchQuery: string): void => {
    setQuery(searchQuery);
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

  return (
    <div className={styles.mainPage}>
      <div className={styles.nameContainer}>
        <h3>Find your favorite The Star Wars character!</h3>
        <ErrorButton />
      </div>
      <div onClick={() => closeDetails()} role="presentation">
        <Search updateQuery={updateQuery} isBusy={isBusy} />
      </div>

      <div className={styles.resultsBlock} role="presentation">
        {!isBusy && (
          <div className={styles.resultsBlock} role="presentation">
            <CharactersView />
          </div>
        )}
        <Outlet />
      </div>

      {!isBusy && (
        <span onClick={() => closeDetails()} role="presentation">
          <Pagination currentPage={currentPage} toPrevPage={toPrevPage} toNextPage={toNextPage} />
        </span>
      )}
      {isBusy && <LoaderSpinner />}
      {favorites.length !== 0 && <FavoritesToolBar />}
    </div>
  );
}

export default MainPage;
