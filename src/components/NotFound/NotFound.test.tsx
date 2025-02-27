import { screen } from '@testing-library/react';
import NotFound from './NotFound';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';

describe('404 Page', () => {
  it('should render the 404 page for non-existent routes', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
