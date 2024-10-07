export function DeepMerge(obj1, obj2) {
  const result = { ...obj1 }; // Start with obj1's properties

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      // If both obj1 and obj2 have the same key and the value is an object, merge them recursively
      if (
        typeof obj2[key] === "object" &&
        obj2[key] !== null &&
        !Array.isArray(obj2[key])
      ) {
        result[key] = DeepMerge(result[key] || {}, obj2[key]);
      } else {
        // Otherwise, just overwrite the value with obj2's value
        result[key] = obj2[key];
      }
    }
  }

  return result;
}
