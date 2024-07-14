import { CharactersData } from '@models/character';
import CharacterView from './CharacterView';
import styles from './Results.module.scss';

interface ResultsProps {
  characters: CharactersData | null;
  openDetails: () => void;
  getCharacterDetails: (characterName: string) => Promise<void>;
}

export function Results({ characters, openDetails, getCharacterDetails }: ResultsProps) {
  if (!characters) {
    return null;
  }
  return (
    <div className={styles.itemsBlock}>
      {characters?.results?.map((character) => (
        <div key={character.name}>
          <CharacterView name={character.name} openDetails={openDetails} getCharacterDetails={getCharacterDetails} />
        </div>
      ))}
      {characters?.count === 0 && <div>Not found</div>}
    </div>
  );
}
