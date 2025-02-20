import { http, HttpResponse } from 'msw';
import {
  pokemonListResponse,
  pokemonResponse,
} from '../interfaces/pokemonApiResponse';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json(pokemonListResponse);
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:name', () => {
    return HttpResponse.json(pokemonResponse);
  }),

  http.get('https://pokeapi.co/api/v2/error', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];
