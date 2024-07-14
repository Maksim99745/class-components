import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { assert, describe, expect, it } from 'vitest';
import MainPage from '../MainPage';
import ItemDetails from './ItemDetails';

describe('ItemDetails Component', () => {
  it('displays a loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['details/C-3PO']}>
        <ItemDetails />
      </MemoryRouter>,
    );

    const loader = screen.getByTestId('loader');
    assert.exists(loader);
  });

  it('hides the detailed card component when close button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/details/R5-D4']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/details/:characterName" element={<ItemDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('X'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });

    const itemDetailsComponent = screen.queryByTestId('item-details');
    expect(itemDetailsComponent).toBeNull();
  });
});
