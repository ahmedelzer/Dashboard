import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import React, { useContext, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";
import FormContainer from "./FormContainer";
import DotsLoading from "../../loading/DotsLoading";
import Loading from "../../loading/Loading";
import { LoadIndicator } from "devextreme-react";
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
  const [doneButtonText, setDoneButtonText] = useState(
    localization.popup.submitButton
  );
  const [doneButtonDisable, setDoneButtonDisable] = useState(false);

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDoneButtonText(
            <LoadIndicator width={"24px"} height={"24px"} visible={true} />
          );
          setDoneButtonDisable(true);
          onApplyChanges(e);
          setDoneButtonText(localization.popup.submitButton);
          setDoneButtonDisable(false);
        }}
        action=""
      >
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
          <Button type="submit" className="pop" disabled={doneButtonDisable}>
            {doneButtonText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default Popup;
