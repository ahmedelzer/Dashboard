import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Table from '../../forms/Table';
import { DropDownBox } from 'devextreme-react';
import NativeDropdown from './CustomDropdown'; // Adjust the import path based on your file structure
import CustomDropdown from './CustomDropdown';


const ReadOnlyText = ({ value }) => (
  <div style={{ paddingRight: '5px' }}>
    <span>{value}</span>
  </div>
);


const PanelDropDown = ({ onValueChanged, value }) => (
  <DropDownBox
    dataSource={[{ text: 'Open Panel', value: true }]} // You can customize the items as needed
    displayExpr="text"
    valueExpr="value"
    value={value}
    onValueChanged={onValueChanged}
  />
);

const PanelTable = ({ testData, onRowDoubleClick }) => (
  <Table schema={testData} rowDoubleClick={onRowDoubleClick} isSearchingTable={false} />
);


const s = {
  "dashboardFormSchemaID": "270f513b-1788-4c01-879e-4526c990f899",
  "schemaType": "Table",
  "dashboardFormSchemaParameters": [
      {
          "dashboardFormSchemaParameterID": "bbc47b3c-baba-4c80-8a8e-50d9875a15d6",
          "dashboardFormSchemaID": "270f513b-1788-4c01-879e-4526c990f899",
          "isEnable": false,
          "parameterType": "text",
          "parameterField": "dashboardMenuCategoryId",
          "parameterTitel": "dashboard Menu Category Id",
          "lookupID": null,
          "lookupReturnField": null,
          "lookupDisplayField": null
      },
      {
          "dashboardFormSchemaParameterID": "38ad2bc8-7d4f-46a5-9a59-8a2104e960f4",
          "dashboardFormSchemaID": "270f513b-1788-4c01-879e-4526c990f899",
          "isEnable": true,
          "parameterType": "text",
          "parameterField": "dashboardMenuCategoryName",
          "parameterTitel": "dashboard Menu Category Name",
          "lookupID": null,
          "lookupReturnField": null,
          "lookupDisplayField": null
      }
  ]
}
export  function SearchingCellRender ({ data, value, onChange })  {
  const Enable = data.isEnable;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [PopupOpen, setPopupOpen] = useState(false)
  const handleSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
  };
  const panelContent = (
    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '400px' }}>
      {<Table schema={s}  isSearchingTable={false} setSelectedRow={setSelectedRow} />}
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
    console.log('Panel closed');
  };
  console.log('3333',selectedRow)
  return (
    <div className=' '>
      {/* Other components or content */}
      
      {/* Use the CustomDropdown component */}

      <CustomDropdown
        buttonText= {selectedRow.dashboardMenuCategoryName}
        displayField={selectedRow.dashboardMenuCategoryName}
        getField= {selectedRow.dashboardMenuCategoryId}
        panelContent={panelContent}
        onClose={handlePanelClose}
      />
    </div>
  );
};


