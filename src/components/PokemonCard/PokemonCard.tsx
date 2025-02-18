import './PokemonCard.scss';
import { useNavigate, useParams } from 'react-router';
import Loader from '../Loader/Loader';
import { useDarkTheme } from '../../context/DarkThemeContext';
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
    return state.selectedItems;
  });
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
      const found = selected.SelectedItems.find(
        (pokemon) => pokemon.id === pokemonDetails.id
      );
      if (found) {
        setChecked(true);
      }
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = () => {
    if (pokemonDetails) {
      if (!checked) {
        dispatch(addSelectedItem(pokemonDetails));
        console.log('added');
      } else {
        dispatch(removeSelectedItem(pokemonDetails));
        console.log('removed');
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
      <div
        onClick={openPokeCard}
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
      <label>
        Download:
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
}
