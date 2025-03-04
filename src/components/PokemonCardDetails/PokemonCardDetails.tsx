'use client';
import styles from './PokemonCardDetails.module.scss';
import Link from 'next/link';
import Loader from '../Loader/Loader';
import { useGetPokemonDetailsQuery } from '../../store/api/pokemonApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'next/navigation';

export default function PokemonCardDetails() {
  const params = useParams();
  const { pageId, pokemonName } = params;
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
  } = useGetPokemonDetailsQuery(pokemonName as string, {
    skip: Boolean(pokemonFromStore),
  });

  const pokemonData = pokemonFromStore || pokemon;

  return (
    <div className={styles.pokemonDetails}>
      <Link className={styles.closeButton} href={`/page/${String(pageId)}`}>
        X
      </Link>
      {isLoading || isFetching ? (
        <div className={styles.error}>
          <Loader />
        </div>
      ) : error && 'data' in error ? (
        <div className={styles.error}>
          <h3>Pokemon {pokemonName}</h3>
          <h3>{JSON.stringify(error.data).replace(/"/g, '')}</h3>
        </div>
      ) : pokemonData ? (
        <div className={styles.details}>
          <h2>I choose you!</h2>
          <h2 className={styles.name}>{pokemonData.name}</h2>
          <div className={styles.images}>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
            />
            <img
              src={pokemonData.sprites.back_default}
              alt={pokemonData.name}
            />
          </div>
          <div>
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
