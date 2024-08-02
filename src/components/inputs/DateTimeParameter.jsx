import React from "react";
import BaseInput from "./BaseInput";
import { DateBox } from "devextreme-react";

class DateTimeParameter extends BaseInput {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // Handle the change event
    console.log("Date changed", event.target.value);
  }

  render() {
    const { fieldName, value, errorMessage, enable } = this.props;
    console.log("fieldName", fieldName);
    return (
      <div>
        <DateBox
          value={new Date(value ? value : Date.now())}
          readOnly={!enable}
          type="datetime"
          name={fieldName}
          onValueChanged={this.handleChange}
        />
      </div>
    );
  }
}

export default DateTimeParameter;
