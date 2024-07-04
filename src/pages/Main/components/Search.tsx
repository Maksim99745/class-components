import { ChangeEvent, Component, FormEvent } from 'react';

import { CharactersData } from '@models/character';
import { getValueFromLocalStorage, setValueToLocalStorage } from '@utils/localStorageController';
import { getCharacters } from '../methods/getCharacter';
import styles from './Search.module.scss';

interface SearchProps {
  query?: string;
  updateSearchResult: (characters: CharactersData) => void;
  updateSearchingStatus: (isSearching: boolean) => void;
}

interface SearchState {
  query?: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const initialQuery = props.query || getValueFromLocalStorage();
    this.state = {
      query: initialQuery,
    };
  }

  public componentDidMount(): void {
    const initialQuery = getValueFromLocalStorage();
    this.search(initialQuery);
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: event.target.value });
  };

  private handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const { query = '' } = this.state;
    this.search(query);
  };

  private search = async (query: string): Promise<void> => {
    const { updateSearchResult, updateSearchingStatus } = this.props;

    setValueToLocalStorage(query);
    updateSearchingStatus(true);

    const characters = await getCharacters({ query });
    updateSearchResult(characters);

    updateSearchingStatus(false);
  };

  public render(): React.ReactNode {
    const { query } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.searchInputContainer}>
          <input
            value={query || ''}
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
