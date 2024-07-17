import { lazy } from 'react';

const MainPage = lazy(() => import('@pages/Main/MainPage'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound'));
const CharacterDetails = lazy(() => import('@pages/Main/components/CharacterDetails/CharacterDetails'));

export { CharacterDetails, MainPage, NotFoundPage };
