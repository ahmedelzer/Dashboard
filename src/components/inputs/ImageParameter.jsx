import React, { Component, createRef } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import inputs from "../../locals/EN/inputs.json";
import { Image } from "react-bootstrap";

class ImageParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    this.imageRef = createRef();
    this.onChange = this.props.onChange({
      target: {
        name: this.props.fieldName,
        value: this.imageRef.current?.src,
        type: "file",
        // ...this.props,
      },
    });

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  componentDidMount() {
    if (this.imageRef.current) {
      this.imageRef.current.addEventListener(
        "load",
        this.props.onChange({
          target: {
            name: this.props.fieldName,
            value: this.imageRef.current?.src,
            type: "file",
            // ...this.props,
          },
        })
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && this.imageRef.current) {
      this.imageRef.current.addEventListener(
        "load",
        this.props.onChange({
          target: {
            name: this.props.fieldName,
            value: this.imageRef.current?.src,
            type: "file",
            // ...this.props,
          },
        })
      );
    }
  }

  componentWillUnmount() {
    if (this.imageRef.current) {
      this.imageRef.current.removeEventListener(
        "load",
        this.props.onChange({
          target: {
            name: this.props.fieldName,
            value: this.imageRef.current?.src,
            type: "file",
            // ...this.props,
          },
        })
      );
    }
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
    const imageAltValue = inputs.image.imageAltValue;
    // console.log(this.imageRef?.current?.src);

    return (
      <div
        className="relative cursor-pointer"
        title={this.props.title}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          ref={this.imageRef}
          src={value}
          alt={imageAltValue}
          key={fieldName}
          className={`w-full object-cover rounded-md form-control ${this.props.className}`}
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
