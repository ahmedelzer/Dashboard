import React, { useContext, useState } from "react";
import { Input } from "reactstrap";
import { LanguageContext } from "../../contexts/Language";

function SelectParameter({
  value: initialValue,
  enable,
  title,
  fieldName,
  returnField,
  displayField,
  ...props
}) {
  const { Right, localization } = useContext(LanguageContext);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const RunOptions = () => {
    if (props.type?.startsWith("lookupLocalization:")) {
      const key = props.type.split(":")[1];
      const values = localization[key] || [];
      console.log("====================================");
      console.log(values);
      console.log("====================================");

      return values.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ));
    } else {
      return <option>{displayField}</option>;
    }
  };
  return (
    // <div className="w-full">
    <Input
      className={`${props.className} form-control`}
      value={displayField || selectedValue}
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
      {RunOptions()}
      <input
        type="hidden"
        name={fieldName}
        value={returnField || selectedValue}
      />
    </Input>
    /* </div> */
  );
}

export default SelectParameter;
