import { Col, Container, Row } from "reactstrap";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";
import avoidColsTypes from "../DynamicTable/avoidColsTypes.json";
import firstColsFound from "./firstColsFound.json";
import { Sm } from "./Sm";
import { useContext, useEffect, useRef } from "react";
import { LanguageContext } from "../../../contexts/Language";
import { useDisplayToast } from "../../../utils/components/useDisplayToast";
function FormContainer({ tableSchema, row, errorResult, returnRow, ...props }) {
  const errors = errorResult?.error?.errors || {};
  const { showToast } = useDisplayToast();
  const { localization } = useContext(LanguageContext);

  // Convert error keys to lowercase
  const lowercaseErrors = Object.keys(errors).reduce((acc, key) => {
    acc[key.toLowerCase()] = errors[key];
    return acc;
  }, {});

  // Get expected field names from schema
  const expectedFields =
    tableSchema?.dashboardFormSchemaParameters?.map((param) =>
      param.parameterField?.toLowerCase()
    ) || [];

  // Get unmatched error messages (e.g., "userError")
  // const globalErrorMessages = [["test"], ["test1"]]; // get message(s)
  const globalErrorMessages = Object.entries(lowercaseErrors)
    .filter(([key]) => !expectedFields.includes(key)) // key not found in schema
    .map(([_, message]) => message); // get message(s)
  // Show toast on global errors
  // Show the first global error as toast

  const lastShownErrorRef = useRef(null); // track last error shown
  useEffect(() => {
    const currentError = globalErrorMessages[0];

    if (currentError && lastShownErrorRef.current !== currentError) {
      lastShownErrorRef.current = currentError;
      // Always wrap in setTimeout to let React commit before showing
      setTimeout(() => {
        showToast(
          localization.inputs.notifyError,
          currentError,
          "error",
          4000,
          "top"
        );
      }, 0);
    }
  }, [globalErrorMessages, showToast, localization.inputs.notifyError]);
  const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
    (e) => e.isEnable
  ).parameterField;

  //todo check if this we want const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
  //todo(e) => e.isEnable && Math.max(e.indexNumber)
  //todo).parameterField;
  const { specialActions } = GetActionsFromSchema(tableSchema);
  const onChange = new Onchange(
    specialActions,
    tableSchema.projectProxyRoute,
    row,
    tableSchema
  );
  function SetValue(param) {
    if (
      param.lookupID ||
      param.parameterType === "areaMapLongitudePoint" ||
      param.parameterType === "mapLongitudePoint" ||
      param.parameterType === "nodeLongitudePoint" ||
      param.parameterType === "rate"
    ) {
      return row;
    } else {
      return row?.[param?.parameterField];
    }
  }
  function GetActiveIndexInput() {
    return (
      tableSchema?.dashboardFormSchemaParameters.find((pram) =>
        firstColsFound.includes(pram.parameterType)
      )?.parameterType || null
    );
  }
  //useEffect
  return (
    <div>
      {" "}
      <Container
        onBlur={() => {
          returnRow(onChange.ReturnRow);
        }}
      >
        <Row>
          {tableSchema?.dashboardFormSchemaParameters
            ?.filter((column) => {
              return (
                (!column.isIDField || column.lookupID) &&
                !avoidColsTypes.find(
                  (columnType) => column.parameterType === columnType
                )
              );
            })
            .map((param) => (
              <Col sm={Sm(param)} className="px-2" key={param.parameterField}>
                <DataCellRender
                  isActionField={
                    actionField === param.parameterField ? true : false
                  }
                  data={param}
                  value={SetValue(param)}
                  onChange={onChange.UpdateRow}
                  externalRow={onChange.ReturnRow}
                  errorResult={errorResult}
                  activeIndexInput={GetActiveIndexInput()}
                  formSchemaParameters={
                    tableSchema?.dashboardFormSchemaParameters
                  }
                  {...props}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
export default FormContainer;
