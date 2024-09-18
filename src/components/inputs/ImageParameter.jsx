import React, { Component, createRef } from "react";
import defaultImage from "../../assets/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
// import inputs from "../../locals/EN/inputs.json";
import { imageInputStyle } from "./styles";
import { LanguageContext } from "../../contexts/Language";

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
        type: this.props.type,
        // ...this.props,
      },
    });

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  componentDidMount() {
    if (this.imageRef.current && defaultImage !== this.imageRef.current?.src) {
      this.imageRef.current.addEventListener(
        "load",
        this.props.onChange({
          target: {
            name: this.props.fieldName,
            value: this.imageRef.current?.src,
            type: this.props.type,
            // typeValue:
            // ...this.props,
          },
        })
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.value !== this.props.value &&
      this.imageRef.current &&
      defaultImage !== this.imageRef.current?.src
    ) {
      this.imageRef.current.addEventListener(
        "load",
        this.props.onChange({
          target: {
            name: this.props.fieldName,
            value: this.imageRef.current?.src,
            type: this.props.type,
            // ...this.props,
          },
        })
      );
    }
  }

  componentWillUnmount() {
    if (this.imageRef.current && defaultImage !== this.imageRef.current?.src) {
      this.imageRef.current.removeEventListener(
        "load",
        this.props.onChange({
          target: {
            name: this.props.fieldName,
            value: this.imageRef.current?.src,
            type: this.props.type,
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
    const { localization } = this.context;
    const imageAltValue = localization.inputs.image.imageAltValue;

    // const defaultImage = inputs.image.defaultImage;
    // console.log(this.imageRef?.current?.src)

    return (
      <div
        className={imageInputStyle.container}
        title={this.props.title}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          ref={this.imageRef}
          src={value || defaultImage}
          alt={imageAltValue}
          key={fieldName}
          className={`${imageInputStyle.image} ${this.props.className}`}
        />
        {isHovered && (
          <div className={imageInputStyle.hoverOverlay}>
            {this.props.actions?.map((action, index) => (
              <label key={index} htmlFor="" className="p-0 m-0">
                <div className={imageInputStyle.actionItem}>{action}</div>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  }
}
ImageParameter.contextType = LanguageContext;

export default ImageParameter;
