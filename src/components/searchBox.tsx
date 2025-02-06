import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

type searchBoxProps = {
  searchQuery: string;
};

export default function SearchBox({ searchQuery }: searchBoxProps) {
  const [query, setQuery] = useState(searchQuery || '');

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

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
      <Link to={query ? `/pokemon/${query.trim()}` : '/'}>Search</Link>;
    </div>
  );
}
