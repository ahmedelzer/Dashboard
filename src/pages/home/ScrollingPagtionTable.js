import React ,{ useCallback, Suspense, useReducer, useState} from 'react';
import {
  VirtualTableState,
} from '@devexpress/dx-react-grid';
import { RadioGroup } from 'devextreme-react/radio-group';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
  Scrolling,
  LoadPanel,
  Editing,
  Selection
} from 'devextreme-react/data-grid';
import { DropDownBox} from 'devextreme-react';
import { Switch } from "devextreme-react/switch";
import { dataCellRender } from './DataCeller';

  const App2 = () => {
  const onValueChanged = useCallback((e) => {
    // ...
    const stateLabel = e.value ? "ON" : "OFF";
    notify(`The component is switched ${stateLabel}`); 
}, []);
const [hintMessage, setHintMessage] = useState("Click to switch on");
const VIRTUAL_PAGE_SIZE = 100;
const MAX_ROWS = 50000;
const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales';
const getRowId = row => row.Id;
const buildQueryString = (skip, take) => `${URL}?skip=${skip}&take=${take}`;
const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: '',
};
const [state, dispatch] = useReducer(reducer, initialState);
const getRemoteRows = (requestedSkip, take) => {
  dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
};
function reducer(state, { type, payload }) {
  switch (type) {
    case 'UPDATE_ROWS':
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case 'START_LOADING':
      return {
        ...state,
        requestedSkip: payload.requestedSkip,
        take: payload.take,
      };
    case 'REQUEST_ERROR':
      return {
        ...state,
        loading: false,
      };
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_QUERY':
      return {
        ...state,
        lastQuery: payload,
      };
    default:
      return state;
  }
}
console.log()
const {
  rows, skip, totalCount, loading,
} = state;
function Console(e){
  console.log(e)
}
console.log(dataSource)
  return (
    <React.Fragment>
    <h2 className={'content-block'}>tasks</h2>
    <Suspense fallback={<div>Loading...</div>}>
<DataGrid
      className={'dx-card wide-card'}
      dataSource={dataSource}
      // showBorders={false}
      focusedRowEnabled={true}
      defaultFocusedRowIndex={0}
      columnAutoWidth={true}
      columnHidingEnabled={true}
      onCellClick={Console}
      showBorders={true}
      height={440}
    >
      <Paging enabled={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            // allowDeleting={true}
            allowAdding={true} />
                    
                <Scrolling mode=' ro'wRenderingMode="" />
        <LoadPanel enabled={true} />
        <FilterRow visible={true} />
        <Selection mode="single" />
        <Paging enabled={true} />
        {data?.map((item, index) => (
        <div key={index}>
          <h2>{item.schemaType}</h2>
          <Switch
        onValueChanged={onValueChanged}
        value={true}
        width={80}
        rtlEnabled={true}
        />
          <DataGrid
            dataSource=
            {datacatgory.data}
            showBorders={true}
            allowColumnReordering={false}
            key={index}
          >
            <FilterRow visible={true} />
        <Selection mode="single" />
                <Scrolling mode='virtual' rowRenderingMode="" />
                <Paging enabled={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            allowAdding={true} />
              
            {item?.dashboardFormSchemaParamters?.map((property, propIndex) => (
              
              <Column
                key={property.dashboardFormSchemaID}
                dataField={property.parameterField}
                caption={property.parameterTitel}
                allowEditing={false}
                cellRender={ dataCellRender(property.parameterType,property.isEnable,propIndex)}
              />
              ))}
              <Lookup dataSource={item.parameterField} displayExpr="Name" valueExpr="ID" />
          </DataGrid>
        </div>
      ))}

    </DataGrid>
            {/* </DropDownBox> */}
    </Suspense>
    
  </React.Fragment>
    );
  };
export default App2;

const dataSource = {
  store: {
    type: 'odata',
    key: 'Task_ID',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
  },
  expand: 'ResponsibleEmployee',
  select: [

    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Due_Date',
    'Task_Status',
    'Task_Priority',
    'Task_Completion',
    'ResponsibleEmployee/Employee_Full_Name'
  ]
};

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];