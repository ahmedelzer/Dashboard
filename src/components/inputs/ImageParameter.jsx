import React, { Component } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

class ImageParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ isHovered: true });
  }

  handleMouseLeave() {
    this.setState({ isHovered: false });
  }

  render() {
    const { fieldName, value } = this.props;
    const { isHovered } = this.state;
    const imageAltValue = "uploaded";

    return (
      <div
        className="relative cursor-pointer"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          src={value}
          key={fieldName}
          alt={imageAltValue}
          className="w-full object-cover rounded-md"
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {this.props.actions?.map((action, index) => (
              <label key={index} htmlFor="" className="p-0 m-0">
                <div className="bg-white rounded-full border-1 border px-2 mx-1 cursor-pointer">
                  {action}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ImageParameter;
