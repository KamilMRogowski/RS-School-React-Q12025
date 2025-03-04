import { screen, waitFor } from '@testing-library/react';
import PokemonCardDetails from './PokemonCardDetails';
import { expect, it, describe, Mock } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import { useParams } from 'next/navigation';

describe('PokemonCardDetails Component', () => {
  it('displays a loading indicator while fetching data', () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonCardDetails />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders detailed Pokemon data correctly', async () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonCardDetails />);

    await waitFor(() => {
      expect(screen.getByText('I choose you!')).toBeInTheDocument();
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('Height: 40 cm')).toBeInTheDocument();
      expect(screen.getByText('Weight: 60 hectograms')).toBeInTheDocument();
      expect(screen.getByText('electric')).toBeInTheDocument();
    });
  });

  it('hides component when close button is clicked', () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonCardDetails />);

    const closeButton = screen.getByRole('link', { name: 'X' });
    expect(closeButton).toHaveAttribute('href', '/page/1');
  });
});
