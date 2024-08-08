import { useNavigate, useSearchParams } from '@remix-run/react';
import { useGetCharacterByNameQuery } from '../../../../store/api/api';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import styles from './CharacterDetails.module.scss';

type CharacterDetailsProps = {
  detailedCharacterName: string;
};

export default function CharacterDetails({ detailedCharacterName }: CharacterDetailsProps) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const navigate = useNavigate();

  const { data: charactersData, isFetching: isSearching } = useGetCharacterByNameQuery(detailedCharacterName || '');

  if (!charactersData) {
    return <div>Character details is not found</div>;
  }

  const character = charactersData.results[0];

  return (
    <div className={styles.itemDetails} data-testid="item-details">
      <button type="button" className={styles.closeButton} onClick={() => navigate(`/?page=${page}`)}>
        X
      </button>
      {isSearching && <LoaderSpinner />}
      {!isSearching && character && (
        <>
          <p>Name: {character.name}</p>
          <p>Gender: {character.gender}</p>
          <p>Height: {character.height}</p>
          <p>Hair color: {character.hair_color}</p>
          <p>Eye color: {character.eye_color}</p>
          <p>Mass: {character.mass}</p>
        </>
      )}
    </div>
  );
}
