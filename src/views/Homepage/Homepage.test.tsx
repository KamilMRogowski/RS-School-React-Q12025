import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, it, describe } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import HomePage from './Homepage';
import userEvent from '@testing-library/user-event';

describe('Homepage Component', () => {
  it('toggles theme when checkbox is clicked', async () => {
    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const themeSwitch = screen.getByRole('checkbox');
    await userEvent.click(themeSwitch);
    expect(screen.getByRole('main')).toHaveClass('dark-mode');
  });
});
