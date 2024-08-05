import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoaderSpinner from './LoaderSpinner';

describe('LoaderSpinner Component', async () => {
  it('LoaderSpinner is rendering as well', () => {
    render(<LoaderSpinner />);

    const spinner = screen.getByTestId('loader');
    expect(spinner).toBeTruthy();
  });
});
