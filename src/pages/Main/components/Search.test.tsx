import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Search } from './Search';

describe('Search component', () => {
  const mockSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  it('saves the entered value to local storage when clicking the Search button', async () => {
    render(
      <MemoryRouter>
        <Search search={mockSearch} />
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
        <Search search={mockSearch} />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>('Enter your search query...');

    await waitFor(() => {
      expect(input.value).toBe('saved query');
    });
  });
});
