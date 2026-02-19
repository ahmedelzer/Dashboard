import React from "react";
import { Modal, ModalBody } from "reactstrap";

export default function MediaModel({
  renderFileContent,
  modalOpen,
  toggleModal,
}) {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
      <ModalBody>{renderFileContent("100%")}</ModalBody>
    </Modal>
  );
}
