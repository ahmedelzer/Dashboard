import React, { useContext } from "react";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import { LanguageContext } from "../../../contexts/Language";

const PopupEditing = React.memo(
  ({
    popupComponent: Popup,
    postAction,
    putAction,
    state,
    setResult,
    result,
    schema,
  }) => (
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
              changeRow,
              changeAddedRow,
              commitChangedRows,
              commitAddedRows,
              stopEditRows,
              cancelAddedRows,
              cancelChangedRows,
            }
          ) => {
            const isNew = addedRows.length > 0;
            let editedRow;
            let rowId;
            let row = null;
            let rowIds = [0];

            if (isNew) {
              rowId = 0;
              editedRow = addedRows[rowId];
              {
                /* { ...addedRows[rowId], ...editedRow }; */
              }
            } else {
              [rowId] = editingRowIds;
              const targetRow = rows.filter(
                (row) => getRowId(row) === rowId
              )[0];
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
            const iDField = schema.idField;
            const onApplyChanges = async () => {
              const action = isNew ? postAction : putAction;
              //const dataEditerow = ;
              const body = isNew
                ? editedRow
                : {
                    entityID: `${editedRow[iDField]}`,
                    ...{ patchJSON: editedRow },
                  };
              console.log("body", body);
              const res = await APIHandling(
                action.routeAdderss,
                action.dashboardFormActionMethodType,
                body
              );
              setResult(res);

              if (res.success) {
                const newRow = { ...res.data, ...editedRow };
                if (isNew) {
                  state.rows = [...state.rows, newRow];
                  cancelAddedRows({ rowIds });
                } else {
                  state.rows.find((row) => row === newRow);
                  rowIds = [rowId];
                  stopEditRows({ rowIds });
                  cancelChangedRows({ rowIds });
                }
                // Check if the row already exists in state.rows based on the ID field
                {
                  /* const existingRowIndex = state.rows.findIndex(row => row[iDField] === newRow[iDField]);

        if (existingRowIndex !== -1) {
            // If the row exists, update it in the state
            const updatedRows = [...state.rows];
            updatedRows[existingRowIndex] = newRow;
            //setState({ ...state, rows: updatedRows });
        } else {
            // If the row doesn't exist, add it to the state
            //setState({ ...state, rows: [...state.rows, newRow] });
        } */
                }

                // Assuming cancelAddedRows is a function to cancel added rows
              }
            };
            const cancelChanges = () => {
              if (isNew) {
                cancelAddedRows({ rowIds });
              } else {
                rowIds = [rowId];

                stopEditRows({ rowIds });
                cancelChangedRows({ rowIds });
              }
            };
            const open = editingRowIds.length > 0 || isNew;
            return (
              <Popup
                open={open}
                row={editedRow}
                onChange={processValueChange}
                onApplyChanges={onApplyChanges}
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
  )
);
export default PopupEditing;
