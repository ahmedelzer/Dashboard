import Table from "./DynamicTable/Table";
import FileContainer from "./FileContainer/FileContainer";
export default function SelectForm({
  row,
  parentSchemaParameters,
  schema,
  fieldName,
  title,
  includeSchemas,
}) {
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
            routeAdderss: "scraping/getPages",
            body: "string",
            returnPropertyName: "string",
            projectProxyRoute: "i-marketer1",
            dashboardFormSchemaActionQueryParams: [
              {
                dashboardFormSchemaActionQueryParameterID:
                  "26bc9d7e-781f-4638-a25d-50b9c516e00d",
                dashboardFormSchemaActionID:
                  "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
                parameterName: "PageSize",
                dashboardFormParameterField: "pageSize",
              },
              {
                dashboardFormSchemaActionQueryParameterID:
                  "54fb6bb3-32ad-42ff-bd09-ab0fb6378886",
                dashboardFormSchemaActionID:
                  "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
                parameterName: "pageNumber",
                dashboardFormParameterField: "pageIndex",
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
  }
}
