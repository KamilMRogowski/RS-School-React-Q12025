import { GetServerSideProps } from 'next';
import PokemonList from '../../components/PokemonList/PokemonList';
import { wrapper } from '../../store/store';
import { pokemonApi } from '../../store/api/pokemonApi';
import { PokemonList as PokemonListInterface } from '../../utils/interfaces/pokemonApiResponse';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const pageId = params?.pageId as string;

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemonList.initiate(pageId)
    );
    const data = result.data;
    return { props: { pageId, pokemonList: data || [] } };
  });

const Page = ({
  pokemonList,
  pageId,
}: {
  pokemonList: PokemonListInterface;
  pageId: string;
}) => {
  return <PokemonList pageId={pageId} pokemonList={pokemonList} />;
};

export default Page;
