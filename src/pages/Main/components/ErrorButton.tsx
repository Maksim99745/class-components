import { useState } from 'react';
import styles from '../MainPage.module.scss';

export default function ErrorButton() {
  const [isError, setError] = useState(false);

  const handleClick = () => {
    setError(true);
  };

  if (isError) {
    throw new Error('This is the test error for checking Error Boundary');
  }

  return (
    <button type="button" className={styles.errorButton} onClick={handleClick}>
      Error button
    </button>
  );
}
