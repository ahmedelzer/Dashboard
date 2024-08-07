import React from "react";
import { DateBox } from "devextreme-react";
import BaseInput from "./BaseInput";

class DateParameter extends BaseInput {
  render() {
    const { fieldName, value, Enable } = this.props;

    return (
      <DateBox
        value={new Date(value ? value : Date.now())}
        readOnly={!Enable}
        type="date"
        name={fieldName}
        {...this.props}
      />
    );
  }
}

export default DateParameter;

// import { DateBox } from "devextreme-react";

// const DateParameter = ({ value, Enable }) => (
//   <DateBox
//     value={new Date(value ? value : Date.now())}
//     readOnly={!Enable}
//     type="date"
//   />
// );
// export default DateParameter;
