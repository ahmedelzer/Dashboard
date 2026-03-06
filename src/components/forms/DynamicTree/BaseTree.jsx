// import React from "react";
// import {
//   TreeList,
//   RemoteOperations,
//   Column,
//   Editing,
//   Button,
// } from "devextreme-react/tree-list";
// import "whatwg-fetch";

// const dataSource = {
//   async load(loadOptions) {
//     const parentIdsParam = loadOptions.parentIds;
//     console.log(loadOptions);

//     const url = new URL("https://js.devexpress.com/Demos/Mvc/api/treeListData");
//     if (parentIdsParam) {
//       parentIdsParam.forEach((id) => {
//         url.searchParams.append("parentIds", id);
//       });
//     }
//     const result = await fetch(url.toString());
//     if (result.status === 200) {
//       return result.json();
//     }
//     throw new Error("Data Loading Error");
//   },
// };
// const customizeText = (e) => {
//   if (e.value !== null) {
//     return `${Math.ceil(e.value / 1024)} KB`;
//   }
//   return null;
// };
// const allowDeleting = (e) => e.row.data.ID !== 1;
// const onEditorPreparing = (e) => {
//   // if (e.dataField === "Head_ID" && e.row.data.ID === 1) {
//   //   e.editorOptions.disabled = true;
//   //   e.editorOptions.value = null;
//   // }
// };
// const onInitNewRow = (e) => {
//   console.log(e);

//   e.data.Head_ID = 1;
// };
// const popupOptions = {
//   title: "Employee Info",
//   showTitle: true,
//   // width: 700,
// };
// const Test = () => (
//   <TreeList
//     id="treelist"
//     dataSource={dataSource}
//     showBorders={true}
//     keyExpr="id"
//     parentIdExpr="parentId"
//     hasItemsExpr="hasItems"
//     // columns={[{dataField:}]}
//     columnAutoWidth={true}
//     showRowLines={true}
//     rootValue=""
//     onEditorPreparing={onEditorPreparing}
//     onInitNewRow={onInitNewRow}
//   >
//     <RemoteOperations filtering={true} />
//     {/* <Editing
//       mode="row"
//       allowAdding={true}
//       allowUpdating={true}
//       allowDeleting={true}
//     /> */}
//     <Editing
//       allowUpdating={true}
//       allowDeleting={allowDeleting}
//       allowAdding={true}
//       popup={popupOptions}
//       mode="popup"
//     />
//     <Column dataField="name" />
//     <Column width={100} customizeText={customizeText} dataField="size" />
//     <Column width={150} dataField="createdDate" dataType="date" />
//     <Column width={150} dataField="modifiedDate" dataType="date" />
//     <Column type="buttons">
//       <Button name="edit" />
//       <Button name="delete" />
//     </Column>
//   </TreeList>
// );
// export default Test;
//todo how to handle treeList
//1- make popup display with formContainer and take the row when popup submitting made as in table
import { createRowCache } from "@devexpress/dx-react-grid";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import { Editing, TreeList } from "devextreme-react/tree-list";
import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { initialState, reducer } from "../../../utils/Pagination";

import { LanguageContext } from "../../../contexts/Language";
import { useWS } from "../../../contexts/WSContext";
import { updateRows } from "../../../utils/Pagination";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import LoadData from "../../hooks/APIsFunctions/loadData";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { defaultProjectProxyRouteWithoutBaseURL } from "../../../request";
import { GetActionsFromSchemaAction } from "../../hooks/DashboardAPIs/GetActionsFromSchemaAction";
// import { ConnectToWS } from "../../../utils/WS/ConnectToWS";
// import { ConnectToWS } from "../../../utils/WS/ConnectToWS";
const VIRTUAL_PAGE_SIZE = 50;
const BaseTree = ({
  schema,
  isSearchingTable,
  addMessage,
  editMessage,
  deleteMessage,
  paging,
  setPanelOpen,
  popupComponent,
  selectionRow,
  selection,
  setSelection,
  addSelectedList,
  refreshData,
  rowDetails,
  subSchemas,
}) => {
  const {
    data: _schemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRouteWithoutBaseURL,
  );
  const {
    getAction,
    postAction,
    putAction,
    deleteAction,
    wsAction,
    specialActions,
  } = GetActionsFromSchemaAction(_schemaActions);
  const [selectedRow, setSelectedRow] = useState(null);
  const [state, dispatch] = useReducer(
    reducer,
    initialState(VIRTUAL_PAGE_SIZE, schema.idField),
  );
  const { localization } = useContext(LanguageContext);
  const [filters, setFilters] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [includeSchemas, setIncludeSchemas] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [lookupSchema, setLookupSchema] = useState({});
  const [title, setTitle] = useState("");
  const [currentSkip, setCurrentSkip] = useState(1);
  const { _wsMessageTable, setWSMessageTable } = useWS();
  const [WS_Connected, setWS_Connected] = useState(false);
  const observerRef = useRef();

  const getRowId = (row) => row[schema.idField];
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [newRow, setNewRow] = useState({});
  const toggleRowExpanded = (row) => {
    // console.log("toggleRowExpanded",row);
    setExpandedRows((prevExpandedRows) => {
      const result = prevExpandedRows.includes(row)
        ? prevExpandedRows.filter((id) => id !== row)
        : [...prevExpandedRows, row];
      setIsRowSelected(true);
      setNewRow(result);
      return result;
    });
  };
  const dataSourceAPI = (query, skip, take) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      filterRow: encodeURIComponent(filters),
      ...rowDetails,
    });
  };
  // Function to handle filter change and update state
  const handleFiltersChange = (newFilters) => {
    const transformedFilters = newFilters.map(
      ({ columnName, value, ...rest }) => ({
        field: columnName,
        values: value,
        ...rest,
      }),
    );
    setFilters(transformedFilters); // Update filters state with new values
  };

  const rowDoubleClick = (row) => {
    if (setSelectedRow) {
      setSelectedRow(row); // Update selectedRow state with the clicked row
      setPanelOpen(false);
    }
  };
  const [columns, setColumns] = useState([]);

  //load data every render
  useEffect(() => {
    if (
      selectedRow &&
      Object.keys(selectedRow).length === 0 &&
      setSelectedRow &&
      state.rows.length > 0
    ) {
      setSelectedRow(state.rows[0]);
    }
  });
  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE));
  //e
  //load data every render
  useEffect(() => {
    if (!getAction) return;
    LoadData(
      state,
      dataSourceAPI,
      getAction,
      cache,
      updateRows(dispatch, cache, state),
      dispatch,
    );
  }, [currentSkip, filters, getAction, rowDetails]);
  const handleRowClick = (e) => {
    // Get the data of the clicked row
    setSelectedRow(e.data);
    console.log("Selected row data:", e.data);
  };

  const handleRowInserting = (e) => {
    console.log("New row data being added:", e);
    // You can set initial values for the new row if needed
    // e.data = { ...e.data, Full_Name: '', ... }
  };

  return (
    <TreeList
      dataSource={state.rows}
      onRowClick={handleRowClick}
      // onRowInserting={handleRowInserting}
      // onRowUpdating={handleRowInserting}
      columnAutoWidth={true}
      showRowLines={true}
      showBorders={true}
      defaultExpandedRowKeys={[1, 2]}
      keyExpr={schema.idField}
      parentIdExpr="1"
    >
      <Editing allowUpdating allowAdding allowDeleting mode="popup" />
      {/* <Column dataField="Full_Name" /> */}
      {/* <Column dataField="Name" /> */}
      {/* <Column dataField="City" /> */}
      {/* Add other columns as needed */}
    </TreeList>
  );
};
export default BaseTree;
