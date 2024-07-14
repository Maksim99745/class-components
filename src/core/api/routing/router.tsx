import LoaderSpinner from '@components/LoaderSpinner';
import NotFoundPage from '@pages/NotFound/NotFound';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './routing-pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <MainPage />
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
