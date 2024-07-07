// TestErrorBoundary.tsx
import React, { ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack: string | null } | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class TestErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught an error in TestErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo: {
        componentStack: errorInfo.componentStack || null,
      },
    });
  }

  public render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{error && error.toString()}</p>
          <p>{errorInfo && errorInfo.componentStack}</p>
        </div>
      );
    }

    return children;
  }
}

export default TestErrorBoundary;
