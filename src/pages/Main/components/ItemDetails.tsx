import LoaderSpinner from '@components/LoaderSpinner';
import { Character } from '@models/character';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCharacters } from '../methods/getCharacter';
import styles from './ItemDetails.module.scss';

export default function ItemDetails() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const { characterName } = useParams();
  const navigate = useNavigate();

  const getCharacterDetails = async (characterNames: string): Promise<void> => {
    setIsDetailsLoading(true);
    const charactersData = await getCharacters({ query: characterNames });
    setIsDetailsLoading(false);
    setCharacter(charactersData.results[0]);
  };

  useEffect(() => {
    if (characterName) {
      getCharacterDetails(characterName);
    }
  }, [characterName]);

  if (!character) {
    return null;
  }

  return (
    <div className={styles.itemDetails}>
      <button type="button" className={styles.closeButton} onClick={() => navigate('/')}>
        X
      </button>
      {isDetailsLoading && <LoaderSpinner />}
      {!isDetailsLoading && (
        <>
          <p>Name: {character.name}</p>
          <p>Gender: {character.gender}</p>
          <p>Height: {character.height}</p>
          <p>Hair color: {character.hair_color}</p>
          <p>Eye color: {character.eye_color}</p>
          <p>Mass: {character.mass}</p>
        </>
      )}
    </div>
  );
}
