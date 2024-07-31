import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import styles from './Pagination.module.scss';

interface PaginationProps {
  toPrevPage: () => void;
  toNextPage: () => void;
  currentPage: number;
}

const ITEMS_PER_PAGE = 10;
const getPagesAmount = (itemAmount: number): number => Math.ceil(itemAmount / ITEMS_PER_PAGE);

export default function Pagination({ toPrevPage, toNextPage, currentPage }: PaginationProps) {
  const charactersData = useSelector((state: RootState) => state.characters);
  const right = currentPage === getPagesAmount(charactersData[0]?.count ?? 1);
  const left = currentPage === 1;
  const amountOfPages = getPagesAmount(charactersData[0]?.count ?? 1);

  if (charactersData[0]?.count <= 1) {
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
