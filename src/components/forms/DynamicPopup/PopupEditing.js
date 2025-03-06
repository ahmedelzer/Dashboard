import React from "react";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import { onApply } from "./OnApplay";

const PopupEditing = React.memo(
  ({
    popupComponent: Popup,
    postAction,
    putAction,
    state,
    setResult,
    result,
    schema,
    proxyRoute,
    specialActions,
  }) => {
    return (
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
              let rowIds = [0];
              if (isNew) {
                rowId = 0;
                editedRow = { ...addedRows[rowId], ...editedRow };
              } else {
                [rowId] = editingRowIds;
                const targetRow = rows.filter(
                  (row) => getRowId(row) === rowId
                )[0];
                editedRow = { ...targetRow, ...rowChanges[rowId] };
              }

              const ReturnRow = (updatedRow) => {
                editedRow = updatedRow();
              };
              const iDField = schema.idField;
              const onApplyChanges = async (e) => {
                e.preventDefault();
                const form = e.target;
                const formData = new FormData(form);
                const formJson = Object.fromEntries(formData.entries());
                const action = isNew ? postAction : putAction;
                console.log("====================================");
                console.log(formJson);
                console.log("====================================");
                //todo: make event on inputs of specialActions to url/id of row and in body set the value
                {
                  /* const apply = await onApply(
                  formJson,
                  iDField,
                  isNew,
                  action,
                  proxyRoute
                );
                setResult(apply);
                if (apply && apply.success === true) {
                  const newRow = { ...formJson, ...apply.data };
                  if (isNew) {
                    state.rows = [...state.rows, newRow];
                    cancelAddedRows({ rowIds });
                  } else {
                    const updatedRows = state.rows.map((row) => {
                      if (row[iDField] === formJson[iDField]) {
                        return newRow; // Replace the existing row with the updated newRow
                      }
                      return row;
                    });

                    // Update the state with the updated rows
                    state.rows = updatedRows;
                  }
                  rowIds = [rowId];
                  stopEditRows({ rowIds });
                  setResult({});
                  cancelChangedRows({ rowIds });
                } */
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
                setResult({});
              };
              const open = editingRowIds.length > 0 || isNew;
              return (
                <Popup
                  open={open}
                  row={editedRow}
                  onApplyChanges={onApplyChanges}
                  onCancelChanges={cancelChanges}
                  tableSchema={schema}
                  errorResult={result}
                  isNewRow={isNew}
                  returnRow={ReturnRow}
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
    );
  }
);
export default PopupEditing;
