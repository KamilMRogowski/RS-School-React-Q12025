import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useGetQueryFromLS from '../hooks/getQueryFromLS';

export default function SearchBox() {
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
        type="text"
        placeholder="Search your favorite pokemon"
        onChange={handleChange}
        value={query}
      />
      <Link
        className="search-button"
        to={query ? `pokemon/${query.trim()}` : '#'}
      >
        Search
      </Link>
    </div>
  );
}
