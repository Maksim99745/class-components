'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function useHandleDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const details = searchParams.get('details');
  const page = searchParams.get('page') || '1';

  function closeDetails() {
    if (details) {
      router.push(`/?page=${page}`);
    }
  }

  const openDetails = (characterName: string) => {
    router.push(`/?page=${page}&details=${characterName}`);
  };

  return { closeDetails, openDetails };
}
