// ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const ProblemChild = () => {
    throw new Error('Test error');
  };

  function NormalChild() {
    return <div>Normal Content</div>;
  }

  it('should render fallback UI when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    const errorMessage = screen.getByText('Something went wrong.');
    const errorDetail = screen.getByText('Error: Test error');

    assert.exists(errorMessage);
    assert.exists(errorDetail);
  });

  it('should render children normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <NormalChild />
      </ErrorBoundary>,
    );

    const normalContent = screen.getByText('Normal Content');
    assert.exists(normalContent);
  });
});
