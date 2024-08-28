export const loadData = (
  state,
  dataSourceAPI,
  getAction,
  cache,
  updateRows,
  dispatch
) => {
  const { requestedSkip, take, lastQuery, loading } = state;
  const query = dataSourceAPI(getAction, requestedSkip, take);
  if (query !== lastQuery && !loading) {
    const cached = cache.getRows(requestedSkip, take);
    if (cached.length === take) {
      updateRows(requestedSkip, take);
    } else {
      dispatch({ type: "FETCH_INIT" });
      fetch(query)
        .then((response) => response.json())
        .then(({ dataSource, count }) => {
          cache.setRows(requestedSkip, dataSource);
          updateRows(requestedSkip, take, count);
        })
        .catch(() => dispatch({ type: "REQUEST_ERROR" }));
    }
    dispatch({ type: "UPDATE_QUERY", payload: query });
  }
};
