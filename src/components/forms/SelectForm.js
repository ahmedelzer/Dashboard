import Table from "./DynamicTable/Table";
let schema = {
  dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
  schemaType: "Table",
  idField: "unitID",
  dashboardFormSchemaInfoDTOView: {
    dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
    schemaHeader: "Units",
    addingHeader: "Add a unitt",
    editingHeader: "Edit a unit",
  },
  dashboardFormSchemaParameters: [
    {
      dashboardFormSchemaParameterID: "46655c51-09fa-4c14-8e63-016eadf6962d",
      dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
      isEnable: true,
      parameterType: "text",
      parameterField: "unitSymbol",
      parameterTitel: "symbol",
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
    {
      dashboardFormSchemaParameterID: "4e586ce7-48a7-4a6c-bd86-4d1d456cb2d8",
      dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
      isEnable: false,
      parameterType: "text",
      parameterField: "unitID",
      parameterTitel: "unit id",
      isIDField: true,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
    {
      dashboardFormSchemaParameterID: "571b1ad7-417b-4ca0-b4f6-ac7fe7f81f08",
      dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
      isEnable: true,
      parameterType: "text",
      parameterField: "unitName",
      parameterTitel: "a unit",
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
    {
      dashboardFormSchemaParameterID: "a7480794-4d57-417d-9a24-d5bf28536285",
      dashboardFormSchemaID: "dc7f5dea-b409-4911-b30c-ebb5fa1311b9",
      isEnable: true,
      parameterType: "float",
      parameterField: "exactValue",
      parameterTitel: "exact value",
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
  ],
  isMainSchema: true,
  dataSourceName: null,
  projectProxyRoute: "Centralization",
  propertyName: null,
  indexNumber: 0,
};
export default function SelectForm({ row }) {
  if (schema.schemaType === "Table") {
    return (
      <Table
        key={schema.idField}
        schema={schema}
        isSearchingTable={false}
        rowDetails={row}
      />
    );
  } else if (schema.schemaType === "Form") {
    return <></>;
  }
}
