import { ChangeEvent, FormEvent, useState } from 'react';
import useHandleDetails from '../CharacterDetails/hooks/useHandleDetails';
import styles from './Search.module.scss';
import useSearch from './hooks/useSearch';

export const DEFAULT_SEARCH_VALUE = '';

export function Search() {
  const { closeDetails } = useHandleDetails();
  const { handleSearch } = useSearch();
  const [inputValue, setInputValue] = useState(DEFAULT_SEARCH_VALUE);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    handleSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchInputContainer} onClick={() => closeDetails()} role="presentation">
        <input
          value={inputValue}
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
