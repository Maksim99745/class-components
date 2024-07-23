import { mockCharacterData, mockCharactersData, mockEmptyCharactersData } from '@mocks/mockCharactersData';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { assert, describe, it } from 'vitest';
import { CharactersView } from './CharactersView';

const mockStore = configureMockStore();

describe('CharactersView Component', () => {
  let store: MockStoreEnhanced<unknown, NonNullable<unknown>>;
  beforeEach(() => {
    store = mockStore({ characters: [mockCharactersData], favorites: [mockCharacterData] });
  });
  it('renders a certain number of character cards', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharactersView />
        </Provider>
      </MemoryRouter>,
    );

    const characterCards = screen.getAllByText(/Name/);
    assert.equal(characterCards.length, mockCharactersData.results.length);
  });

  it('displays "Not found" if no characters are passed', () => {
    store = mockStore({ characters: [mockEmptyCharactersData], favorites: [] });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharactersView />
        </Provider>
      </MemoryRouter>,
    );

    const notFoundMessage = screen.getByText('Characters data not found');
    assert.exists(notFoundMessage);
  });

  it('does not render any cards if data is null', () => {
    store = mockStore({ characters: [mockEmptyCharactersData], favorites: [] });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharactersView />
        </Provider>
      </MemoryRouter>,
    );

    const characterCards = screen.queryAllByText(/Name/);
    assert.equal(characterCards.length, 0);
  });
});
