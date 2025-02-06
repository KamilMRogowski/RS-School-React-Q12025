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
  count: 0,
  next: '',
  previous: '',
  results: [{ name: '', url: '' }],
};
