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

  handleChange(event) {
    // Handle the change event
    console.log("Date changed", event.target.value);
  }

  render() {
    let { value } = this.props;
    let base64 = "",
      File = "",
      errorFile = false;
    const fetchImage = async (e) => {
      const file = e.target.files[0];
      this.props.onImageUpload(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64Data = reader.result;
        const [, base64String] = base64Data.split(";base64,");
      };
      console.log(file);
    };
    //return button
    //take from this button the value of file and make for it
    return (
      <div>
        {/* <div>
          {value ? (
            <img
              src={URL.createObjectURL(imgFile)}
              className="cursor-pointer mb-2"
              alt=""
            />
          ) : null}
          <div>
            <input
              {...this.props}
              type="file"
              // onChange={handleImageChange}
              onChange={(e) => fetchImage(e)}
              accept="image/*"
              className={`form-control`}
            />
          </div>
        </div> */}
        <label htmlFor="Logo" className="cursor-pointer">
          {/* <Button className="pop"> */}
          <LuUpload className="color" size={24} />

          <input
            onChange={fetchImage}
            id="Logo"
            name="Logo"
            type="file"
            className="hidden"
          />
          {/* </Button> */}
        </label>
      </div>
    );
  }
}

export default UploadAction;
