import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import { SharedLists } from "../PartingFrom/SharedLists";

export const onApply = async (
  editedRow,
  iDField,
  isNew,
  action,
  schemaParameters = false
) => {
  let row = schemaParameters
    ? SharedLists(editedRow, schemaParameters, "parameterField")
    : null;
  if (row) editedRow = row;
  const body = isNew
    ? editedRow
    : {
        entityID: `${editedRow[iDField]}`,
        ...{ patchJSON: editedRow },
      };

  const res = await APIHandling(
    action.routeAdderss,
    action.dashboardFormActionMethodType,
    body
  );

  return res;
};
