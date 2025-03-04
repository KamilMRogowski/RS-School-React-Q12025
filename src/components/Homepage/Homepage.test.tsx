import { screen } from '@testing-library/react';
import { expect, it, describe, Mock } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import HomePage from './Homepage';
import userEvent from '@testing-library/user-event';
import { useParams } from 'next/navigation';

describe('Homepage Component', () => {
  it('toggles theme when checkbox is clicked', async () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<HomePage />);

    const themeSwitch = screen.getByRole('checkbox');
    await userEvent.click(themeSwitch);
    expect(screen.getByRole('main')).toHaveClass('dark-mode');
  });
});
