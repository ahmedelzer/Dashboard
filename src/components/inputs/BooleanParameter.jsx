import React from "react";
import { RadioGroup } from "devextreme-react";
import BaseInput from "./BaseInput";
import inputs from "../../locals/EN/inputs.json";
class BooleanParameter extends BaseInput {
  handleChange = (e) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.value);
    }
  };

  render() {
    const { value, fieldName, Enable, onKeyPress } = this.props;

    return (
      <div>
        <RadioGroup
          items={inputs.boolean}
          value={value}
          onValueChanged={this.handleChange}
          onKeyPress={onKeyPress}
          readOnly={!Enable}
          {...this.props}
          name={fieldName}
        />
      </div>
    );
  }
}

export default BooleanParameter;

// import { RadioGroup } from "devextreme-react";

// const BooleanParameter = ({ value, onChange, Enable, onKeyPress }) => (
//   <RadioGroup
//     items={[
//       { text: "Yes", value: true },
//       { text: "No", value: false },
//     ]}
//     value={value}
//     onValueChanged={onChange}
//     onKeyPress={onKeyPress}
//     readOnly={!Enable}
//   />
// );
// export default BooleanParameter;
