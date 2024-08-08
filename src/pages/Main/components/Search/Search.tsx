import { DEFAULT_SEARCH_VALUE } from '@pages/Main/MainPage';
import { useNavigate } from '@remix-run/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  updateQuery: (searchQuery: string) => void;
  isBusy: boolean;
}

export function Search({ updateQuery, isBusy }: SearchProps) {
  const [query, setQuery] = useState(DEFAULT_SEARCH_VALUE);
  const navigate = useNavigate();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    navigate(`/?search=${query}`);
    updateQuery(query);
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
        <button type="submit" disabled={isBusy}>
          Search
        </button>
      </div>
    </form>
  );
}
