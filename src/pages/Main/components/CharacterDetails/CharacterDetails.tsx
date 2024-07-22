import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetCharacterByNameQuery } from '../../../../store/api/api';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import styles from './CharacterDetails.module.scss';

export default function CharacterDetails() {
  const { characterName } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const navigate = useNavigate();

  const { data: charactersData, isFetching: isSearching } = useGetCharacterByNameQuery(characterName ?? '');

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
