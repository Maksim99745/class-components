'use client';

import { useRouter } from 'next/navigation';

export default function useHandleDetails() {
  const router = useRouter();

  function closeDetails() {
    router.push(`/`);
  }

  const openDetails = (characterName: string) => {
    router.push(`/?details=${characterName}`);
  };

  return { closeDetails, openDetails };
}
