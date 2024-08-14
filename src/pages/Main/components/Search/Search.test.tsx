import { store } from '@store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Search } from './Search';

const updateQuery = (query: string) => query;

describe('Search component', () => {
  it('saves the entered value to local storage when clicking the Search button', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Search updateQuery={updateQuery} isBusy={false} />
        </Provider>
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('Enter your search query...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('class-component')).toBe('test query');
    });
  });

  it('retrieves the value from local storage upon mounting', async () => {
    localStorage.setItem('class-component', 'saved query');

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Search updateQuery={updateQuery} isBusy={false} />
        </Provider>
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>('Enter your search query...');

    await waitFor(() => {
      expect(input.value).toBe('saved query');
    });
  });
});
