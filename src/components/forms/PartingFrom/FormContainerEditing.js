import React from "react";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";

const FormContainerEditing = React.memo(
  ({
    formContainerComponent: FormContainer,
    postAction,
    putAction,
    state,
    setResult,
    result,
    schema,
  }) => (
    <Plugin>
      <Template name="formContainerEditing">
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
              editedRow = { ...addedRows[rowId] };
            } else {
              [rowId] = editingRowIds;
              const targetRow = rows.filter(
                (row) => getRowId(row) === rowId
              )[0];
              editedRow = { ...targetRow, ...rowChanges[rowId] };
            }

            const handleApplyChanges = async () => {
              const action = isNew ? postAction : putAction;
              const body = isNew
                ? editedRow
                : {
                    entityID: `${editedRow[schema.idField]}`,
                    patchJSON: editedRow,
                  };
              const res = await APIHandling(
                action.routeAddress,
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
                  const updatedRows = state.rows.map((row) =>
                    row[schema.idField] === editedRow[schema.idField]
                      ? newRow
                      : row
                  );
                  state.rows = updatedRows;
                  rowIds = [rowId];
                  stopEditRows({ rowIds });
                  cancelChangedRows({ rowIds });
                }
              }
            };

            const handleCancelChanges = () => {
              if (isNew) {
                cancelAddedRows({ rowIds });
              } else {
                rowIds = [rowId];
                stopEditRows({ rowIds });
                cancelChangedRows({ rowIds });
              }
            };

            const handleChange = (event) => {
              const { name, value, files } = event.target;
              // Handle input change
              // Your implementation here
            };

            return (
              <FormContainer
                row={editedRow}
                // onChange={handleChange}
                // onApplyChanges={handleApplyChanges}
                // onCancelChanges={handleCancelChanges}
                // tableSchema={schema}
                // errorResult={result}
                // rows={state.rows}
                // isNewRow={isNew}
                // returnRowData={null} // Modify this if you need to return row data
                tableSchema={schema}
              />
            );
          }}
        </TemplateConnector>
      </Template>
      <Template name="root">
        <TemplatePlaceholder />
        <TemplatePlaceholder name="formContainerEditing" />
      </Template>
    </Plugin>
  )
);

export default FormContainerEditing;
