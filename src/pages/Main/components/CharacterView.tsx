import styles from './CharacterView.module.scss';

interface CharacterViewProps {
  name: string;
  openDetails: () => void;
  getCharacterDetails: (characterName: string) => Promise<void>;
}

export default function CharacterView({ name, openDetails, getCharacterDetails }: CharacterViewProps) {
  function handleClick() {
    openDetails();
    getCharacterDetails(name);
  }
  return (
    <button type="button" className={styles.characterBox} onClick={() => handleClick()}>
      <div className={styles.characterName}>Name: {name}</div>
    </button>
  );
}
