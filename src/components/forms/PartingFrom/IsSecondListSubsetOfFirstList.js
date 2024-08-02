export const IsSecondListSubsetOfFirstList = (list1, list2, compareList) => {
  for (let element2 of list2) {
    let found = false;

    for (let element1 of list1) {
      let isSubset = true;

      for (let compareListItem of compareList) {
        if (element1[compareListItem] !== element2[compareListItem]) {
          isSubset = false;
          break;
        }
      }

      if (isSubset) {
        found = true;
        break;
      }
    }

    if (!found) {
      return false;
    }
  }
  return true;
};
