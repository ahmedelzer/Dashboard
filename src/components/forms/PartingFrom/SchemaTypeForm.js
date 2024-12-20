import { SetReoute } from "../../../request";
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
  console.log("====================================");
  console.log(Schema.schemaType);
  console.log("====================================");
  const categories = [
    { title: "React" },
    { title: "DevExpress" },
    { title: "Tailwind CSS" },
    { title: "Reactstrap" },
  ];
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
    default:
      return (
        // <div>
        // <DependenciesCategory Schema={Schema} />
        <FormComponent
          tableSchema={Schema}
          row={{}}
          // errorResult={result}
          returnRow={() => {}}
        />
        // </div>
      );
    // return <div>{Schema.dashboardFormSchemaInfoDTOView.schemaHeader}</div>;
  }
}
