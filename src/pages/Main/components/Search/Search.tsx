import { useInitFromLocalStorage } from '@pages/Main/hooks/useInitFromLocalStorage';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';

interface SearchProps {
  updateQuery: (searchQuery: string) => void;
  isBusy: boolean;
}

export function Search({ updateQuery, isBusy }: SearchProps) {
  const [query, setQuery] = useInitFromLocalStorage('class-component');
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
