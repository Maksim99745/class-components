import { Component } from 'react';
import { Character } from '../../../models/character';

interface ResultsProps {
  characters: Character[];
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
      <div>
        {characters.length > 0 ? (
          characters.map((character) => <div key={character.created}>{character.name}</div>)
        ) : (
          <div>Not found</div>
        )}
      </div>
    );
  }
}
