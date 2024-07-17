import { CharactersData } from '@models/character';
import CharacterItem from '../CharacterItem/CharacterItem';
import styles from './CharactersView.module.scss';

interface ResultsProps {
  characters: CharactersData | null;
}

export function CharactersView({ characters }: ResultsProps) {
  if (!characters) {
    return null;
  }
  return (
    <div className={styles.itemsBlock}>
      {characters?.results?.map((character) => (
        <div key={character.name}>
          <CharacterItem character={character} />
        </div>
      ))}
      {characters?.count === 0 && <div>Not found</div>}
    </div>
  );
}
