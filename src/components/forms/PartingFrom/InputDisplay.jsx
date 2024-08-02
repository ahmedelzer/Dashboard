import React from "react";
import { Label } from "reactstrap";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetFormSchema from "../../hooks/DashboardAPIs/GetFormSchema";
import { defaultProjectProxyRoute } from "../../../request";

function InputDisplay({
  title = "Default Title",
  fieldName = "defaultFieldName",
  value = "",
  BaseInput,
  errorMessage = "",
  dataForm,
}) {
  const { data, error, isLoading } = useFetch(
    GetFormSchema(dataForm?.lookupID),
    defaultProjectProxyRoute
  );
  const props = {
    fieldName: fieldName,
    value: "2024-07-28T10:00:00", // Example date value
    errorMessage: "This field is required",
    enable: true, // Example enable flag
    lookupID: dataForm?.lookupID,
    data: data,
  };
  return <BaseInput {...props} />;
}

export default InputDisplay;
