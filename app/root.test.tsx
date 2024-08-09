import { store } from '@store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { Layout } from './root';

vi.mock('@remix-run/react', () => ({
  Links: () => <div data-testid="links" />,
  Meta: () => <div data-testid="meta" />,
  Scripts: () => <div data-testid="scripts" />,
  ScrollRestoration: () => <div data-testid="scroll-restoration" />,
}));

describe('Layout Component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </Provider>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });
});
