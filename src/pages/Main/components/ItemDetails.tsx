import { Character } from '@models/character';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getCharacters } from '../methods/getCharacter';
import styles from './ItemDetails.module.scss';
import LoaderSpinner from './LoaderSpinner';

export default function ItemDetails() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  const { characterName } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const navigate = useNavigate();

  const getCharacterDetails = async (characterNames: string): Promise<void> => {
    setIsDetailsLoading(true);
    const charactersData = await getCharacters({ query: characterNames });

    await setCharacter(charactersData.results[0]);
    setIsDetailsLoading(false);
  };

  useEffect(() => {
    if (characterName) {
      getCharacterDetails(characterName);
    }
  }, [characterName]);

  return (
    <div className={styles.itemDetails} data-testid="item-details">
      <button type="button" className={styles.closeButton} onClick={() => navigate(`/?page=${page}`)}>
        X
      </button>
      {isDetailsLoading && <LoaderSpinner />}
      {!isDetailsLoading && character && (
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
