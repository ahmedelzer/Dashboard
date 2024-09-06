import React from "react";
import { LuUpload } from "react-icons/lu";
import BaseAction from "./BaseAction";
import { uploadActionStyle } from "./styles";
class UploadAction extends BaseAction {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { onChange, fieldName, enable } = this.props;
    const fetchImage = async (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        [...files].forEach((file) => {
          this.props.onImageUpload(URL.createObjectURL(file), file.type);
        });
      }
    };

    return (
      <label htmlFor={fieldName} className={uploadActionStyle.label}>
        {/* <Button className="pop"> */}
        <LuUpload className={uploadActionStyle.icon} size={24} />

        <input
          onChange={fetchImage}
          id={fieldName}
          enable={enable}
          name={fieldName}
          type="file"
          className={uploadActionStyle.hiddenInput}
          multiple={this.props.isFileContainer}
        />
        {/* </Button> */}
      </label>
    );
  }
}

export default UploadAction;
