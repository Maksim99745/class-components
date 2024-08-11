import { mockCharacterData, mockCharactersData } from '@mocks/mockCharactersData';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { assert, beforeEach, describe, it, vi } from 'vitest';
import MainPage from './MainPage';

const mockStore = configureMockStore();

vi.mock('@remix-run/react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigation: () => vi.fn(),
    useNavigate: () => vi.fn(),
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

describe('MainPage Component', () => {
  let store: MockStoreEnhanced<unknown, NonNullable<unknown>>;

  beforeEach(() => {
    store = mockStore({ favorites: [mockCharacterData] });
  });

  it('Main page is rendering as it expected', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage characterDetails={mockCharactersData} charactersData={mockCharactersData} />
        </Provider>
      </MemoryRouter>,
    );
    const mainPageHeader = screen.getByText('Find your favorite The Star Wars character!');
    assert.exists(mainPageHeader);
  });
});
