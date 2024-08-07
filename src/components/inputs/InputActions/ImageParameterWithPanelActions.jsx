import React, { Component } from "react";
import UploadAction from "./UploadAction";
import ImageParameter from "../ImageParameter";
import BrowserUrlAction from "./BrowserUrlAction";
import WebcamActions from "./WebcamActins";
import DisplayFile from "../../forms/PartingFrom/DisplayFile";

class ImageParameterWithPanelActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FileData: "",
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
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
      <div>
        <ImageParameter {...this.props} value={FileData} actions={actions} />
      </div>
    );
  }
}

export default ImageParameterWithPanelActions;
