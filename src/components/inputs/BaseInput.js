import React, { Component } from "react";

class BaseInput extends Component {
  handleChange = (e) => {
    let value = this.props.value;
    let rowParam = this.props.row[this.props.fieldName];
    let row = this.props.row;
    if (rowParam) {
      rowParam = value;
    } else {
      const newParam = {
        [rowParam]: value,
      };
      row = { ...row, ...newParam };
    }
  };

  render() {
    const {
      fieldName,
      value,
      errorMessage,
      row,
      enable,
      changed = true,
    } = this.props;
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
