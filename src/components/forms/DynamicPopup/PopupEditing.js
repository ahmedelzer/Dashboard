import React, { useContext, useEffect, useState } from "react";

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
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";
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
    addSelectedList,
  }) => {
    // const [editedRow, setEditedRow] = useState({});
    // function ExtractRow(){
    //   const isNew = addedRows.length > 0;
    //           let rowId;
    // if (isNew) {
    //   rowId = 0;
    //   editedRow = {};
    // } else {
    //   [rowId] = editingRowIds;
    //   const targetRow = rows.filter(
    //     (row) => getRowId(row) === rowId
    //   )[0];
    //   editedRow = {
    //     ...targetRow,
    //   };
    // }
    // }

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

              const callback = (updatedRow) => {
                editedRow = updatedRow();
                console.log("editedRow call", editedRow);
              };
              const iDField = schema.idField;
              const onApplyChanges = async () => {
                onApply(
                  editedRow,
                  state,
                  iDField,
                  isNew,
                  setResult,
                  postAction,
                  putAction
                );

                rowIds = [rowId];
                stopEditRows({ rowIds });
                setResult({});
                cancelChangedRows({ rowIds });
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

              {
                /* const open = isSelectionRow ? true : false; */
              }
              const open = editingRowIds.length > 0 || isNew;
              return (
                <Popup
                  open={open}
                  row={editedRow}
                  onApplyChanges={onApplyChanges}
                  onCancelChanges={cancelChanges}
                  tableSchema={schema}
                  errorResult={result}
                  rows={state.rows}
                  isNewRow={isNew}
                  callback={callback}
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
