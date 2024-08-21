import React, { Component } from "react";
import UploadAction from "./UploadAction";
import ImageParameter from "../ImageParameter";
import BrowserUrlAction from "./BrowserUrlAction";
import WebcamActions from "./WebcamActins";
import DisplayFile from "../../forms/PartingFrom/DisplayFile";
import FileInput from "../../forms/PartingFrom/FileInput";
import convertImageToBase64 from "./ConvertImageToBase64";

class FileInputWithPanelActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FileData: "",
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  handleImageUpload(path) {
    this.setState({ FileData: path });
  }

  render() {
    const { FileData } = this.state;
    let actions = [
      <UploadAction onImageUpload={this.handleImageUpload} />,
      <WebcamActions onImageUpload={this.handleImageUpload} />,
      <BrowserUrlAction
        {...this.props}
        onImageUpload={this.handleImageUpload}
      />,
    ];

    return (
      // <div onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
      // {/* <ImageParameter {...this.props} value={FileData} actions={actions} /> */}
      <FileInput {...this.props} value={FileData} actions={actions} />
      // </div>
    );
  }
}

export default FileInputWithPanelActions;
