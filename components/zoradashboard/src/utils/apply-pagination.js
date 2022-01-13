export const applyPagination = (rows, page) => {
  if (page === null) {
    return rows;
  }

  const paginated = rows.slice(page * 10, page * 10 + 10);

  return paginated.length ? paginated : rows;
};
