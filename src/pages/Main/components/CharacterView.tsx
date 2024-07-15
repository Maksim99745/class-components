import { Link, useSearchParams } from 'react-router-dom';
import styles from './CharacterView.module.scss';

interface CharacterViewProps {
  name: string;
}

export default function CharacterView({ name }: CharacterViewProps) {
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;

  // function handleClick() {
  //   const page = searchParams.get('page') || 1;
  //   setSearchParams({ page: String(page), details: name });

  //   // navigate(`/details/${name}`);
  // }
  return (
    <button type="button" className={styles.characterBox}>
      <Link to={{ pathname: `/details/${name}`, search: `page=${page}` }}>
        <div className={styles.characterName}>Name: {name}</div>
      </Link>
    </button>
  );
}
