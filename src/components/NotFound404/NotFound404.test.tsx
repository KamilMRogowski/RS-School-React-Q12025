import { screen } from '@testing-library/react';
import NotFound from './NotFound404';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import mockRouter from 'next-router-mock';

describe('404 Page', () => {
  it('should render the 404 page for non-existent routes', () => {
    void mockRouter.push('/non-existent-route');
    renderWithProviders(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
