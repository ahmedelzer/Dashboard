export function reducer(state, { type, payload }) {
  switch (type) {
    case "UPDATE_ROWS":
      return {
        ...state,
        rows: Array.from(
          new Map(
            [...state.rows, ...payload?.rows].map((item) => [
              item[state.key], //item[schema.idField]//menuItemID
              item,
            ])
          ).values()
        ),
        // [...state.rows, ...payload?.rows], // Append new rows to the existing rows
        totalCount: payload.totalCount,
        loading: false,
      };
    case "START_LOADING":
      return {
        ...state,
        requestedSkip: payload.requestedSkip,
        take: payload.take,
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        loading: false,
      };
    case "FILTER_ROWS":
      return {
        ...state,
        rows: Array.from(
          new Map(
            [...payload?.rows].map((item) => [
              item[state.key], //item[schema.idField]//menuItemID
              item,
            ])
          ).values()
        ),
        totalCount: payload.totalCount,
        loading: false,
      };
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_QUERY":
      return {
        ...state,
        lastQuery: payload,
      };
    default:
      return state;
  }
}
