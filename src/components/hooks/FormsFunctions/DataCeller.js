import React, { useCallback, useRef, useState } from "react";
import { DateBox, DropDownBox, RadioGroup } from "devextreme-react";
import { FormGroup, Label } from "reactstrap";
import { SearchingCellRender } from "../FormsFunctions/SearchingCellRender";
import DisplayErorr from "./DisplayError";
import FieldGroup from "./FieldGroup";

const handleKeyPressToApplyChanges = (event) => {
  // Check if the key pressed is Enter (key code 13)
  if (event.key === "Enter") {
    // Perform some action when Enter key is pressed
    console.log(11233432, "Enter key pressed");
  }
};
const handleKeyPressToTabNew = (event) => {
  // Check if the key pressed is Enter (key code 13)
  if (event.key === "Enter") {
    // Perform some action when Enter key is pressed
    event.key = "Tab";
    console.log(11233432, "Enter key TAb ");
  }
};
const TextParameter = ({
  data,
  value,
  onChange,
  Enable,
  dataError,
  editedRow,
  img,
  onKeyPress,
}) => {
  const [Title, settital] = useState(`${data.parameterTitel}`);
  const handleChange = (event) => {
    const { name, files } = event.target;
    if (onChange) {
      onChange(name, files[0]); // Pass the file object to the onChange handler
    }
  };
  function SetParameterType(parameterType) {
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
  }
  function SetParameterTypeStep(parameterType) {
    switch (parameterType) {
      case "float":
        return "0.001";
      case "numeric":
        return "1";
      default:
        return "any";
    }
  }
  return (
    <div>
      <DisplayErorr dataError={dataError} setTital={settital} data={data} />
      <FieldGroup
        type={SetParameterType(data?.parameterType)}
        // accept="image/*"
        editedRow={editedRow}
        required={Enable}
        img={img}
        dataError={dataError}
        placeholder={data?.parameterTitel}
        value={value}
        title={Title}
        setTital={settital}
        Title={Title}
        data={data}
        name={data.parameterField}
        onChange={onChange}
        readOnly={!Enable}
        step={SetParameterTypeStep(data?.parameterType)}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};
const DateTimeParameter = ({ value, Enable }) => (
  <DateBox
    value={new Date(value ? value : Date.now())}
    readOnly={!Enable}
    type="datetime"
    // onEnterKey={handleKeyPress}
    // onKeyPress={handleKeyPress}
  />
);

const DateParameter = ({ value, Enable }) => (
  <DateBox
    value={new Date(value ? value : Date.now())}
    readOnly={!Enable}
    type="date"
  />
);

const BooleanParameter = ({ value, onChange, Enable, onKeyPress }) => (
  <RadioGroup
    items={[
      { text: "Yes", value: true },
      { text: "No", value: false },
    ]}
    value={value}
    onValueChanged={onChange}
    onKeyPress={onKeyPress}
    readOnly={!Enable}
  />
);
const SetkeyPressEvent = (isActionField) => {
  console.log("isActionField", isActionField);
  return isActionField ? handleKeyPressToApplyChanges : handleKeyPressToTabNew;
};
export default function DataCellRender({
  data,
  value,
  onChange,
  dataError,
  img,
  editedRow,
  isActionField,
}) {
  if (data?.lookupID === null) {
    switch (data.parameterType) {
      case "text":
        return (
          <TextParameter
            dataError={dataError}
            data={data}
            value={value}
            img={img}
            onChange={onChange}
            Enable={data.isEnable}
            onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "datetime":
        return (
          <DateTimeParameter
            value={value}
            Enable={data.isEnable}
            onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "date":
        return (
          <DateParameter
            value={value}
            Enable={data.isEnable}
            onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "boolean":
        return (
          <BooleanParameter
            value={value}
            onChange={onChange}
            Enable={data.isEnable}
            onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "image":
        return (
          <TextParameter
            dataError={dataError}
            img={img}
            data={data}
            editedRow={editedRow}
            value={value}
            onChange={onChange}
            Enable={data.isEnable}
            onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "float":
        return (
          <TextParameter
            dataError={dataError}
            data={data}
            value={value}
            img={img}
            onChange={onChange}
            Enable={data.isEnable}
            onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "numeric":
        return (
          <TextParameter
            dataError={dataError}
            data={data}
            value={value}
            img={img}
            onChange={onChange}
            onKeyPress={SetkeyPressEvent(isActionField)}
            Enable={data.isEnable}
          />
        );
      // Add cases for other property types
      default:
        return value;
    }
  } else {
    return (
      <SearchingCellRender
        dataform={data}
        value={value}
        onChange={onChange}
        lookupID={data.lookupID}
      />
    );
  }
}
