import { DEFAULT_SEARCH_VALUE } from 'components/Main/hooks/useInitFromLocalStorage';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  isBusy: boolean;
}

export function Search({ isBusy }: SearchProps) {
  const [query, setQuery] = useState(DEFAULT_SEARCH_VALUE);
  const router = useRouter();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const queryParams = { ...router.query };
    queryParams.search = String(query);
    queryParams.page = '1';
    router.push({ pathname: router.pathname, query: queryParams });
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
