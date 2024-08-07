import ErrorBoundary from 'components/core/ErrorBoundary/ErrorBoundary';
import '../components/core/themes/Theme.module.scss';
import HomePage from './home-page';
import './index.scss';

export const getCharactersData = async ({
  searchParams,
}: {
  searchParams: { search: string; page: string; details: string };
}) => {
  const { search = '', page = '1', details = '' } = searchParams;

  const charactersResponse = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`, {
    cache: 'no-store',
  });
  const charactersData = await charactersResponse.json();

  let characterDetails = null;
  if (details) {
    const characterDetailsResponse = await fetch(`https://swapi.dev/api/people/?search=${details}`, {
      cache: 'no-store',
    });
    characterDetails = await characterDetailsResponse.json();
  }

  return {
    props: {
      charactersData,
      characterDetails,
    },
  };
};

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string; page: string; details: string };
}) {
  const charactersData = await getCharactersData({ searchParams });
  return (
    <ErrorBoundary>
      <HomePage
        characterDetails={charactersData.props.characterDetails}
        charactersData={charactersData.props.charactersData}
      />
    </ErrorBoundary>
  );
}
