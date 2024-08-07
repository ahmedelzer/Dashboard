import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import BaseAction from "./BaseAction";
import { FaLink } from "react-icons/fa";
import inputs from "../../../locals/EN/inputs.json";
class BrowserUrlAction extends BaseAction {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      base64: "",
      error: false,
      imageUrl: "",
      modalOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchImage = this.fetchImage.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleChange(event) {
    this.setState({ imageUrl: event.target.value }, () => {
      console.log("Updated imageUrl:", this.state.imageUrl);
    });
  }

  async fetchImage(e) {
    const { onChange, fieldName, enable } = this.props;
    const { imageUrl } = this.state;
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.startsWith("image")) {
          const blob = await response.blob();
          this.props.onImageUpload(URL.createObjectURL(blob));
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            const base64Data = reader.result;
            const [, base64String] = base64Data.split(";base64,");
            onChange(e, base64String);
            this.setState({ img: blob, base64: base64String, error: false });
            console.log(this.state);
            this.toggleModal();
          };
        } else {
          this.setState({ error: "URL does not point to an image" });
          console.error("URL does not point to an image");
        }
      } else {
        console.error("Failed to fetch image:", response.status);
        this.setState({ error: `Failed to fetch image: ${response.status}` });
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      this.setState({ error: "Error fetching image" });
    }
  }

  toggleModal() {
    this.setState((prevState) => ({ modalOpen: !prevState.modalOpen }));
  }

  render() {
    const { modalOpen, imageUrl, error } = this.state;

    return (
      <div>
        <FaLink onClick={this.toggleModal} className="color" size={24} />
        <Modal isOpen={modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Fetch Image from URL
          </ModalHeader>
          <ModalBody>
            <input
              type="text"
              placeholder={inputs.image.UrlPlaceholder}
              // value={imageUrl}
              // onChange={() => console.log(133)}
              onChange={this.handleChange}
              className="form-control"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={this.fetchImage}
              className="pop mt-2 text-center"
              name={this.props.fieldName}
            >
              Fetch Image
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

export default BrowserUrlAction;
