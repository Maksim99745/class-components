import { mockCharacterData } from '@mocks/mockCharactersData';
import { Character } from '@models/character';
import { actions, reducer } from './favorites.slice';

describe('favoritesSlice', () => {
  const initialState: Character[] = [];

  it('should handle toggleFavorite - add to favorites', () => {
    const nextState = reducer(initialState, actions.toggleFavorite(mockCharacterData));
    expect(nextState).toHaveLength(1);
    expect(nextState[0]).toEqual(mockCharacterData);
  });

  it('should handle toggleFavorite - remove from favorites', () => {
    const stateWithFavorite = [mockCharacterData];
    const nextState = reducer(stateWithFavorite, actions.toggleFavorite(mockCharacterData));
    expect(nextState).toHaveLength(0);
  });

  it('should handle unselectAll', () => {
    const stateWithFavorites = [mockCharacterData];
    const nextState = reducer(stateWithFavorites, actions.unselectAll());
    expect(nextState).toHaveLength(0);
  });
});
