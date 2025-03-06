import { screen, waitFor } from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { expect, it, describe } from 'vitest';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/test-utils';
import mockRouter from 'next-router-mock';

describe('PokemonCard Component', () => {
  it('displays a loading indicator while fetching pokemon image', () => {
    renderWithProviders(<PokemonCard pokemon="pikachu" />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders pokemon name and sprite correctly', async () => {
    renderWithProviders(<PokemonCard pokemon="pikachu" />);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toBeInTheDocument();
    });
  });

  it('redirects to correct pokemon on click', async () => {
    mockRouter.setCurrentUrl('/page/1');
    renderWithProviders(<PokemonCard pokemon="pikachu" />);

    const pokemonCard = await screen.findByRole('link');
    expect(pokemonCard).toHaveAttribute('href', '/page/1/pokemon/pikachu');
  });
});
