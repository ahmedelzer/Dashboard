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
import { Sm } from "./Sm";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import FormContainer from "./FormContainer";

const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
  tableSchema,
  errorResult,
  isNewRow,
  callback,
}) => {
  const handleSubmit = (event) => {};

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Modal
        isOpen={open}
        onClose={() => (open = false)}
        aria-labelledby="form-dialog-title"
      >
        <ModalHeader id="form-dialog-title">
          {isNewRow
            ? tableSchema.dashboardFormSchemaInfoDTOView.addingHeader
            : tableSchema.dashboardFormSchemaInfoDTOView.editingHeader}
        </ModalHeader>
        <ModalBody>
          <FormContainer
            tableSchema={tableSchema}
            row={row}
            callback={callback}
            onChange={onChange}
            errorResult={errorResult}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => (open = false)} className="pop">
            Cancel
          </Button>{" "}
          <Button type="submit" onClick={onApplyChanges} className="pop">
            Done
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default Popup;
