import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { store } from '@store/store';

import { mockCharactersData } from '@mocks/mockCharactersData';
import MainPage from '../../MainPage';
import CharacterDetails from './CharacterDetails';

vi.mock('@store/api/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@store/api/api')>();
  return {
    ...actual,
    useGetCharacterByNameQuery: vi.fn(),
  };
});

describe('CharacterDetails Component', () => {
  let mockUseGetCharacterByNameQuery: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mockUseGetCharacterByNameQuery = vi.mocked((await import('@store/api/api')).useGetCharacterByNameQuery);
    mockUseGetCharacterByNameQuery.mockReset();
  });

  it('displays a loading indicator while fetching data', async () => {
    mockUseGetCharacterByNameQuery.mockReturnValue({
      data: mockCharactersData,
      isFetching: true,
    });
    render(
      <MemoryRouter initialEntries={['/details/R5-D4']}>
        <Provider store={store}>
          <Routes>
            <Route path="details/:characterName" element={<CharacterDetails />} />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );

    const loader = screen.getByTestId('loader');
    assert.exists(loader);
  });

  it('hides the detailed card component when close button is clicked', async () => {
    mockUseGetCharacterByNameQuery.mockReturnValue({
      data: mockCharactersData,
      isFetching: false,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/R5-D4']}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/details/:characterName" element={<CharacterDetails />} />
          </Routes>
        </MemoryRouter>
        ,
      </Provider>,
    );

    fireEvent.click(screen.getByText('X'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });

    const itemDetailsComponent = screen.queryByTestId('item-details');
    expect(itemDetailsComponent).toBeNull();
  });
});
