import CompainedLiveTable from "./CompainedLiveTable";
import { DependenciesCategory } from "./DependenciesCategory";
import FormComponent from "./FormComponent";
import LiveFormPartions from "./LiveFormPartions";
import Table from "./../DynamicTable/Table";

export function SchemaType({
  Schema,
  editedRow,
  setEditedgRow,
  updatedData,
  actions,
  selectedRow,
}) {
  console.log("====================================");
  console.log(editedRow, selectedRow, "editedRow");
  console.log("====================================");
  switch (Schema.schemaType) {
    case "LiveForm":
      return (
        <LiveFormPartions
          editedRow={editedRow}
          setEditedgRow={setEditedgRow}
          // postAction={postAction}
          //     putAction={putAction}
          //     mainSchema={mainSchema}
          //     mainID={mainID}
          Schema={Schema}
          data={updatedData ? updatedData : {}}
        />
      );
    case "LiveTable":
      return (
        <div>
          {/* {Schema.dashboardFormSchemaInfoDTOView.schemaHeader} */}
          <CompainedLiveTable
            editedRow={editedRow}
            setEditedgRow={setEditedgRow}
            // postAction={postAction}
            //   putAction={putAction}
            //   mainSchema={mainSchema}
            //   mainID={mainID}
            Schema={Schema}
            updatedData={updatedData ? updatedData : []}
          />
          {/* <LiveFormPartions Schema={Schema} data={updatedData} /> */}
        </div>
      );
    case "Report":
      return (
        <FormComponent
          tableSchema={Schema}
          editInitState={true}
          row={updatedData}
          // errorResult={result}
          returnRow={() => {}}
        />
      );
    case "Table":
      return (
        <Table
          key={Schema.idField}
          schema={Schema}
          isSearchingTable={false}
          rowDetails={selectedRow}
          schemaActions={[]}
        />
      );
    default:
      return (
        // <div>
        // <DependenciesCategory Schema={Schema} />
        <FormComponent
          tableSchema={Schema}
          row={updatedData}
          // errorResult={result}
          returnRow={() => {}}
        />
        // </div>
      );
    // return <div>{Schema.dashboardFormSchemaInfoDTOView.schemaHeader}</div>;
  }
}
