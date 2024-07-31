import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetCharacterByNameQuery, useGetCharactersByPageQuery } from '../../store/api/api';
import { RootState } from '../../store/store';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import { CharactersView } from './components/CharacterView/CharactersView';
import ErrorButton from './components/ErrorButton/ErrorButton';
import FavoritesToolBar from './components/FavoritesToolBar/FavoritesToolBar';
import LoaderSpinner from './components/LoaderSpinner/LoaderSpinner';
import Pagination from './components/Pagination/Pagination';
import { Search } from './components/Search/Search';
import { ThemeButton } from './components/ThemeButton/ThemeButton';
import { DEFAULT_SEARCH_VALUE } from './hooks/useInitFromLocalStorage';
import { useMainPageActions } from './hooks/useMainPageActions';
import { usePagination } from './hooks/usePagination';
import styles from './MainPage.module.scss';

function MainPage() {
  const { currentPage, toPrevPage, toNextPage } = usePagination();

  const favorites = useSelector((state: RootState) => state.favorites);
  const router = useRouter();
  const { details } = router.query;

  const { updateCharacters } = useMainPageActions();
  const [query, setQuery] = useState(DEFAULT_SEARCH_VALUE);
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
    if (details) {
      router.push(`/?page=${details}`);
    }
  };

  return (
    <div className={styles.mainPage}>
      <ThemeButton />
      <div className={styles.nameContainer}>
        <h3>Find your favorite The Star Wars character!</h3>
        <ErrorButton />
      </div>
      <div onClick={() => closeDetails()} role="presentation">
        <Search isBusy={isBusy} updateQuery={setQuery} />
      </div>
      <div className={styles.resultsBlock} role="presentation">
        {!isBusy && (
          <div className={styles.resultsBlock} role="presentation">
            <CharactersView />
          </div>
        )}
        <CharacterDetails />
      </div>
      {!isBusy && (
        <span onClick={() => closeDetails()} role="presentation">
          <Pagination currentPage={currentPage[0]} toPrevPage={toPrevPage} toNextPage={toNextPage} />
        </span>
      )}
      {isBusy && <LoaderSpinner />}
      {favorites.length !== 0 && <FavoritesToolBar />}
    </div>
  );
}

export default MainPage;
