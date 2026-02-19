import React, { useContext, useEffect } from "react";
import DotsLoading from "../../loading/DotsLoading";
import SelectForm from "../SelectForm";
import { customRowStyle } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
import { Table } from "@devexpress/dx-react-grid-bootstrap4";

export default function CustomRow({
  row,
  onRowClick,
  rowDoubleClick,
  schema,
  selection,
  selectedRow,
  expandedRows,
  setExpandedRows,
  includeSchemas,
  subSchema,
  fieldName,
  title,
  isExpandedRow,
  columns,
  isSelectedRow,
  ...restProps
}) {
  const { localization } = useContext(LanguageContext);
  console.log(
    "expandedRows",
    row,
    expandedRows.includes(row),
    isExpandedRow,
    expandedRows,
  );
  const isRowSelected =
    selectedRow && row[schema.idField] === selectedRow[schema.idField];

  if (row.isLoading) {
    return (
      <Table.Row {...restProps}>
        <Table.Cell colSpan={columns.length + 1} className="text-center">
          <DotsLoading />
        </Table.Cell>
      </Table.Row>
    );
  }
  const expandedElement = expandedRows.includes(row) ? (
    <Table.Row>
      <Table.Cell colSpan={columns.length + 1}>
        <div className={customRowStyle.expandedRow}>
          <SelectForm
            row={row}
            parentSchemaParameters={schema?.dashboardFormSchemaParameters}
            includeSchemas={includeSchemas}
            schema={subSchema}
            fieldName={fieldName}
            title={title}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  ) : null;

  if (selection) {
    return (
      <Table.Row
        {...restProps}
        onClick={() => onRowClick(row)}
        className={`${customRowStyle.row} ${customRowStyle.selectedRow}`}
      >
        {React.Children.map(restProps.children, (child) =>
          React.cloneElement(child, {
            style: {
              ...child.props.style,
              backgroundColor: `${
                restProps.selected ? "var(--main-color2)" : "white"
              }`,
            },
          }),
        )}
      </Table.Row>
    );
  } else if (isExpandedRow) {
    const rowElement = (
      <Table.Row {...restProps}>
        {React.Children.map(restProps.children, (child) =>
          React.cloneElement(child, {}),
        )}
      </Table.Row>
    );
    return (
      <>
        {rowElement}
        {expandedElement}
      </>
    );
  } else if (isSelectedRow) {
    const rowElement = (
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
              isRowSelected ? "!bg-accent" : ""
            }`,
          }),
        )}
      </Table.Row>
    );
    return <>{rowElement}</>;
  } else {
    return (
      // <>
      <Table.Row {...restProps} className={customRowStyle.tableRow} />
    );
  }
}
