import { useNavigate } from 'react-router-dom';
import styles from './CharacterView.module.scss';

interface CharacterViewProps {
  name: string;
}

export default function CharacterView({ name }: CharacterViewProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/details/${name}`);
  }
  return (
    <button type="button" className={styles.characterBox} onClick={() => handleClick()}>
      <div className={styles.characterName}>Name: {name}</div>
    </button>
  );
}
