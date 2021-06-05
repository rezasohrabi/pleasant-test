import { useEffect, useState } from 'react';
import { filterByQuery } from '../utils';

const useSearch = (listToFilter, fieldName) => {
  const [query, setQuery] = useState('');
  const [list, setList] = useState([...listToFilter]);
  const [filteredList, setFilteredList] = useState([...listToFilter]);

  useEffect(() => {
    return () => {
      setList(null);
      setFilteredList(null);
    };
  }, []);

  useEffect(() => {
    setFilteredList(filterByQuery(list, query, fieldName));
  }, [query]);

  const searchQuery = (event) => {
    setQuery(event.target.value);
  };

  return { filteredList, query, searchQuery };
};

export default useSearch;
