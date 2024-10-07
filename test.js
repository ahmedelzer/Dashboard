const schema = { idField: "id" };

const state = {
  rows: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ],
};

const payload = {
  rows: [
    { id: 2, name: "Bob Jr." }, // Duplicate 'id', but different data
    { id: 3, name: "Charlie" },
  ],
};
const mergedRows = [
  ...new Map(
    [...state.rows, ...payload?.rows].map((item) => [
      item[schema.idField], // Using the 'id' field as the key
      item, // The entire object is the value
    ])
  ).values(),
];
// );
let map = new Map([
  ["a", 12],
  ["a", 13],
]);
console.log(mergedRows);
