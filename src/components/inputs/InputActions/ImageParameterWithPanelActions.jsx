import React from "react";
import defaultImage from "../../../assets/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
import BaseInput from "../BaseInput";
import ImageParameter from "../ImageParameter";
import BrowserUrlAction from "./BrowserUrlAction";
import UploadAction from "./UploadAction";
import WebcamActions from "./WebcamActins";
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
    this.setState({ FileData: this.props.addFile ? defaultImage : path });
    if (this.props.addFile) {
      this.props.addFile(path, type);
    }
  }
  handleDrop = (event) => {
    event.preventDefault();
    if (!this.props.allowDrop) {
      return;
    }
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
ImageParameterWithPanelActions.defaultProps = {
  allowDrop: true, // Initialize allowDrop to true by default
};
export default ImageParameterWithPanelActions;
