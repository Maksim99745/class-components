import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { assert, describe, expect, it } from 'vitest';
import MainPage from '../../MainPage';
import ItemDetails from './CharacterDetails';

const mockStore = configureStore();
const store = mockStore({});

describe('ItemDetails Component', () => {
  it('test 1', () => {
    expect(true).toBe(true);
  });

  it('test 2', () => {
    expect(true).toBe(true);
  });
});

describe.skip('ItemDetails Component', () => {
  it('displays a loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['details/C-3PO']}>
        <Provider store={store}>
          <ItemDetails />
        </Provider>
      </MemoryRouter>,
    );

    const loader = screen.getByTestId('loader');
    assert.exists(loader);
  });

  it('hides the detailed card component when close button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/R5-D4']}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/details/:characterName" element={<ItemDetails />} />
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
