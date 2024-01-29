import React from 'react';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

 import APIHandling from '../../hooks/APIsFunctions/APIHandling';

   const PopupEditing = React.memo(({popupComponent: Popup, action, state, setResult,result, schema }) => (
    <Plugin>
      <Template name="popupEditing">
        <TemplateConnector>
          {(
            {
              rows,
              getRowId,
              addedRows,
              editingRowIds,
              createRowChange,
              rowChanges,
            },
            {
              changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
              stopEditRows, cancelAddedRows, cancelChangedRows,
            },
          ) => {
            const isNew = addedRows.length > 0;
            let editedRow;
            let rowId;
            let row=null ;
console.log(122222222222222222222222,action.routeAdderss)
            if (isNew) {
              rowId = 0;
              editedRow = addedRows[rowId];
            } else {
              [rowId] = editingRowIds;
              const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
              editedRow = { ...targetRow, ...rowChanges[rowId] };
            }
  
            const processValueChange = ({ target: { name, value } }) => {
              const changeArgs = {
                rowId,
                change: createRowChange(editedRow, value, name),
              };
              if (isNew) {
                changeAddedRow(changeArgs);
              } else {
                changeRow(changeArgs);
              }
            };

            
            const  applyChanges = async(event) => {
              const res = await APIHandling(action.routeAdderss,action.dashboardFormActionMethodType,editedRow);
              setResult(res)

              if(res.success===true)
              {
               row={...res.data,...editedRow}
              }
             
            };
            const cancelChanges = () => {
                row=null;
                
            };
  
            const open = editingRowIds.length > 0 || isNew;
            return (
              <Popup
                open={open}
                row={editedRow}
                onChange={processValueChange}
                onApplyChanges={applyChanges}
                onCancelChanges={cancelChanges}
                tableSchema={schema}
                errorResult={result}
                rows={state.rows}
                isNewRow={isNew}
                returnRowData={row}
              />
            );
          }}
        </TemplateConnector>
      </Template>
      <Template name="root">
        <TemplatePlaceholder />
        <TemplatePlaceholder name="popupEditing" />
      </Template>
    </Plugin>
  ));
  export default PopupEditing