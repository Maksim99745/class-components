import LoaderSpinner from '@pages/Main/components/LoaderSpinner/LoaderSpinner';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { CharacterDetails, MainPage, NotFoundPage } from './routing-pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: 'details/:characterName',
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <CharacterDetails />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
