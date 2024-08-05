import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as favoriteActions } from '../../../store/favorites/favorites.slice';

const rootActions = { ...favoriteActions };

export const useMainPageActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useMainPageActions;
