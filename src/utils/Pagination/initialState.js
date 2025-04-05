export const initialState = (VIRTUAL_PAGE_SIZE, key) => ({
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  key: key,
  lastQuery: "",
});
