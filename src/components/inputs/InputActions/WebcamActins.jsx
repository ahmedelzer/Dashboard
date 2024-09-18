import React, { createRef } from "react";
import { FaCamera } from "react-icons/fa";
import Webcam from "react-webcam";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import localization from "../../../locals/EN/imageActions/webcam.json";
import BaseAction from "./BaseAction";
import { LanguageContext } from "../../../contexts/Language";
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
    this.props.onImageUpload(imageSrc, "image");
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
    const { localization } = this.context;
    return (
      <div>
        <FaCamera onClick={this.toggleModal} className="color" size={24} />
        <Modal isOpen={modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            {localization.webcam.modal.header}
          </ModalHeader>
          <ModalBody>
            <Webcam
              audio={false}
              ref={this.webcamRef}
              screenshotFormat="image/jpeg"
            />
          </ModalBody>
          <ModalFooter>
            <Button className="pop" onClick={this.toggleModal}>
              {localization.webcam.modal.button.cancel}
            </Button>
            <Button
              className="pop"
              onClick={this.handleCapture}
              name={this.props.fieldName}
            >
              {localization.webcam.modal.button.capture}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
WebcamActions.contextType = LanguageContext;
export default WebcamActions;
