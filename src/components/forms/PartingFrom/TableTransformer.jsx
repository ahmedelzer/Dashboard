import React, { useContext, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  Grid,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableSelection,
  // Table,
} from "@devexpress/dx-react-grid-bootstrap4";
import Table from "../DynamicTable/Table";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import "tailwindcss/tailwind.css";
import {
  EditingState,
  IntegratedPaging,
  IntegratedSelection,
  PagingState,
  SelectionState,
} from "@devexpress/dx-react-grid";
import WaringPop from "./WaringPop";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { LanguageContext } from "../../../contexts/Language";
import PopupEditing from "../DynamicPopup/PopupEditing";
import Popup from "../DynamicPopup/Popup";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";
const initialColumns = [
  { name: "id", title: "ID" },
  { name: "name", title: "Name" },
  // { name: "age", title: "Age" },
  { name: "details", title: "DetailsAction" },
];

const initialRows = [
  { id: 0, name: "John Doe", age: 30 },
  { id: 1, name: "Jane Smith", age: 25, details: "aa" },
];

const InTable = ({ rows, setRows, selection, setSelection }) => {
  const [columns] = useState(initialColumns);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const getRowId = (row) => row.id;

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows = [...rows];

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
      console.log("====================================");
      console.log("deleted", deletedSet, deleted);
      console.log("====================================");
      if (deletedSet.size > 0) {
        const rowToDelete = rows.find((row) => deletedSet.has(row.id));
        handleDelete(rowToDelete);
      } else {
        changedRows = rows.filter((row) => !deletedSet.has(row.id));
        setRows(changedRows);
      }
    }
    setRows(changedRows);
  };
  const handleDelete = (row) => {
    setRowToDelete(row);
    setModalIsOpen(true);
  };

  const confirmDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete.id));
    setModalIsOpen(false);
    setRowToDelete(null);
  };
  const DetailsButton = ({ row }) => (
    <button
      className="bg text-white px-2 py-1 rounded"
      onClick={() => alert(`Details of ${row.name}`)}
    >
      Details
    </button>
  );

  const DetailsCell = (props) => {
    if (props.column.name === "details") {
      return (
        <Table.Cell {...props}>
          <DetailsButton row={props.row} />
        </Table.Cell>
      );
    }
    return <Table.Cell {...props} />;
  };
  return (
    <div>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <IntegratedPaging />
        <EditingState onCommitChanges={commitChanges} />
        <SelectionState selection={[]} onSelectionChange={[]} />
        <IntegratedSelection />
        <Table cellComponent={DetailsCell} />
        <TableHeaderRow />
        <TableSelection showSelectAll />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showDeleteCommand
          messages={{
            addCommand: <MdAdd />,
            editCommand: <MdEdit />,
            deleteCommand: <MdDelete />,
          }}
        />
        <PagingPanel />
      </Grid>

      <WaringPop
        confirmDelete={confirmDelete}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

const TableTransformer = () => {
  const [state, setState] = useState([]);
  const { data: leftSchema } = useFetch(
    "/Dashboard/GetDashboardForm?DashboardMenuItemID=69a840d3-1170-4297-a6f0-baffae16a94f"
  );
  const { data: rightSchema } = useFetch(
    "/Dashboard/GetDashboardForm?DashboardMenuItemID=8d89b8d0-1eed-42d4-a50f-ac504962e4bc"
  );
  const handleCombinedChange = async (event) => {};
  const onApplyChanges = async () => {
    const action = postAction;
    //const dataEditerow = ;
    const body = editedRow;
    console.log("body", body);
    const res = await APIHandling(
      action.routeAdderss,
      action.dashboardFormActionMethodType,
      body
    );
    handleSelection();
    setResult(res);

    if (res.success) {
      const newRow = { ...res.data, ...editedRow };
      if (isNew) {
        state.rows = [...state.rows, newRow];
        cancelAddedRows({ rowIds });
      } else {
        const updatedRows = state.rows.map((row) => {
          if (row[iDField] === editedRow[iDField]) {
            return newRow; // Replace the existing row with the updated newRow
          }
          return row;
        });

        // Update the state with the updated rows
        state.rows = updatedRows;

        rowIds = [rowId];
        stopEditRows({ rowIds });
        cancelChangedRows({ rowIds });
      }
    }
  };
  const cancelChanges = () => {
    if (isNew) {
      cancelAddedRows({ rowIds });
    } else {
      rowIds = [rowId];

      stopEditRows({ rowIds });
      cancelChangedRows({ rowIds });
    }
  };
  const PopupComponent = ({ open, editedRow }) => {
    return (
      <Popup
        open={open}
        row={editedRow}
        img={null}
        onChange={handleCombinedChange}
        onApplyChanges={onApplyChanges}
        onCancelChanges={cancelChanges}
        tableSchema={schema}
        errorResult={result}
        rows={state.rows}
        isNewRow={true}
        returnRowData={row}
        isSelectionRow={true}
      />
    );
  };
  const { setLeftSelectionContext, leftSelectionContext } =
    useContext(LanguageContext);
  // const table = data[0];
  console.log("====================================");
  console.log("leftSelectionContext", leftSelectionContext);
  console.log("====================================");
  const [leftRows, setLeftRows] = useState(initialRows);
  const [rightRows, setRightRows] = useState([]);
  const [leftSelection, setLeftSelection] = useState([]);
  const [rightSelection, setRightSelection] = useState([]);

  const moveRows = (selection, setSelectionContext, setSelection) => {
    setSelectionContext(selection);
    setSelection([]);
  };

  return (
    <div className="flex justify-around p-4 space-x-4 items-start">
      <div className="w-[calc(50%-50px)] p-4 border rounded">
        {/* <InTable
          rows={leftRows}
          setRows={setLeftRows}
          selection={leftSelection}
          setSelection={setLeftSelection}
        /> */}

        {rightSchema &&
          rightSchema.map((schema) => (
            <Table
              key={schema?.idField}
              schema={schema}
              selectionRow={true}
              isSearchingTable={false}
              deleteMessage={false}
              addMessage={true}
              editMessage={false}
              selection={leftSelection}
              setSelection={setLeftSelection}
            />
          ))}
        {/* <BaseTable
          // key={schema?.idField}
          // schema={schema}
          selectionRow={true}
          isSearchingTable={false}
          deleteMessage={false}
          addMessage={false}
          editMessage={false}
          selection={leftSelection}
          setSelection={setLeftSelection}
        /> */}
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 w-[100px]">
        <button
          onClick={() =>
            moveRows(leftSelection, setLeftSelectionContext, setLeftSelection)
          }
          className="px-4 py-2 bg text-white rounded-full"
        >
          <FaArrowAltCircleRight size={22} />
        </button>
        <button
          onClick={() =>
            moveRows(
              rightRows,
              setRightRows,
              leftRows,
              setLeftRows,
              rightSelection
            )
          }
          className="px-4 py-2 bg text-white rounded-full"
        >
          <FaArrowAltCircleLeft size={22} />
        </button>
      </div>
      <div className="w-[calc(50%-50px)] p-4 border rounded">
        {/* <h3 className="text-center mb-4">Table 2</h3> */}
        {/* <BaseTable2
          rows={rightRows}
          setRows={setRightRows}
          selection={rightSelection}
          setSelection={setRightSelection}
        /> */}
        {rightSchema &&
          rightSchema.map((schema) => (
            <Table
              key={schema?.idField}
              schema={schema}
              isSearchingTable={false}
              deleteMessage={false}
              addMessage={true}
              editMessage={false}
              addSelectedList={true}
            />
          ))}
      </div>
    </div>
  );
};
export default TableTransformer;
