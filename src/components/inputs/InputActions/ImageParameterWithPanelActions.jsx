import React, { Component } from "react";
import UploadAction from "./UploadAction";
import ImageParameter from "../ImageParameter";
import BrowserUrlAction from "./BrowserUrlAction";
import WebcamActions from "./WebcamActins";
import DisplayFile from "../../forms/PartingFrom/DisplayFile";
import FileParamter from "../FileParamter";
import FileParameter from "../FileParamter";
import BaseInput from "../BaseInput";

class ImageParameterWithPanelActions extends BaseInput {
  constructor(props) {
    super(props);
    this.state = {
      FileData: this.props.value,
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  handleImageUpload(path, type) {
    this.setState({ FileData: path });
    // if (this.props.isFileContainer) {
    //   this.props.addFile(path, type);
    //   // console.log(path);
    // }
  }
  handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      this.handleImageUpload(URL.createObjectURL(files[0]));
    }
  };

  handleDragOver = (event) => {
    event.preventDefault();
  };

  render() {
    const { FileData } = this.state;
    const { isFileContainer = false } = this.props;
    let actions = [
      <UploadAction
        fieldName={this.props.fieldName}
        isFileContainer={isFileContainer}
        onImageUpload={this.handleImageUpload}
      />,
      <WebcamActions onImageUpload={this.handleImageUpload} />,
      <BrowserUrlAction
        {...this.props}
        onImageUpload={this.handleImageUpload}
      />,
    ];
    return (
      <>
        {/* {isFileContainer ? (
          <FileParameter {...this.props} value={FileData} actions={actions} />
        ) : ( */}
        <div onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
          <ImageParameter {...this.props} value={FileData} actions={actions} />
        </div>
        {/* )} */}
      </>
    );
  }
}

export default ImageParameterWithPanelActions;
