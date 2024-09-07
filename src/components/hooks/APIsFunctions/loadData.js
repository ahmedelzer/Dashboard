import { languageID, languageName, SetHeaders, token } from "../../../request";

export default function LoadData(
  state,
  dataSourceAPI,
  getAction,
  cache,
  updateRows,
  dispatch
) {
  const { requestedSkip, take, lastQuery, loading } = state;
  // const navigate = useNavigate(); seen error dom hooks
  const query = dataSourceAPI(getAction, requestedSkip, take);
  if (!getAction) return;
  if (query !== lastQuery && !loading) {
    const cached = cache.getRows(requestedSkip, take);
    if (cached.length === take) {
      updateRows(requestedSkip, take);
    } else {
      dispatch({ type: "FETCH_INIT" });
      fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...SetHeaders(),
        },
      })
        .then((response) => response.json())
        .then(({ dataSource, count }) => {
          if (dataSource.code === 401) {
            //todo handle error message
            // RedirectToLogin(navigate, dataSource);
            return;
          }
          cache.setRows(requestedSkip, dataSource);
          updateRows(requestedSkip, take, count);
        })
        .catch(() => dispatch({ type: "REQUEST_ERROR" }));
    }
    dispatch({ type: "UPDATE_QUERY", payload: query });
  }
}
