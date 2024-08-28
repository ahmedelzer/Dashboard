import React, { useState, useReducer, useEffect, useMemo } from "react";
import {
  Grid,
  Table,
  PagingPanel,
  TableHeaderRow,
  VirtualTable,
  TableEditRow,
  TableEditColumn,
  TableSelection,
  TableFixedColumns,
} from "@devexpress/dx-react-grid-bootstrap4";
import { createRowCache, VirtualTableState } from "@devexpress/dx-react-grid";
import PopupEditing from "../DynamicPopup/PopupEditing";
import Popup from "../DynamicPopup/Popup";
import { ImageTypeProvider, TypeProvider } from "./TypeProvider";
import {
  EditingState,
  IntegratedPaging,
  IntegratedSelection,
  PagingState,
  SelectionState,
} from "@devexpress/dx-react-grid";
import Switch from "devextreme-react/switch";
import { MdDelete, MdEdit } from "react-icons/md";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import Loading from "../../loading/Loading";
import WaringPop from "../PartingFrom/WaringPop";
import { Modal } from "reactstrap";
import SelectForm from "../SelectForm";
import { TbListDetails } from "react-icons/tb";
import { loadData } from "../../hooks/APIsFunctions/loadData";
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
  selectionRow,
  selection,
  setSelection,
  addSelectedList,
  refreshData,
  rowDetails,
  subSchemas,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [expandedRows, setExpandedRows] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [subSchema, setSubSchema] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [title, setTitle] = useState("");
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
      pageIndex: skip / take + 1,
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
    if (selection) {
      return (
        <Table.Row
          {...restProps}
          onClick={() => onRowClick(row)}
          className="!hover:bg-red bg"
          style={{
            cursor: "pointer",
            backgroundColor: restProps.selected
              ? "var(--main-color2)"
              : "white",
            position: "relative",
            zIndex: 1,
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
            style={{ cursor: "pointer", width: "100%" }}
          />
          {expandedRows.includes(row) && (
            //make this take the width of the row
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="p-3">
                  <SelectForm
                    row={row}
                    parentSchemaParameters={
                      schema?.dashboardFormSchemaParameters
                    }
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

  // e
  useEffect(() => {
    // Assuming schema[0].dashboardFormSchemaParameters is an array of parameters
    const dynamicColumns =
      schema?.dashboardFormSchemaParameters
        .filter((column) => !column.isIDField)
        ?.map((param) => ({
          name: param.parameterField,
          title: param.parameterTitel,
          type: param.parameterType,
          lookupID: param.lookupID,
          getCellValue: (row) => row[param.parameterField],
        })) || [];

    setColumns([
      ...dynamicColumns,
      { name: "switch", title: "switch", type: "text" },
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
  //e
  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: "START_LOADING", payload: { requestedSkip, take } });
  };
  //e

  useEffect(() =>
    loadData(state, dataSourceAPI, getAction, cache, updateRows, dispatch)
  );
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
        <button
          className="bg text-white px-2 py-1 rounded"
          onClick={handleClick}
        >
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
    if (props.column.type === "ItemsContainer") {
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
  return (
    <div className="card">
      <Grid
        // rows={initialRows}
        // columns={initialColumns}
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        i18nIsDynamicList={true}
        className="flex"
        style={{ position: "relative" }}
      >
        {/* <VirtualTableState
          loading={loading}
          totalRowCount={totalCount}
          pageSize={VIRTUAL_PAGE_SIZE}
          skip={skip}
          getRows={getRemoteRows}
        /> */}
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
    </div>
  );
}
export default BaseTable;
