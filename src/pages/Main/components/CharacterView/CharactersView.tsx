import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import CharacterItem from '../CharacterItem/CharacterItem';
import styles from './CharactersView.module.scss';

export function CharactersView() {
  const characters = useSelector((state: RootState) => state.characters);
  if (!characters) {
    return null;
  }
  return (
    <div className={styles.itemsBlock}>
      {characters[0]?.results?.map((character) => (
        <div key={character.name}>
          <CharacterItem character={character} />
        </div>
      ))}
      {characters[0]?.count === 0 && <div>Not found</div>}
    </div>
  );
}
