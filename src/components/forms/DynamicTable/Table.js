import React, {
  useState,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import Popup, { PopupEditing } from '../DynamicPopup/Popup'
import {
  VirtualTableState,
  createRowCache,
} from '@devexpress/dx-react-grid';
import { EditingState } from '@devexpress/dx-react-grid';
import Loading from '../../loading/Loading'
import {
  Grid,
  Table,
  TableHeaderRow,
  VirtualTable,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import TestApi from '../../hooks/APIsFunctions/TestApi'
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Container, Row, Col, Label, FormGroup, Input,
} from 'reactstrap';
import { MdEdit } from "react-icons/md";
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import useFetch from '../../hooks/APIsFunctions/useFetch';
import { FaCirclePlus } from "react-icons/fa6";
import { buildApiUrl } from '../../hooks/APIsFunctions/BuildApiUrl';
 import APIHandling from '../../hooks/APIsFunctions/APIHandling';
import DataCellRender from '../../hooks/FormsFunctions/DataCeller';
import { DataGrid } from 'devextreme-react';

const VIRTUAL_PAGE_SIZE = 50;
const MAX_ROWS = 50000;
const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales';
const buildQueryString = (skip, take) => (
  `${URL}?requireTotalCount=true&skip=${skip}&take=${take}`
);

const getRowId = row => row.dashboardMenuCategoryId;
let api =[
   
{dashboardCategoryName: 'Dashboard Models k', dashboardMenuItems: Array(0)},

{dashboardCategoryName: 'basic modules', dashboardMenuItems: Array(0)},

{dashboardCategoryName: 'tytuitutiu', dashboardMenuItems: Array(0)},

,{dashboardCategoryName: 'Dashboard Models', dashboardMenuItems: Array(2)}

,{dashboardCategoryName: 'sss', dashboardMenuItems: Array(0)}

,{dashboardCategoryName: 'ssss', dashboardMenuItems: Array(0)}

,{dashboardCategoryName: 'Dashboard Mssodels', dashboardMenuItems: Array(0)}
]
const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: '',
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
const dataSourceAPI =(query,skip, take) =>  buildApiUrl(query, 
  {
  pageIndex: (skip/take)+1,
  pageSize: take
 });
 const DynamicTable = ({ schema,isSearchingTable,rowDoubleClick=null }) => {

  //s = schema[0];

  console.log(schema)
  const { data } = useFetch(`/Dashboard/GetDashboardSchemaActionsBySchemaID?DashboardSchemaID=${schema.dashboardFormSchemaID}`);
  
  const schemaActions = data;



const getAction = schemaActions&&schemaActions.filter(action => action.dashboardFormActionMethodType === 'Get')[0];
const postAction = schemaActions&&schemaActions.filter(action => action.dashboardFormActionMethodType === 'Post')[0];
const putAction = schemaActions&&schemaActions.filter(action => action.dashboardFormActionMethodType === 'Put')[0];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns, setColumns] = useState([]);
  const [datapost, setData] = useState({});
  const [result, setResult] = useState({});


// function APIHandling(url, methodType, sendBody) {
//     // useEffect(()=>{
//     //   const PostApi=async ()=>{
//         var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   var raw = JSON.stringify({
//     sendBody
//   });
  
//   var requestOptions = {
//     method: methodType,
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };
  
//   fetch("http://ihs.ddnsking.com/api/"+url, requestOptions)
//     .then(response => response.text())
//     .then(result =>  setData(result))
//     .catch(error =>  setError(error));
    
//       }
    //   PostApi();
    // },[url,methodType,sendBody])
  
console.log(data)
  useEffect(() => {
    // Assuming schema[0].dashboardFormSchemaParameters is an array of parameters
    const dynamicColumns = schema?.dashboardFormSchemaParameters?.map(param => ({
      name: param.parameterField,
      title: param.parameterTitel,
      getCellValue: row => row[param.parameterField],
    })) || [];

    setColumns([
      ...dynamicColumns,
    ]);
  }, [schema]);


  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE));
  const updateRows = (skip, count, newTotalCount) => {
    dispatch({
      type: 'UPDATE_ROWS',
      payload: {
        skip,
        rows: cache.getRows(skip, count),
        totalCount: newTotalCount < MAX_ROWS ? newTotalCount : MAX_ROWS,
      },
    });
  };

  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
  };

  const loadData = () => {
    const {
      requestedSkip, take, lastQuery, loading,
    } = state;
    const query = dataSourceAPI(getAction,requestedSkip, take);
    if (query !== lastQuery && !loading) {
      const cached = cache.getRows(requestedSkip, take);
      if (cached.length === take) {
        updateRows(requestedSkip, take);
      } else {
        dispatch({ type: 'FETCH_INIT' });
        fetch(query)
          .then(response => response.json())
          .then(({ dataSource, count  }) => {
            cache.setRows(requestedSkip, dataSource);
            updateRows(requestedSkip, take, count);
          })
          .catch(() => dispatch({ type: 'REQUEST_ERROR' }));
        // var response =  fetchDataWithHandling(query, 'GET');
        // response === 'REQUEST_ERROR'? (dispatch({ type: 'REQUEST_ERROR' })): 
        // (
        //   cache.setRows(requestedSkip, response.dataSource);
        //     updateRows(requestedSkip, take, response.count);
        // )
      }
      dispatch({ type: 'UPDATE_QUERY', payload: query });
    }
  };

  useEffect(() => loadData());
  
  const {
    rows, skip, totalCount, loading,
  } = state;
  //commit 
  // let commitChangedRow=(obj)=>{
  //         const res = await APIHandling(postAction.routeAdderss,postAction.dashboardFormActionMethodType,editedRow);
  //     setResult(res)
  //     console.log(123456789000000000000,state.rows);
  //     console.log(res.data);
  //     console.log(editedRow)
      
  //     {/* console.log(typeof res.data.dashboardCategoryId) */}
  //     if(res.success===true
  //     ){
  //     const New={...res.data,...editedRow}
  //     console.log(New)
  //     {/* const newRow={dashboardCategoryId:`${res.data.dashboardCategoryId}`,dashboardMenuCategoryName:editedRow.dashboardMenuCategoryName} */}
  //       state.rows=[...state.rows,New]
  //       cancelAddedRows({ rowIds });
  //     }
      
  // }
  // const commitAddedRow=()=>{
  //   const res = await APIHandling(postAction.routeAdderss,postAction.dashboardFormActionMethodType,editedRow);
  //     setResult(res)
  //     console.log(123456789000000000000,state.rows);
  //     console.log(res.data);
  //     console.log(editedRow)
      
  //     {/* console.log(typeof res.data.dashboardCategoryId) */}
  //     if(res.success===true
  //     ){
  //     const New={...res.data,...editedRow}
  //     console.log(New)
  //     {/* const newRow={dashboardCategoryId:`${res.data.dashboardCategoryId}`,dashboardMenuCategoryName:editedRow.dashboardMenuCategoryName} */}
  //       state.rows=[...state.rows,New]
  //       cancelAddedRows({ rowIds });
  //     }
  // }
  // const PopupEditing = React.memo(({ popupComponent: Popup }) => (
  //   <Plugin>
  //     <Template name="popupEditing">
  //       <TemplateConnector>
  //         {(
  //           {
  //             rows,
  //             getRowId,
  //             addedRows,
  //             editingRowIds,
  //             createRowChange,
  //             rowChanges,
  //           },
  //           {
  //             changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
  //             stopEditRows, cancelAddedRows, cancelChangedRows,
  //           },
  //         ) => {
  //           const isNew = addedRows.length > 0;
  //           let editedRow;
  //           let rowId;
  //           let Error;
  //           if (isNew) {
  //             rowId = 0;
  //             editedRow = addedRows[rowId];
  //           } else {
  //             [rowId] = editingRowIds;
  //             const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
  //             editedRow = { ...targetRow, ...rowChanges[rowId] };
  //           }
  
  //           const processValueChange = ({ target: { name, value } }) => {
  //             const changeArgs = {
  //               rowId,
  //               change: createRowChange(editedRow, value, name),
  //             };
  //             if (isNew) {
  //               changeAddedRow(changeArgs);
  //             } else {
  //               changeRow(changeArgs);
  //             }
  //             console.log(144)
  //             console.log(editedRow)
  //           };
  //           const rowIds = isNew ? [0] : editingRowIds;
            
  //           const  applyChanges = async(actionType) => {
  //             if (isNew)  {
  //             const res = await APIHandling(postAction.routeAdderss,postAction.dashboardFormActionMethodType,editedRow);
  //             setResult(res)
  //             console.log(123456789000000000000,state.rows);
  //             console.log(res.data);
  //             console.log(editedRow)
              
  //             {/* console.log(typeof res.data.dashboardCategoryId) */}
  //             if(res.success===true
  //             ){
  //             const New={...res.data,...editedRow}
  //             console.log(New)
  //             {/* const newRow={dashboardCategoryId:`${res.data.dashboardCategoryId}`,dashboardMenuCategoryName:editedRow.dashboardMenuCategoryName} */}
  //               state.rows=[...state.rows,New]
  //               cancelAddedRows({ rowIds });
  //             }
  //             }
  //               else {
  //               stopEditRows({ rowIds });
  //               commitChangedRows({ rowIds }); 
  //              }
  //              console.log(rowIds)
  //              {/* window.location.reload();  */}
  //           };
  //           const cancelChanges = () => {
  //             if (isNew) {
  //               cancelAddedRows({ rowIds });
  //             } else {
  //               stopEditRows({ rowIds });
  //               cancelChangedRows({ rowIds });
  //             }
  //           };
  
  //           const open = editingRowIds.length > 0 || isNew;
  //           return (
  //             <Popup
  //               open={open}
  //               row={editedRow}
  //               onChange={processValueChange}
  //               onApplyChanges={applyChanges}
  //               onCancelChanges={cancelChanges}
  //               tableSchema={schema}
  //               result={result}
  //               rows={state.rows}
  //             />
  //           );
  //         }}
  //       </TemplateConnector>
  //     </Template>
  //     <Template name="root">
  //       <TemplatePlaceholder />
  //       <TemplatePlaceholder name="popupEditing" />
  //     </Template>
  //   </Plugin>
  // ));
  
  const commitChanges = ({ added, changed }) => {
    console.log('t','done')
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    // setRows(changedRows);
   
  };
  const CustomRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      onDoubleClick={() => rowDoubleClick(row)}
      style={{ cursor: 'pointer' }}
    />
  );
  
  useEffect(()=>{
    if(!rows){
      return <Loading/>
    }
  },[rows])
  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        i18nIsDynamicList={true}
        
      >
        <EditingState
          onCommitChanges={commitChanges}
        />
        <Table rowComponent={CustomRow}/>
        
        <TableEditColumn
        messages={{
          addCommand: '+',  
          editCommand: <MdEdit/>
        }}
          showAddCommand={!isSearchingTable}
          showEditCommand={!isSearchingTable}
        />
        <TableHeaderRow />
        {/* <PopupEditing popupComponent={Popup} action={postAction} state={state} setResult={setResult} result={result} schema={schema} /> */}
      </Grid>
    </div>
  );
};
export default DynamicTable;