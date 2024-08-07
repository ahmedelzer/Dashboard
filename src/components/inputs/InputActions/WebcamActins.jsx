import React, { Component, createRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Webcam from "react-webcam";
import BaseAction from "./BaseAction";
import { FaCamera } from "react-icons/fa";

class WebcamActions extends BaseAction {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.webcamRef = createRef();
    this.handleCapture = this.handleCapture.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleCapture(e) {
    const { onChange } = this.props;
    const imageSrc = this.webcamRef.current.getScreenshot();
    this.props.onImageUpload(imageSrc);
    // Convert the captured image to base64
    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d");
    // const image = new Image();
    // image.src = imageSrc;
    // image.onload = () => {
    //   canvas.width = image.width;
    //   canvas.height = image.height;
    //   ctx.drawImage(image, 0, 0);
    //   const base64Data = canvas.toDataURL("image/jpeg");
    //   const [, base64String] = base64Data.split(";base64,");
    //   onChange(e, base64String);
    //   this.toggleModal();
    // };
  }

  toggleModal() {
    this.setState((prevState) => ({ modalOpen: !prevState.modalOpen }));
  }

  render() {
    const { modalOpen } = this.state;

    return (
      <div>
        <FaCamera onClick={this.toggleModal} className="color" size={24} />
        <Modal isOpen={modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Capture Image</ModalHeader>
          <ModalBody>
            <Webcam
              audio={false}
              ref={this.webcamRef}
              screenshotFormat="image/jpeg"
              style={{ width: "100%", height: "auto" }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="pop"
              onClick={this.handleCapture}
              name={this.props.fieldName}
            >
              Capture Image
            </Button>
            <Button color="pop" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default WebcamActions;
