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
  const [newValue, setNewValue] = useState();

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
        onKeyPress={onKeyPress}
      />
      <input type="hidden" name={fieldName} value={newValue} />
    </div>
  );
};

export default BooleanParameter;
