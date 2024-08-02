import { CharactersData } from 'components/models/character';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

function MainPage({ charactersData }: { charactersData: CharactersData }) {
  const { currentPage, toPrevPage, toNextPage } = usePagination();
  const router = useRouter();
  const favorites = useSelector((state: RootState) => state.favorites);
  const { closeDetails } = useHandleDetails();

  const [isBusy, setIsBusy] = useState(false);

  // useEffect(() => {
  //   router.events.on('routeChangeStart', () => setIsBusy(true));
  //   return () => {
  //     router.events.on('routeChangeComplete', () => setIsBusy(false));
  //   };
  // }, [router.asPath]);

  return (
    <div className={styles.mainPage}>
      <ThemeButton />
      <div className={styles.nameContainer}>
        <h3>Find your favorite The Star Wars character!</h3>
        <ErrorButton />
      </div>
      <div onClick={() => closeDetails()} role="presentation">
        <Search isBusy={isBusy} />
      </div>
      <div className={styles.resultsBlock} role="presentation">
        {!isBusy && (
          <div className={styles.resultsBlock} role="presentation">
            <CharactersView charactersData={charactersData} />
          </div>
        )}
        <CharacterDetails />
      </div>
      {!isBusy && (
        <span onClick={() => closeDetails()} role="presentation">
          <Pagination
            toNextPage={toNextPage}
            currentPage={currentPage}
            toPrevPage={toPrevPage}
            charactersData={charactersData}
          />
        </span>
      )}
      {isBusy && <LoaderSpinner />}
      {favorites.length !== 0 && <FavoritesToolBar />}
    </div>
  );
}

export default MainPage;
