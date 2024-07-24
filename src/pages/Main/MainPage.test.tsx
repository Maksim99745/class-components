import { mockCharacterData } from '@mocks/mockCharactersData';
import { store } from '@store/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';

vi.mock('@store/api/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@store/api/api')>();
  return {
    ...actual,
    useGetCharacterByNameQuery: vi.fn(),
    useGetCharactersByPageQuery: vi.fn(),
  };
});

describe('MainPage Component', () => {
  let mockUseGetCharacterByNameQuery: ReturnType<typeof vi.fn>;
  let mockUseGetCharactersByPageQuery: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mockUseGetCharacterByNameQuery = vi.mocked((await import('@store/api/api')).useGetCharacterByNameQuery);
    mockUseGetCharacterByNameQuery.mockReset();
    mockUseGetCharactersByPageQuery = vi.mocked((await import('@store/api/api')).useGetCharactersByPageQuery);
    mockUseGetCharactersByPageQuery.mockReset();
    mockUseGetCharacterByNameQuery.mockReturnValue({ data: [mockCharacterData], isFetching: false });
    mockUseGetCharactersByPageQuery.mockReturnValue({ data: [mockCharacterData], isFetching: false });
  });
  it('Main page is rendering as it expected', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );
    const mainPageHeader = screen.getByText('Find your favorite The Star Wars character!');
    assert.exists(mainPageHeader);
  });

  it('closes character details on clicking outside', () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Provider store={store}>
          <Routes>
            <Route path="/details/1" element={<MainPage />} />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );

    const searchContainer = screen.getByPlaceholderText('Enter your search query...');
    fireEvent.click(searchContainer);
    expect(window.location.pathname).toBe('/');
  });
});
