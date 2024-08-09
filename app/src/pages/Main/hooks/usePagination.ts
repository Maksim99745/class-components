import { useNavigate, useSearchParams } from '@remix-run/react';
import { useCallback } from 'react';

const usePagination = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = searchParams?.get('page') || '1';

  const toPrevPage = useCallback(() => {
    navigate(`/?page=${Number(currentPage) - 1}`);
  }, [currentPage]);

  const toNextPage = useCallback(() => {
    navigate(`/?page=${Number(currentPage) + 1}`);
  }, [currentPage]);

  return { currentPage, toNextPage, toPrevPage };
};
export default usePagination;
