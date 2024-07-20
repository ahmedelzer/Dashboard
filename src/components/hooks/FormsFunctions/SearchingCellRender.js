import React, { useState } from "react";
import { Button } from "reactstrap";
import Table from "../../forms/DynamicTable/Table";
import { DropDownBox } from "devextreme-react";
import NativeDropdown from "./CustomDropdown"; // Adjust the import path based on your file structure
import CustomDropdown from "./CustomDropdown";
import useFetch from "../APIsFunctions/useFetch";
export function SearchingCellRender({ dataform, value, onChange, lookupID }) {
  const Enable = dataform.isEnable;
  console.log("lookupId", lookupID);
  const data = useFetch(
    `/Dashboard/GetDashboardFormSchemaBySchemaID?DashboardFormSchemaID=${lookupID}`
  );
  console.log("datasearching", data);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isPanelOpen, setPanelOpen] = useState(false);
  const handleSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
  };
  const panelContent = (
    <div className="drop-list text-center">
      {
        <Table
          schema={data.data}
          className=" "
          setPanelOpen={setPanelOpen}
          addMessage={false}
          editMessage={false}
          deleteMessage={false}
          key={lookupID}
          setSelectedRow={setSelectedRow}
        />
      }
      <p>Panel Content Here</p>
    </div>
  );

  // const handleRowDoubleClick = (row) => {
  //   setSelectedRow(row);
  //   setPopupOpen(false);
  // };

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handlePanelClose = () => {
    // Handle the panel close event
    console.log("Panel closed");
  };
  console.log("====================================");
  console.log(data.data);
  console.log(dataform);
  console.log("====================================");
  return (
    <div className=" ">
      {/* Other components or content */}

      {/* Use the CustomDropdown component */}

      <CustomDropdown
        buttonText={selectedRow[dataform.lookupReturnField]}
        displayField={selectedRow[dataform.lookupDisplayField]}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        dataSource={data.data}
        panelContent={panelContent}
        onClose={handlePanelClose}
        isPanelOpen={isPanelOpen}
        setPanelOpen={setPanelOpen}
      />
    </div>
  );
}
