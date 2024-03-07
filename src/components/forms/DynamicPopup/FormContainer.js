import React from "react";
import { Container, Row, Col } from "reactstrap";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import { Sm } from "./Sm";
function FormContainer({ tableSchema, row, onChange, errorResult, img }) {
  return (
    <div>
      {" "}
      <Container>
        <Row>
          {tableSchema?.dashboardFormSchemaParameters?.map((param, index) => (
            <Col sm={Sm(param)} className="px-2" key={index}>
              <DataCellRender
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
