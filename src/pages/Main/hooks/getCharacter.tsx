import { Character } from '@models/character';
import ApiService from '../../../core/api/api.service';

export const getCharacter = async ({ query }: { query: string }): Promise<Character[]> => {
  const api = new ApiService();
  const characters = await api.getSearchResult({ query });
  return characters.results;
};
