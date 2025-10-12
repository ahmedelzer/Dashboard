import { useContext, useEffect, useState } from "react";

import { FormContext } from "../../../contexts/Form";
import { BuildWSURL } from "../../hooks/APIsFunctions/BuildWSURL";
import { WSclass } from "../../hooks/FormsFunctions/WSclass";
import DrawPartionFrom from "../DynamicPopup/DrawPartionFrom";
import BaseTable from "../DynamicTable/BaseTable";
import PanelActions from "./PanelActions";

function DrawPartitionForms({ Schemas }) {
  const { getAction, selectedRow, setSelectedRow, mainSchema, subSchemas } =
    useContext(FormContext);

  // const [data, setData] = useState([{ invoice: {}, invoiceItems: [] }]);
  const [data, setData] = useState(null);
  const [mainID, setMainID] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  var WSClient;

  const CreateActionBody = (isNew, isMainSchema, schema, editedRow) => {
    if (isNew && isMainSchema) {
      return {
        [mainSchema.propertyName]: {},
        [schema.propertyName]: {},
      };
    } else if (isMainSchema) {
      return {
        entityID: `${mainID}`,
        patchJSON: editedRow,
      };
    } else if (isNew) {
      return {
        [schema.propertyName]: {},
      };
    } else {
      return {
        entityID: `${editedRow[schema.iDField]}`,
        patchJSON: editedRow,
      };
    }
  };
  useEffect(() => {
    const GetDataSources = () => {
      if (mainID) {
        WSClient = new WSclass(`${BuildWSURL(getAction, mainID)}`);
        // WSClient.connect();
        WSClient.ReciveMessages((datasources) => {
          let schemaDataSource = Schemas?.map(
            (data) => datasources[0][data?.dataSourceName]
          );

          setData(schemaDataSource);
        });
      }
    };

    if (selectedRow) {
      setMainID(selectedRow[mainSchema.idField]);
      GetDataSources();
    }
  }, [panelOpen]);
  return (
    <div>
      {mainSchema && (
        <DrawPartionFrom
          mainID={mainID}
          Schema={mainSchema}
          updatedData={data}
        />
      )}
      {subSchemas.length > 0 &&
        subSchemas.map((Schema) => (
          <div key={Schema?.dashboardFormSchemaID}>
            <DrawPartionFrom
              mainID={mainID}
              Schema={Schema}
              updatedData={data}
            />
          </div>
        ))}
    </div>
  );
}
export default DrawPartitionForms;
