import { DateBox, RadioGroup, TextBox } from "devextreme-react";

export const dataCellRender = (propertyType,Enable,index) => (cellData) => {
  console.log(cellData)
  switch (propertyType) {
    case 'text':
      
        return <TextBox value={cellData.value} key={index} readOnly={!Enable} />;
    case 'datetime':
      return <DateBox value={new Date(cellData.value)} readOnly={!Enable} type="datetime" />;
    case 'date':
      return <DateBox value={new Date(cellData.value)} readOnly={!Enable} type="date" />;
    case 'boolean':
      return (
        <RadioGroup
          items={[
            { text: 'Yes', value: true },
            { text: 'No', value: false }
          ]}
          value={cellData.value}
          readOnly={!Enable}
        />
      );
    // Add cases for other property types
    default:
      return cellData.value;
  }
};