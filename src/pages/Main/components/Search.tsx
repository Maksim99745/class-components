import { CharactersData } from '@models/character';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useInitFromLocalStorage } from '../hooks/useInitFromLocalStorage';
import { getCharacters } from '../methods/getCharacter';
import styles from './Search.module.scss';

interface SearchProps {
  updateSearchResult: (characters: CharactersData) => void;
  updateSearchingStatus: (isSearching: boolean) => void;
}

export function Search({ updateSearchResult, updateSearchingStatus }: SearchProps) {
  const [query, setQuery] = useInitFromLocalStorage('class-component');

  const search = async (searchQuery: string): Promise<void> => {
    updateSearchingStatus(true);

    const characters = await getCharacters({ query: searchQuery });
    updateSearchResult(characters);

    updateSearchingStatus(false);
  };

  useEffect(() => {
    search(query);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    search(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchInputContainer}>
        <input
          value={query || ''}
          placeholder="Enter your search query..."
          onChange={handleChange}
          type="search"
          className={styles.searchInput}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}
