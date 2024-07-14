import { CharactersData } from '@models/character';
import styles from './Pagination.module.scss';
import PaginationButton from './PaginationButton';

interface PaginationProps {
  charactersData: CharactersData | null;
  currentPageNumber: number;
  changePage: (pageNumber: number) => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

const getPagesAmountArr = (count: number): number[] => {
  const paginationCounter = Math.ceil(count / ITEMS_PER_PAGE);
  const pages = [];
  for (let i = 1; i <= paginationCounter; i += 1) {
    pages.push(i);
  }
  return pages;
};

export default function Pagination({ charactersData, changePage, currentPageNumber }: PaginationProps) {
  if (!charactersData) {
    return null;
  }

  const pageNumbers = getPagesAmountArr(charactersData.count);

  return (
    <div className={styles.paginationContainer}>
      {pageNumbers.map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          pageNumber={pageNumber}
          currentPageNumber={currentPageNumber}
          changePage={changePage}
        />
      ))}
    </div>
  );
}
