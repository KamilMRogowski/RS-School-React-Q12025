import Homepage from '../../views/Homepage/Homepage';
import { Route } from './+types/homepage';
import { ITEMS_PER_PAGE } from '../../store/api/pokemonApi';
import { PokemonList } from '../../utils/interfaces/pokemonApiResponse';

export async function loader({ params }: Route.LoaderArgs) {
  const pageId = Number(params.pageId);
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${String((pageId - 1) * ITEMS_PER_PAGE)}&limit=${String(ITEMS_PER_PAGE)}`
  );
  const data = (await res.json()) as PokemonList;
  return data;
}

export default function Mainpage({ loaderData }: Route.ComponentProps) {
  return <Homepage listData={loaderData} />;
}
