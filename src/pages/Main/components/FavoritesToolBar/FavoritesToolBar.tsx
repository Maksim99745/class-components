import { Character } from '@models/character';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { useMainPageActions } from '../../hooks/useMainPageActions';
import styles from './FavoritesToolBar.module.scss';

export default function FavoritesToolBar() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const { unselectAll } = useMainPageActions();

  const arrayToCSV = (data: Character[]): string => {
    if (data.length === 0) {
      return '';
    }
    function isKeyOfCharacter(key: string): key is keyof Character {
      return key in data[0];
    }
    const headers: Array<keyof Character> = Object.keys(data[0]).filter(isKeyOfCharacter);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            const escaped = `${value}`.replace(/"/g, '\\"');
            return `"${escaped}"`;
          })
          .join(','),
      ),
    ];

    return csvRows.join('\n');
  };

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
