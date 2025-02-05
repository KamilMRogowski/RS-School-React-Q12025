import React, { useEffect, useState } from 'react';

type searchBoxProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
};

export default function SearchBox({ onSearch, searchQuery }: searchBoxProps) {
  const [query, setQuery] = useState(searchQuery || '');

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClick = () => {
    onSearch(query.trim());
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search your favorite pokemon"
        onChange={handleChange}
        value={query}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}
