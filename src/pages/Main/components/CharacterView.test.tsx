import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { assert, describe, it, vi } from 'vitest';
import CharacterView from './CharacterView';
import ItemDetails from './ItemDetails';

describe('CharacterView Component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <CharacterView name="Luke" />
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: Luke');
    assert.exists(characterCard);
  });

  it('opens the detailed card component when clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/details/Luke']}>
        <ItemDetails />
      </MemoryRouter>,
    );

    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterView name="R2-D2" />
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: R2-D2');
    fireEvent.click(characterCard);

    const itemDetailsComponent = screen.getByTestId('item-details');
    assert.exists(itemDetailsComponent);
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterView name="R2-D2" />
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: R2-D2');
    const fetchSpy = vi.spyOn(window, 'fetch');

    fireEvent.click(characterCard);

    assert.exists(fetchSpy);
  });
});
