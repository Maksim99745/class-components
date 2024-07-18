import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { useMainPageActions } from '../../hooks/useMainPageActions';
import styles from './FavoritesToolBar.module.scss';
import { arrayToCSV } from './methods/arrayToCSV';

export default function FavoritesToolBar() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const { unselectAll } = useMainPageActions();

  const handleDownload = () => {
    const csvData = arrayToCSV(favorites);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const filename = `${favorites.length}_favorites.csv`;
    saveAs(blob, filename);
  };

  return (
    <div className={styles.favoritesToolbar}>
      <p className={styles.favoritesAmount}>Favorites amount: {favorites.length}</p>
      <div className={styles.buttonsBlock}>
        <button type="button" onClick={() => unselectAll()}>
          Unselect all
        </button>
        <button type="button" onClick={() => handleDownload()}>
          Download
        </button>
      </div>
    </div>
  );
}
