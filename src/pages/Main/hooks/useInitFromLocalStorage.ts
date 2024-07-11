import { useEffect, useState } from 'react';

const DEFAULT_SEARCH_VALUE = '';

export function useInitFromLocalStorage(key: string) {
  const [searchValue, setSearchValue] = useState<string>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ?? DEFAULT_SEARCH_VALUE;
  });

  useEffect(() => {
    localStorage.setItem(key, searchValue);
  }, [key, searchValue]);

  return [searchValue, setSearchValue] as const;
}
