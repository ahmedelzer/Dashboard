export const getUniqueValues = (obj1, obj2) => {
  return Object.keys(obj2).reduce((acc, key) => {
    const value = obj2[key];

    // Skip keys with null or empty string values
    if (value !== null && value !== "") {
      // Only add to the accumulator if the value is different from obj1
      if (obj1[key] !== value) {
        acc[key] = value;
      }
    }

    return acc;
  }, {});
};
