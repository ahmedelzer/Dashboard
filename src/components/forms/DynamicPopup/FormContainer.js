import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import { Sm } from "./Sm";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";
import { PrepareInputValue } from "../../inputs/InputActions/PrepareInputValue";
function FormContainer({ tableSchema, row, errorResult, callback }) {
  const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
    (e) => e.isEnable
  ).parameterField;
  console.log(tableSchema, 12);
  //todo check if this we want const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
  //todo(e) => e.isEnable && Math.max(e.indexNumber)
  //todo).parameterField;
  //
  // Instantiate Onchange
  function SetValue(param) {
    if (param.lookupID) {
      return row;
    } else {
      return row[param.parameterField];
    }
  }

  const onChange = new Onchange(row);
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
                //onChange={onChange.UpdateRow}
                //onBlur={onChange.UpdateRow}
                data={param}
                //value={{}}
                //value={SetValue(param)}
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
