import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { useMainPageActions } from '../../hooks/useMainPageActions';
import styles from './FavoritesToolBar.module.scss';

export default function FavoritesToolBar() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const { unselectAll } = useMainPageActions();

  // const downloadCSV = () => generateCSV(favorites, `${favorites.length}_favorites.csv`);

  return (
    <div className={styles.favoritesToolbar}>
      <p className={styles.favoritesAmount}>Favorites amount: {favorites.length}</p>
      <div className={styles.buttonsBlock}>
        <button type="button" onClick={() => unselectAll()}>
          Unselect all
        </button>
        <button type="button">
          <CSVLink data={favorites} style={{ color: 'black' }}>
            Download
          </CSVLink>
        </button>
      </div>
    </div>
  );
}
