import { CharactersData } from '@models/character';
import CharacterView from './CharacterView';
import styles from './Results.module.scss';

interface ResultsProps {
  characters: CharactersData | null;
}

export function Results({ characters }: ResultsProps) {
  return (
    <div className={styles.resultsBlock}>
      {characters?.results?.map((character) => (
        <CharacterView key={character.name} name={character.name} gender={character.gender} height={character.height} />
      ))}
      {characters?.count === 0 && <div>Not found</div>}
    </div>
  );
}
