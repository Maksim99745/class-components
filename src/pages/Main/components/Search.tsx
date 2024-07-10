import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { CharactersData } from '@models/character';
import { getValueFromLocalStorage, setValueToLocalStorage } from '@utils/localStorageController';
import { getCharacters } from '../methods/getCharacter';
import styles from './Search.module.scss';

interface SearchProps {
  updateSearchResult: (characters: CharactersData) => void;
  updateSearchingStatus: (isSearching: boolean) => void;
}

export function Search({ updateSearchResult, updateSearchingStatus }: SearchProps) {
  const search = async (query: string): Promise<void> => {
    setValueToLocalStorage(query);
    updateSearchingStatus(true);

    const characters = await getCharacters({ query });
    updateSearchResult(characters);

    updateSearchingStatus(false);
  };

  const [query, setQuery] = useState('');

  useEffect(() => {
    const initialQuery = query || getValueFromLocalStorage();
    setQuery(initialQuery);
    search(initialQuery);
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
