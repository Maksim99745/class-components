import { CharactersData } from 'components/models/character';
import MainPage from '../components/Main/MainPage';

type HomeProps = {
  charactersData: CharactersData;
};

function Home({ charactersData }: HomeProps) {
  return <MainPage charactersData={charactersData} />;
}

export const getServerSideProps = async (context: { query: { search?: string; page?: number } }) => {
  const { search = '', page = '1' } = context.query;
  const response = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`);
  const charactersData = await response.json();
  return {
    props: { charactersData },
  };
};

export default Home;
