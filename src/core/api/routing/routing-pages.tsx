import { lazy } from 'react';

const MainPage = lazy(() => import('@pages/Main/MainPage'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound'));
const ItemDetails = lazy(() => import('@pages/Main/components/ItemDetails'));

export { ItemDetails, MainPage, NotFoundPage };
