import { router } from '@core/routing/router';
import { store } from '@store/store';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

describe('NotFound Component', () => {
  it('should render NotFoundPage when untracked path is received', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    router.navigate('/4dd04');
    await waitFor(() => {
      assert.exists(screen.getByText('Go back to Home page'));
    });
  });
});
