import { mockCharacterData, mockCharactersData } from './mockCharactersData';
import { testingMockStore } from './mockStore';

describe('Mock Store', () => {
  it('should initialize with correct state', () => {
    const initialStore = testingMockStore.getState();
    expect(initialStore).toEqual({
      characters: [mockCharactersData],
      favorites: [mockCharacterData],
    });
  });
});
