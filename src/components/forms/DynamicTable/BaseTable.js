import {
  createRowCache,
  EditingState,
  IntegratedPaging,
  IntegratedSelection,
  PagingState,
  SelectionState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  PagingPanel,
  Table,
  TableEditColumn,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import Switch from "devextreme-react/switch";
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
import { TbListDetails } from "react-icons/tb";
import { LanguageContext } from "../../../contexts/Language";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import LoadData from "../../hooks/APIsFunctions/loadData";
import Loading from "../../loading/Loading";
import WaringPop from "../PartingFrom/WaringPop";
import SelectForm from "../SelectForm";
import {
  customRowStyle,
  detailsButtonStyle,
  listObserverStyle,
} from "./styles";
import { TypeProvider } from "./TypeProvider";
import DotsLoading from "../../loading/DotsLoading";
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
}) {
  function reducer(state, { type, payload }) {
    switch (type) {
      case "UPDATE_ROWS":
        return {
          ...state,
          rows: Array.from(
            new Map(
              [...state.rows, ...payload?.rows].map((item) => [
                item[schema.idField],
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { localization } = useContext(LanguageContext);

  const [expandedRows, setExpandedRows] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [subSchema, setSubSchema] = useState(null);
  const [includeSchemas, setIncludeSchemas] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [title, setTitle] = useState("");
  const [currentSkip, setCurrentSkip] = useState(1);
  const observerRef = useRef();
  const getRowId = (row) => row[schema.idField];
  const toggleRowExpanded = (row) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(row)
        ? prevExpandedRows.filter((id) => id !== row)
        : [...prevExpandedRows, row]
    );
  };
  const dataSourceAPI = (query, skip, take) =>
    buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      ...rowDetails,
    });

  const rowDoubleClick = (row) => {
    if (setSelectedRow) {
      setSelectedRow(row); // Update selectedRow state with the clicked row
      setPanelOpen(false);
    }
  };
  const CustomRow = ({ row, onRowClick, ...restProps }) => {
    if (row.isLoading) {
      return (
        <Table.Row {...restProps}>
          <Table.Cell colSpan={columns.length + 1} className=" text-center">
            <DotsLoading />
          </Table.Cell>
        </Table.Row>
      );
    }
    if (selection) {
      return (
        <Table.Row
          {...restProps}
          onClick={() => onRowClick(row)}
          className={`${customRowStyle.row} ${customRowStyle.selectedRow}`}
          style={{
            backgroundColor: restProps.selected
              ? "var(--main-color2)"
              : "white",
          }}
        >
          {React.Children.map(restProps.children, (child) =>
            React.cloneElement(child, {
              style: {
                ...child.props.style,
                backgroundColor: `${
                  restProps.selected ? "var(--main-color2)" : "white"
                }`,
              },
            })
          )}
        </Table.Row>
      );
    } else {
      return (
        <>
          <Table.Row
            {...restProps}
            onDoubleClick={() => rowDoubleClick(row)}
            // onClick={() => toggleRowExpanded(getRowId(row))}
            className={customRowStyle.tableRow}
          />
          {expandedRows.includes(row) && (
            //make this take the width of the row
            <tr>
              <td colSpan={columns.length + 1}>
                <div className={customRowStyle.expandedRow}>
                  <SelectForm
                    row={row}
                    parentSchemaParameters={
                      schema?.dashboardFormSchemaParameters
                    }
                    includeSchemas={includeSchemas}
                    schema={subSchema}
                    fieldName={fieldName}
                    title={title}
                  />
                </div>
              </td>
            </tr>
          )}
        </>
      );
    }
  };

  const [columns, setColumns] = useState([]);
  useEffect(() => {
    // Assuming schema[0].dashboardFormSchemaParameters is an array of parameters
    const dynamicColumns =
      schema?.dashboardFormSchemaParameters
        .filter((column) => !column.isIDField)
        ?.map((param) => ({
          name: param.parameterField,
          title: param.lookupID
            ? param.lookupDisplayField
            : param.parameterField,
          type: param.parameterType,
          lookupID: param.lookupID,
          getCellValue: (row) =>
            row[
              param.lookupID ? param.lookupDisplayField : param.parameterField
            ],
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
  //load data every render

  useEffect(() => {
    LoadData(state, dataSourceAPI, getAction, cache, updateRows, dispatch);
  });
  useEffect(() => {
    const findServerContainer = subSchemas?.filter(
      (schema) => schema.schemaType === "ServerFilesContainer"
    );

    setIncludeSchemas(findServerContainer);
  }, []);
  // useEffect(() => {
  //   loadData();
  //   console.log("refreshData", new Date().getTime());
  // }, [refreshData]);
  //e
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
  const DetailsButton = ({ row, fieldName, title }) => {
    const handleClick = () => {
      setFieldName(fieldName);
      setTitle(title);
      toggleRowExpanded(row);
    };
    return (
      <div>
        <button className={detailsButtonStyle.button} onClick={handleClick}>
          <TbListDetails size={18} />
        </button>
      </div>
    );
  };
  const SwitchCell = ({ value, onValueChange }) => {
    return (
      <Switch value={value} onValueChanged={(e) => onValueChange(e.value)} />
    );
  };

  const DetailsCell = (props) => {
    if (props.column.type === "detailsCell") {
      const findSubSchemas = subSchemas?.find(
        (schema) => schema.dashboardFormSchemaID === props.column.lookupID
      );
      setSubSchema(findSubSchemas);
      return (
        <Table.Cell {...props}>
          <DetailsButton
            row={props.row}
            fieldName={props.column.name}
            title={props.column.title}
          />
        </Table.Cell>
      );
    } else if (props.column.name === "switch") {
      return (
        <Table.Cell {...props}>
          <SwitchCell row={props.row} onValueChange={(newValue) => {}} />
        </Table.Cell>
      );
    }
    return <Table.Cell {...props} />;
  };
  // e
  useEffect(() => {
    if (!rows) {
      return <Loading />;
    }
  }, [rows]);
  const columnsFormat = columns
    .filter((column) => column.type === "image")
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
        getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2);
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
  return (
    <div className="card">
      <Grid
        // rows={initialRows}
        // columns={initialColumns}
        // rows={rows}
        rows={rows.concat(loading ? [{ isLoading: true }] : [])}
        columns={columns}
        getRowId={getRowId}
        i18nIsDynamicList={true}
      >
        {paging ? <PagingState defaultCurrentPage={0} pageSize={5} /> : null}
        {paging ? <IntegratedPaging /> : null}
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
          rowComponent={({ row, ...props }) => (
            <CustomRow
              {...props}
              onRowDoubleClick={rowDoubleClick}
              row={row}
              onRowClick={handleRowClick}
              // selected={selection?.includes(row[schema.idField])}
              selected={selection?.some(
                (selectedRow) =>
                  selectedRow[schema.idField] === row[schema.idField]
              )}
            />
          )}
          cellComponent={DetailsCell}
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
        <TableHeaderRow />
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
    </div>
  );
}
export default BaseTable;
