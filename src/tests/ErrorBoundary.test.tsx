import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton';
import '@testing-library/jest-dom';

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should show error UI when an error is thrown in a child component', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    expect(screen.getByText('ERROR BUTTON')).toBeInTheDocument();

    fireEvent.click(screen.getByText('ERROR BUTTON'));

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText('Check console to find out more.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please reload page to try again.')
    ).toBeInTheDocument();
  });
});
