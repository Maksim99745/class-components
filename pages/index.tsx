import { CharactersData } from 'components/models/character';
import MainPage from '../components/Main/MainPage';

type HomeProps = {
  charactersData: CharactersData;
  characterDetails: CharactersData | null;
};

function Home({ charactersData, characterDetails }: HomeProps) {
  return <MainPage charactersData={charactersData} characterDetails={characterDetails} />;
}

export const getServerSideProps = async (context: { query: { search?: string; page?: string; details?: string } }) => {
  const { search = '', page = '1', details } = context.query;

  const charactersResponse = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`);
  const charactersData = await charactersResponse.json();

  let characterDetails = null;
  if (details) {
    const characterDetailsResponse = await fetch(`https://swapi.dev/api/people/?search=${details}`);
    characterDetails = await characterDetailsResponse.json();
  }

  return {
    props: {
      charactersData,
      characterDetails,
    },
  };
};

export default Home;
