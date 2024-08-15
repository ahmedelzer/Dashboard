import React, { useState } from "react";
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
import local from "../../../locals/EN/popup.json";
const Popup = ({
  open,
  row,
  onApplyChanges,
  onCancelChanges,
  tableSchema,
  errorResult,
  isNewRow,
  returnRow,
}) => {
  return (
    <form>
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
            errorResult={errorResult}
            returnRow={returnRow}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancelChanges} className="pop">
            {local.cancelButton}
          </Button>{" "}
          <Button type="submit" onClick={onApplyChanges} className="pop">
            {local.submitButton}
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default Popup;
