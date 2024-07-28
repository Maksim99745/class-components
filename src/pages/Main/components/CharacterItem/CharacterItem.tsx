import { Character } from '@models/character';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { RootState } from 'src/store/store';
import { useMainPageActions } from '../../hooks/useMainPageActions';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: Character;
}

export default function CharacterItem({ character }: CharacterItemProps) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const favorites = useSelector((state: RootState) => state.favorites);
  const { toggleFavorite } = useMainPageActions();

  return (
    <div className={styles.characterBox}>
      <Link to={{ pathname: `/details/${character.name}`, search: `page=${page}` }}>
        <div className={styles.characterName}>Name: {character.name}</div>
      </Link>
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
