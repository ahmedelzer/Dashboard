import React, { useEffect, useMemo, useReducer, useState } from "react";
import FormContainer from "../forms/DynamicPopup/FormContainer";
import TransformerContainer from "./PartingFrom/TransformerContainer";
import { ImageParameterWithPanelActions } from "../inputs";
import FileInput from "./PartingFrom/FileInput";
import {
  Grid,
  Table,
  PagingPanel,
  TableHeaderRow,
  VirtualTable,
  TableEditRow,
  TableEditColumn,
  TableSelection,
} from "@devexpress/dx-react-grid-bootstrap4";
import { createRowCache } from "@devexpress/dx-react-grid";
import {
  EditingState,
  IntegratedPaging,
  IntegratedSelection,
  PagingState,
  SelectionState,
} from "@devexpress/dx-react-grid";
import { MdDelete, MdEdit } from "react-icons/md";
import Loading from ".././loading/Loading";
import WaringPop from "./PartingFrom/WaringPop";
import { TypeProvider } from "./DynamicTable/TypeProvider";
import FileContainer from "./FileContainer/FileContainer";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import useFetch from ".././hooks/APIsFunctions/useFetch";
import PopupEditing from "./DynamicPopup/PopupEditing";
import Popup from "./DynamicPopup/Popup";
import GetSchemaActionsUrl from ".././hooks/DashboardAPIs/GetSchemaActionsUrl";
import { SetReoute, defaultProjectProxyRoute } from "../.././request";
import FileInputWithPanelActions from "../inputs/InputActions/FileInputWithPanelActions";
let schema = {
  dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
  schemaType: "Table",
  idField: "unitID",
  dashboardFormSchemaInfoDTOView: {
    dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
    schemaHeader: "Units",
    addingHeader: "Add a unitt",
    editingHeader: "Edit a unit",
  },
  dashboardFormSchemaParameters: [
    {
      dashboardFormSchemaParameterID: "46655c51-09fa-4c14-8e63-016eadf6962d",
      dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
      isEnable: true,
      parameterType: "text",
      parameterField: "unitSymbol",
      parameterTitel: "symbol",
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
    {
      dashboardFormSchemaParameterID: "4e586ce7-48a7-4a6c-bd86-4d1d456cb2d8",
      dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
      isEnable: false,
      parameterType: "text",
      parameterField: "unitID",
      parameterTitel: "unit id",
      isIDField: true,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
    {
      dashboardFormSchemaParameterID: "571b1ad7-417b-4ca0-b4f6-ac7fe7f81f08",
      dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
      isEnable: true,
      parameterType: "text",
      parameterField: "unitName",
      parameterTitel: "a unit",
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
    {
      dashboardFormSchemaParameterID: "a7480794-4d57-417d-9a24-d5bf28536285",
      dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
      isEnable: true,
      parameterType: "float",
      parameterField: "exactValue",
      parameterTitel: "exact value",
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
  ],
  isMainSchema: true,
  dataSourceName: null,
  projectProxyRoute: "Centralization",
  propertyName: null,
  indexNumber: 0,
};
function Data() {
  // Initialize state for row
  let row = {};

  // Use useEffect to log the current row whenever it updates
  useEffect(() => {
    console.log(row, "row");
  }, [row]);
  let popupComponent = <FormContainer tableSchema={schema} row={row} />;

  return (
    <>
      {/* <DynamicTable
        key={schema.idField}
        schema={schema}
        isSearchingTable={false}
        // rowDetails={row}
      /> */}
      {/* <FileInput /> */}
      <FileContainer
        fieldName={"image"}
        title={"Image"}
        // value={URL.createObjectURL(photo.file)}
        value={""}
        enable={true}
        onChange={() => {}}
      />
    </>
  );
}

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
const DynamicTable = ({
  schema,
  isSearchingTable,
  setSelectedRow = false,
  paging,
  setPanelOpen,
  selectionRow,
  addMessage = true,
  editMessage = true,
  deleteMessage = false,
  selection,
  setSelection,
  addSelectedList = false,
  PopupComponent = false,
  schemaActions = false,
  refreshData,
  rowDetails = false,
}) => {
  const [result, setResult] = useState({});
  const {
    data: SchemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRoute
    // trigger
  );
  schemaActions = schemaActions ? schemaActions : SchemaActions;
  SetReoute(schema.projectProxyRoute);

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
  const PopupComponentTable = ({ state }) => {
    return (
      <PopupEditing
        popupComponent={Popup}
        putAction={putAction}
        postAction={postAction}
        state={state}
        setResult={setResult}
        result={result}
        schema={schema}
        addSelectedList={addSelectedList}
      />
    );
  };

  return (
    <div className="card">
      <BaseTable
        key={schema.idField}
        schema={schema}
        selectionRow={selectionRow}
        addMessage={addMessage}
        editMessage={editMessage}
        deleteMessage={deleteMessage}
        isSearchingTable={isSearchingTable}
        setSelectedRow={setSelectedRow}
        paging={paging}
        setPanelOpen={setPanelOpen}
        popupComponent={PopupComponent ? PopupComponent : PopupComponentTable}
        getAction={getAction}
        selection={selection}
        setSelection={setSelection}
        addSelectedList={addSelectedList}
        // trigger={trigger}
        refreshData={refreshData}
        rowDetails={rowDetails}
      />
    </div>
  );
};

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
  selectionRow,
  selection,
  setSelection,
  addSelectedList,
  refreshData,
  rowDetails,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [expandedRows, setExpandedRows] = useState([]);
  const getRowId = (row) => row[schema.idField];

  const toggleRowExpanded = (rowId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(rowId)
        ? prevExpandedRows.filter((id) => id !== rowId)
        : [...prevExpandedRows, rowId]
    );
  };

  const CustomRow = ({ row, ...restProps }) => (
    <>
      <Table.Row
        {...restProps}
        onClick={() => toggleRowExpanded(getRowId(row))}
      />
      {expandedRows.includes(getRowId(row)) && (
        <tr>
          <td colSpan={columns.length}>
            <div className="p-3">
              {/* Here you can render the detailed content for the row */}
              <div>Expanded content for {row[schema.idField]}</div>
            </div>
          </td>
        </tr>
      )}
    </>
  );

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const dynamicColumns =
      schema?.dashboardFormSchemaParameters
        .filter((column) => !column.isIDField)
        ?.map((param) => ({
          name: param.parameterField,
          title: param.parameterTitel,
          type: param.parameterType,
          getCellValue: (row) => row[param.parameterField],
        })) || [];

    setColumns([
      ...dynamicColumns,
      { name: "details", title: "details", type: "text" },
    ]);
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
    const query = ""; // Replace with your data query logic
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

  useEffect(() => loadData(), []);

  const { rows, skip, totalCount, loading } = state;

  const commitChanges = ({ deleted }) => {
    if (deleted && deleted.length > 0) {
      const rowToDelete = rows?.find(
        (row) => row[schema.idField] === deleted[0]
      );
      // Handle delete logic
    }
  };

  const columnsFormat = columns
    .filter((column) => column.type !== "text")
    .map((column) => column.name);
  const ro = [
    {
      unitID: "8a4d8cec-a7d3-40dd-ba47-0ff4eda273a8",
      exactValue: 12,
      canBreak: true,
      unitName: "box",
      unitSymbol: "b12",
    },
  ];
  return (
    <Grid
      rows={ro}
      columns={columns}
      getRowId={getRowId}
      className="flex"
      style={{ position: "relative" }}
    >
      {paging ? <PagingState defaultCurrentPage={0} pageSize={5} /> : null}
      {paging ? <IntegratedPaging /> : null}

      <EditingState onCommitChanges={commitChanges} />
      <TypeProvider for={columnsFormat} />

      {selectionRow && (
        <SelectionState
          selection={selection.map((row) => row[schema.idField])}
          onSelectionChange={(newSelection) => {
            setSelection(
              rows.filter((row) => newSelection.includes(row[schema.idField]))
            );
          }}
        />
      )}
      {selectionRow && <IntegratedSelection />}

      <Table rowComponent={CustomRow} />
      <TableHeaderRow />
      {!isSearchingTable ? popupComponent({ state }) : <></>}
      {paging ? <PagingPanel /> : null}
      <WaringPop
      // Implement the confirmDelete method to handle deletions
      />
    </Grid>
  );
}

export default Data;
