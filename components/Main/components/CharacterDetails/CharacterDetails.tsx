import { CharactersData } from 'components/models/character';
import styles from './CharacterDetails.module.scss';
import useHandleDetails from './hooks/useHandleDetails';

type CharacterDetailsProps = {
  characterDetails: CharactersData | null;
};

export default function CharacterDetails({ characterDetails }: CharacterDetailsProps) {
  const { closeDetails } = useHandleDetails();

  if (!characterDetails) {
    return null;
  }

  if (characterDetails.count === 0) {
    return <div>Character details not found</div>;
  }

  const character = characterDetails.results[0];
  return (
    <div className={styles.itemDetails} data-testid="item-details">
      <button type="button" className={styles.closeButton} onClick={() => closeDetails()}>
        X
      </button>

      <p>Name: {character.name}</p>
      <p>Gender: {character.gender}</p>
      <p>Height: {character.height}</p>
      <p>Hair color: {character.hair_color}</p>
      <p>Eye color: {character.eye_color}</p>
      <p>Mass: {character.mass}</p>
    </div>
  );
}
