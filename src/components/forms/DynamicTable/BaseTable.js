import {
  createRowCache,
  DataTypeProvider,
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
import { Card, Modal, ModalBody } from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";
import { SetReoute } from "../../../request";
import { GetIconByName } from "../../../utils/GetIconByName";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import LoadData from "../../hooks/APIsFunctions/loadData";
import LocationMap from "../../inputs/LocationMap";
import DotsLoading from "../../loading/DotsLoading";
import Loading from "../../loading/Loading";
import firstColsFound from "../DynamicPopup/firstColsFound.json";
import WaringPop from "../PartingFrom/WaringPop";
import SelectForm from "../SelectForm";
import avoidColsTypes from "./avoidColsTypes.json";
import {
  customRowStyle,
  detailsButtonStyle,
  listObserverStyle,
} from "./styles";
import { TypeProvider } from "./TypeProvider";
import { Scrolling } from "devextreme-react/data-grid";
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
  selectedRow,
}) {
  function reducer(state, { type, payload }) {
    switch (type) {
      case "UPDATE_ROWS":
        return {
          ...state,
          rows: Array.from(
            new Map(
              [...state.rows, ...payload?.rows].map((item) => [
                item[schema.idField], //item[schema.idField]//menuItemID
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
  const [filters, setFilters] = useState([]);
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
  const CustomRow = ({ row, onRowClick, ...restProps }) => {
    // import("./selection.css");
    if (row.isLoading) {
      return (
        <Table.Row {...restProps}>
          <Table.Cell colSpan={columns.length + 1} className="text-center">
            <DotsLoading />
          </Table.Cell>
        </Table.Row>
      );
    }
    if (selection) {
      // import("./style.css");
      //todo the problem of why the bg color is do not edit because that .table > :not(caption) > * > * {
      //background-color: #fff !important;
      //}

      return (
        <Table.Row
          {...restProps}
          onClick={() => onRowClick(row)}
          className={`${customRowStyle.row} ${customRowStyle.selectedRow}`}
          // className="custom-row"
        >
          {/* <div className="!h-0 !w-0 absolute hover:!bg-[--main-color2] hover:!h-full hover:!w-full left-0 top-0" /> */}
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
    } else if (setSelectedRow) {
      return (
        <>
          <Table.Row
            {...restProps}
            onDoubleClick={() => rowDoubleClick(row)}
            className={`${customRowStyle.row} group transition-all duration-300`}
          >
            {React.Children.map(restProps.children, (child) =>
              React.cloneElement(child, {
                className: `${
                  child.props.className || ""
                } group-hover:!bg-accent transition-all duration-300 ${
                  selectedRow &&
                  row[schema.idField] === selectedRow[schema.idField]
                    ? "!bg-accent"
                    : ""
                }`,
              })
            )}
          </Table.Row>
          {expandedRows.includes(row) && (
            <tr className="w-full">
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
    } else {
      return (
        <>
          <Table.Row {...restProps} className={customRowStyle.tableRow} />
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
  //   if (selectedRow === null && state.rows.length > 0) {
  //     setSelectedRow(state.rows[0]);
  //   }
  // }, [state.rows, setSelectedRow]);
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
  const SwitchCell = ({ value }) => {
    async function onValueChange(newValue) {
      // const requst = await onApply(newValue);
    }
    return (
      <Switch
        value={value}
        onValueChanged={(e) => onValueChange(e.value)}
        style={{ direction: "ltr" }}
      />
    );
  };

  const DetailsCell = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
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
    } else if (
      props.column.name === "switchAction" ||
      props.column.type === "boolean"
    ) {
      return (
        <Table.Cell {...props}>
          <SwitchCell
            value={props.row.switchAction}
            // onValueChange={(newValue) => {
            //   console.log(newValue);
            // }}
          />
        </Table.Cell>
      );
    } else if (
      props.column.type === "areaMapLongitudePoint" ||
      props.column.type === "mapLongitudePoint"
    ) {
      const toggleModal = () => {
        setModalOpen(!modalOpen);
      };
      return (
        <Table.Cell {...props}>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalBody>
              <LocationMap
                // location={{
                //   latitude: 30,
                //   longitude: 22,
                //   // radius: +props.row.radius,
                // }}
                location={props.row}
                fields={schema?.dashboardFormSchemaParameters}
                clickable={false}
              />
            </ModalBody>
          </Modal>
          <button className={detailsButtonStyle.button} onClick={toggleModal}>
            {localization.table.areaColumnTitle}
          </button>
        </Table.Cell>
      );
    } else if (firstColsFound.includes(props.column.type)) {
      // TODO:here make the popup of rate

      return (
        <Table.Cell {...props}>
          <div className="flex items-center">
            <p className="m-0 text-md !mx-1 !p-0">
              {props.row[props.column.type]}
            </p>
            <div className="text-accent">
              {GetIconByName(props.column.type, 22)}
            </div>
          </div>
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
        console.log("====================================");
        console.log(rows.length, totalCount, schema.idField);
        console.log("====================================");
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
  let initialRows = [
    {
      rate: "9",
      likes: "10",
      postTitle: "Vision",
      switchAction: true,
    },
  ];
  console.log(filters);
  ///filter custom filters
  // Custom editor component for switch values in the grid
  const SwitchEditor = ({ onValueChange, value }) => {
    const handleChange = (value) => {
      // Update the value when the switch is toggled
      onValueChange(value);
    };

    return (
      <Switch
        value={value}
        onValueChanged={(e) => handleChange(e.value)}
        style={{ direction: "ltr" }}
      />
    );
  };
  // Custom editor component for currency values in the grid
  const DateEditor = ({ onValueChange, value }) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      // If the input is empty, set value to undefined
      if (targetValue.trim() === "") {
        onValueChange(undefined);
        return;
      }
      // Parse the input value as an integer and update
      onValueChange(parseInt(targetValue, 10));
    };

    return (
      <input
        type="number" // Input type set to number for currency entry
        className="form-control"
        placeholder="Filter..." // Placeholder text for the input field
        value={value} // Get the current value for the input
        min={0} // Minimum value allowed
        onChange={handleChange} // Handle value changes
      />
    );
  };

  // Custom formatter component for displaying currency values
  const DateFormatter = ({ value }) => (
    <i>
      {value.toLocaleString("en-US", { style: "currency", currency: "USD" })}{" "}
      {/* Format value as currency */}
    </i>
  );
  // DataTypeProvider for currency column, specifying formatter and editor
  const CurrencyTypeProvider = (props) => (
    <DataTypeProvider
      formatterComponent={DateFormatter} // Formatter for displaying currency
      editorComponent={DateEditor} // Editor for inputting currency values
      // availableFilterOperations={availableFilterOperations} // Operations for filtering
      {...props} // Spread any additional props
    />
  );
  // Custom formatter component for displaying switch values
  const SwitchFormatter = ({ value }) => (
    <span>{value ? "On" : "Off"}</span> // Display "On" or "Off" based on the boolean value
  );

  // DataTypeProvider for switch column, specifying formatter and editor
  const SwitchTypeProvider = (props) => (
    <DataTypeProvider
      formatterComponent={SwitchFormatter} // Formatter for displaying switch values
      editorComponent={SwitchEditor} // Editor for inputting switch values
      availableFilterOperations={[]}
      {...props} // Spread any additional props
    />
  );

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
