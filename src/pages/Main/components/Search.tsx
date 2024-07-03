import { ChangeEvent, Component, FormEvent } from 'react';

import { CharactersData } from '@models/character';
import { getCharacters } from '../methods/getCharacter';
import styles from './Search.module.scss';

interface SearchProps {
  query?: string;
  updateSearchResult: (characters: CharactersData) => void;
}

export class Search extends Component<SearchProps, SearchProps> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: props.query,
      updateSearchResult: props.updateSearchResult,
    };
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  private handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { query = '', updateSearchResult } = this.state;
    const characters = await getCharacters({ query });
    updateSearchResult(characters);
  };

  public render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.searchInputContainer}>
          <input
            placeholder="Enter your search query..."
            onChange={this.handleChange}
            type="search"
            className={styles.searchInput}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    );
  }
}
