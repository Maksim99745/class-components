import { CharactersData } from 'components/models/character';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import useHandleDetails from './components/CharacterDetails/hooks/useHandleDetails';
import { CharactersView } from './components/CharacterView/CharactersView';
import ErrorButton from './components/ErrorButton/ErrorButton';
import FavoritesToolBar from './components/FavoritesToolBar/FavoritesToolBar';
import LoaderSpinner from './components/LoaderSpinner/LoaderSpinner';
import Pagination from './components/Pagination/Pagination';
import { Search } from './components/Search/Search';
import { ThemeButton } from './components/ThemeButton/ThemeButton';
import { usePagination } from './hooks/usePagination';
import styles from './MainPage.module.scss';

type MainPageProps = {
  charactersData: CharactersData;
  characterDetails: CharactersData | null;
};

function MainPage({ charactersData, characterDetails }: MainPageProps) {
  const { currentPage, toPrevPage, toNextPage } = usePagination();
  const favorites = useSelector((state: RootState) => state.favorites);
  const { closeDetails } = useHandleDetails();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <div className={styles.mainPage}>
      <ThemeButton />
      <div className={styles.nameContainer}>
        <h3>Find your favorite The Star Wars character!</h3>
        <ErrorButton />
      </div>
      <div onClick={() => closeDetails()} role="presentation">
        <Search />
      </div>
      <div className={styles.resultsBlock} role="presentation">
        {!loading && <CharactersView charactersData={charactersData} />}
        {loading && <LoaderSpinner />}
        <CharacterDetails characterDetails={characterDetails} />
      </div>
      <span onClick={() => closeDetails()} role="presentation">
        <Pagination
          toNextPage={toNextPage}
          currentPage={currentPage}
          toPrevPage={toPrevPage}
          charactersData={charactersData}
        />
      </span>
      {favorites.length !== 0 && <FavoritesToolBar />}
    </div>
  );
}

export default MainPage;
