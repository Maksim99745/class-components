import { ChangeEvent, Component, FormEvent } from 'react';

import { CharactersData } from '@models/character';
import { setValueToLocalStorage } from '@utils/localStorageController';
import { getCharacters } from '../methods/getCharacter';
import styles from './Search.module.scss';

interface SearchProps {
  previousQuery?: string;
  query?: string;
  updateSearchResult: (characters: CharactersData) => void;
  updateSearchingStatus: (isSearching: boolean) => void;
}

interface SearchState {
  previousQuery?: string;
  query?: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      previousQuery: props.previousQuery,
      query: props.query,
    };
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  private handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { query = '' } = this.state;
    const { updateSearchResult, updateSearchingStatus } = this.props;

    setValueToLocalStorage(query);
    updateSearchingStatus(true);

    const characters = await getCharacters({ query });
    updateSearchResult(characters);

    updateSearchingStatus(false);
  };

  public render(): React.ReactNode {
    const { query, previousQuery = '' } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.searchInputContainer}>
          <input
            value={query || previousQuery}
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
