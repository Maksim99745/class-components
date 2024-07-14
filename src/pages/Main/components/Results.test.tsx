// results.test.tsx
import { CharactersData } from '@models/character'; // Adjust import path as needed
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { assert, describe, it } from 'vitest';
import { Results } from './Results'; // Adjust import path as needed

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

describe('Results Component', () => {
  it('renders a certain number of character cards', () => {
    render(
      <MemoryRouter>
        <Results characters={mockCharactersData} />
      </MemoryRouter>,
    );

    const characterCards = screen.getAllByText(/Name/);
    assert.equal(characterCards.length, mockCharactersData.results.length);
  });

  it('displays "Not found" if no characters are passed', () => {
    render(
      <MemoryRouter>
        <Results characters={emptyCharactersData} />
      </MemoryRouter>,
    );

    const notFoundMessage = screen.getByText('Not found');
    assert.exists(notFoundMessage);
  });

  it('does not render any cards if data is null', () => {
    render(
      <MemoryRouter>
        <Results characters={null} />
      </MemoryRouter>,
    );

    const characterCards = screen.queryAllByText(/Name/);
    assert.equal(characterCards.length, 0);
  });
});
