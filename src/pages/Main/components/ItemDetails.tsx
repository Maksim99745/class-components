import LoaderSpinner from '@components/LoaderSpinner';
import { Character } from '@models/character';
import styles from './ItemDetails.module.scss';

interface ItemDetailsProps {
  isLoading: boolean;
  isOpened: boolean;
  setIsOpened: () => void;
  character: Character;
}

export default function ItemDetails({ isOpened, setIsOpened, character, isLoading }: ItemDetailsProps) {
  if (isOpened) {
    return (
      <div className={styles.itemDetails}>
        <button type="button" className={styles.closeButton} onClick={() => setIsOpened()}>
          X
        </button>
        {isLoading && <LoaderSpinner />}
        {!isLoading && (
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

  return null;
}
