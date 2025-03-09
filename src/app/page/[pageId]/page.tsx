import HomePage from '../../../components/Homepage/Homepage';
import { PokemonList } from '../../../utils/interfaces/pokemonApiResponse';

const Page = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  const data = (await res.json()) as PokemonList;
  return <HomePage initialData={data} />;
};

export default Page;
