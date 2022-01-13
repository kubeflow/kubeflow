const equal = (value1, value2) => {
  if (!value2) {
    return true;
  }

  if (value1) {
    // Here we evaluate == instead of === because values can be number & string pair
    // eslint-disable-next-line eqeqeq
    return value1 == value2;
  }

  return false;
};

const greaterThan = (value1, value2) => value1 > value2;

const lessThan = (value1, value2) => value1 < value2;

const isAfter = (value1, value2) => {
  if (value1 && value2) {
    return value1.getTime() > new Date(value2).getTime();
  }

  return false;
};

const isBefore = (value1, value2) => {
  if (value1 && value2) {
    return value1.getTime() < new Date(value2).getTime();
  }

  return false;
};

const isBlank = (value) => !value;

const isPresent = (value) => !!value;

const notEqual = (value1, value2) => {
  if (!value2) {
    return true;
  }

  if (value1) {
    return value1 !== value2;
  }

  return false;
};

const contains = (value1, value2) => {
  if (!value2) {
    return true;
  }

  if (value1) {
    return value1.toLowerCase().includes(value2.toLowerCase());
  }

  return false;
};

const notContains = (value1, value2) => {
  if (!value2) {
    return true;
  }

  if (value1) {
    return !value1.includes(value2);
  }

  return false;
};

const startsWith = (value1, value2) => {
  if (!value2) {
    return true;
  }

  if (value1) {
    return value1.substring(0, value2.length) === value2;
  }

  return false;
};

const endsWith = (value1, value2) => {
  if (!value2) {
    return true;
  }

  if (value1) {
    return value1.substring(value1.length - value2.length) === value2;
  }

  return false;
};

export const applyFilters = (rows, filters) => rows.filter((row) => {
  if (!filters || filters.length === 0) {
    return rows;
  }

  let isAccepted = true;

  for (let index = 0; index < filters.length; index++) {
    switch (filters[index].operator) {
      case 'equal':
        isAccepted = equal(row[filters[index].property], filters[index].value);
        break;

      case 'greaterThan':
        isAccepted = greaterThan(row[filters[index].property], filters[index].value);
        break;

      case 'lessThan':
        isAccepted = lessThan(row[filters[index].property], filters[index].value);
        break;

      case 'isAfter':
        isAccepted = isAfter(row[filters[index].property], filters[index].value);
        break;

      case 'isBefore':
        isAccepted = isBefore(row[filters[index].property], filters[index].value);
        break;

      case 'isBlank':
        isAccepted = isBlank(row[filters[index].property]);
        break;

      case 'isPresent':
        isAccepted = isPresent(row[filters[index].property]);
        break;

      case 'notEqual':
        isAccepted = notEqual(row[filters[index].property], filters[index].value);
        break;

      case 'contains':
        isAccepted = contains(row[filters[index].property], filters[index].value);
        break;

      case 'notContains':
        isAccepted = notContains(row[filters[index].property], filters[index].value);
        break;

      case 'startsWith':
        isAccepted = startsWith(row[filters[index].property], filters[index].value);
        break;

      case 'endsWith':
        isAccepted = endsWith(row[filters[index].property], filters[index].value);
        break;

      default:
        break;
    }

    if (!isAccepted) {
      break;
    }
  }

  return isAccepted;
});
