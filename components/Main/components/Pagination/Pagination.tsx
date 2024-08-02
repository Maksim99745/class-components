import { CharactersData } from 'components/models/character';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Pagination.module.scss';

interface PaginationProps {
  // toPrevPage: () => void;
  // toNextPage: () => void;
  // currentPage: number;
  charactersData: CharactersData;
}

const ITEMS_PER_PAGE = 10;
const getPagesAmount = (itemAmount: number): number => Math.ceil(itemAmount / ITEMS_PER_PAGE);

export default function Pagination({ charactersData }: PaginationProps) {
  const router = useRouter();
  const { page = '1' } = router.query;
  const currentPage = typeof page === 'string' ? parseInt(page, 10) : parseInt(page[0], 10);
  const right = currentPage === getPagesAmount(charactersData?.count ?? 1);
  const left = currentPage === 1;
  const amountOfPages = getPagesAmount(charactersData?.count ?? 1);

  if (charactersData?.count <= 1) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      <button type="button" disabled={left}>
        <Link href={`/?page=${currentPage - 1}`}> {'<'}</Link>
      </button>
      <div>{`${currentPage || '1'} / ${amountOfPages}`}</div>
      <button type="button" disabled={right}>
        <Link href={`/?page=${currentPage + 1}`}> {'>'}</Link>
      </button>
    </div>
  );
}
