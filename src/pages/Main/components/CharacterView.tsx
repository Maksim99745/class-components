import styles from './CharacterView.module.scss';

interface CharacterViewProps {
  name: string;
  gender: string;
  height: string;
}

export default function CharacterView({ name, gender, height }: CharacterViewProps) {
  return (
    <div className={styles.characterBox}>
      <div>Name: {name}</div>
      <div>Gender: {gender}</div>
      <div>Height: {height}</div>
    </div>
  );
}
