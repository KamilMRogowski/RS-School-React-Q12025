import './PokemonCard.scss';
import { useNavigate, useParams } from 'react-router';
import Loader from '../Loader/Loader';
import { useDarkTheme } from '../../context/DarkThemeContext';
import { useGetPokemonDetailsQuery } from '../../store/api/pokemonApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addCurrentPageItem } from '../../store/slices/currentPageSlice';

interface PokemonCardProps {
  pokemon: string;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { darkTheme } = useDarkTheme();
  const { pageId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: pokemonDetails,
    isLoading,
    isFetching,
    error,
  } = useGetPokemonDetailsQuery(pokemon);

  const openPokeCard = () => {
    void navigate(`/page/${pageId as string}/pokemon/${pokemon}`);
  };

  useEffect(() => {
    if (pokemonDetails) {
      dispatch(addCurrentPageItem(pokemonDetails));
    }
  }, [dispatch, pokemonDetails]);

  return (
    <div onClick={openPokeCard}>
      <div
        className={`pokemon-card ${darkTheme ? 'pokemon-card--dark-mode' : ''}`}
      >
        {!error && <h3 className="pokemon-card__name">{pokemon}</h3>}
        {isLoading || isFetching ? (
          <Loader />
        ) : error && 'data' in error ? (
          <>
            <h3>Pokemon {pokemon}</h3>
            <h3>{JSON.stringify(error.data).replace(/"/g, '')}</h3>
          </>
        ) : pokemonDetails ? (
          <img src={pokemonDetails.sprites.front_default} alt={pokemon} />
        ) : (
          <p>Failed to fetch image</p>
        )}
      </div>
    </div>
  );
}
