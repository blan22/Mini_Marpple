import { CATEGORIES } from '../constants';
import Decimal from 'decimal.js';

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

function parseSafeNumeric(numeric: undefined | null | Decimal.Value) {
  if (numeric === null || numeric === undefined) {
    return null;
  }
  return new Decimal(numeric);
}

export { getCategoryNameById, takeOne, parseSafeNumeric };
