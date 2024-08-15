import React from "react";
import BaseInput from "./BaseInput";
import { DateBox } from "devextreme-react";

class DateTimeParameter extends BaseInput {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { fieldName, value, onChange, enable } = this.props;
    function handleChange(e) {
      const value = e.value;
      onChange({ target: { name: fieldName, value: value } });
    }

    return (
      <div className="mb-3" title={this.props.title}>
        <DateBox
          value={new Date(value ? value : Date.now())}
          readOnly={!enable}
          title={this.props.title}
          type="datetime"
          name={fieldName}
          key={fieldName}
          onValueChanged={handleChange}
        />
      </div>
    );
  }
}

export default DateTimeParameter;
