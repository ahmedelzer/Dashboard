import {
  createRowCache,
  EditingState,
  FilteringState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting,
  PagingState,
  SelectionState,
  SortingState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  PagingPanel,
  Table,
  TableEditColumn,
  TableFilterRow,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Card } from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";
import { SetReoute } from "../../../request";
import {
  getRemoteRows,
  initialState,
  reducer,
  updateRows,
} from "../../../utils/Pagination";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import LoadData from "../../hooks/APIsFunctions/loadData";
import Loading from "../../loading/Loading";
import WaringPop from "../PartingFrom/WaringPop";
import avoidColsTypes from "./avoidColsTypes.json";
import CustomRow from "./CustomRow";
import {
  CurrencyTypeProvider,
  SwitchTypeProvider,
} from "./CustomTypeProviders";
import { DetailsCell as CustomDetailsCell } from "./DetailsCell";
import { listObserverStyle } from "./styles";
import { TypeProvider } from "./TypeProvider";
import { useWS } from "../../../contexts/WSContext";
import { ConnectToWS } from "../../../utils/WS/ConnectToWS";
// import { ConnectToWS } from "../../../utils/WS/ConnectToWS";
// import { ConnectToWS } from "../../../utils/WS/ConnectToWS";
import { WSMessageHandler } from "../../../utils/WS/handleWSMessage";
import { FilterCell } from "./FilterCell";
const VIRTUAL_PAGE_SIZE = 50;
// const schema = {
//   dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//   schemaType: "Table",
//   idField: "nodeMenuItemID",
//   dashboardFormSchemaInfoDTOView: {
//     dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//     schemaHeader: "Menu Items",
//     addingHeader: "Add Menu Item",
//     editingHeader: "Edit Menu Item",
//   },
//   dashboardFormSchemaParameters: [
//     {
//       dashboardFormSchemaParameterID: "dc306e4d-f19b-42d2-b01f-34397bb4c711",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: true,
//       parameterType: "dependLookup",
//       parameterField: "nodeID",
//       parameterTitel: "Node",
//       parameterLookupTitel: null,
//       isIDField: false,
//       lookupID: "cf78644e-31d0-4122-ba76-726efd4a1fd0",
//       lookupReturnField: "nodeID",
//       lookupDisplayField: "node_Name",
//       indexNumber: 0,
//       filedFlag: 0,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [
//         {
//           dashboardFormSchemaParameterDependencyID:
//             "873ab5e5-3bac-44f8-9bb7-dce3cf017fc5",
//           dashboardFormSchemaParameterID:
//             "dc306e4d-f19b-42d2-b01f-34397bb4c711",
//           dependDashboardFormSchemaParameterID:
//             "d6435646-9a1a-4a72-b0f4-b1605c3725cb",
//         },
//       ],
//     },
//     {
//       dashboardFormSchemaParameterID: "becbe003-c853-4e1c-916b-9adc90524bdc",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: false,
//       parameterType: "text",
//       parameterField: "nodeMenuItemID",
//       parameterTitel: "Node Menu Item ID",
//       parameterLookupTitel: "Node Menu Item ID",
//       isIDField: true,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       indexNumber: 0,
//       filedFlag: 0,

//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "d6435646-9a1a-4a72-b0f4-b1605c3725cb",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: true,
//       parameterType: "text",
//       parameterField: "menuItemID",
//       parameterTitel: "Menu Item ID",
//       filedFlag: -2,

//       parameterLookupTitel: "Menu Item Name",
//       isIDField: false,
//       lookupID: "1a184bfd-6090-4da8-b2bc-7f985ddab771",
//       lookupReturnField: "menuItemID",
//       lookupDisplayField: "menuItemName",
//       indexNumber: 1,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "3f445744-39a6-41ab-9d6b-d70a5dee0626",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: false,
//       parameterType: "rate",
//       parameterField: "rate",
//       parameterTitel: "Rate",
//       parameterLookupTitel: "Rate",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       filedFlag: -1,

//       lookupDisplayField: null,
//       indexNumber: 4,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "58929345-5d93-408a-b733-a2b853dedffa",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: false,
//       parameterType: "orders",
//       parameterField: "numberOfOrders",
//       parameterTitel: "Number Of Orders",
//       parameterLookupTitel: "Number Of Orders",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       filedFlag: 1,

//       indexNumber: 5,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "5e156ca1-2df3-4829-a87a-24becfe43754",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: false,
//       parameterType: "reviews",
//       parameterField: "numberOfReviews",
//       parameterTitel: "Number Of Reviews",
//       parameterLookupTitel: "Number Of Reviews",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       indexNumber: 6,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "92ea9c87-97e2-459a-a7f2-8a0ef1d117cd",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: false,
//       parameterType: "likes",
//       parameterField: "numberOfLikes",
//       parameterTitel: "NumberOfLikes",
//       parameterLookupTitel: "NumberOfLikes",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       indexNumber: 7,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "2d38a825-380e-43dd-9e97-91a808a4ad31",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: false,
//       parameterType: "dislikes",
//       parameterField: "numberOfDislikes",
//       parameterTitel: "NumberOfDislikes",
//       parameterLookupTitel: "NumberOfDislikes",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       indexNumber: 8,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "41e16f1a-32af-4b83-9c05-2b0fbd9a2b19",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: true,
//       parameterType: "boolean",
//       parameterField: "isActive",
//       parameterTitel: "Active",
//       parameterLookupTitel: "Active",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       indexNumber: 10,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "c5e70338-5dc2-4186-980c-23d103c39d71",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: true,
//       parameterType: "boolean",
//       parameterField: "isAvailable",
//       parameterTitel: "Available",
//       parameterLookupTitel: "Available",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       indexNumber: 11,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "9235b8e2-71a5-4b8c-8362-df14feaf55d1",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: true,
//       parameterType: "float",
//       parameterField: "cost",
//       parameterTitel: "Cost",
//       parameterLookupTitel: "Cost",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       indexNumber: 12,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//     {
//       dashboardFormSchemaParameterID: "427cdf19-b30f-4e47-816d-3ad90b0987f7",
//       dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
//       isEnable: true,
//       parameterType: "float",
//       parameterField: "price",
//       parameterTitel: "Price",
//       parameterLookupTitel: "Price",
//       isIDField: false,
//       lookupID: null,
//       lookupReturnField: null,
//       lookupDisplayField: null,
//       indexNumber: 13,
//       isFilterOperation: true,
//       dashboardFormSchemaParameterDependencies: [],
//     },
//   ],
//   projectProxyRoute: "BrandingMartPOS",
//   isMainSchema: true,
//   dataSourceName: "",
//   propertyName: null,
//   indexNumber: 0,
// };
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
  subSchemas,
  selectedRow,
  specialActions,
  wsAction,
}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState(VIRTUAL_PAGE_SIZE, schema.idField)
  );
  const { localization } = useContext(LanguageContext);
  const [filters, setFilters] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [subSchema, setSubSchema] = useState(null);
  const [includeSchemas, setIncludeSchemas] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [title, setTitle] = useState("");
  const [currentSkip, setCurrentSkip] = useState(1);
  const { _wsMessageMenuItem, setWSMessageMenuItem } = useWS();
  const [WS_Connected, setWS_Connected] = useState(false);
  const observerRef = useRef();
  const getRowId = (row) => row[schema.idField];
  const toggleRowExpanded = (row) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(row)
        ? prevExpandedRows.filter((id) => id !== row)
        : [...prevExpandedRows, row]
    );
  };
  const dataSourceAPI = (query, skip, take) => {
    SetReoute(schema.projectProxyRoute);
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
      })
    );
    console.log("====================================");
    console.log(
      transformedFilters,
      encodeURIComponent(JSON.stringify(transformedFilters))
    );
    console.log("====================================");
    setFilters(transformedFilters); // Update filters state with new values
  };

  const rowDoubleClick = (row) => {
    if (setSelectedRow) {
      setSelectedRow(row); // Update selectedRow state with the clicked row
      setPanelOpen(false);
    }
  };
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    // Assuming schema[0].dashboardFormSchemaParameters is an array of parameters
    const dynamicColumns =
      schema?.dashboardFormSchemaParameters
        .filter((column) => {
          return (
            !column.isIDField &&
            !avoidColsTypes.find(
              (columnType) => column.parameterType === columnType
            )
          );
        })
        ?.map((param) => ({
          name: param.parameterField,
          title: param.lookupID
            ? param.lookupDisplayField
            : param.parameterTitel,
          type: param.parameterType,
          lookupID: param.lookupID,
          isFilterOperation: param.isFilterOperation,
          // isWithFlag: param.filedFlag,
          getCellValue: (row) =>
            row[
              param.lookupID ? param.lookupDisplayField : param.parameterField
            ],
        })) || [];
    setColumns([
      ...dynamicColumns,
      // haveAreaMap && areaMap,
      // { name: "switchAction", title: "switch" },
    ]);
  }, [schema]);
  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE));
  //e
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
  useEffect(() => {
    LoadData(
      state,
      dataSourceAPI,
      getAction,
      cache,
      updateRows(dispatch, cache, state),
      dispatch
    );
  });
  useEffect(() => {
    LoadData(
      state,
      dataSourceAPI,
      getAction,
      cache,
      updateRows(dispatch, cache, state),
      dispatch,
      filters
    );
  }, [filters]);
  useEffect(() => {
    const findServerContainer = subSchemas?.filter(
      (schema) => schema.schemaType === "ServerFilesContainer"
    );

    setIncludeSchemas(findServerContainer);
  }, []);
  const { rows, skip, totalCount, loading } = state;

  // end e
  const commitChanges = ({ deleted }) => {
    if (deleted && deleted.length > 0) {
      const rowDelete = rows?.find((row) => row[schema.idField] === deleted[0]);
      handleDelete(rowDelete);
    }
  };
  const handleDelete = (row) => {
    setRowToDelete(row);
    setModalIsOpen(true);
  };
  const confirmDelete = () => {
    state.rows = rows.filter(
      (row) => row[schema.idField] !== rowToDelete[schema.idField]
    );
    setModalIsOpen(false);
    setRowToDelete(null);
  };
  // e
  useEffect(() => {
    if (!rows) {
      return <Loading />;
    }
  }, [rows]);
  const columnsFormat = columns
    .filter(
      (column) =>
        column.type === "image" ||
        column.type === "publicImage" ||
        column.type === "time"
    )
    .map((column) => column.name);
  const handleRowClick = (row) => {
    const isSelected = selection.some(
      (selectedRow) => selectedRow[schema.idField] === row[schema.idField]
    );
    setSelection((prevSelection) =>
      isSelected
        ? prevSelection.filter(
            (selectedRow) => selectedRow[schema.idField] !== row[schema.idField]
          )
        : [...prevSelection, row]
    );
  };
  ///todo make sure the observers work every time you get to the div after calling the new rows
  const observerCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && rows.length < totalCount && !loading) {
        console.log("====================================");
        console.log(rows.length, totalCount, schema.idField);
        console.log("====================================");
        getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2, dispatch);
        setCurrentSkip(currentSkip + 1);
      }
    },
    [rows, totalCount, loading, skip]
  );
  console.log("====================================");
  console.log(wsAction, "wsAction");
  console.log("====================================");
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerCallback]);
  //WS
  useEffect(() => {
    setWS_Connected(false);
  }, []);
  // 🌐 Setup WebSocket connection on mount or WS_Connected change
  useEffect(() => {
    // if (WS_Connected||wsAction=) return;

    SetReoute(schema.projectProxyRoute);
    let cleanup;
    ConnectToWS(
      setWSMessageMenuItem,
      setWS_Connected,
      schema.projectProxyRoute,
      {},
      wsAction
    )
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => {
        console.error("❌ Cart WebSocket error", e);
      });
    return () => {
      if (cleanup) cleanup(); // Clean up when component unmounts or deps change
      console.log("🧹 Cleaned up WebSocket handler");
    };
  }, [WS_Connected, wsAction]);

  // 🧠 Reducer callback to update rows
  const callbackReducerUpdate = async (ws_updatedRows) => {
    await dispatch({
      type: "WS_OPE_ROW",
      payload: {
        rows: ws_updatedRows.rows,
        totalCount: ws_updatedRows.totalCount,
      },
    });
  };
  const fieldsType = {
    idField: schema.idField,
    dataSourceName: schema.dataSourceName || schema.idField || "nodeMenuItemID",
  };

  // 📨 React to WebSocket messages only when valid
  useEffect(() => {
    if (!_wsMessageMenuItem) return;
    const _handleWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageMenuItem,
      fieldsType,
      rows,
      totalCount,
      callbackReducerUpdate,
    });
    _handleWSMessage.process();
    setWSMessageMenuItem(_wsMessageMenuItem);
  }, [_wsMessageMenuItem]);
  let initialRows = [
    {
      rate: "9",
      likes: "10",
      postTitle: "Vision",
      switchAction: true,
    },
  ];
  return (
    <Card>
      <Grid
        // rows={initialRows}
        // columns={initialColumns}
        rows={rows}
        // rows={rows.concat(loading ? [{ isLoading: true }] : [])}
        columns={columns}
        getRowId={getRowId}
        i18nIsDynamicList={true}
      >
        {/*start filter and search*/}
        <FilteringState onFiltersChange={handleFiltersChange} />
        <SortingState />
        {/*end filter and search*/}
        {paging ? <PagingState defaultCurrentPage={0} pageSize={5} /> : null}
        {paging ? <IntegratedPaging /> : null}
        {/*start filter and search*/}
        <IntegratedFiltering />
        <IntegratedSorting />
        <SwitchTypeProvider for={["switchAction"]} /> {/* Switch column */}
        {/* <SwitchTypeProvider for={["switchAction"]} /> Switch column */}
        <CurrencyTypeProvider for={["Date"]} />
        {/* Date column */}
        {/*end filter and search*/}
        <TypeProvider for={columnsFormat} />
        <EditingState onCommitChanges={commitChanges} />
        {/* {selectionRow && (
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
          
        />
      )} */}
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
        <Table
          rowComponent={(props) => (
            <CustomRow
              {...props}
              schema={schema}
              onRowClick={handleRowClick}
              rowDoubleClick={rowDoubleClick}
              selectedRow={selectedRow}
              expandedRows={expandedRows}
              setExpandedRows={setExpandedRows}
              includeSchemas={includeSchemas}
              subSchema={subSchema}
              fieldName={fieldName}
              title={title}
              columns={columns}
              selection={selection}
              setSelectedRow={setSelectedRow}
            />
          )}
          // cellComponent={DetailsCell}
          cellComponent={(props) =>
            CustomDetailsCell({
              props,
              subSchemas,
              setSubSchema,
              setFieldName,
              setTitle,
              toggleRowExpanded,
              specialActions,
              schema,
            })
          }
        />
        {/* {loading && <Loading />} */}
        {/* {selectionRow && <TableSelection showSelectAll />} */}
        <TableEditColumn
          messages={{
            addCommand: "+",
            editCommand: <MdEdit />,
            deleteCommand: <MdDelete />,
          }}
          showAddCommand={addMessage}
          showEditCommand={editMessage}
          showDeleteCommand={deleteMessage}
        />
        {/*start filter and search*/}
        <TableFilterRow
          showFilterSelector={true}
          cellComponent={(props) => <FilterCell {...props} schema={schema} />}
        />{" "}
        {/* Render filter row with filter options */}
        {/*end filter and search*/}
        <TableHeaderRow showSortingControls={true} />
        {/* <VirtualTable /> can you make lazy loading work without this */}
        {!isSearchingTable ? popupComponent({ state }) : <></>}
        {paging ? <PagingPanel /> : null}
        <WaringPop
          confirmDelete={confirmDelete}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </Grid>
      {state.rows && (
        <div ref={observerRef} className={listObserverStyle.container} />
      )}
    </Card>
  );
}
export default BaseTable;
