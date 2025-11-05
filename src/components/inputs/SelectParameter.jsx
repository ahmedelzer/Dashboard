import React, { useContext, useEffect, useState } from "react";
import { Input } from "reactstrap";
import { LanguageContext } from "../../contexts/Language";

function SelectParameter({
  value: initialValue,
  enable,
  title,
  fieldName,
  returnField,
  displayField,
  type,
  ...props
}) {
  const { localization } = useContext(LanguageContext);
  const [selectedValue, setSelectedValue] = useState(
    displayField || initialValue || ""
  );

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const RunOptions = () => {
    if (type?.startsWith("lookupLocalization:")) {
      const key = type.split(":")[1];
      const values = localization[key] || [];

      return values.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ));
    } else {
      return <option value={initialValue}>{displayField}</option>;
    }
  };

  useEffect(() => {
    if (type?.startsWith("lookupLocalization:")) {
      const key = type.split(":")[1];
      const values = localization[key] || [];
      const found = values.find(
        (val) => val.id?.toString() === initialValue?.toString()
      );
      if (found) {
        setSelectedValue(found.id);
      } else {
        setSelectedValue(initialValue || "");
      }
    } else {
      setSelectedValue(initialValue || "");
    }
  }, [type, localization, initialValue]);

  return (
    <div className="w-full">
      <Input
        className={`${props.className} form-control`}
        value={selectedValue}
        placeholder={title || displayField}
        onChange={handleChange}
        disabled={!enable}
        required
        type="select"
        name={fieldName}
      >
        {RunOptions()}
      </Input>

      <input
        type="hidden"
        name={fieldName}
        value={returnField || selectedValue}
      />
    </div>
  );
}

export default SelectParameter;
