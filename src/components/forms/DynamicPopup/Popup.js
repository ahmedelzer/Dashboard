import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import React, { useContext } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";
import FormContainer from "./FormContainer";
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
  const { localization } = useContext(LanguageContext);

  return (
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
      <form onSubmit={onApplyChanges} action="">
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
            {localization.popup.cancelButton}
          </Button>{" "}
          <Button type="submit" className="pop">
            {localization.popup.submitButton}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default Popup;
