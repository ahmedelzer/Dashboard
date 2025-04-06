import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import React, { useContext, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";
import FormContainer from "./FormContainer";
import DotsLoading from "../../loading/DotsLoading";
import Loading from "../../loading/Loading";
import { LoadIndicator } from "devextreme-react";
import { IoCloseCircle } from "react-icons/io5";
const Popup = ({
  open,
  row,
  onApplyChanges,
  onCancelChanges,
  tableSchema,
  errorResult,
  isNewRow,
}) => {
  const { localization, Right } = useContext(LanguageContext);
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
      <ModalHeader id="form-dialog-title" className="relative">
        <span>
          {isNewRow
            ? tableSchema.dashboardFormSchemaInfoDTOView.addingHeader
            : tableSchema.dashboardFormSchemaInfoDTOView.editingHeader}
        </span>
        <div
          className={`flex justify-between items-center absolute top-5 ${
            Right ? "left-5" : "right-5"
          }`}
        >
          <IoCloseCircle
            size={30}
            className="cursor-pointer"
            onClick={onCancelChanges} // Close the modal on X click
          />
        </div>
      </ModalHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setDoneButtonText(
            <LoadIndicator width={"24px"} height={"24px"} visible={true} />
          );
          setDoneButtonDisable(true);
          await onApplyChanges(e);
          setDoneButtonText(localization.popup.submitButton);
          setDoneButtonDisable(false);
        }}
        action=""
      >
        <ModalBody>
          <FormContainer
            tableSchema={tableSchema}
            row={row}
            returnRow={() => {}}
            errorResult={errorResult}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onCancelChanges}
            className="pop"
            disabled={doneButtonDisable}
          >
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
