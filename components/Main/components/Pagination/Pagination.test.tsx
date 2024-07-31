import { mockCharacterData } from '@mocks/mockCharactersData';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Pagination from './Pagination';

const mockStore = configureMockStore();
const FAKE_DATA_LENGTH = 12;
const store = mockStore({
  characters: [{ count: 50, results: new Array(FAKE_DATA_LENGTH).fill(mockCharacterData) }],
  favorites: [mockCharacterData],
});

describe('Pagination Component', () => {
  it('Component updates URL query parameter when page changes', async () => {
    function TestComponent() {
      const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
      const currentPage = Number(searchParams.get('page'));
      const toPrevPage = () => {
        setSearchParams({ page: String(currentPage - 1) });
      };
      const toNextPage = () => {
        setSearchParams({ page: String(currentPage + 1) });
      };

      return (
        <div>
          <Pagination currentPage={currentPage} toPrevPage={toPrevPage} toNextPage={toNextPage} />
          <div data-testid="page-indicator">{currentPage}</div>
        </div>
      );
    }

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<TestComponent />} />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText('>'));
    await waitFor(() => {
      expect(screen.getByTestId('page-indicator').textContent).toBe('2');
    });
  });
});
