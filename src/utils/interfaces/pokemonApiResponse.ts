import { ITEMS_PER_PAGE } from '../../components/PokemonList/PokemonList';
export type PokemonApiResponse = PokemonList | Pokemon;

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

export interface Pokemon {
  abilities: [];
  base_experience: number;
  cries: object;
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: object;
  sprites: PokemonSprites;
  stats: [];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}

interface PokemonSprites {
  front_default?: string;
  front_shiny?: string;
  front_female?: string;
  front_shiny_female?: string;
  back_default?: string;
  back_shiny?: string;
  back_female?: string;
  back_shiny_female?: string;
}

export const pokemonListResponse: PokemonList = {
  count: ITEMS_PER_PAGE,
  next: '',
  previous: '',
  results: Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
    name: `pokemon-${String(i + 1)}`,
    url: `https://pokeapi.co/api/v2/pokemon/${String(i + 1)}`,
  })),
};

export const pokemonResponse: Pokemon = {
  abilities: [],
  base_experience: 112,
  cries: {},
  forms: [],
  game_indices: [],
  height: 4,
  held_items: [],
  id: 25,
  is_default: true,
  location_area_encounters: '',
  moves: [],
  name: 'pikachu',
  order: 35,
  past_abilities: [],
  past_types: [],
  species: {},
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  stats: [],
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: '',
      },
    },
  ],
  weight: 60,
};
