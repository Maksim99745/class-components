import { useRouter } from 'next/router';
import { useGetCharacterByNameQuery } from '../../../../store/api/api';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import styles from './CharacterDetails.module.scss';
import useHandleDetails from './hooks/useHandleDetails';

export default function CharacterDetails() {
  const router = useRouter();
  const { closeDetails } = useHandleDetails();
  const { details } = router.query;
  const characterName = Array.isArray(details) ? details[0] : details || '';
  const { data: charactersData, isFetching: isSearching } = useGetCharacterByNameQuery(characterName || '');

  if (characterName === '') {
    return null;
  }

  if (!charactersData) {
    return <div>Character details is not found</div>;
  }

  const character = charactersData.results[0];

  return (
    <div className={styles.itemDetails} data-testid="item-details">
      <button type="button" className={styles.closeButton} onClick={() => closeDetails()}>
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
