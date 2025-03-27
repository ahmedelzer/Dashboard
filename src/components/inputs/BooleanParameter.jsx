import React, { useContext, useState } from "react";
import { RadioGroup } from "devextreme-react";
import { LanguageContext } from "../../contexts/Language";

const BooleanParameter = ({
  value,
  fieldName,
  Enable,
  onKeyPress,
  onChange,
}) => {
  const { localization } = useContext(LanguageContext);
  // Find the matching object from localization.inputs.boolean
  const getDefaultValue = () => {
    return (
      localization.inputs.boolean.find((item) => item.value === value) ||
      localization.inputs.boolean[0]
    );
  };

  const [newValue, setNewValue] = useState(getDefaultValue());

  const handleChange = (value) => {
    setNewValue(setNewValue.value);
    if (onChange) {
      onChange({ target: { value: value.value, name: fieldName } });
    }
  };

  return (
    <div>
      <RadioGroup
        items={localization.inputs.boolean}
        onValueChange={handleChange}
        value={newValue}
        onKeyPress={onKeyPress}
      />
      <input type="hidden" name={fieldName} value={newValue?.value} />
    </div>
  );
};

export default BooleanParameter;
