import React, { Component } from "react";

class BaseInput extends Component {
  handleChange = (e) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  };

  render() {
    const { fieldName, value, errorMessage, enable } = this.props;
    return (
      <div>
        <input
          name={fieldName}
          type="text"
          value={value}
          onChange={this.handleChange}
          disabled={!enable}
        />
      </div>
    );
  }
}

export default BaseInput;
