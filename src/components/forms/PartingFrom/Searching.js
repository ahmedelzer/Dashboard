import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
function Searching({ open, SearchForm }) {
  return (
    <Modal isOpen={open} aria-labelledby="form-dialog-title">
      <ModalBody>{SearchForm}</ModalBody>
    </Modal>
  );
}

export default Searching;
