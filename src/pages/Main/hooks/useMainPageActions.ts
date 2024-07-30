import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as characterActions } from '@store/characters/characters.slice';
import { actions as favoriteActions } from '@store/favorites/favorites.slice';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

const rootActions = { ...favoriteActions, ...characterActions };

export const useMainPageActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useMainPageActions;
