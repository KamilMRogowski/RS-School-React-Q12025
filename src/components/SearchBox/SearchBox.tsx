import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useGetQueryFromLS from '../../hooks/useGetQueryFromLS';
import styles from './SearchBox.module.scss';

export default function SearchBox() {
  const router = useRouter();
  const { pokemonName, pageId } = router.query;
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
    <div className={styles['search-container']}>
      <input
        className={styles['search-container__input']}
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
