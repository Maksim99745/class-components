import { useLocation, useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { useGetCharacterByNameQuery, useGetCharactersByPageQuery } from '../../store/api/api';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import { CharactersView } from './components/CharacterView/CharactersView';
import FavoritesToolBar from './components/FavoritesToolBar/FavoritesToolBar';
import LoaderSpinner from './components/LoaderSpinner/LoaderSpinner';
import Pagination from './components/Pagination/Pagination';
import { Search } from './components/Search/Search';
import { ThemeButton } from './components/ThemeButton/ThemeButton';
import { useMainPageActions } from './hooks/useMainPageActions';
import { usePagination } from './hooks/usePagination';
import styles from './MainPage.module.scss';

export const DEFAULT_SEARCH_VALUE = '';

function MainPage() {
  const { currentPage, toPrevPage, toNextPage } = usePagination();
  const [query, setQuery] = useState(DEFAULT_SEARCH_VALUE);
  const favorites = useSelector((state: RootState) => state.favorites);
  const location = useLocation();
  const navigate = useNavigate();
  const { updateCharacters } = useMainPageActions();
  const [searchParams] = useSearchParams();
  const detailedCharacterName = searchParams.get('details');

  const { data: searchResult, isFetching: isSearching } = useGetCharacterByNameQuery(query);
  const { data: pageData, isFetching: isPageLoading } = useGetCharactersByPageQuery(String(currentPage));

  const isBusy = isSearching || isPageLoading;

  useEffect(() => {
    updateCharacters(searchResult);
  }, [searchResult]);

  useEffect(() => {
    updateCharacters(pageData);
  }, [pageData]);

  const closeDetails = () => {
    const isDetailsOpened = location.pathname.includes('details');
    if (isDetailsOpened) {
      navigate(`/?page=${currentPage}`);
    }
  };

  return (
    <div className={styles.mainPage}>
      <ThemeButton />
      <div className={styles.nameContainer}>
        <h3>Find your favorite The Star Wars character!</h3>
      </div>
      <div onClick={() => closeDetails()} role="presentation">
        <Search updateQuery={setQuery} isBusy={isBusy} />
      </div>
      <div className={styles.resultsBlock} role="presentation">
        {!isBusy && (
          <div className={styles.resultsBlock} role="presentation">
            <CharactersView />
          </div>
        )}
        {detailedCharacterName && <CharacterDetails detailedCharacterName={detailedCharacterName} />}
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
