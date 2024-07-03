import { CharactersData } from '@models/character';
import { Component } from 'react';
import { CharacterView } from './CharacterView';
import styles from './Results.module.scss';

interface ResultsProps {
  characters: CharactersData | null;
}

export class Results extends Component<ResultsProps, ResultsProps> {
  constructor(props: ResultsProps) {
    super(props);
    this.state = {
      characters: props.characters,
    };
  }

  public componentDidUpdate(prevProps: ResultsProps) {
    const { characters } = this.props;
    if (prevProps.characters !== characters) {
      this.setState({ characters });
    }
  }

  public render(): React.ReactNode {
    const { characters } = this.state;
    return (
      <div className={styles.resultsBlock}>
        {characters?.results?.map((character) => (
          <CharacterView
            key={character.name}
            name={character.name}
            gender={character.gender}
            height={character.height}
          />
        ))}
        {characters?.count === 0 && <div>Not found</div>}
      </div>
    );
  }
}
