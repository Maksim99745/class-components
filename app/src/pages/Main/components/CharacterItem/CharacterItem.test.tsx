import { store } from '@store/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { assert, describe, it, vi } from 'vitest';
import { mockCharactersData } from '../../../../mocks/mockCharactersData';
import CharacterItem from './CharacterItem';

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

describe('CharacterItem Component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharacterItem character={characterData} />
        </Provider>
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: Luke Skywalker');
    assert.exists(characterCard);
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharacterItem character={characterData} />
        </Provider>
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: Luke Skywalker');
    const fetchSpy = vi.spyOn(window, 'fetch');

    fireEvent.click(characterCard);

    assert.exists(fetchSpy);
  });
});
