import Table from "./DynamicTable/Table";
import FileContainer from "./FileContainer/FileContainer";
export default function SelectForm({
  row,
  parentSchemaParameters,
  schema,
  fieldName,
  title,
  includeSchemas,
  subSchemas = [],
}) {
  console.log("====================================");
  console.log("opening SelectForm", schema);
  console.log("====================================");
  if (schema?.schemaType === "Table") {
    return (
      <Table
        key={schema.idField}
        schema={schema}
        isSearchingTable={false}
        rowDetails={row}
        schemaActions={[
          {
            dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
            dashboardFormActionMethodType: "Get",
            routeAdderss: "AreaPolygon/GetAreasPolygon",
            body: "string",
            returnPropertyName: "string",
            projectProxyRoute: "BrandingMartLogistic",
            dashboardFormSchemaActionQueryParams: [
              {
                dashboardFormSchemaActionQueryParameterID:
                  "26bc9d7e-781f-4638-a25d-50b9c516e00d",
                dashboardFormSchemaActionID:
                  "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
                parameterName: "NorthEastLatitude",
                dashboardFormParameterField: "northEastLatitude",
              },
              {
                dashboardFormSchemaActionQueryParameterID:
                  "54fb6bb3-32ad-42ff-bd09-ab0fb6378886",
                dashboardFormSchemaActionID:
                  "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
                parameterName: "NorthEastLongitude",
                dashboardFormParameterField: "northEastLongitude",
              },
              {
                dashboardFormSchemaActionQueryParameterID:
                  "26bc9d7e-781f-4638-a25d-50b9c516e00d",
                dashboardFormSchemaActionID:
                  "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
                parameterName: "SouthWestLatitude",
                dashboardFormParameterField: "southWestLatitude",
              },
              {
                dashboardFormSchemaActionQueryParameterID:
                  "54fb6bb3-32ad-42ff-bd09-ab0fb6378886",
                dashboardFormSchemaActionID:
                  "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
                parameterName: "SouthWestLongitude",
                dashboardFormParameterField: "southWestLongitude",
              },
            ],
          },
          {
            dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
            dashboardFormActionMethodType: "Post",
            routeAdderss: "scraping/addPageUrlFormClient",
            body: "string",
            returnPropertyName: "string",
            projectProxyRoute: "i-marketer1",
            dashboardFormSchemaActionQueryParams: [],
          },
        ]}
        subSchemas={subSchemas}
      />
    );
  } else if (schema?.schemaType === "FilesContainer") {
    return (
      <FileContainer
        schema={schema}
        row={row}
        serverSchema={includeSchemas.find(
          (s) => s.schemaType === "ServerFilesContainer",
        )}
        parentSchemaParameters={parentSchemaParameters}
        fieldName={fieldName}
        title={title}
      />
    );
  } else if (schema?.schemaType === "PolygonContainer") {
    return (
      <FileContainer
        schema={schema}
        row={row}
        serverSchema={includeSchemas.find(
          (s) => s.schemaType === "ServerFilesContainer",
        )}
        parentSchemaParameters={parentSchemaParameters}
        fieldName={fieldName}
        title={title}
      />
    );
  }
}
