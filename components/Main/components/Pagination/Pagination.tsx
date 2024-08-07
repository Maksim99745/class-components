import { CharactersData } from '../../../models/character';
import usePagination from '../../hooks/usePagination';
import styles from './Pagination.module.scss';

interface PaginationProps {
  charactersData: CharactersData;
}

const ITEMS_PER_PAGE = 10;
const getPagesAmount = (itemAmount: number): number => Math.ceil(itemAmount / ITEMS_PER_PAGE);

export default function Pagination({ charactersData }: PaginationProps) {
  const { currentPage, toPrevPage, toNextPage } = usePagination();
  const page = parseInt(currentPage, 10);
  const right = page === getPagesAmount(charactersData?.count ?? 1);
  const left = page === 1;
  const amountOfPages = getPagesAmount(charactersData?.count ?? 1);

  if (charactersData?.count < 1) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      <button type="button" disabled={left} onClick={toPrevPage}>
        {'<'}
      </button>
      <div>{`${currentPage || '1'} / ${amountOfPages}`}</div>
      <button type="button" disabled={right} onClick={toNextPage}>
        {'>'}
      </button>
    </div>
  );
}
