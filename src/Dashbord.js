import React, { useState, useEffect } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import TextBox from 'devextreme-react/text-box';
import DateBox from 'devextreme-react/date-box';
import SelectBox from 'devextreme-react/select-box';
import { RadioGroup } from 'devextreme-react/radio-group';

const dataCellRender = (propertyType) => (cellData) => {
  switch (propertyType) {
    case 'text':
      return <TextBox value={cellData.value} />;
    case 'datetime':
      return <DateBox value={new Date(cellData.value)} type="datetime" />;
    case 'date':
      return <DateBox value={new Date(cellData.value)} type="date" />;
    case 'boolean':
      return (
        <RadioGroup
          items={[
            { text: 'Yes', value: true },
            { text: 'No', value: false }
          ]}
          value={cellData.value}
        />
      );
    // Add cases for other property types
    default:
      return cellData.value;
  }
};

const sampleCityData = [
  {
    id: 1,
    CityName: 'City 1',
    time: '08:30:00',
    active: true,
  },
  {
    id: 2,
    CityName: 'City 2',
    time: '14:45:00',
    active: false,
  },
  {
    id: 3,
    CityName: 'City 3',
    time: '15:45:00',
    active: true,
  },
  // Add more data rows as needed
];

const App2 = () => {
  const dashboardItems = [
    {
      ItemName: 'City',
      formSchema: {
        properties: [
          {
            propertyName: 'id',
            propertyType: 'text',
          },
          {
            propertyName: 'CityName',
            propertyType: 'text',
          },
          {
            propertyName: 'time',
            propertyType: 'text',
          },
          {
            propertyName: 'active',
            propertyType: 'boolean',
          },
          // Add other properties...
        ],
      },
    },
    // Add other dashboard items...
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      {dashboardItems.map((item, index) => (
        <div key={index}>
          <h2>{item.ItemName}</h2>
          <DataGrid
            dataSource={sampleCityData}
            keyExpr="id"
            showBorders={true}
          >
            {item.formSchema.properties.map((property, propIndex) => (
              <Column
                key={propIndex}
                dataField={property.propertyName}
                caption={property.propertyName}
                cellRender={dataCellRender(property.propertyType)}
              />
            ))}
          </DataGrid>
        </div>
      ))}
    </div>
  );
};

export default App2;