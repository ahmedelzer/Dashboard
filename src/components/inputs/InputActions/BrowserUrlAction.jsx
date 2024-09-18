import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import BaseAction from "./BaseAction";
import { FaLink } from "react-icons/fa";
import input from "../../../locals/EN/inputs.json";
// import localization from "../../../locals/EN/imageActions/browser.json";
import { LanguageContext } from "../../../contexts/Language";

import { browserActionsStyle } from "./styles";

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
    const { localization } = this.context;

    const imageUrl = event.target.value;
    let error = false;

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch (_) {
      error = localization.browser.error.invalidUrl;
    }

    this.setState({ imageUrl, error });
  }

  async fetchImage(e) {
    const { localization } = this.context;

    const { imageUrl } = this.state;
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.startsWith("image")) {
          const blob = await response.blob();
          this.props.onImageUpload(URL.createObjectURL(blob), blob.type);
          this.toggleModal();
        } else {
          this.setState({ error: localization.browser.error.notImage });
        }
      } else {
        this.setState({
          error: localization.browser.error.fetchFailed.replace(
            "{status}",
            response.status
          ),
        });
      }
    } catch (error) {
      this.setState({ error: localization.browser.error.fetchError });
    }
  }

  toggleModal() {
    this.setState((prevState) => ({ modalOpen: !prevState.modalOpen }));
  }

  render() {
    const { modalOpen, imageUrl, error } = this.state;
    const { localization } = this.context;

    return (
      <div>
        <FaLink
          onClick={this.toggleModal}
          className={browserActionsStyle.icon}
          size={24}
        />
        <Modal isOpen={modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            {localization.browser.modal.header}
          </ModalHeader>
          <ModalBody>
            <input
              type="text"
              placeholder={input.image.placeholder}
              onChange={this.Change}
              className={`${browserActionsStyle.formControl} ${
                error ? browserActionsStyle.isInvalid : ""
              }`}
            />
            {error && (
              <div className={browserActionsStyle.invalidFeedback}>{error}</div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className={browserActionsStyle.modalButton}
              onClick={this.toggleModal}
            >
              {localization.browser.modal.button.cancel}
            </Button>
            <Button
              onClick={this.fetchImage}
              className={browserActionsStyle.modalFooterButton}
              name={this.props.fieldName}
              disabled={!!error || !imageUrl}
            >
              {localization.browser.modal.button.fetch}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
BrowserUrlAction.contextType = LanguageContext;

export default BrowserUrlAction;
