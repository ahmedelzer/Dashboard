import React, { useState } from "react";
import FormContainer from "../DynamicPopup/FormContainer";

function LiveFormPartions({ Schema, data, editedRow, setEditedgRow }) {
  const [rowID, setRowID] = useState("");
  const [state, setState] = useState("");
  const changeAddedRow = ({ rowId, change }) => {
    setState((prevState) => {
      // Get the current addedRows array
      const currentAddedRows = [...prevState.addedRows];

      // Find the index of the row with the specified rowId in the addedRows array
      const rowIndex = currentAddedRows.findIndex((row) => row.rowId === rowId);

      if (rowIndex !== -1) {
        // If the row with the specified rowId exists, update it with the new changes
        currentAddedRows[rowIndex] = {
          ...currentAddedRows[rowIndex],
          ...change,
        };
      } else {
        // If the row with the specified rowId doesn't exist, add it to the addedRows array
        currentAddedRows.push({ rowId, ...change });
      }

      // Update the state with the modified addedRows array
      return { ...prevState, addedRows: currentAddedRows };
    });
  };

  const createRowChange = (editedRow, value, name) => {
    setEditedgRow({ ...editedRow, [name]: value });
    return {
      ...editedRow,
    };
  };
  const handleCombinedChange = async (event) => {
    const { name, value } = event.target;
    setRowID(data[Schema.iDField]);

    const changeArgs = {
      rowID,
      change: createRowChange(editedRow, value, name),
    };
    // if (isNew) {
    // changeAddedRow(changeArgs);
    //   console.log("added row", editedRow);
    // } else {
    //   changeRow(changeArgs);
    // }
  };
  // const CreateActionBody = (isNew, isMainSchema, schema, editedRow) => {
  //   if (isNew && isMainSchema) {
  //     return {
  //       [mainSchema.propertyName]: {},
  //       [schema.propertyName]: {},
  //     };
  //   } else if (isMainSchema) {
  //     return {
  //       entityID: `${mainID}`,
  //       patchJSON: editedRow,
  //     };
  //   } else if (isNew) {
  //     return {
  //       [schema.propertyName]: {},
  //     };
  //   } else {
  //     return {
  //       entityID: `${editedRow[schema.iDField]}`,
  //       patchJSON: editedRow,
  //     };
  //   }
  // };
  return (
    <>
      {/* <PopupEditing
        popupComponent={FormContainer}
        putAction={""}
        postAction={""}
        state={[]}
        setResult={setResult}
        result={result}
        schema={Schema}
      /> */}
      <FormContainer
        onChange={handleCombinedChange}
        tableSchema={Schema}
        row={data}
      />
    </>
  );
  // return <>{Schema.dashboardFormSchemaInfoDTOView.schemaHeader}</>;
}

export default LiveFormPartions;
