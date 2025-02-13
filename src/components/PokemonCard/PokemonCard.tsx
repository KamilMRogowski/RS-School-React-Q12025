import './PokemonCard.scss';
import { Link, useParams } from 'react-router';
import Loader from '../Loader/Loader';
import { useDarkTheme } from '../../context/DarkThemeContext';
import { useGetPokemonDetailsQuery } from '../../store/api/pokemonApi';

export default function PokemonCard() {
  const { darkTheme } = useDarkTheme();
  const { pageId, pokemonName } = useParams();
  const {
    data: pokemon,
    isLoading,
    isFetching,
    error,
  } = useGetPokemonDetailsQuery(pokemonName ?? '');

  return (
    <div
      className={`pokemon-card ${darkTheme ? 'pokemon-card--dark-mode' : ''}`}
    >
      <Link
        className={`pokemon-card__close-button ${darkTheme ? 'pokemon-card__close-button--dark-mode' : ''}`}
        to={`/page/${pageId as string}`}
      >
        X
      </Link>
      {isLoading || isFetching ? (
        <div className="pokemon-card__error">
          <Loader />
        </div>
      ) : error && 'data' in error ? (
        <div className="pokemon-card__error">
          <h3>Pokemon {pokemonName}</h3>
          <h3>{JSON.stringify(error.data).replace(/"/g, '')}</h3>
        </div>
      ) : pokemon ? (
        <div className="pokemon-card__details">
          <h2>I choose you!</h2>
          <h2 className="pokemon-card__name">{pokemon.name}</h2>
          <div className="pokemon-card__images">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <img src={pokemon.sprites.back_default} alt={pokemon.name} />
          </div>
          <div className="pokemon-card__stats">
            <h3>Height: {pokemon.height * 10} cm</h3>
            <h3>Weight: {pokemon.weight} hectograms</h3>
            <h3>
              Types:
              {pokemon.types.map((type) => (
                <span key={type.slot}> {type.type.name}</span>
              ))}
            </h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}
