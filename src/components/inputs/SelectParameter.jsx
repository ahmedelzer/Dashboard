import React, { useState } from "react";
import { Input } from "reactstrap";

function SelectParameter({
  value: initialValue,
  enable,
  title,
  fieldName,
  returnField,
  displayField,
  ...props
}) {
  console.log("====================================");
  console.log(returnField, displayField);
  console.log("====================================");

  const handleChange = (event) => {
    // setSelectedValue(event.target.value);
  };
  return (
    // <div className="w-full">
    <Input
      className={`${props.className} form-control`}
      value={displayField}
      placeholder={displayField}
      onChange={handleChange}
      {...props}
      disabled={!enable}
      required
      type="select"
    >
      {/* {value.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))} */}
      <option>{displayField}</option>
      <input type="hidden" name={fieldName} value={returnField} />
    </Input>
    /* </div> */
  );
}

export default SelectParameter;
