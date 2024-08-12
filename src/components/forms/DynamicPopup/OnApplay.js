import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import { SharedLists } from "../PartingFrom/SharedLists";

export const onApply = async (
  editedRow,
  state,
  iDField,
  isNew,
  setResult,
  postAction,
  putAction,
  schemaParameters
) => {
  const action = isNew ? postAction : putAction;
  //const dataEditerow = ;
  let row = SharedLists(editedRow, schemaParameters, "parameterField");
  if (row) editedRow = row;
  const body = isNew
    ? editedRow
    : {
        entityID: `${editedRow[iDField]}`,
        ...{ patchJSON: editedRow },
      };
  console.log("body", body, editedRow);
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
      // cancelAddedRows({ rowIds });
    } else {
      const updatedRows = state.rows.map((row) => {
        if (row[iDField] === editedRow[iDField]) {
          return newRow; // Replace the existing row with the updated newRow
        }
        return row;
      });

      // Update the state with the updated rows
      state.rows = updatedRows;
    }
  }
};
