import './PokemonCardDetails.scss';
import { Link, useParams } from 'react-router';
import Loader from '../Loader/Loader';
import { useGetPokemonDetailsQuery } from '../../store/api/pokemonApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function PokemonCardDetails() {
  const { pageId, pokemonName } = useParams();
  const pokemonFromStore = useSelector((state: RootState) =>
    state.currentPage.currentPageItems.find(
      (pokemon) => pokemon.name === pokemonName
    )
  );
  const {
    data: pokemon,
    isLoading,
    isFetching,
    error,
  } = useGetPokemonDetailsQuery(pokemonName ?? '', {
    skip: Boolean(pokemonFromStore),
  });

  const pokemonData = pokemonFromStore || pokemon;

  return (
    <div className="pokemon-card-details">
      <Link
        className="pokemon-card-details__close-button"
        to={`/page/${pageId as string}`}
      >
        X
      </Link>
      {isLoading || isFetching ? (
        <div className="pokemon-card-details__error">
          <Loader />
        </div>
      ) : error && 'data' in error ? (
        <div className="pokemon-card-details__error">
          <h3>Pokemon {pokemonName}</h3>
          <h3>{JSON.stringify(error.data).replace(/"/g, '')}</h3>
        </div>
      ) : pokemonData ? (
        <div className="pokemon-card-details__details">
          <h2>I choose you!</h2>
          <h2 className="pokemon-card-details__name">{pokemonData.name}</h2>
          <div className="pokemon-card-details__images">
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
            />
            <img
              src={pokemonData.sprites.back_default}
              alt={pokemonData.name}
            />
          </div>
          <div className="pokemon-card-details__stats">
            <h3>Height: {pokemonData.height * 10} cm</h3>
            <h3>Weight: {pokemonData.weight} hectograms</h3>
            <h3>
              Types:
              {pokemonData.types.map((type) => (
                <span key={type.slot}> {type.type.name}</span>
              ))}
            </h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}
