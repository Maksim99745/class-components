import { ChangeEvent, Component, FormEvent } from 'react';

import { Character } from '@models/character';
import { getCharacter } from '../hooks/getCharacter';
import styles from './Search.module.scss';

interface SearchProps {
  lastQuery?: string;
  updateSearchResult: (characters: Character[]) => void;
}

export class Search extends Component<SearchProps> {
  private query: string;
  private updateSearchResult: (characters: Character[]) => void;

  constructor(props: SearchProps) {
    super(props);
    this.query = props.lastQuery || '';
    this.updateSearchResult = props.updateSearchResult;
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.query = event.target.value;
  };

  private handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const basics = await getCharacter({ query: this.query });
    this.updateSearchResult(basics);
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
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>
    );
  }
}
