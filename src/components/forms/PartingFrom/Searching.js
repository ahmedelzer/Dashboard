import React from "react";
// import { ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
import { Modal, ModalBody } from "reactstrap";
function Searching({ open, SearchForm }) {
  return (
    <div className=" w-full h-full">
      <Modal
        size="xl"
        isOpen={open}
        fullscreen="xl"
        aria-labelledby="example-modal-sizes-title-lg"
        // aria-labelledby="form-dialog-title"
        className="w-full h-full"
        style={{ width: "111%", height: "100%" }}
      >
        <ModalBody>{SearchForm}</ModalBody>
      </Modal>
    </div>
  );
}

export default Searching;
