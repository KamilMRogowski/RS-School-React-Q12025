import { it, expect, describe, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router';
import DarkThemeProvider from '../../context/DarkThemeContext';
import { ITEMS_PER_PAGE } from './PokemonList';
import PokemonList from './PokemonList';
import { useGetPokemonListQuery } from '../../store/api/pokemonApi';
import { PokemonList as PokemonListType } from '../../utils/interfaces/pokemonApiResponse';
import '@testing-library/jest-dom';

vi.mock('../../store/api/pokemonApi');

describe('PokemonList Component', () => {
  it('renders specified number of cards', () => {
    const mockResults: PokemonListType = {
      count: ITEMS_PER_PAGE,
      next: '',
      previous: '',
      results: Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
        name: `pokemon-${String(i + 1)}`,
        url: `https://pokeapi.co/api/v2/pokemon/${String(i + 1)}`,
      })),
    };

    (useGetPokemonListQuery as Mock).mockReturnValue({
      data: mockResults,
      isLoading: false,
      error: {},
    });

    render(
      <DarkThemeProvider>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </DarkThemeProvider>
    );

    const pokemonListItems = screen.getByTestId('pokemon-list-items');
    expect(pokemonListItems.children).toHaveLength(ITEMS_PER_PAGE);
  });

  it('renders error message if no cards are present', () => {
    const mockResults: PokemonListType = {
      count: ITEMS_PER_PAGE,
      next: '',
      previous: '',
      results: [],
    };

    (useGetPokemonListQuery as Mock).mockReturnValue({
      data: mockResults,
      loading: false,
      error: { message: 'Pokemon not found' },
    });

    render(
      <DarkThemeProvider>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </DarkThemeProvider>
    );

    const pokemonListError = screen.getByTestId('pokemon-list-error');
    expect(pokemonListError.innerHTML).toBe('Pokemon not found');
  });

  it('opens a detailed card upon clicking a card and triggers API call', () => {
    const mockResults: PokemonListType = {
      count: ITEMS_PER_PAGE,
      next: '',
      previous: '',
      results: [
        {
          name: 'pikachu',
          url: '',
        },
      ],
    };

    (useGetPokemonListQuery as Mock).mockReturnValue({
      data: mockResults,
      loading: false,
      error: '',
    });

    render(
      <DarkThemeProvider>
        <MemoryRouter initialEntries={['/page/3']}>
          <Routes>
            <Route path="/page/:pageId" element={<PokemonList />} />
          </Routes>
        </MemoryRouter>
      </DarkThemeProvider>
    );

    const pokemonCard = screen.getByText('pikachu');
    expect(pokemonCard).toHaveAttribute('href', '/page/3/pokemon/pikachu');
  });
});
