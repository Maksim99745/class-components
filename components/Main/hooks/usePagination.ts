import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useMainPageActions } from './useMainPageActions';

export const usePagination = () => {
  const currentPage = useSelector((state: RootState) => state.currentPage);
  const router = useRouter();
  const { updateCurrentPage } = useMainPageActions();

  useEffect(() => {
    const queryParams = { ...router.query };
    queryParams.page = String(currentPage);
    router.push({ pathname: router.pathname, query: queryParams });
  }, [currentPage]);

  const toPrevPage = () => {
    updateCurrentPage(currentPage[0] - 1);
  };

  const toNextPage = () => {
    updateCurrentPage(currentPage[0] + 1);
  };

  return { currentPage, toNextPage, toPrevPage };
};
