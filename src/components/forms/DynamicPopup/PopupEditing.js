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
            let base64;
            let img = null;
            let rowId;
            let row = null;
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
            const handleCombinedChange = async (
              event,
              selectedOption,
              base64,
              setimg,
              setbase64,
              imageUrl,
              seterror,
              webcamRef,
              setCapturedImage
            ) => {
              const { name, value, files } = event.target;

              // Handle file input change

              if (files && selectedOption === "file") {
                const file = files[0];
                setimg(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  let base64Data = reader.result;
                  const [, base64String] = base64Data.split(";base64,"); // Split after "data:image/jpeg;base64,"
                  setbase64(base64String);
                  const changeArgs = {
                    rowId,
                    change: createRowChange(editedRow, base64String, name),
                  };
                  if (isNew) {
                    changeAddedRow(changeArgs);
                    console.log("added row", editedRow);
                  } else {
                    changeRow(changeArgs);
                  }
                };
              }
              // Handle regular input change
              else if (value.startsWith("http") || selectedOption === "url") {
                try {
                  const response = await fetch(imageUrl);
                  if (response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.startsWith("image")) {
                      const blob = await response.blob();
                      const reader = new FileReader();
                      setimg(blob);
                      reader.readAsDataURL(blob);
                      reader.onload = () => {
                        const base64Data = reader.result; // Extract base64 string from result
                        const [, base64String] = base64Data.split(";base64,");
                        setbase64(base64String);
                        const changeArgs = {
                          rowId,
                          change: createRowChange(
                            editedRow,
                            base64String,
                            name
                          ),
                        };
                        if (isNew) {
                          changeAddedRow(changeArgs);
                          console.log("added row", editedRow);
                        } else {
                          changeRow(changeArgs);
                        }
                      };
                    } else {
                      seterror("URL does not point to an image");
                      console.error("URL does not point to an image");
                      // Handle error: URL does not point to an image
                    }
                  } else {
                    console.error("Failed to fetch image:", response.status);
                    // Handle error: Failed to fetch image
                  }
                } catch (error) {
                  console.error("Error fetching image:", error);
                  seterror(error);
                }
              } else if (value.startsWith("data:image") || webcamRef) {
                const imageSrc = webcamRef.current.getScreenshot();
                setCapturedImage(imageSrc);
                //setimg(imageSrc);
                // Convert the captured image to base64
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const image = new Image();
                image.src = imageSrc;
                image.onload = () => {
                  canvas.width = image.width;
                  canvas.height = image.height;
                  ctx.drawImage(image, 0, 0);
                  const base64Data = canvas.toDataURL("image/jpeg");
                  const [, base64String] = base64Data.split(";base64,");
                  setbase64(base64String);
                  // console.log("Base64 Image:", base64Data);

                  const changeArgs = {
                    rowId,
                    change: createRowChange(editedRow, base64String, name),
                  };
                  if (isNew) {
                    changeAddedRow(changeArgs);
                    console.log("added row", editedRow);
                  } else {
                    changeRow(changeArgs);
                  }
                };
              } else {
                const changeArgs = {
                  rowId,
                  change: createRowChange(editedRow, value, name),
                };
                if (isNew) {
                  changeAddedRow(changeArgs);
                  console.log("added row", editedRow);
                } else {
                  changeRow(changeArgs);
                }
              }
              console.log(editedRow);
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
                img={img}
                onChange={handleCombinedChange}
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
