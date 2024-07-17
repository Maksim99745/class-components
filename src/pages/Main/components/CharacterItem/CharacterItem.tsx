import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { RootState } from 'src/store/store';
import { useMainPageActions } from '../../hooks/useMainPageActions';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  name: string;
}

export default function CharacterItem({ name }: CharacterItemProps) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const favorites = useSelector((state: RootState) => state.favorites);
  const { toggleFavorite } = useMainPageActions();

  return (
    <div className={styles.characterBox}>
      <Link to={{ pathname: `/details/${name}`, search: `page=${page}` }}>
        <div className={styles.characterName}>Name: {name}</div>
      </Link>
      <div>
        <label htmlFor="favorite" className={styles.favorite}>
          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            checked={favorites.includes(name)}
            onChange={() => toggleFavorite(name)}
          />
          Favorite
        </label>
      </div>
    </div>
  );
}
