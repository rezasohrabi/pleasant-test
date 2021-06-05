import React, { useState } from 'react';
import { useSearch } from '../../hooks';

const products = [
  { name: 'banana' },
  { name: 'apple' },
  { name: 'coconut' },
  { name: 'mango' },
  { name: 'orange' },
  { name: 'lemon' },
];

const ProductList = (props) => {
  const { filteredList, query, searchQuery } = useSearch(products, 'name');
  return (
    <>
      <input value={query} onChange={searchQuery} type='text' />
      {filteredList &&
        filteredList.map(({ name }) => <div key={name}>{name}</div>)}
    </>
  );
};

export default ProductList;
