import React from "react";
import { Container, Row, Col } from "reactstrap";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import { Sm } from "./Sm";
function FormContainer({ tableSchema, row, onChange, errorResult, img }) {
  const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
    (e) => e.isEnable && e.indexNumber
  ).parameterField;
  console.log(tableSchema, 12);
  //todo check if this we want const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
  //todo(e) => e.isEnable && Math.max(e.indexNumber)
  //todo).parameterField;
  console.log("actionField", actionField);
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
                data={param}
                editedRow={row}
                img={img}
                value={row[param.parameterField]}
                onChange={onChange}
                dataError={errorResult} // Ensure datapost is defined
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default FormContainer;
