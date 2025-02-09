import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PokemonCard from '../components/PokemonCard';
import useFetchPokemonFromAPI from '../hooks/fetchPokemonFromAPI';
import { expect, it, describe, vi, Mock } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../hooks/fetchPokemonFromAPI');

const mockPokemonData = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'front-image-url',
    back_default: 'back-image-url',
  },
  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'type-url' },
    },
  ],
};

describe('PokemonCard Component', () => {
  it('displays a loading indicator while fetching data', () => {
    (useFetchPokemonFromAPI as Mock).mockReturnValue({
      data: {},
      loading: true,
      error: '',
    });

    render(
      <MemoryRouter>
        <PokemonCard />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders detailed Pokemon data correctly', () => {
    (useFetchPokemonFromAPI as Mock).mockReturnValue({
      data: mockPokemonData,
      loading: false,
      error: '',
    });

    render(
      <MemoryRouter>
        <PokemonCard />
      </MemoryRouter>
    );

    expect(screen.getByText('I choose you!')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('Height: 40 cm')).toBeInTheDocument();
    expect(screen.getByText('Weight: 60 hectograms')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  it('hides component when close button is clicked', () => {
    (useFetchPokemonFromAPI as Mock).mockReturnValue({
      data: mockPokemonData,
      loading: false,
      error: '',
    });

    render(
      <MemoryRouter>
        <PokemonCard />
      </MemoryRouter>
    );

    const closeButton = screen.getByText('X');
    expect(closeButton.closest('a')).toHaveAttribute('href', '/page/undefined');
  });
});
