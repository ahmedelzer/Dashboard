import React from "react";
import InputDisplay from "../../forms/PartingFrom/InputDisplay";
import { CreateInputProps } from "./CreateInputProps";
import { GetInputComponent } from "./GetInputComponent";

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
