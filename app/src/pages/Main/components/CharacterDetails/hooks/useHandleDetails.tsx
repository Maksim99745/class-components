import { useNavigate, useSearchParams } from '@remix-run/react';

export default function useHandleDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const details = searchParams.get('details');
  const page = searchParams.get('page') || '1';

  function closeDetails() {
    if (details) {
      navigate(`/?page=${page}`);
    }
  }

  const openDetails = (characterName: string) => {
    navigate(`/?page=${page}&details=${characterName}`);
  };

  return { closeDetails, openDetails };
}
