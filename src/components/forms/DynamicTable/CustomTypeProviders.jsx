import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import Switch from "devextreme-react/switch";

// Editor for boolean switch values
export const SwitchEditor = ({ onValueChange, value }) => {
  const handleChange = (val) => onValueChange(val);

  return (
    <Switch
      value={value}
      onValueChanged={(e) => handleChange(e.value)}
      style={{ direction: "ltr" }}
    />
  );
};

// Editor for numeric (currency/date) values
export const DateEditor = ({ onValueChange, value }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    onValueChange(
      targetValue.trim() === "" ? undefined : parseInt(targetValue, 10)
    );
  };

  return (
    <input
      type="number"
      className="form-control"
      placeholder="Filter..."
      value={value ?? ""}
      min={0}
      onChange={handleChange}
    />
  );
};

// Formatter for currency values
export const DateFormatter = ({ value }) => (
  <i>
    {value?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}
  </i>
);

// Type provider for currency column
export const CurrencyTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={DateFormatter}
    editorComponent={DateEditor}
    {...props}
  />
);

// Formatter for boolean values
export const SwitchFormatter = ({ value }) => (
  <span>{value ? "On" : "Off"}</span>
);

// Type provider for switch column
export const SwitchTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={SwitchFormatter}
    editorComponent={SwitchEditor}
    availableFilterOperations={[]}
    {...props}
  />
);
