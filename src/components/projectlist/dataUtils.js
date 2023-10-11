export function filterData(data, searchTerm) {
  return data.filter((item) => {
    const searchFields = [
      item.name,
      item.reason,
      item.type,
      item.division,
      item.category,
      item.dept,
      item.location,
    ];

    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}
