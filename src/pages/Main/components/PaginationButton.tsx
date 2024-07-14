import styles from './Pagination.module.scss';

interface PaginationButtonProps {
  pageNumber: number;
  currentPageNumber: number;
  changePage: (pageNumber: number) => Promise<void>;
}
export default function PaginationButton({ pageNumber, changePage, currentPageNumber }: PaginationButtonProps) {
  const isCurrentPage = currentPageNumber === pageNumber;
  return (
    <button
      className={isCurrentPage && styles.currentPage}
      type="button"
      key={pageNumber}
      onClick={() => {
        changePage(pageNumber);
      }}
    >
      {pageNumber}
    </button>
  );
}
