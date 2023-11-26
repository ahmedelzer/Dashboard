import React ,{ useCallback, Suspense, useReducer, useState} from 'react';
// // // import TextBox from 'devextreme-react/text-box';
// // // import DateBox from 'devextreme-react/date-box';
// // // import { VirtualTable } from '@devexpress/dx-react-grid-material-ui';
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
      {/* <DropDownBox
              valueExpr="ID"
              displayExpr="name"
              placeholder="Select a value..."
              showClearButton={true}
            >
        <Switch 
        onValueChanged={onValueChanged}
        value={true}
        width={80}
        rtlEnabled={true}
        hint={hintMessage}

        /> */}
<DataGrid
      className={'dx-card wide-card'}
      dataSource={dataSource}
      // showBorders={false}
      focusedRowEnabled={true}
      defaultFocusedRowIndex={0}
      columnAutoWidth={true}
      columnHidingEnabled={true}
      onCellClick={Console}
      // onScroll={()=>setscroll(scorll+1)}
      // width={1450}
      // loadPanel={true}
      // customizeColumns={70}
      // onContentReady={false}
      // height={1000}
      showBorders={true}
      height={440}
      // keyExpr="id"
      // customizeColumns={customizeColumns}
    >
       {/* <VirtualTableState
          loading={loading}
          totalRowCount={totalCount}
          pageSize={VIRTUAL_PAGE_SIZE}
          skip={skip}
          getRows={getRemoteRows}
        /> */}
      <Paging enabled={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            // allowDeleting={true}
            allowAdding={true} />
                    
      {/* <Paging
      pageSize={50}
      pageIndex={currentPage - 1}
      defaultPageIndex={50}
      enabled={false}
      onPageSizeChange={(e) => setPageSize(e.component.option('value'))}
      onPageIndexChange={(e) => setCurrentPage(e.component.option('pageIndex') + 1)}
      /> */}
                <Scrolling mode='virtual'/>
        <LoadPanel enabled={true} />
        <FilterRow visible={true} />
        <Selection mode="single" />
        <Paging enabled={true} />

      <Column dataField={'Task_ID'} width={90} hidingPriority={2} />
      <Column
        dataField={'Task_Subject'}
        width={190}
        caption={'Subject'}
        hidingPriority={8}
      />
      <Column
        dataField={'Task_Status'}
        caption={'Status'}
        hidingPriority={6}
      />
      <Column
        dataField={'Task_Priority'}
        caption={'Priority'}
        hidingPriority={5}
      >
      </Column>
      <Lookup dataSource={priorities} displayExpr="Name" valueExpr="ID" />
      <Column
        dataField={'ResponsibleEmployee.Employee_Full_Name'}
        caption={'Assigned To'}
        allowSorting={false}
        hidingPriority={7}
      />
      <Column
        dataField={'Task_Start_Date'}
        caption={'Start Date'}
        dataType={'date'}
        hidingPriority={3}
      />
      <Column
        dataField={'Task_Due_Date'}
        caption={'Due Date'}
        dataType={'date'}
        hidingPriority={4}
      />
      <Column
        dataField={'Task_Priority'}
        caption={'Priority'}
        name={'Priority'}
        hidingPriority={1}
      />
      <Column
        dataField={'Task_Completion'}
        caption={'Completion'}
        hidingPriority={0}
      />
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
  