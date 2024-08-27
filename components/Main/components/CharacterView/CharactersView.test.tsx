import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { assert, beforeEach, describe, it, vi } from 'vitest';
import { mockCharacterData, mockCharactersData, mockEmptyCharactersData } from '../../../mocks/mockCharactersData';
import { CharactersView } from './CharactersView';

const mockStore = configureMockStore();
const pushMock = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: pushMock,
    pathname: '/',
  }),
}));

describe('CharactersView Component', () => {
  let store: MockStoreEnhanced<unknown, NonNullable<unknown>>;
  beforeEach(() => {
    store = mockStore({ favorites: [mockCharacterData] });
  });
  it('renders a certain number of character cards', () => {
    render(
      <Provider store={store}>
        <CharactersView charactersData={mockCharactersData} />
      </Provider>,
    );

    const characterCards = screen.getAllByText(/Name/);
    assert.equal(characterCards.length, mockCharactersData.results.length);
  });

  it('displays "Not found" if no characters are passed', () => {
    store = mockStore({ favorites: [] });
    render(
      <Provider store={store}>
        <CharactersView charactersData={mockEmptyCharactersData} />
      </Provider>,
    );

    const notFoundMessage = screen.getByText('Characters data not found');
    assert.exists(notFoundMessage);
  });
});
