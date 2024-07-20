import React, { useState, useReducer, useEffect, useMemo } from "react";
import {
  Grid,
  Table,
  PagingPanel,
  TableHeaderRow,
  VirtualTable,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-bootstrap4";
import {
  DataTypeProvider,
  VirtualTableState,
  createRowCache,
} from "@devexpress/dx-react-grid";
import PopupEditing from "../DynamicPopup/PopupEditing";
import Popup from "../DynamicPopup/Popup";
import { ImageTypeProvider, TypeProvider } from "./TypeProvider";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import { EditingState } from "@devexpress/dx-react-grid";
import { MdDelete, MdEdit } from "react-icons/md";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import Loading from "../../loading/Loading";

const VIRTUAL_PAGE_SIZE = 50;
const MAX_ROWS = 50000;
const URL =
  "https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales";
const buildQueryString = (skip, take) =>
  `${URL}?requireTotalCount=true&skip=${skip}&take=${take}`;

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
function BaseTable({
  schema,
  isSearchingTable,
  addMessage,
  editMessage,
  deleteMessage,
  setSelectedRow,
  paging,
  setPanelOpen,
  popupComponent,
  getAction,
}) {
  console.log("schemaBasetable", schema);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getRowId = (row) => row[schema.idField];
  const dataSourceAPI = (query, skip, take) =>
    buildApiUrl(query, {
      pageIndex: skip / take + 1,
      pageSize: take,
    });

  const rowDoubleClick = (row) => {
    if (setSelectedRow) {
      setSelectedRow(row); // Update selectedRow state with the clicked row
      setPanelOpen(false);
    }
    console.log("row", row);
  };
  const CustomRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      onDoubleClick={() => rowDoubleClick(row)}
      style={{ cursor: "pointer" }}
    />
  );

  const [columns, setColumns] = useState([]);

  // e
  useEffect(() => {
    // Assuming schema[0].dashboardFormSchemaParameters is an array of parameters
    const dynamicColumns =
      schema?.dashboardFormSchemaParameters?.map((param) => ({
        name: param.parameterField,
        title: param.parameterTitel,
        type: param.parameterType,
        getCellValue: (row) => row[param.parameterField],
      })) || [];

    setColumns([...dynamicColumns]);
  }, [schema]);

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
  //e
  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: "START_LOADING", payload: { requestedSkip, take } });
  };
  //e
  const loadData = () => {
    const { requestedSkip, take, lastQuery, loading } = state;
    const query = dataSourceAPI(getAction, requestedSkip, take);
    console.log("dataSourceAPI", query);
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
        // var response =  fetchDataWithHandling(query, 'GET');
        // response === 'REQUEST_ERROR'? (dispatch({ type: 'REQUEST_ERROR' })):
        // (
        //   cache.setRows(requestedSkip, response.dataSource);
        //     updateRows(requestedSkip, take, response.count);
        // )
      }
      dispatch({ type: "UPDATE_QUERY", payload: query });
    }
  };

  useEffect(() => loadData());
  //e
  const { rows, skip, totalCount, loading } = state;

  // end e
  const commitChanges = ({ added, changed, deleted }) => {
    console.log("t", "done");
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));
    }
    // setRows(changedRows);
  };

  // e
  useEffect(() => {
    if (!rows) {
      return <Loading />;
    }
  }, [rows]);

  const cancelChanges = () => {
    // row=null;
  };
  //e
  const columnsFormat = columns
    .filter((column) => column.type !== "text")
    .map((column) => column.name);

  return (
    <Grid
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      i18nIsDynamicList={true}
      className="flex"
      style={{ position: "relative" }}
    >
      {paging ? <PagingState defaultCurrentPage={0} pageSize={5} /> : null}
      {paging ? <IntegratedPaging /> : null}

      <TypeProvider for={columnsFormat} />
      <EditingState onCommitChanges={commitChanges} />
      <Table
        rowComponent={({ ...props }) => (
          <CustomRow {...props} onRowDoubleClick={rowDoubleClick} />
        )}
      />

      <TableEditColumn
        messages={{
          addCommand: "+",
          editCommand: <MdEdit />,
          deleteCommand: <MdDelete />,
        }}
        // showAddCommand={!isSearchingTable}
        // showEditCommand={!isSearchingTable}
        showAddCommand={addMessage}
        showEditCommand={editMessage}
        showDeleteCommand={deleteMessage}
      />
      <TableHeaderRow />

      {!isSearchingTable ? popupComponent({ state }) : <></>}
      {paging ? <PagingPanel /> : null}
    </Grid>
  );
}

export default BaseTable;
