import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

export default function useHandleDetails() {
  const router = useRouter();
  const currentPage = useSelector((state: RootState) => state.currentPage);
  const currentPageNumber = Array.isArray(currentPage) ? currentPage[0] : currentPage || '';

  function closeDetails() {
    const queryParams = { ...router.query };
    delete queryParams.details;
    router.push({ pathname: router.pathname, query: queryParams });
  }

  const openDetails = (characterName: string) => {
    const queryParams = { ...router.query };
    queryParams.details = characterName;
    queryParams.page = String(currentPageNumber);
    router.push({ pathname: router.pathname, query: queryParams });
  };

  return { closeDetails, openDetails };
}
