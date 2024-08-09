import { describe, expect, it } from 'vitest';
import { mockCharacterData } from '../../../../../mocks/mockCharactersData';
import { arrayToCSV } from './arrayToCSV';

describe('arrayToCSV function', () => {
  it('should convert an array of Character objects to a CSV string', () => {
    const expectedCSV = [
      'name,height,mass,hair_color,skin_color,eye_color,birth_year,gender,homeworld,films,species,vehicles,starships,created,edited,url',
      '"Luke Skywalker","172","77","blond","fair","blue","19BBY","male","https://swapi.dev/api/planets/1/","https://swapi.dev/api/films/1/,https://swapi.dev/api/films/2/,https://swapi.dev/api/films/3/","","https://swapi.dev/api/vehicles/14/,https://swapi.dev/api/vehicles/30/","https://swapi.dev/api/starships/12/,https://swapi.dev/api/starships/22/","2014-12-09T13:50:51.644000Z","2014-12-20T21:17:56.891000Z","https://swapi.dev/api/people/1/"',
    ].join('\n');

    const csvResult = arrayToCSV([mockCharacterData]);

    expect(csvResult).toBe(expectedCSV);
  });

  it('should return an empty string when given an empty array', () => {
    const csvResult = arrayToCSV([]);

    expect(csvResult).toBe('');
  });
});
