import { lazy } from 'react';

const MainPage = lazy(() => import('@pages/Main/MainPage'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound'));

export { MainPage, NotFoundPage };
