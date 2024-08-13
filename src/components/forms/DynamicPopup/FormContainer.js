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
  //
  useEffect(() => {
    console.log("====================================");
    console.log(row);
    console.log("====================================");
  }, [row]);
  // Instantiate Onchange
  const onChange = new Onchange(row).UpdateRow;
  function SetValue(param) {
    row = { ...onChange };
    if (param.lookupID) {
      return row;
    } else {
      return row[param.parameterField];
    }
  }
  //useEffect
  return (
    <div>
      {" "}
      <Container>
        <Row>
          {tableSchema?.dashboardFormSchemaParameters
            ?.filter((column) => !column.isIDField)
            .map((param) => (
              <Col sm={Sm(param)} className="px-2" key={param.parameterField}>
                <DataCellRender
                  isActionField={
                    actionField === param.parameterField ? true : false
                  }
                  data={param}
                  value={SetValue(param)}
                  onChange={onChange}
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
