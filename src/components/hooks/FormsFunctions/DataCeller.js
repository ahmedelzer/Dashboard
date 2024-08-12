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
import ImageParameterWithPanelActions from "../../inputs/InputActions/ImageParameterWithPanelActions";
import { CreateInputProps } from "./CreateInputProps";
import { GetInputComponent } from "./GetInputComponent";
//import { TextOnChangeHandling } from "./InputOnChange";
import "./formStyles.css";
import { Onchange } from "./OnchangeClass";

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
  errorResult,
  ...props
}) {
  return (
    <InputDisplay
      props={{
        ...CreateInputProps(data, value),
        onChange: onChange,
        ...props,
      }}
      errorResult={errorResult}
      BaseInput={GetInputComponent(
        data.lookupID ? "lookup" : data.parameterType
      )}
    />
  );
}
