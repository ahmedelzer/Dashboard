import React, { useState, useReducer, useEffect, useMemo } from "react";
import {
  DataTypeProvider,
  VirtualTableState,
  createRowCache,
} from "@devexpress/dx-react-grid";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import { EditingState } from "@devexpress/dx-react-grid";
import Loading from "../../loading/Loading";
import {
  Grid,
  Table,
  PagingPanel,
  TableHeaderRow,
  VirtualTable,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-bootstrap4";
import TestApi from "../../hooks/APIsFunctions/TestApi";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { MdEdit } from "react-icons/md";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { FaCirclePlus } from "react-icons/fa6";

import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import DataCellRender from "../../hooks/FormsFunctions/DataCeller";
import PopupEditing from "../DynamicPopup/PopupEditing";
import Popup from "../DynamicPopup/Popup";
import { ImageTypeProvider, TypeProvider } from "./TypeProvider";
import BaseTable from "./BaseTable";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import { SetReoute, defaultProjectProxyRoute } from "../../../request";
const DynamicTable = ({
  schema,
  isSearchingTable,
  setSelectedRow = false,
  paging,
  setPanelOpen,
  selectionRow,
  addMessage = true,
  editMessage = true,
  deleteMessage = false,
  selection,
  setSelection,
  addSelectedList = false,
  PopupComponent = false,
}) => {
  const [result, setResult] = useState({});
  const {
    data: schemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRoute
  );

  SetReoute(schema.projectProxyRoute);

  const getAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const postAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
  const putAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Put"
    );
  const PopupComponentTable = ({ state }) => {
    return (
      <PopupEditing
        popupComponent={Popup}
        putAction={putAction}
        postAction={postAction}
        state={state}
        setResult={setResult}
        result={result}
        schema={schema}
        addSelectedList={addSelectedList}
      />
    );
  };

  return (
    <div className="card">
      <BaseTable
        key={schema.idField}
        schema={schema}
        selectionRow={selectionRow}
        addMessage={addMessage}
        editMessage={editMessage}
        deleteMessage={deleteMessage}
        isSearchingTable={isSearchingTable}
        setSelectedRow={setSelectedRow}
        paging={paging}
        setPanelOpen={setPanelOpen}
        popupComponent={PopupComponent ? PopupComponent : PopupComponentTable}
        getAction={getAction}
        selection={selection}
        setSelection={setSelection}
        addSelectedList={addSelectedList}
      />
    </div>
  );
};
export default DynamicTable;
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

// const  applyChanges = async(actionType) => {
//   if (isNew)  {
//   const res = await APIHandling(postAction.routeAdderss,postAction.dashboardFormActionMethodType,editedRow);
//   setResult(res)
//   console.log(123456789000000000000,state.rows);
//   console.log(res.data);
//   console.log(editedRow)

//   {/* console.log(typeof res.data.dashboardCategoryId) */}
//   if(res.success===true
//   ){
//   const New={...res.data,...editedRow}
//   console.log(New)
//   {/* const newRow={dashboardCategoryId:`${res.data.dashboardCategoryId}`,dashboardMenuCategoryName:editedRow.dashboardMenuCategoryName} */}
//     state.rows=[...state.rows,New]
//     cancelAddedRows({ rowIds });
//   }
//   }
//     else {
//     stopEditRows({ rowIds });
//     commitChangedRows({ rowIds });
//    }
//    console.log(rowIds)
//    {/* window.location.reload();  */}
// };
// const cancelChanges = () => {
//   if (isNew) {
//     cancelAddedRows({ rowIds });
//   } else {
//     stopEditRows({ rowIds });
//     cancelChangedRows({ rowIds });
//   }
// };

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
