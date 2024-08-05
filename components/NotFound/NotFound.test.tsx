import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFoundPage from './NotFound';

describe('NotFound Component', () => {
  it('NotFound page renders as well', async () => {
    render(<NotFoundPage />);

    const notFoundText = screen.getByText('404 - Page not found');
    expect(notFoundText).toBeTruthy();
  });
});
