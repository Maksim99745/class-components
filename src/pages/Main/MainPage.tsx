import LoaderSpinner from '@components/LoaderSpinner';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Character, CharactersData } from '../../models/character';
import ErrorButton from './components/ErrorButton';
import ItemDetails from './components/ItemDetails';
import Pagination from './components/Pagination';
import { Results } from './components/Results';
import { Search } from './components/Search';
import { useInitFromLocalStorage } from './hooks/useInitFromLocalStorage';
import styles from './MainPage.module.scss';
import { getCharacters } from './methods/getCharacter';
import { getNewPageData } from './methods/getNewPageData';

function MainPage() {
  const [characters, setCharacters] = useState<CharactersData | null>(null);
  const [isDetailsOpened, setIsDetailsOpened] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [characterDetails, setCharacterDetails] = useState<Character | null>(null);
  const [initialQuery, setInitialQuery] = useInitFromLocalStorage('class-component');
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

  const getCharacterDetails = async (characterName: string): Promise<void> => {
    setIsDetailsLoading(true);
    const charactersData = await getCharacters({ query: characterName });
    setIsDetailsLoading(false);
    setCharacterDetails(charactersData.results[0]);
  };

  const openDetails = () => {
    setIsDetailsOpened(true);
  };

  const closeDetails = () => {
    if (isDetailsOpened) {
      setIsDetailsOpened(false);
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
      {!isSearching && (
        <div className={styles.resultsBlock}>
          <Results characters={characters} openDetails={openDetails} getCharacterDetails={getCharacterDetails} />
          {isDetailsOpened && characterDetails && (
            <div className={styles.detailsSection}>
              <ItemDetails
                isLoading={isDetailsLoading}
                isOpened={isDetailsOpened}
                setIsOpened={closeDetails}
                character={characterDetails}
              />
            </div>
          )}
        </div>
      )}
      {!isSearching && (
        <Pagination charactersData={characters} currentPageNumber={currentPage} changePage={changePage} />
      )}
      {isSearching && <LoaderSpinner />}
    </div>
  );
}

export default MainPage;
