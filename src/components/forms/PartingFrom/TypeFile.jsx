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
  const [fileSrc, setFileSrc] = useState(null);

  useEffect(() => {
    //todo:here if publicImage do not make fetch and set http://41.196.0.25:5004/value to get the image
    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.blob();
      })
      .then((blob) => {
        const imgURL = URL.createObjectURL(blob);
        setFileSrc(imgURL); // Set the dynamic image source
      })
      .catch((error) => console.error("Error fetching the image:", error));
  }, [fileUrl]);
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
            src={fileSrc}
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
            <source src={fileSrc} type={typeFile} />
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
