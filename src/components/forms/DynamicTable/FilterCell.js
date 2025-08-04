import React, { useRef } from "react";
import { TableFilterRow } from "@devexpress/dx-react-grid-bootstrap4";
import { Input } from "reactstrap";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";

export const FilterCell = ({
  schema,
  column,
  filter,
  onFilter,
  ...restProps
}) => {
  const selectedCol = schema.dashboardFormSchemaParameters.find(
    (col) => col.parameterField === column.name
  );

  const lastFilterValueRef = useRef(null);

  if (!column?.isFilterOperation) {
    return <td />;
  }

  // IMAGE FIELDS (usually not filterable)
  if (column.type === "image" || column.type === "publicImage") {
    return (
      <TableFilterRow.Cell {...restProps}>
        <span className="text-muted">N/A</span>
      </TableFilterRow.Cell>
    );
  }

  // DATE, DATETIME, LOOKUP FIELDS
  // if (
  //   column.type === "datetime" ||
  //   column.type === "date"
  //   // column.type.toLowerCase().includes("lookup")
  // ) {
  //   const handleChange = (selectedValue) => {
  //     const newValue =
  //       selectedValue?.value ?? selectedValue?.target?.value ?? "";

  //     // Prevent unnecessary updates
  //     if (lastFilterValueRef.current === newValue) return;

  //     lastFilterValueRef.current = newValue;
  //     onFilter(newValue !== "" ? { value: newValue } : null);
  //   };

  //   return (
  //     <TableFilterRow.Cell {...restProps} className="mb-0">
  //       <div className="m-0 p-0 h-[38px] flex items-center w-full">
  //         <DataCellRender
  //           isActionField={false}
  //           data={selectedCol}
  //           value={filter?.value || ""}
  //           onChange={handleChange}
  //           externalRow={() => {}}
  //           errorResult={{}}
  //           displayLabel={false}
  //           activeIndexInput={null}
  //           formSchemaParameters={schema.dashboardFormSchemaParameters}
  //         />
  //       </div>
  //     </TableFilterRow.Cell>
  //   );
  // }

  // DEFAULT
  return <TableFilterRow.Cell {...restProps} />;
};
