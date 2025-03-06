import PokemonCardDetails from '../../../../components/PokemonCardDetails/PokemonCardDetails';
import PokemonList from '../../../../components/PokemonList/PokemonList';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { pageId } = router.query;
  return (
    <>
      <PokemonList pageId={pageId as string} />
      <PokemonCardDetails />
    </>
  );
};

export default Page;
