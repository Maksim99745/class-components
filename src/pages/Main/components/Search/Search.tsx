import { useInitFromLocalStorage } from '@pages/Main/hooks/useInitFromLocalStorage';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';

interface SearchProps {
  search: (searchQuery: string) => Promise<void>;
}

export function Search({ search }: SearchProps) {
  const [query, setQuery] = useInitFromLocalStorage('class-component');
  const navigate = useNavigate();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    navigate(`/?search=${query}`);
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
