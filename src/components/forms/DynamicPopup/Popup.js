import React from "react";
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
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";

const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
  tableSchema,
  errorResult,
  returnRowData,
  isNewRow,
}) => {
  const handleSubmit = (event) => {};

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Modal
        isOpen={open}
        onClose={(e) => onCancelChanges}
        aria-labelledby="form-dialog-title"
      >
        <ModalHeader id="form-dialog-title">
          {isNewRow
            ? tableSchema.dashboardFormSchemaInfoDTOView.addingHeader
            : tableSchema.dashboardFormSchemaInfoDTOView.editingHeader}
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              {tableSchema?.dashboardFormSchemaParameters?.map(
                (param, index) => (
                  <Col
                    sm={param.lookupID === null ? 6 : 12}
                    className="px-2"
                    key={index}
                  >
                    <DataCellRender
                      data={param}
                      editedRow={row}
                      value={row[param.parameterField]}
                      onChange={onChange}
                      dataError={errorResult} // Ensure datapost is defined
                    />
                  </Col>
                )
              )}
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancelChanges} className="pop">
            Cancel
          </Button>{" "}
          <Button onClick={onApplyChanges} className="pop">
            Done
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default Popup;
