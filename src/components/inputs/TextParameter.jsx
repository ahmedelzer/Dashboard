import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import FieldGroup from "../hooks/FormsFunctions/FieldGroup";
import BaseInput from "./BaseInput";
// import "./styles.css"; // Assuming you have a CSS file for custom styles

class TextParameter extends BaseInput {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
  }
  handleChange = (e) => {
    console.log("BaseInput handleChange triggered");

    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  setParameterType = (parameterType) => {
    switch (parameterType) {
      case "float" || "numeric":
        return "number";
      case "numeric":
        return "number";
      default:
        return parameterType;
    }
  };

  setParameterTypeStep = (parameterType) => {
    switch (parameterType) {
      case "float":
        return "0.001";
      case "numeric":
        return "1";
      default:
        return "any";
    }
  };

  render() {
    let { value, enable, title, fieldName, type, ...props } = this.props;

    return (
      <FieldGroup
        type={this.setParameterType(type)}
        required={enable}
        defaultValue={value}
        name={fieldName}
        id={fieldName}
        title={title}
        readOnly={!enable}
        {...props}
        step={this.setParameterTypeStep(type)}
      />
    );
  }
}

export default TextParameter;
