import React, { useState } from "react";
import { Button } from "reactstrap";
import Table from "../../forms/DynamicTable/Table";
import { DropDownBox } from "devextreme-react";
import NativeDropdown from "./CustomDropdown"; // Adjust the import path based on your file structure
import CustomDropdown from "./CustomDropdown";
import useFetch from "../APIsFunctions/useFetch";
export function SearchingCellRender({ dataForm }) {
  const Enable = dataForm.isEnable;
  const lookupID = dataForm.lookupID;
  const data = useFetch(
    `/Dashboard/GetDashboardFormSchemaBySchemaID?DashboardFormSchemaID=${lookupID}`
  );
  const [selectedRow, setSelectedRow] = useState({});
  const [isPanelOpen, setPanelOpen] = useState(false);
  const panelContent = (
    <div className="drop-list text-center">
      {
        <Table
          schema={data.data}
          setPanelOpen={setPanelOpen}
          addMessage={false}
          editMessage={false}
          deleteMessage={false}
          key={lookupID}
          setSelectedRow={setSelectedRow}
        />
      }
    </div>
  );
  return (
    <div className=" ">
      {/* Other components or content */}

      {/* Use the CustomDropdown component */}

      <CustomDropdown
        buttonText={selectedRow[dataForm.lookupReturnField]}
        displayField={selectedRow[dataForm.lookupDisplayField]}
        panelContent={panelContent}
        isPanelOpen={isPanelOpen}
        setPanelOpen={setPanelOpen}
      />
    </div>
  );
}
