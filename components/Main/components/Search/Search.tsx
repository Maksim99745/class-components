import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Search.module.scss';

export const DEFAULT_SEARCH_VALUE = '';

export function Search() {
  const [inputValue, setInputValue] = useState(DEFAULT_SEARCH_VALUE);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const queryParams = { ...router.query, search: inputValue, page: '1' };
    router.push({ pathname: router.pathname, query: queryParams });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchInputContainer}>
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
