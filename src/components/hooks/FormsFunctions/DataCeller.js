import React from "react";
import InputDisplay from "../../forms/PartingFrom/InputDisplay";
import {
  BooleanParameter,
  DateParameter,
  DateTimeParameter,
  TextParameter,
  BaseInput,
  LookupInput,
  ImageParameterWithPanelActions,
} from "../../inputs";
import { CreateInputProps } from "./CreateInputProps";
import { GetInputComponent } from "./GetInputComponent";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";

export default function DataCellRender({ data, errorResult, onChange, value }) {
  // Determine the key to use for input mapping
  const inputKey = data.lookupID ? "lookup" : data.parameterType;

  const InputComponentClass = GetInputComponent(inputKey);
  // Optionally instantiate the class (if needed)
  return (
    <InputDisplay
      props={{
        ...CreateInputProps(data, value),
        onChange: onChange,
      }}
      errorResult={errorResult}
      BaseInput={InputComponentClass}
    />
  );
}
