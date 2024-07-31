import configureMockStore from 'redux-mock-store';
import { mockCharacterData, mockCharactersData } from './mockCharactersData';

const mockStore = configureMockStore();

export const testingMockStore = mockStore({ characters: [mockCharactersData], favorites: [mockCharacterData] });
