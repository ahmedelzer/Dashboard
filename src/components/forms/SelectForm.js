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
      />
    );
  } else if (schema.schemaType === "FilesContainer") {
    return (
      <FileContainer
        schema={schema}
        row={row}
        serverSchema={includeSchemas.find(
          (s) => s.schemaType === "ServerFilesContainer"
        )}
        parentSchemaParameters={parentSchemaParameters}
        fieldName={fieldName}
        title={title}
      />
    );
  }
}
