import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { assert, beforeEach, describe, it, vi } from 'vitest';
import { mockCharacterData, mockCharactersData, mockEmptyCharactersData } from '../../../../mocks/mockCharactersData';
import { CharactersView } from './CharactersView';

const mockStore = configureMockStore();

const characterData = mockCharactersData.results[0];
const navigateMock = vi.fn();

vi.mock('@remix-run/react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useSearchParams: () => [
      {
        get: vi.fn((param) => {
          if (param === 'page') {
            return '1';
          }
          return null;
        }),
      },
    ],
  };
});

describe('CharactersView Component', () => {
  let store: MockStoreEnhanced<unknown, NonNullable<unknown>>;
  beforeEach(() => {
    store = mockStore({ favorites: [mockCharacterData] });
  });
  it('renders a certain number of character cards', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharactersView charactersData={mockCharactersData} />
        </Provider>
      </MemoryRouter>,
    );

    const characterCards = screen.getAllByText(/Name/);
    assert.equal(characterCards.length, mockCharactersData.results.length);
  });

  it('displays "Not found" if no characters are passed', () => {
    store = mockStore({ favorites: [] });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharactersView charactersData={mockEmptyCharactersData} />
        </Provider>
      </MemoryRouter>,
    );

    const notFoundMessage = screen.getByText('Characters data not found');
    assert.exists(notFoundMessage);
  });
});
