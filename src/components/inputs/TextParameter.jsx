import React, { useState } from "react";
import BaseInput from "./BaseInput";
import FieldGroup from "../hooks/FormsFunctions/FieldGroup";
import DisplayError from "../hooks/FormsFunctions/DisplayError";

class TextParameter extends BaseInput {
  constructor(props) {
    super(props);
    this.state = {
      Title: props.data.parameterTitel,
    };
  }

  handleChange = (event) => {
    const { name, files } = event.target;
    const { onChange, editedRow } = this.props;
    console.log("target", editedRow);
    if (onChange) {
      onChange(name, files ? files[0] : event.target.value); // Pass the file object to the onChange handler if present
    }
  };

  setParameterType = (parameterType) => {
    switch (parameterType) {
      case "image":
        return "file";
      case "float":
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
    const { data, value, Enable, dataError, onKeyPress, ...props } = this.props;

    return (
      <div>
        <DisplayError
          dataError={dataError}
          setTital={this.setTitle}
          data={data}
        />
        <FieldGroup
          type={this.setParameterType(data?.parameterType)}
          required={Enable}
          dataError={dataError}
          placeholder={data?.parameterTitel}
          value={value}
          title={this.state.Title}
          name={data.parameterField}
          onChange={this.handleChange}
          readOnly={!Enable}
          {...props}
          step={this.setParameterTypeStep(data?.parameterType)}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
}

export default TextParameter;

// import { useState } from "react";
// import FieldGroup from "../hooks/FormsFunctions/FieldGroup";
// import DisplayError from "../hooks/FormsFunctions/DisplayError";
// const TextParameter = ({
//   data,
//   value,
//   onChange,
//   Enable,
//   dataError,
//   editedRow,
//   onKeyPress,
//   ...props
// }) => {
//   //const onChange = new TextOnChangeHandling(data.parameterField, value);
//   const [Title, settital] = useState(`${data.parameterTitel}`);
//   const handleChange = (event) => {
//     //const { name, files } = event.target;
//     console.log("target", editedRow);
//     // if (onChange) {
//     //   onChange(name, files[0]); // Pass the file object to the onChange handler
//     // }
//   };
//   function SetParameterType(parameterType) {
//     switch (parameterType) {
//       case "image":
//         return "file";
//       case "float":
//         return "number";
//       case "numeric":
//         return "number";
//       default:
//         return parameterType;
//     }
//   }
//   function SetParameterTypeStep(parameterType) {
//     switch (parameterType) {
//       case "float":
//         return "0.001";
//       case "numeric":
//         return "1";
//       default:
//         return "any";
//     }
//   }
//   return (
//     <div>
//       <DisplayError dataError={dataError} setTital={settital} data={data} />
//       <FieldGroup
//         type={SetParameterType(data?.parameterType)}
//         // accept="image/*"
//         required={Enable}
//         // img={img}
//         dataError={dataError}
//         placeholder={data?.parameterTitel}
//         value={value}
//         title={Title}
//         data={data}
//         name={data.parameterField}
//         onChange={handleChange}
//         readOnly={!Enable}
//         {...props}
//         step={SetParameterTypeStep(data?.parameterType)}
//         onKeyPress={onKeyPress}
//       />
//     </div>
//   );
// };
// export default TextParameter;
