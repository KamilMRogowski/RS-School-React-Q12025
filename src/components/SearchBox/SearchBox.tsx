import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useGetQueryFromLS from '../../hooks/useGetQueryFromLS';
import styles from './SearchBox.module.scss';
import { useParams } from 'next/navigation';

export default function SearchBox() {
  const params = useParams();
  const { pokemonName, pageId } = params;
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
      setQuery(pokemonName as string);
    }
  }, [pokemonName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search your favorite pokemon"
        onChange={handleChange}
        value={query}
      />
      <Link
        data-testid="search-button"
        className="main-button"
        href={
          query
            ? `/page/${pageId as string}/pokemon/${query.trim().toLowerCase()}`
            : '#'
        }
      >
        Search
      </Link>
    </div>
  );
}
