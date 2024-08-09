/* eslint-disable react-refresh/only-export-components */
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTheme } from 'app/src/core/themes/themeHooks';
import MainPage from 'app/src/pages/Main/MainPage';
import '../App.css';
import '../index.scss';
import styles from '../src/core/themes/Theme.module.scss';

export const meta: MetaFunction = () => [
  { title: 'Star wars' },
  { name: 'description', content: 'Welcome to Star wars world!' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details') || '';

  const charactersResponse = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`);
  const charactersData = await charactersResponse.json();

  let characterDetails = null;
  if (details) {
    const characterDetailsResponse = await fetch(`https://swapi.dev/api/people/?search=${details}`);
    characterDetails = await characterDetailsResponse.json();
  }

  return {
    charactersData,
    characterDetails,
  };
}

export default function Index() {
  const isDarkTheme = useTheme();
  const data = useLoaderData<typeof loader>();
  return (
    <div className={isDarkTheme ? styles.darkTheme : undefined} data-testid="theme-container">
      <div className="App">
        <MainPage charactersData={data.charactersData} characterDetails={data.characterDetails} />;
      </div>
    </div>
  );
}
