import React from 'react';
import { DateBox, DropDownBox, RadioGroup } from 'devextreme-react';
import { FormGroup, Label } from 'reactstrap';
import Table from '../../forms/Table'
import { useState } from 'react';
function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <input {...props} className="form-control" />
    </FormGroup>
  );
}
const handleRowDoubleClick = (row) => {
  console.log('Double-clicked row:', row);
  // Handle double-click on the row
};
export default function dataCellRender({ data, value, onChange,dataeror }) {
  let dataerors={"type":"https://tools.ietf.org/html/rfc7231#section-6.5.1","title":"One or more validation errors occurred.","status":400,"traceId":"00-1184b5a34c4fbbad0b92c62cabfe86d7-c9eeb0bb58f34e3f-00","errors":[{f:"DashboardMenuCategoryName",err:"The DashboardMenuCategoryName field is required."}]}
  function displayErorr(){
    if (dataerors !== null && dataerors.errors !== null) {
      const filteredErrors = dataerors.errors.filter(err => err.f==='DashboardMenuCategoryName');
      // Use filteredErrors as needed
      console.log(filteredErrors)
      if(filteredErrors.length>0){
        return (
          <p className=' text-[12px] font-bold text-[red] p-0 mb-[-10px]'>err{filteredErrors[0].err}</p>
        )
      };
    }    
    return null;
  }
  // displayErorr();
  const Enable = data.isEnable;
  console.log(data.lookupID)
  if(data.lookupID===null)
  {switch (data.parameterType) {
    case 'text':
      return (
        <div>
        {displayErorr()}
        <FieldGroup
          type="text"
          placeholder={data.parameterTitel}
          value={value}
          title={data.parameterTitel}
          name={data.parameterField}
          onChange={onChange}
          readOnly={!Enable}
        />
        </div>
      );
    case 'datetime':
      return <DateBox value={new Date(value)} readOnly={!Enable} type="datetime" />;
    case 'date':
      return <DateBox value={new Date(value)} readOnly={!Enable} type="date" />;
    case 'boolean':
      return (
        <RadioGroup
          items={[
            { text: 'Yes', value: true },
            { text: 'No', value: false }
          ]}
          value={value}
          onValueChanged={onChange}
          readOnly={!Enable}
        />
      );
    // Add cases for other property types
    default:
      return value;
    }
  }
      else{
        let testData = {
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

        return  <DropDownBox
        valueExpr="ID"
        displayExpr="name"
        placeholder="Select a value..."
        showClearButton={true}
      >
          <Table schema={testData} rowDoubleClick={handleRowDoubleClick}  isSearchingTable = {true}/>
        </DropDownBox> 
      }
}
