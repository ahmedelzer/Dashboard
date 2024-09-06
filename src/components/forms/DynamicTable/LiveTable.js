import {
  IntegratedPaging,
  PagingState,
  createRowCache,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import React, { useEffect, useMemo, useReducer, useState } from "react";
const VIRTUAL_PAGE_SIZE = 50;
const MAX_ROWS = 50000;
const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: "",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case "UPDATE_ROWS":
      return {
        ...state,
        ...payload,
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

function LiveTable({ dataSource, updateRow }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns, setColumns] = useState([]);
  const [tableColumnExtensions] = useState([]);
  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE));
  const updateRows = (skip, count, newTotalCount) => {
    dispatch({
      type: "UPDATE_ROWS",
      payload: {
        skip,
        rows: cache.getRows(skip, count),
        totalCount: newTotalCount < MAX_ROWS ? newTotalCount : MAX_ROWS,
      },
    });
  };
  useEffect(() => {
    // Assuming schema[0].dashboardFormSchemaParameters is an array of parameters
    const dynamicColumns =
      dataSource?.dashboardFormSchemaParameters?.map((param) => ({
        name: param.parameterField,
        title: param.parameterTitel,
        type: param.parameterType,
        getCellValue: (row) => row[param.parameterField],
      })) || [];

    setColumns([...dynamicColumns]);
  }, [dataSource]);
  //e
  // const { rows, skip, totalCount, loading } = state;
  const rows = updateRow || [{}];
  return (
    <div className="card">
      <Grid rows={rows} columns={columns}>
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    </div>
  );
}

export default LiveTable;
