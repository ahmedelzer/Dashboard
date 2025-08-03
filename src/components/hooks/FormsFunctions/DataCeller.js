import React from "react";
import InputDisplay from "../../forms/PartingFrom/InputDisplay";
import { CreateInputProps } from "./CreateInputProps";
import { GetInputComponent } from "./GetInputComponent";
export default function DataCellRender({
  data,
  errorResult,
  onChange,
  value,
  ...props
}) {
  // Determine the key to use for input mapping

  //todo make lookup in data.parameterType
  const inputKey = () => {
    if (
      data.parameterType === "detailsCell" ||
      !data.lookupID ||
      data.parameterType === "addingLookup"
    ) {
      return data.parameterType;
    } else {
      return "lookup";
    }
  };

  const InputComponentClass = GetInputComponent(inputKey());
  // Optionally instantiate the class (if needed)
  return (
    <InputDisplay
      props={{
        ...CreateInputProps(data, value),
        onChange: onChange,
        displayLabel: props.displayLabel || true,
        ...props,
      }}
      errorResult={errorResult}
      BaseInput={InputComponentClass}
    />
  );
}
