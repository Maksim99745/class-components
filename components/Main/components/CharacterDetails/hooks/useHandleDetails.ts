import { useRouter } from 'next/router';

export default function useHandleDetails() {
  const router = useRouter();

  function closeDetails() {
    const queryParams = { ...router.query };
    delete queryParams.details;
    router.push({ pathname: router.pathname, query: queryParams });
  }

  const openDetails = (characterName: string) => {
    const queryParams = { ...router.query };
    queryParams.details = characterName;

    router.push({ pathname: router.pathname, query: queryParams });
  };

  return { closeDetails, openDetails };
}
