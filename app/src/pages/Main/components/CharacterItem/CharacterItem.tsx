import { Link, useSearchParams } from '@remix-run/react';
import { Character } from 'app/src/models/character';
import { RootState } from 'app/src/store/store';
import { useSelector } from 'react-redux';
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
      <Link to={`/?page=${page}&details=${character.name}`} type="button">
        <div className={styles.characterName}>Name: {character.name}</div>
      </Link>

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
  );
}
