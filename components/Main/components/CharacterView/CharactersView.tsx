import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import CharacterItem from '../CharacterItem/CharacterItem';
import styles from './CharactersView.module.scss';

export function CharactersView() {
  const characters = useSelector((state: RootState) => state.characters);
  if (!characters) {
    return <div>Characters data not found</div>;
  }

  return (
    <div className={styles.itemsBlock}>
      {characters[0]?.results?.map((character) => (
        <div key={character.name}>
          <CharacterItem character={character} />
        </div>
      ))}
      {characters[0]?.count === 0 && <div>Characters data not found</div>}
    </div>
  );
}
