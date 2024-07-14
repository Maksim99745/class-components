import { CharactersData } from '@models/character';
import ApiService from '../../../core/api/api.service';

export const getNewPageData = async ({ pageNumber }: { pageNumber: number }): Promise<CharactersData> => {
  const api = new ApiService();
  const characters = await api.getNewPageData({ pageNumber, category: 'people' });
  return characters;
};
