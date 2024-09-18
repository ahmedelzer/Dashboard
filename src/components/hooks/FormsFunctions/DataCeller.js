import React from "react";
import InputDisplay from "../../forms/PartingFrom/InputDisplay";
import { CreateInputProps } from "./CreateInputProps";
import { GetInputComponent } from "./GetInputComponent";

export default function DataCellRender({ data, errorResult, onChange, value }) {
  // Determine the key to use for input mapping
  //todo make if detailsCell return FilesWithScrollPaging
  const inputKey = () => {
    if (data.parameterType === "detailsCell" || !data.lookupID) {
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
      }}
      errorResult={errorResult}
      BaseInput={InputComponentClass}
    />
  );
}
