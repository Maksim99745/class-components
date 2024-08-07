'use client';

import { useRouter } from 'next/navigation';

const useSearch = () => {
  const router = useRouter();
  const handleSearch = (inputValue: string) => {
    router.push(`/?search=${inputValue}`);
  };
  return { handleSearch };
};

export default useSearch;
