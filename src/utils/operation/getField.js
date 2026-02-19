export const getField = (parameters, type, includeField = true) => {
  const item = parameters.find(
    (item) => item?.parameterType === type && !item.isIDField,
  );

  if (!item) return null;

  return includeField ? item.parameterField : item;
};
