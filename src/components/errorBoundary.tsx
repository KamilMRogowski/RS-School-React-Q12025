import React, { ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error occured:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      //TODO: Add a custom error page
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
