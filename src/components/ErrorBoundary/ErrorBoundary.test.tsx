import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from '../ErrorButton/ErrorButton';
import '@testing-library/jest-dom';
import DarkThemeProvider from '../../context/DarkThemeContext';

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
      <DarkThemeProvider>
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      </DarkThemeProvider>
    );

    const errorButton = screen.getByTestId('error-button');
    expect(errorButton).toBeInTheDocument();

    fireEvent.click(errorButton);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText('Check console to find out more.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please reload page to try again.')
    ).toBeInTheDocument();
  });
});
