import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { assert, describe, expect, it, vi } from 'vitest';
import { mockCharacterData, mockCharactersData } from '../../../mocks/mockCharactersData';
import FavoritesToolBar from './FavoritesToolBar';

const unselectAll = vi.fn();

vi.mock('../../hooks/useMainPageActions', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../hooks/useMainPageActions')>();
  return {
    ...actual,
    useMainPageActions: () => ({
      unselectAll,
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
      <Provider store={store}>
        <FavoritesToolBar />
      </Provider>,
    );

    const favoriteAmount = screen.getByText('Favorites amount: 1');
    assert.exists(favoriteAmount);
  });

  it('dispatches unselectAll action when "Unselect all" button is clicked', async () => {
    render(
      <Provider store={store}>
        <FavoritesToolBar />
      </Provider>,
    );

    const unselectAllButton = screen.getByText('Unselect all');

    fireEvent.click(unselectAllButton);

    expect(unselectAll).toHaveBeenCalled();
  });

  it('check that click to download button casing download process', async () => {
    render(
      <Provider store={store}>
        <FavoritesToolBar />
      </Provider>,
    );

    const downloadButton = screen.getByText('Download');

    fireEvent.click(downloadButton);
    const createObjectSpy = vi.spyOn(document, 'createElement');
    assert.exists(createObjectSpy);
  });
});
