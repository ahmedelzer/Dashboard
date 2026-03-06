import React, { useEffect, useMemo, useState } from "react";
import { RadioGroup } from "devextreme-react";
import useFetch from "../hooks/APIsFunctions/useFetch";
import {
  defaultProjectProxyRoute,
  defaultProjectProxyRouteWithoutBaseURL,
} from "../../request";
import GetSchemaActionsUrl from "../hooks/DashboardAPIs/GetSchemaActionsUrl";

const RadioParameter = ({
  value,
  fieldName,
  enable = true,
  onKeyPress,
  onChange,
  lookupDisplayField,
  lookupID,
  lookupReturnField,
}) => {
  const [values, setValues] = useState([]);

  const { data } = useFetch(
    GetSchemaActionsUrl(lookupID),
    defaultProjectProxyRouteWithoutBaseURL,
  );

  useEffect(() => {
    if (data) {
      console.log(data, "data");

      setValues(data);
    }
  }, [data]);

  // Convert API data to DevExtreme items
  const items = useMemo(() => {
    if (!values?.length) return [];

    return values.map((item) => ({
      text: item?.[lookupDisplayField],
      value: item?.[lookupReturnField],
    }));
  }, [values, lookupDisplayField, lookupReturnField]);

  const [newValue, setNewValue] = useState(value);

  // Sync with external value
  useEffect(() => {
    if (value !== undefined) {
      setNewValue(value);
    }
  }, [value]);

  const handleChange = (selectedValue) => {
    setNewValue(selectedValue);

    if (onChange) {
      onChange({
        target: {
          name: fieldName,
          value: selectedValue,
        },
      });
    }
  };

  if (!items.length) return null;

  return (
    <div>
      <RadioGroup
        items={items}
        displayExpr="text"
        valueExpr="value"
        value={newValue}
        onValueChange={handleChange}
        onKeyPress={onKeyPress}
        disabled={!enable}
      />

      <input type="hidden" name={fieldName} value={newValue ?? ""} />
    </div>
  );
};

export default RadioParameter;
