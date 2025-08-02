export const TotalCount = (totalCount, ope) => {
  if (ope == "Insert") {
    return totalCount + 1;
  } else if (ope == "Delete") {
    return totalCount - 1;
  } else {
    return totalCount;
  }
};
