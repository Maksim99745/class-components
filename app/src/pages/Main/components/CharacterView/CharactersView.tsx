import { CharactersData } from 'app/src/models/character';
import CharacterItem from '../CharacterItem/CharacterItem';
import styles from './CharactersView.module.scss';

type CharactersViewProps = { charactersData: CharactersData };

export function CharactersView({ charactersData }: CharactersViewProps) {
  return (
    <div className={styles.itemsBlock}>
      {charactersData?.results?.map((character) => (
        <div key={character.name}>
          <CharacterItem character={character} />
        </div>
      ))}
      {charactersData?.count === 0 && <div>Characters data not found</div>}
    </div>
  );
}
