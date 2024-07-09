import React, { Component } from 'react';
import { CharactersData } from '../../models/character';
import ErrorButton from './components/ErrorButton';
import { Results } from './components/Results';
import { Search } from './components/Search';
import styles from './MainPage.module.scss';

interface MainPageState {
  characters: CharactersData | null;
  isSearching: boolean;
}

class MainPage extends Component<Record<string, never>, MainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      characters: null,
      isSearching: false,
    };

    this.updateSearchResult = this.updateSearchResult.bind(this);
    this.updateSearchingStatus = this.updateSearchingStatus.bind(this);
    this.throwTestError = this.throwTestError.bind(this);
  }

  private updateSearchingStatus(value: boolean) {
    this.setState({ isSearching: value });
  }

  public updateSearchResult(characters: CharactersData) {
    this.setState({ characters });
  }

  public throwTestError() {
    throw new Error('test error');
  }

  public render(): React.ReactNode {
    const { characters, isSearching } = this.state;
    return (
      <div className={styles.mainPage}>
        <div className={styles.nameContainer}>
          <p>Find your favorite The Star Wars character!</p>
          <ErrorButton />
        </div>
        <Search updateSearchResult={this.updateSearchResult} updateSearchingStatus={this.updateSearchingStatus} />
        <Results characters={characters} />
        {isSearching && <div className={styles.loader} />}
      </div>
    );
  }
}

export default MainPage;
