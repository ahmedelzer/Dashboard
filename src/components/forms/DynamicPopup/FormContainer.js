import { Col, Container, Row } from "reactstrap";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";
import avoidColsTypes from "../DynamicTable/avoidColsTypes.json";
import firstColsFound from "./firstColsFound.json";
import { Sm } from "./Sm";
function FormContainer({ tableSchema, row, errorResult, returnRow }) {
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
      param.parameterType === "rate"
    ) {
      return row;
    } else {
      return row[param.parameterField];
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
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
export default FormContainer;
