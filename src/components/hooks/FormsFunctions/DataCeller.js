
import React, { useState } from 'react';
import { DateBox, DropDownBox, RadioGroup } from 'devextreme-react';
import { FormGroup, Label } from 'reactstrap';
import {SearchingCellRender} from '../FormsFunctions/SearchingCellRender';
import DisplayErorr from './DisplayError'

function FieldGroup({ label,Title,data,focus,setTital,setfocus, ...props }) {
  console.log('aaaaaa',Title)
  const handleChange = (event) => {
    setfocus(true);
  };
  const style=()=>{
    if(Title!==data.parameterTitel&&focus===false){
      return (' focus:shadow-[0_0_0_0.2rem_red] focus:border-red-900');
    }else{
      return ''
    }
  }

  return (
    <FormGroup>
      <Label>{label}</Label>
      <input {...props}
      onInput={handleChange}
      className={`${style()} form-control`} />
    </FormGroup>
  );
}
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
const TextParameter = ({ data, value, onChange, Enable ,dataError}) => {
  const [Title,settital] = useState(`${data.parameterTitel}`);
  const [focus,setFocus] = useState(false);

  return(
  <div>
    <DisplayErorr dataError={dataError} setTital={settital} data={data}/>
  <FieldGroup
    type="text"
    required={Enable}
    placeholder={data.parameterTitel}
    value={value}
    title={Title}
    setTital={settital}
    Title={Title}
    focus={focus}
    setfocus={setFocus}
    data={data}
    name={data.parameterField}
    onChange={onChange}
    readOnly={!Enable}
  />
  </div>
  )
}
;
const DateTimeParameter = ({ value, Enable }) => (
  <DateBox value={new Date(value)} readOnly={!Enable} type="datetime" />
);

const DateParameter = ({ value, Enable }) => (
  <DateBox value={new Date(value)} readOnly={!Enable} type="date" />
);

const BooleanParameter = ({ value, onChange, Enable }) => (
  <RadioGroup
    items={[
      { text: 'Yes', value: true },
      { text: 'No', value: false },
    ]}
    value={value}
    onValueChanged={onChange}
    readOnly={!Enable}
  />
);


export default function DataCellRender({ data, value, onChange,dataError }) {
  const Enable = data.isEnable;
  console.log(1222344,dataError)
  if (data.lookupID === null) {
    switch (data.parameterType) {
      case 'text':
        return <TextParameter dataError={dataError}  data={data} value={value} onChange={onChange} Enable={Enable} />
      case 'datetime':
        return <DateTimeParameter value={value} Enable={Enable} />;
      case 'date':
        return <DateParameter value={value} Enable={Enable} />;
      case 'boolean':
        return <BooleanParameter value={value} onChange={onChange} Enable={Enable} />;
      // Add cases for other property types
      default:
        return value;
    }
  } else {
    
    return <SearchingCellRender data={data}
    value={value}
    onChange={onChange}
    popupTableData={ s } />;
  }
}
