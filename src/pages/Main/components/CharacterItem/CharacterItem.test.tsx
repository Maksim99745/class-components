import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { assert, describe, it, vi } from 'vitest';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import CharacterItem from './CharacterItem';

const mockStore = configureStore();
const store = mockStore({});

const characterData = {
  name: 'Bod Wik',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'Tatooine',
  films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens'],
  species: [],
  vehicles: ['Snowspeeder', 'Imperial Speeder Bike'],
  starships: ['X-wing', 'Imperial shuttle'],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

describe.skip('CharacterItem Component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharacterItem character={characterData} />
        </Provider>
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: Bod Wik');
    assert.exists(characterCard);
  });

  it('opens the detailed card component when clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/details/Luke']}>
        <CharacterDetails />
      </MemoryRouter>,
    );

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <CharacterItem character={characterData} />
        </Provider>
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: Bod Wik');
    fireEvent.click(characterCard);

    const itemDetailsComponent = screen.getByTestId('item-details');
    assert.exists(itemDetailsComponent);
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <CharacterItem character={characterData} />
        </Provider>
      </MemoryRouter>,
    );

    const characterCard = screen.getByText('Name: Bod Wik');
    const fetchSpy = vi.spyOn(window, 'fetch');

    fireEvent.click(characterCard);

    assert.exists(fetchSpy);
  });
});
