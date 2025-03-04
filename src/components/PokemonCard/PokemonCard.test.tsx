import { screen, waitFor } from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { expect, it, describe, Mock } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import { useParams } from 'next/navigation';

describe('PokemonCard Component', () => {
  it('displays a loading indicator while fetching pokemon image', () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonCard pokemon="pikachu" />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders pokemon name and sprite correctly', async () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonCard pokemon="pikachu" />);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
      );
    });
  });

  it('redirects to correct pokemon on click', async () => {
    (useParams as Mock).mockReturnValue({
      pageId: '1',
      pokemonName: 'pikachu',
    });
    renderWithProviders(<PokemonCard pokemon="pikachu" />);

    const pokemonCard = await screen.findByRole('link');
    expect(pokemonCard).toHaveAttribute('href', '/page/1/pokemon/pikachu');
  });
});
