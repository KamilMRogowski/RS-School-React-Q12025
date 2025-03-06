import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Pokemon,
  PokemonList,
} from '../../utils/interfaces/pokemonApiResponse';

export const ITEMS_PER_PAGE = 10;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonList, string>({
      query: (currentPage) =>
        `pokemon?offset=${String((Number(currentPage) - 1) * ITEMS_PER_PAGE)}&limit=${String(ITEMS_PER_PAGE)}`,
    }),
    getPokemonDetails: builder.query<Pokemon, string>({
      query: (pokemon) => `pokemon/${pokemon}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
