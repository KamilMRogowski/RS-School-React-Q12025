import { useEffect, useState } from 'react';

export default function useGetQueryFromLS() {
  const [query, setQuery] = useState('');
  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setQuery(lastSearch);
    }
  }, []);
  return query;
}
