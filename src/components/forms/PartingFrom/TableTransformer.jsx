import React, { useState } from "react";
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
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableSelection,
} from "@devexpress/dx-react-grid-bootstrap4";
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
const initialColumns = [
  { name: "id", title: "ID" },
  { name: "name", title: "Name" },
  { name: "age", title: "Age" },
  { name: "details", title: "DetailsAction" },
];

const initialRows = [
  { id: 0, name: "John Doe", age: 30 },
  { id: 1, name: "Jane Smith", age: 25, details: "aa" },
];
// Modal.setAppElement("#root");

const BaseTable = ({ rows, setRows, selection, setSelection }) => {
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
      className="bg-blue-500 text-white px-2 py-1 rounded"
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
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
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
  const [leftRows, setLeftRows] = useState(initialRows);
  const [rightRows, setRightRows] = useState([]);
  const [leftSelection, setLeftSelection] = useState([]);
  const [rightSelection, setRightSelection] = useState([]);

  const moveRows = (
    sourceRows,
    setSourceRows,
    destinationRows,
    setDestinationRows,
    selected
  ) => {
    const rowsToMove = sourceRows.filter((row) => selected.includes(row.id));
    const newSourceRows = sourceRows.filter(
      (row) => !selected.includes(row.id)
    );
    setSourceRows(newSourceRows);
    setDestinationRows([...destinationRows, ...rowsToMove]);
    setLeftSelection([]);
    setRightSelection([]);
  };

  return (
    <div className="flex justify-around items-start p-4">
      <div className="w-1/2 p-4 border rounded">
        <h3 className="text-center mb-4">Table 1</h3>
        <BaseTable
          rows={leftRows}
          setRows={setLeftRows}
          selection={leftSelection}
          setSelection={setLeftSelection}
        />
        <button
          onClick={() =>
            moveRows(
              leftRows,
              setLeftRows,
              rightRows,
              setRightRows,
              leftSelection
            )
          }
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full"
        >
          Move to Table 2
        </button>
      </div>
      <div className="w-1/2 p-4 border rounded">
        <h3 className="text-center mb-4">Table 2</h3>
        <BaseTable
          rows={rightRows}
          setRows={setRightRows}
          selection={rightSelection}
          setSelection={setRightSelection}
        />
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
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full"
        >
          Move to Table 1
        </button>
      </div>
    </div>
  );
};

export default TableTransformer;
