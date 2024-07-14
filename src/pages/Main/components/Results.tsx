import { CharactersData } from '@models/character';
import CharacterView from './CharacterView';
import styles from './Results.module.scss';

interface ResultsProps {
  characters: CharactersData | null;
}

export function Results({ characters }: ResultsProps) {
  if (!characters) {
    return null;
  }
  return (
    <div className={styles.itemsBlock}>
      {characters?.results?.map((character) => (
        <div key={character.name}>
          <CharacterView name={character.name} />
        </div>
      ))}
      {characters?.count === 0 && <div>Not found</div>}
    </div>
  );
}
