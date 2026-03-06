import React, { useEffect, useState } from "react";
import useFetch from "../hooks/APIsFunctions/useFetch";
import { defaultProjectProxyRoute } from "../../request";

const CheckBoxParameter = ({
  value = [],
  fieldName,
  enable = true,
  onChange,
  onKeyPress,
  lookupDisplayField,
  lookupID,
  lookupReturnField,
}) => {
  const [values, setValues] = useState([]);
  const { data, error, isLoading } = useFetch(
    `/Dashboard/GetDashboardFormSchemaBySchemaID?DashboardFormSchemaID=${lookupID}`,
    defaultProjectProxyRoute,
  );
  useEffect(() => {
    if (data) setValues(data);
  }, [data, isLoading]);
  // const values = [
  //   { test: "test1", id: "1" },
  //   { test: "test2", id: "2" },
  //   { test: "test3", id: "3" },
  // ];
  const [selectedValues, setSelectedValues] = useState(value[fieldName] || []);

  const handleChange = (item) => {
    let updatedValues;

    if (selectedValues.includes(item)) {
      updatedValues = selectedValues.filter((v) => v !== item);
    } else {
      updatedValues = [...selectedValues, item];
    }

    setSelectedValues(updatedValues);

    if (onChange) {
      onChange({
        target: {
          name: fieldName,
          value: updatedValues,
        },
      });
    }
  };
  return (
    <div onKeyPress={onKeyPress}>
      {values.map(
        ({ [lookupDisplayField]: display, [lookupReturnField]: value }) => {
          return (
            <label
              key={value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
                cursor: enable ? "pointer" : "not-allowed",
                opacity: enable ? 1 : 0.5,
              }}
            >
              <input
                type="checkbox"
                value={value}
                checked={selectedValues.includes(value)}
                disabled={!enable}
                onChange={() => handleChange(value)}
              />

              {display}
            </label>
          );
        },
      )}

      <input
        type="hidden"
        name={fieldName}
        value={JSON.stringify(selectedValues)}
        data-isCheckbox="true"
      />
    </div>
  );
};

export default CheckBoxParameter;
