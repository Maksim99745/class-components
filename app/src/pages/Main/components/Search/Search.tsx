import { DEFAULT_SEARCH_VALUE } from '@pages/Main/MainPage';
import { useNavigate } from '@remix-run/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Search.module.scss';

export function Search() {
  const [query, setQuery] = useState(DEFAULT_SEARCH_VALUE);
  const navigate = useNavigate();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    navigate(`/?search=${query}`);
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
