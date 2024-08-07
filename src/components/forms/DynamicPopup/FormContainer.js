import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import { Sm } from "./Sm";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";

function FormContainer({ tableSchema, row, errorResult }) {
  const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
    (e) => e.isEnable
  ).parameterField;
  console.log(tableSchema, 12);
  //todo check if this we want const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
  //todo(e) => e.isEnable && Math.max(e.indexNumber)
  //todo).parameterField;
  const onChange = new Onchange(row).UpdateRow;
  console.log("tableSchema", tableSchema);

  const [rowData, setRowData] = useState(row);

  const updateRowData = (e) => {
    const { key, value, type } = e?.target;
    setRowData((prevRowData) => ({
      ...prevRowData,
      [key]: value,
    }));
  };

  return (
    <div>
      {" "}
      <Container>
        <Row>
          {tableSchema?.dashboardFormSchemaParameters?.map((param) => (
            <Col sm={Sm(param)} className="px-2" key={param.parameterField}>
              <DataCellRender
                isActionField={
                  actionField === param.parameterField ? true : false
                }
                onChange={onChange}
                data={param}
                value={row[param.parameterField]}
                // row={row}
                errorResult={errorResult}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default FormContainer;
