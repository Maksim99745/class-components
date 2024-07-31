import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useMainPageActions } from './useMainPageActions';

export const usePagination = () => {
  const currentPage = useSelector((state: RootState) => state.currentPage);
  const { updateCurrentPage } = useMainPageActions();
  const toPrevPage = () => {
    updateCurrentPage(currentPage[0] - 1);
  };
  const toNextPage = () => {
    updateCurrentPage(currentPage[0] + 1);
  };
  return { currentPage, toNextPage, toPrevPage };
};
