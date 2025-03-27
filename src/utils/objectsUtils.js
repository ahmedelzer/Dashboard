export const getUniqueValues = (obj1, obj2) => {
  return Object.keys(obj2).reduce((acc, key) => {
    if (obj1[key] !== obj2[key]) {
      acc[key] = obj2[key];
    }
    return acc;
  }, {});
};
