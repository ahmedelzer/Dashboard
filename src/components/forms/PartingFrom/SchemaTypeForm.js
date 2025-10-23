import CompainedLiveTable from "./CompainedLiveTable";
import { DependenciesCategory } from "./DependenciesCategory";
import FormComponent from "./FormComponent";
import LiveFormPartions from "./LiveFormPartions";

export function SchemaType({
  Schema,
  editedRow,
  setEditedgRow,
  updatedData,
  actions,
}) {
  const categories = [
    { title: "React" },
    { title: "DevExpress" },
    { title: "Tailwind CSS" },
    { title: "Reactstrap" },
  ];
  console.log("====================================");
  console.log(Schema.schemaType, "Schema.schemaType");
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
