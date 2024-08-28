import React from "react";
import BaseInput from "../BaseInput";
import { DateBox } from "devextreme-react";
import BaseAction from "./BaseAction";
import { Button } from "reactstrap";
import { LuUpload } from "react-icons/lu";
import { IoIosCloudUpload } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
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
      <label htmlFor={fieldName} className="cursor-pointer !m-0 !p-0">
        {/* <Button className="pop"> */}
        <LuUpload className="color" size={24} />

        <input
          onChange={fetchImage}
          id={fieldName}
          enable={enable}
          name={fieldName}
          type="file"
          className="hidden"
          multiple={this.props.isFileContainer}
        />
        {/* </Button> */}
      </label>
    );
  }
}

export default UploadAction;
