import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as favoriteActions } from '@store/favorites/favorites.slice';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

const rootActions = { ...favoriteActions };

export const useMainPageActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
