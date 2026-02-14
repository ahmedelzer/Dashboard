import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
} from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";

export default function ProgressFilesLoading({
  modalOpen,
  uploadedFiles,
  totalFiles,
}) {
  const { localization, Right } = useContext(LanguageContext);

  const [showModal, setShowModal] = useState(false);
  const progressPercentage =
    totalFiles > 0 ? Math.round((uploadedFiles / totalFiles) * 100) : 0;
  const [showProgressIcon, setShowProgressIcon] = useState(false); // Show icon once modal closes
  useEffect(() => {
    if (modalOpen && uploadedFiles !== totalFiles) {
      setShowModal(true);
    } else {
      setShowProgressIcon(false);
    }
  }, [modalOpen, totalFiles, uploadedFiles]); // Dependencies are modalOpen, uploadedFiles, and totalFiles

  // Handle modal close and show progress icon
  const closeModalAndShowProgress = () => {
    setShowModal(false);
    if (uploadedFiles !== totalFiles) {
      setShowProgressIcon(true); // Show the progress icon after closing the modal
    } else {
      setShowProgressIcon(false);
    }
  };

  return (
    <div>
      {/* Modal */}
      <Modal isOpen={showModal} size="lg" toggle={() => setShowModal(false)}>
        <ModalHeader>{localization.filesLoading.header}</ModalHeader>
        <ModalBody>
          <div className="progress-container">
            <div className="progress-info">
              {uploadedFiles}/{totalFiles}{" "}
              {localization.filesLoading.itemsUploaded}
            </div>
            {/* Progress bar */}
            <Progress value={progressPercentage} color="success">
              {progressPercentage}%
            </Progress>
          </div>
          <p className="text-sm mt-2">{localization.filesLoading.note}</p>
        </ModalBody>
        <ModalFooter>
          <Button className="pop" onClick={closeModalAndShowProgress}>
            {localization.filesLoading.ok}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Progress Icon with Circular Border (Visible when the modal is closed) */}
      {showProgressIcon && (
        <div
          className={`${
            Right ? "left-14" : "right-2"
          } fixed bottom-2  transform -translate-x-1/2 z-50 text-center`}
        >
          {/* Circular Progress */}
          <div
            className="relative w-16 h-16 rounded-full"
            style={{
              background: `conic-gradient(green ${
                progressPercentage * 3.6
              }deg, #ededed 0deg)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-md font-semibold text-[--main-color2]">
              {progressPercentage}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
