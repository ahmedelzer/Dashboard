import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";

function TypeFile({ file, title, type = false }) {
  const { localization } = useContext(LanguageContext);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);
  let fileUrl = type ? file : URL.createObjectURL(file);
  const typeFile = type ? type : file.type;
  function toggleModal() {
    setModalOpen(!modalOpen);
  }
  useEffect(() => {
    if (videoRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVideoLoaded(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(videoRef.current);

      return () => observer.disconnect();
    }
  }, [videoRef]);
  const renderFileContent = () => {
    switch (true) {
      case typeFile.startsWith("image"):
        return (
          <img
            src={fileUrl}
            alt={title}
            className="w-full h-auto"
            loading="lazy"
          />
        );
      case typeFile.startsWith("video"):
        return (
          <video
            ref={videoRef}
            controls
            className="w-full h-auto"
            autoPlay={isVideoLoaded}
          >
            <source src={fileUrl} type={typeFile} />
            {localization.fileContainer.videoNotSupport}
          </video>
        );
      default:
        return <div>{localization.fileContainer.fileNotSupport}</div>;
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setModalOpen(true)}>
        {renderFileContent()}
      </button>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalBody>{renderFileContent()}</ModalBody>
      </Modal>
    </div>
  );
}

export default TypeFile;
