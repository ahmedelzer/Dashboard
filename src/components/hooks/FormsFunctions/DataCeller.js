import React, { useCallback, Component, useRef, useState } from "react";
import { DateBox, DropDownBox, RadioGroup } from "devextreme-react";
import { FormGroup, Label } from "reactstrap";
import { SearchingCellRender } from "../FormsFunctions/SearchingCellRender";
import DisplayErorr from "./DisplayError";
import FieldGroup from "./FieldGroup";
import {
  BooleanParameter,
  DateParameter,
  DateTimeParameter,
  TextParameter,
} from "../../inputs";
import InputDisplay from "../../forms/PartingFrom/InputDisplay";
import BaseInput from "../../inputs/BaseInput";
import LookupInput from "../../inputs/LookupInput";
//import { TextOnChangeHandling } from "./InputOnChange";

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
const SetkeyPressEvent = (isActionField) => {
  console.log("isActionField", isActionField);
  return isActionField ? handleKeyPressToApplyChanges : handleKeyPressToTabNew;
};
export default function DataCellRender({
  data,
  value,
  onChange,
  dataError,
  isActionField,
  isSelectionRow,
}) {
  function handleSelectionRow() {
    if (isSelectionRow[data.parameterField]) {
      return false;
    } else {
      return data.isEnable;
    }
  }
  if (data?.lookupID === null) {
    switch (data.parameterType) {
      case "text":
        return (
          <TextParameter
            dataError={dataError}
            data={data}
            value={value}
            onChange={onChange}
            Enable={handleSelectionRow()}
            // Enable={data.isEnable}
            onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "datetime":
        return (
          <InputDisplay
            title="test"
            fieldName="test1"
            value={value}
            BaseInput={DateTimeParameter}
            errorMessage={{}}
          />
        );
      case "date":
        return (
          <InputDisplay
            title="test"
            fieldName="test1"
            value={value}
            BaseInput={DateParameter}
            errorMessage={{}}
            // Enable={data.isEnable}
            // onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "boolean":
        return (
          <InputDisplay
            title="test"
            fieldName="test1"
            value={value}
            BaseInput={BooleanParameter}
            errorMessage={{}}
            // Enable={data.isEnable}
            // onKeyPress={SetkeyPressEvent(isActionField)}
          />
        );
      case "image":
        return (
          <TextParameter
            dataError={dataError}
            data={data}
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
            //onChange={new TextOnChangeHandling()}
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
      // <SearchingCellRender dataForm={data} fieldName="test1" value={value} />
      <InputDisplay
        title="test"
        fieldName="test1"
        value={value}
        dataForm={data}
        BaseInput={LookupInput}
        errorMessage={{}}
        // Enable={data.isEnable}
        // onKeyPress={SetkeyPressEvent(isActionField)}
      />
    );
  }
}
