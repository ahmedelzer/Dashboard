import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import { Sm } from "./Sm";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";

function FormContainer({ tableSchema, row, errorResult, returnRow }) {
  const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
    (e) => e.isEnable
  ).parameterField;
  console.log(tableSchema, 12);
  //todo check if this we want const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
  //todo(e) => e.isEnable && Math.max(e.indexNumber)
  //todo).parameterField;
  const onChange = new Onchange(row);
  function SetValue(param) {
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
      <Container onBlur={() => returnRow(onChange.ReturnRow)}>
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
                  onChange={onChange.UpdateRow}
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
