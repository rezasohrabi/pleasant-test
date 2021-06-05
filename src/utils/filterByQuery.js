export const filterByQuery = (list, query, fieldName) => {
  return (
    list &&
    list.filter((filteredItem) =>
      filteredItem[fieldName].toLowerCase().includes(query.toLowerCase())
    )
  );
};
