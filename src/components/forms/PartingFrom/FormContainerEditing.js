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
            console.log("====================================");
            console.log(rows, 17777777777777);
            console.log("====================================");
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
                tableSchema={schema}
                // leftSelectionContext={leftSelectionContext}
                // isSubset={isSubset}
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
