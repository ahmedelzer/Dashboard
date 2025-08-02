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
const VIRTUAL_PAGE_SIZE = 50;
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
      ...rowDetails,
    });
  };
  // Function to handle filter change and update state
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters); // Update filters state with new values
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
          title: param.parameterTitel,
          type: param.parameterType,
          lookupID: param.lookupID,
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
      (column) => column.type === "image" || column.type === "publicImage"
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
    if (WS_Connected) return;

    SetReoute(schema.projectProxyRoute);
    let cleanup;
    ConnectToWS(setWSMessageMenuItem, setWS_Connected, schema.projectProxyRoute)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => {
        console.error("❌ Cart WebSocket error", e);
      });
    return () => {
      if (cleanup) cleanup(); // Clean up when component unmounts or deps change
      console.log("🧹 Cleaned up WebSocket handler");
    };
  }, [WS_Connected]);

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
    dataSourceName: schema.dataSourceName ||schema.idField|| "nodeMenuItemID",
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
        <TableFilterRow showFilterSelector={true} />{" "}
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
