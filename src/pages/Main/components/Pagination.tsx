import styles from './Pagination.module.scss';

interface PaginationProps {
  toPrevPage: () => void;
  toNextPage: () => void;
  currentPage: number;
  amountOfPages: number;
  left: boolean;
  right: boolean;
}

export default function Pagination({
  toPrevPage,
  toNextPage,
  currentPage,
  amountOfPages,
  left,
  right,
}: PaginationProps) {
  return (
    <div className={styles.paginationContainer}>
      <button type="button" disabled={left} onClick={toPrevPage}>
        {'<'}
      </button>
      <div>{`${currentPage} / ${amountOfPages}`}</div>
      <button type="button" disabled={right} onClick={toNextPage}>
        {'>'}
      </button>
    </div>
  );
}
