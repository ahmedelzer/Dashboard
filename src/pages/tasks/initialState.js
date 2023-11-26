import React, { useState, useReducer, useEffect } from 'react';
import { VirtualTableState } from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow
} from '@devexpress/dx-react-grid-bootstrap4';
import { VIRTUAL_PAGE_SIZE, buildQueryString, MAX_ROWS, getRowId } from './tasks';

const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: '',
};
function reducer(state, { type, payload }) {
  switch (type) {
    case 'UPDATE_ROWS':
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case 'START_LOADING':
      return {
        ...state,
        requestedSkip: payload.requestedSkip,
        take: payload.take,
      };
    case 'REQUEST_ERROR':
      return {
        ...state,
        loading: false,
      };
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_QUERY':
      return {
        ...state,
        lastQuery: payload,
      };
    default:
      return state;
  }
}
const App2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns] = useState([
    { name: 'Id', title: 'Id', getCellValue: row => row.Id },
    { name: 'ProductCategoryName', title: 'Category', getCellValue: row => row.ProductCategoryName },
    { name: 'StoreName', title: 'Store', getCellValue: row => row.StoreName },
    { name: 'ProductName', title: 'Product', getCellValue: row => row.ProductName },
    { name: 'SalesAmount', title: 'Amount', getCellValue: row => row.SalesAmount },
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: 'Id', width: 80 },
    { columnName: 'ProductCategoryName', width: 220 },
    { columnName: 'StoreName', width: 220 },
    { columnName: 'SalesAmount', width: 120 },
  ]);

  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
  };

  const loadData = () => {
    const {
      requestedSkip, take, lastQuery, loading,
    } = state;
    const query = buildQueryString(requestedSkip, take);
    console.log(query);
    if (query !== lastQuery && !loading) {
      dispatch({ type: 'FETCH_INIT' });
      fetch(query)
        .then(response => response.json())
        .then(({ data }) => {
          dispatch({
            type: 'UPDATE_ROWS',
            payload: {
              skip: requestedSkip,
              rows: data,
              totalCount: MAX_ROWS,
            },
          });
        })
        .catch(() => dispatch({ type: 'REQUEST_ERROR' }));
      dispatch({ type: 'UPDATE_QUERY', payload: query });
    }
  };

  useEffect(() => loadData());

  const {
    rows, skip, totalCount, loading,
  } = state;
  return (
    <div className="cards">

      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <VirtualTableState
          loading={loading}
          totalRowCount={totalCount}
          pageSize={VIRTUAL_PAGE_SIZE}
          skip={skip}
          getRows={getRemoteRows} />
        <VirtualTable columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
      </Grid>

    </div>
  );
};
export default App2;
