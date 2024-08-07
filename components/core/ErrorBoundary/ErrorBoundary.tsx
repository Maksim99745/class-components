'use client';

import React, { ReactNode } from 'react';

interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
    };
  }

  public static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught an error in ErrorBoundary:', error, errorInfo);
    this.setState({ error });
  }

  public render() {
    const { error, hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <h3>Error: {error?.message}</h3>
          <a href="/">Get back to the home page</a>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
