import { CharactersData } from '@models/character';
import ApiService from '../../../core/api/api.service';

export const getCharacters = async ({ query }: { query: string }): Promise<CharactersData> => {
  const api = new ApiService();
  const characters = await api.getSearchResult({ query, category: 'people' });
  return characters;
};
