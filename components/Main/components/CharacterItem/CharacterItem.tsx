import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Character } from '../../../models/character';
import { useMainPageActions } from '../../hooks/useMainPageActions';
import useHandleDetails from '../CharacterDetails/hooks/useHandleDetails';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: Character;
}

export default function CharacterItem({ character }: CharacterItemProps) {
  const favorites = useSelector((state: RootState) => state.favorites);
  const { toggleFavorite } = useMainPageActions();
  const { openDetails } = useHandleDetails();

  const handleNavigation = () => {
    openDetails(character.name);
  };

  return (
    <div className={styles.characterBox}>
      <button onClick={handleNavigation} type="button">
        <div className={styles.characterName}>Name: {character.name}</div>
      </button>
      <div>
        <label htmlFor={character.name} className={styles.favorite}>
          <input
            type="checkbox"
            id={character.name}
            style={{ cursor: 'pointer' }}
            name="favorite"
            checked={favorites.includes(character)}
            onChange={() => toggleFavorite(character)}
          />
          Favorite
        </label>
      </div>
    </div>
  );
}
