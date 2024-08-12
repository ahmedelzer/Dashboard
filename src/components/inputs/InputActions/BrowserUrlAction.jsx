import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import BaseAction from "./BaseAction";
import { FaLink } from "react-icons/fa";
import inputs from "../../../locals/EN/inputs.json";

class BrowserUrlAction extends BaseAction {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      imageUrl: "",
      modalOpen: false,
    };
    this.Change = this.Change.bind(this);
    this.fetchImage = this.fetchImage.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  Change(event) {
    const imageUrl = event.target.value;
    let error = false;

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch (_) {
      error = "Invalid URL format";
    }

    this.setState({ imageUrl, error });
  }

  async fetchImage(e) {
    const { imageUrl } = this.state;
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.startsWith("image")) {
          const blob = await response.blob();
          this.props.onImageUpload(URL.createObjectURL(blob));
          this.toggleModal();
        } else {
          this.setState({ error: "URL does not point to an image" });
        }
      } else {
        this.setState({ error: `Failed to fetch image: ${response.status}` });
      }
    } catch (error) {
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
              onChange={this.Change}
              className={`form-control ${error ? "is-invalid" : ""}`}
              // value={imageUrl}
            />
            {error && (
              <div className="invalid-feedback">
                {typeof error === "string"
                  ? error
                  : "URL is invalid or not pointing to an image."}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={this.fetchImage}
              className="pop mt-2 text-center"
              name={this.props.fieldName}
              disabled={!!error || !imageUrl}
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
