import { PokemonApiResponse } from '../utils/interfaces/pokemonApiResponse';

export default async function fetchPokemonFromAPI(
  query: string
): Promise<PokemonApiResponse | string> {
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Pokemon not found, please try again!');
    }

    const data = (await response.json()) as PokemonApiResponse;
    return data;
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return error.message;
    } else return 'An unknown error occurred';
  }
}
