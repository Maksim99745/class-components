import { Component } from 'react';
import { CharactersData } from '../../models/character';
import styles from './MainPage.module.scss';
import { Results } from './components/Results';
import { Search } from './components/Search';

interface MainPageState {
  characters: CharactersData | null;
}

export class MainPage extends Component<Record<string, never>, MainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      characters: null,
    };

    this.updateState = this.updateState.bind(this);
  }

  public updateState(characters: CharactersData) {
    this.setState({ characters });
  }

  public render(): React.ReactNode {
    const { characters } = this.state;
    return (
      <div className={styles.mainPage}>
        <p>Find your favorite The Star Wars character!</p>
        <Search updateSearchResult={this.updateState} />
        <Results characters={characters} />
      </div>
    );
  }
}
