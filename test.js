function generatePermutations(number) {
  // Helper function to generate permutations
  function permute(arr, l, r, result) {
    if (l === r) {
      result.add(parseInt(arr.join(""), 10));
    } else {
      let seen = new Set();
      for (let i = l; i <= r; i++) {
        if (!seen.has(arr[i])) {
          seen.add(arr[i]);
          [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap
          permute(arr, l + 1, r, result);
          [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap back
        }
      }
    }
  }

  // Convert the number to a string and then to an array of digits
  let numStr = number.toString();
  let numArr = numStr.split("");
  let result = new Set();

  // Generate all permutations
  permute(numArr, 0, numArr.length - 1, result);

  // Convert the set to an array and return
  return Array.from(result).sort();
}
function nextSmaller(n) {
  let numbers = generatePermutations(n);
  let index = numbers.indexOf(n);
  console.log(numbers, index);

  if (numbers[index - 1]) {
    if (numbers[index - 1].toString().length === n.toString().length) {
      return numbers[index - 1];
    }
  } else {
    return -1;
  }
  return -1;
}
// Example usage
// let number = 123;
// let result = generatePermutations(number);
// console.log(result);
const SharedLists = (obj, list, part) => {
  const matchingKeys = new Set(list.map((item) => item[part]));
  const result = {};

  for (const key in obj) {
    if (matchingKeys.has(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

// Example usage:
const list1 = {
  postID: "4fa7ddef-404a-4bb7-a3f8-66a80978f8cd",
  creationDate: "2024-05-01T14:51:10.147",
  postTitle: "string",
  postDescription: "string",
};

const list2 = [
  {
    dashboardFormSchemaParameterID: "ce99f99f-e998-47eb-8ae0-d49416b62521",
    dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
    isEnable: false,
    parameterType: "text",
    parameterField: "homePostID",
    parameterTitel: "Home Post ID",
    isIDField: true,
    lookupID: null,
    lookupReturnField: null,
    lookupDisplayField: null,
    indexNumber: 0,
  },
  {
    dashboardFormSchemaParameterID: "e17193c9-26ef-4578-823a-790a5051a94a",
    dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
    isEnable: true,
    parameterType: "datetime",
    parameterField: "showTime",
    parameterTitel: "Show Time",
    isIDField: false,
    lookupID: null,
    lookupReturnField: null,
    lookupDisplayField: null,
    indexNumber: 1,
  },
  {
    dashboardFormSchemaParameterID: "da30da53-331d-4698-b189-5a09362946ff",
    dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
    isEnable: true,
    parameterType: "numeric",
    parameterField: "duration",
    parameterTitel: "Duration By Minute",
    isIDField: false,
    lookupID: null,
    lookupReturnField: null,
    lookupDisplayField: null,
    indexNumber: 2,
  },
  {
    dashboardFormSchemaParameterID: "511d30a3-7171-411d-9fb8-de717add1ca6",
    dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
    isEnable: true,
    parameterType: "text",
    parameterField: "postID",
    parameterTitel: "Post ID",
    isIDField: false,
    lookupID: "8d8f94a8-78a1-409f-b7cc-ae0e4f277d66",
    lookupReturnField: "postID",
    lookupDisplayField: "postTitle",
    indexNumber: 3,
  },
];

const part = "parameterField";

console.log(SharedLists(list1, list2, part));

// console.log(nextSmaller(21));
// console.log(helper.pageCount());
// console.log(Math.ceil(2.1));
