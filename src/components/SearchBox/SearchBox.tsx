import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useGetQueryFromLS from '../../hooks/getQueryFromLS';
import { useDarkTheme } from '../../context/DarkThemeContext';
import './SearchBox.scss';

export default function SearchBox() {
  const { darkTheme } = useDarkTheme();
  const { pokemonName } = useParams();
  const [query, setQuery] = useState('');
  const queryLS = useGetQueryFromLS();

  useEffect(() => {
    if (queryLS) {
      setQuery(queryLS);
    } else {
      setQuery('');
    }
  }, [queryLS]);

  useEffect(() => {
    if (pokemonName) {
      setQuery(pokemonName);
    }
  }, [pokemonName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        className={`search-container__input ${darkTheme ? 'search-container__input--dark-mode' : ''}`}
        type="text"
        placeholder="Search your favorite pokemon"
        onChange={handleChange}
        value={query}
      />
      <Link
        data-testid="search-button"
        className={`main-button ${darkTheme ? 'main-button--dark-mode' : ''}`}
        to={query ? `pokemon/${query.trim().toLowerCase()}` : '#'}
      >
        Search
      </Link>
    </div>
  );
}
