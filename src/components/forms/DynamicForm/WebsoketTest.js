import React, { useState, useReducer, useEffect, useMemo } from "react";
import {
  DataTypeProvider,
  VirtualTableState,
  createRowCache,
} from "@devexpress/dx-react-grid";
import { EditingState } from "@devexpress/dx-react-grid";
import Loading from "../../loading/Loading";
import {
  Grid,
  Table,
  TableHeaderRow,
  VirtualTable,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-bootstrap4";
import TestApi from "../../hooks/APIsFunctions/TestApi";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { MdEdit } from "react-icons/md";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { FaCirclePlus } from "react-icons/fa6";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import PopupEditing from "../DynamicPopup/PopupEditing";
import Popup from "../DynamicPopup/Popup";

import { socket } from "../../hooks/APIsFunctions/WebsocketClient";

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
const dataSourceAPI = (query, skip, take) =>
  buildApiUrl(query, {
    pageIndex: skip / take + 1,
    pageSize: take,
  });
const DynamicTable = ({
  schema,
  isSearchingTable,
  // rowDoubleClick ,
}) => {
  const getRowId = (row) => row[schema.idField];
  const { data, error, isLoading } = useFetch(
    `/Dashboard/GetDashboardSchemaActionsBySchemaID?DashboardSchemaID=${schema.dashboardFormSchemaID}`
  );
  const schemaActions = data;

  console.log("data", data);

  const getAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const postAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
  const putAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Put"
    );
  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns, setColumns] = useState([]);
  const [result, setResult] = useState({});
  console.log("putAction", putAction);

  console.log(data);
  useEffect(() => {
    // Assuming schema[0].dashboardFormSchemaParameters is an array of parameters
    const dynamicColumns =
      schema?.dashboardFormSchemaParameters?.map((param) => ({
        name: param.parameterField,
        title: param.parameterTitel,
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

  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: "START_LOADING", payload: { requestedSkip, take } });
  };

  const loadData = () => {
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

  const { rows, skip, totalCount, loading } = state;

  const commitChanges = ({ added, changed }) => {
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
    // setRows(changedRows);
  };
  const CustomRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      onDoubleClick={() => rowDoubleClick(row)}
      style={{ cursor: "pointer" }}
    />
  );
  useEffect(() => {
    if (!rows) {
      return <Loading />;
    }
  }, [rows]);

  const cancelChanges = () => {
    // row=null;
  };
  const ImageFormatter = ({ value }) => (
    <img src={value} alt="image" style={{ width: "50px", height: "50px" }} />
  );
  const ImageTypeProvider = (props) => (
    <DataTypeProvider formatterComponent={ImageFormatter} {...props} />
  );

  const [selectedRow, setSelectedRow] = useState(null); // State to track the selected row

  socket("/test").addEventListener("message", function (event) {
    const data = JSON.parse(event.data);
    if (data) {
      switch (data.operation) {
        case "Insert": {
          state.rows = [...state.rows, ...data[getAction.returnPropertyName]];
          break;
        }
        case "Update": {
          let updata = state.rows.find(
            (row) => row[schema.idField] === data[getAction.returnPropertyName]
          );
          updata = data;
          break;
        }
        case "Delete": {
          let Delete = state.rows.find(
            (row) => row[schema.idField] === data[getAction.returnPropertyName]
          );
          Delete = null;
          break;
        }
        case "Fill": {
          state.rows = data[getAction.returnPropertyName];

          break;
        }
        default: {
          return null;
        }
      }
    }
  });
  const rowDoubleClick = (row) => {
    setSelectedRow(row); // Update selectedRow state with the clicked row
    console.log("row", row);
  };
  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        i18nIsDynamicList={true}
      >
        <ImageTypeProvider for={["countryFlag"]} />
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
          }}
          showAddCommand={!isSearchingTable}
          showEditCommand={!isSearchingTable}
        />
        <TableHeaderRow />
        <PopupEditing
          popupComponent={Popup}
          putAction={putAction}
          postAction={postAction}
          state={state}
          setResult={setResult}
          result={result}
          schema={schema}
        />
      </Grid>
    </div>
  );
};
export default DynamicTable;
