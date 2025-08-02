export function keysToLowerFirstChar(obj) {
  const newObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const newKey = key.charAt(0).toLowerCase() + key.slice(1);
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
}
