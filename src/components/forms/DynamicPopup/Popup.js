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
  img,
  isNewRow,
  isSelectionRow,
}) => {
  const handleSubmit = (event) => {};
  console.log(tableSchema);

  console.log("dataError", errorResult);
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
          <FormContainer
            tableSchema={tableSchema}
            isSelectionRow={isSelectionRow}
            row={row}
            onChange={onChange}
            errorResult={errorResult}
            img={img}
            onApplyChanges={onApplyChanges}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancelChanges} className="pop">
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
