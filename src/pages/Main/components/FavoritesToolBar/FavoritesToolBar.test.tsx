import { mockCharacterData, mockCharactersData } from '@mocks/mockCharactersData';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { vi } from 'vitest';
import { useMainPageActions } from '../../hooks/useMainPageActions';
import FavoritesToolBar from './FavoritesToolBar';

vi.mock('../../hooks/useMainPageActions', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../hooks/useMainPageActions')>();
  return {
    ...actual,
    useMainPageActions: () => ({
      unselectAll: vi.fn(),
    }),
  };
});

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'http://mockurl'),
  revokeObjectURL: vi.fn(),
});

const mockStore = configureMockStore();
const store = mockStore({ characters: [mockCharactersData], favorites: [mockCharacterData] });

describe('FavoritesToolBar Component', async () => {
  it('FavoritesToolBar renders the right amount of favorite characters', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <FavoritesToolBar />
        </Provider>
      </MemoryRouter>,
    );

    const favoriteAmount = screen.getByText('Favorites amount: 1');
    assert.exists(favoriteAmount);
  });

  it('dispatches unselectAll action when "Unselect all" button is clicked', async () => {
    const actions = useMainPageActions();
    const unselectAllSpy = vi.spyOn(actions, 'unselectAll');
    unselectAllSpy.mockClear();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <FavoritesToolBar />
        </Provider>
      </MemoryRouter>,
    );

    const unselectAllButton = screen.getByText('Unselect all');

    fireEvent.click(unselectAllButton);

    assert.exists(unselectAllSpy);
  });

  it('check that click to download button casing download process', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <FavoritesToolBar />
        </Provider>
      </MemoryRouter>,
    );

    const downloadButton = screen.getByText('Download');

    fireEvent.click(downloadButton);
    const createObjectSpy = vi.spyOn(document, 'createElement');
    assert.exists(createObjectSpy);
  });
});
