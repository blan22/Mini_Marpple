import { CATEGORIES } from '../constants';

const getCategoryNameById = (category_id: 1 | 2 | 3 | 4) => {
  const hashMap = {
    1: CATEGORIES['GOODS'],
    2: CATEGORIES['CLOTH'],
    3: CATEGORIES['FOOD'],
    4: CATEGORIES['BOOK'],
  };
  return hashMap[category_id];
};

const takeOne = <T>(iterable: Iterable<T>): T => {
  return iterable[Symbol.iterator]().next().value;
};

export { getCategoryNameById, takeOne };
