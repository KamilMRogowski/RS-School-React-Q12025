import './PokemonCard.scss';
import { Link, useParams } from 'react-router';
import Loader from '../Loader/Loader';
import { useGetPokemonDetailsQuery } from '../../store/api/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addCurrentPageItem } from '../../store/slices/currentPageSlice';
import {
  addSelectedItem,
  removeSelectedItem,
} from '../../store/slices/selectedItemsSlice';
import { RootState } from '../../store/store';

interface PokemonCardProps {
  pokemon: string;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [checked, setChecked] = useState(false);
  const selected = useSelector((state: RootState) => {
    return state.selectedItems.SelectedItems;
  });
  const { pageId } = useParams();
  const dispatch = useDispatch();
  const {
    data: pokemonDetails,
    isLoading,
    isFetching,
    error,
  } = useGetPokemonDetailsQuery(pokemon);

  useEffect(() => {
    if (pokemonDetails) {
      const found = selected.find(
        (pokemon) => pokemon.id === pokemonDetails.id
      );
      if (found) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  }, [selected, pokemonDetails]);

  const handleCheckboxChange = () => {
    if (pokemonDetails) {
      if (!checked) {
        dispatch(addSelectedItem(pokemonDetails));
      } else {
        dispatch(removeSelectedItem(pokemonDetails));
      }
    }
    setChecked(!checked);
  };

  useEffect(() => {
    if (pokemonDetails) {
      dispatch(addCurrentPageItem(pokemonDetails));
    }
  }, [dispatch, pokemonDetails]);

  return (
    <div>
      <Link
        to={`/page/${pageId as string}/pokemon/${pokemon}`}
        className="pokemon-card"
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
      </Link>
      <div className="pokemon-card__download">
        <label>
          Download:
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <span className="checkbox"></span>
        </label>
      </div>
    </div>
  );
}
