const descendingComparator = (a, b, sortBy) => {
  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

export const applySort = (rows, sort, sortBy) => {
  if (!rows || !sort) {
    return rows;
  }

  return rows.sort((a, b) => (sort === 'desc'
    ? descendingComparator(a, b, sortBy)
    : -descendingComparator(a, b, sortBy)));
};
