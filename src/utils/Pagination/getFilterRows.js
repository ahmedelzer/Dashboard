export const getFilterRows = (requestedSkip, take, dispatch) => {
  dispatch({ type: "FILTER_ROWS", payload: { requestedSkip, take } });
};
