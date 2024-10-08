import React, { useContext } from "react";
import { Modal } from "reactstrap";
import { stylesWaringPop } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
function WaringPop({ modalIsOpen, setModalIsOpen, confirmDelete }) {
  const { localization } = useContext(LanguageContext);

  return (
    <Modal
      isOpen={modalIsOpen}
      aria-labelledby="form-dialog-title"
      onRequestClose={() => setModalIsOpen(false)}
    >
      <div className={stylesWaringPop.modalContainer}>
        <div className={stylesWaringPop.closeButtonContainer}>
          <button
            type="button"
            onClick={() => setModalIsOpen(false)}
            className={stylesWaringPop.closeButton}
          >
            <svg
              className={stylesWaringPop.icon}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className={stylesWaringPop.contentContainer}>
          <svg
            className={stylesWaringPop.warningIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h4 className={stylesWaringPop.messageText}>
            {localization.waringPop.deleteConfirmation}
          </h4>
          <button
            onClick={confirmDelete}
            className={stylesWaringPop.confirmButton}
          >
            {localization.waringPop.yes}
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className={stylesWaringPop.cancelButton}
          >
            {localization.waringPop.no}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default WaringPop;
