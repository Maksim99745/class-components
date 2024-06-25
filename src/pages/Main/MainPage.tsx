import { Component } from 'react';
import { Character } from '../../models/character';
import { Results } from './components/Results';
import { Search } from './components/Search';

interface MainPageState {
  characters: Character[];
}

export class MainPage extends Component<Record<string, never>, MainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      characters: [],
    };

    this.updateState = this.updateState.bind(this);
  }

  public updateState(characters: Character[]) {
    this.setState({ characters });
  }

  public render(): React.ReactNode {
    const { characters } = this.state;
    return (
      <div style={{ marginTop: '100px' }}>
        <p>Find your favorite The Star Wars character!</p>
        <Search updateSearchResult={this.updateState} />
        <Results characters={characters} />
      </div>
    );
  }
}
