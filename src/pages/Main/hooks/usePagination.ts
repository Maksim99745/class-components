import { useSearchParams } from 'react-router-dom';

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const currentPage = Number(searchParams.get('page'));
  const toPrevPage = () => {
    setSearchParams({ page: String(currentPage - 1) });
  };
  const toNextPage = () => {
    setSearchParams({ page: String(currentPage + 1) });
  };
  return { currentPage, toNextPage, toPrevPage };
};
