import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export const usePagination = () => {
  const router = useRouter();
  const { page = '1' } = router.query;
  const currentPage = typeof page === 'string' ? parseInt(page, 10) : parseInt(page[0], 10);

  useEffect(() => {
    const queryParams = { ...router.query };
    queryParams.page = String(currentPage);
    router.push({ pathname: router.pathname, query: queryParams });
  }, [currentPage]);

  const toPrevPage = useCallback(() => {
    const queryParams = { ...router.query };
    queryParams.page = String(currentPage - 1);
    delete queryParams.details;
    router.push({ pathname: router.pathname, query: queryParams });
  }, [currentPage, router]);

  const toNextPage = useCallback(() => {
    const queryParams = { ...router.query };
    queryParams.page = String(currentPage + 1);
    delete queryParams.details;
    router.push({ pathname: router.pathname, query: queryParams });
  }, [currentPage, router]);

  return { currentPage, toNextPage, toPrevPage };
};
