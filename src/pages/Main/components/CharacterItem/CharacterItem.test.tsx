import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { mockCharactersData } from '@mocks/mockCharactersData';
import { store } from '@store/store';
import { assert, describe, it, vi } from 'vitest';
import { useMainPageActions } from '../../hooks/useMainPageActions';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import CharacterItem from './CharacterItem';

const characterData = mockCharactersData.results[0];

vi.mock('@store/api/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@store/api/api')>();
  return {
    ...actual,
    useGetCharacterByNameQuery: vi.fn(),
  };
});

vi.mock('../../hooks/useMainPageActions', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../hooks/useMainPageActions')>();
  return {
    ...actual,
    useMainPageActions: () => ({
      toggleFavorite: vi.fn(),
    }),
  };
});

describe('CharacterItem Component', () => {
  let mockUseGetCharacterByNameQuery: ReturnType<typeof vi.fn>;
  let mockToggleFavorite: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mockUseGetCharacterByNameQuery = vi.mocked((await import('@store/api/api')).useGetCharacterByNameQuery);
    mockUseGetCharacterByNameQuery.mockReset();
    mockToggleFavorite = vi.mocked(
      (await import('../../hooks/useMainPageActions')).useMainPageActions().toggleFavorite,
    );
    mockToggleFavorite.mockReset();
  });

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

  it('opens the detailed card component when clicked', async () => {
    mockUseGetCharacterByNameQuery.mockReturnValue({
      data: mockCharactersData,
      isFetching: false,
    });
    render(
      <MemoryRouter initialEntries={['/details/Luke%20Skywalker?page=1']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<CharacterItem character={characterData} />} />
            <Route path="details/:characterName" element={<CharacterDetails />} />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: Luke Skywalker');
    fireEvent.click(characterCard);

    const itemDetailsComponent = screen.getByTestId('item-details');
    assert.exists(itemDetailsComponent);
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
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

  it('Check that clicking on favorite triggers toggleFavorite action', async () => {
    const actions = useMainPageActions();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <CharacterItem character={characterData} />
        </Provider>
      </MemoryRouter>,
    );
    const characterCard = screen.getByText('Favorite');
    const toggleSpy = vi.spyOn(actions, 'toggleFavorite');

    fireEvent.click(characterCard);

    assert.exists(toggleSpy);
  });
});
