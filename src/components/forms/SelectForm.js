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
  if (schema?.schemaType === "Table") {
    return (
      <Table
        key={schema.idField}
        schema={schema}
        isSearchingTable={false}
        rowDetails={row}
        schemaActions={[]}
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
