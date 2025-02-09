// NotFound.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFound from '../components/NotFound404';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('404 Page', () => {
  it('should render the 404 page for non-existent routes', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
