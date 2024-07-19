import { CharactersData } from '@models/character';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { assert, describe, it } from 'vitest';
import { CharactersView } from './CharactersView';

const mockStore = configureStore();
const store = mockStore({});

const mockCharactersData: CharactersData = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
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
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
      homeworld: 'Tatooine',
      films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'Revenge of the Sith'],
      species: [],
      vehicles: [],
      starships: ['TIE Advanced x1'],
      created: '2014-12-10T15:18:20.704000Z',
      edited: '2014-12-20T21:17:50.313000Z',
      url: 'https://swapi.dev/api/people/4/',
    },
  ],
};

const emptyCharactersData: CharactersData = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

describe.skip('CharactersView Component', () => {
  it.skip('renders a certain number of character cards', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharactersView />
        </Provider>
      </MemoryRouter>,
    );

    const characterCards = screen.getAllByText(/Name/);
    assert.equal(characterCards.length, mockCharactersData.results.length);
  });

  it.skip('displays "Not found" if no characters are passed', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharactersView />
        </Provider>
      </MemoryRouter>,
    );

    const notFoundMessage = screen.getByText('Not found');
    assert.exists(notFoundMessage);
  });

  it.skip('does not render any cards if data is null', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CharactersView />
        </Provider>
      </MemoryRouter>,
    );

    const characterCards = screen.queryAllByText(/Name/);
    assert.equal(characterCards.length, 0);
  });
});
