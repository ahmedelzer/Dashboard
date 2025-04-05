export const getRemoteRows = (requestedSkip, take, dispatch) => {
  dispatch({ type: "START_LOADING", payload: { requestedSkip, take } });
};
