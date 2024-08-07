export const SharedLists = (obj, list, part) => {
  const matchingKeys = new Set(list.map((item) => item[part]));
  const result = {};

  for (const key in obj) {
    if (matchingKeys.has(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};
