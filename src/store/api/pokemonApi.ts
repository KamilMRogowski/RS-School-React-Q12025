import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Pokemon,
  PokemonList,
} from '../../utils/interfaces/pokemonApiResponse';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      PokemonList,
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) =>
        `pokemon?offset=${String(offset)}&limit=${String(limit)}`,
    }),
    getPokemonDetails: builder.query<Pokemon, string>({
      query: (pokemon) => `pokemon/${pokemon}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
