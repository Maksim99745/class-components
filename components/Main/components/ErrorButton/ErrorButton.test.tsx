import { fireEvent, render, screen } from '@testing-library/react';
import { assert, describe, it } from 'vitest';
import ErrorBoundary from '../../../core/ErrorBoundary/ErrorBoundary';
import ErrorButton from './ErrorButton';

describe('ErrorButtonComponent', async () => {
  it('Click to ErrorButton is casing Error', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    const ErrorButtonHTML = screen.getByText('Error button');
    fireEvent.click(ErrorButtonHTML);
    assert.exists(screen.getByText('Something went wrong.'));
  });
});
