'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const usePagination = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams?.get('page') || '1';
  const router = useRouter();

  const toPrevPage = useCallback(() => {
    router.push(`/?page=${Number(currentPage) - 1}`);
  }, [currentPage, router]);

  const toNextPage = useCallback(() => {
    router.push(`/?page=${Number(currentPage) + 1}`);
  }, [currentPage, router]);

  return { currentPage, toNextPage, toPrevPage };
};
export default usePagination;
