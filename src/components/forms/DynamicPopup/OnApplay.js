import { SetReoute } from "../../../request";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import { SharedLists } from "../PartingFrom/SharedLists";

export const onApply = async (
  editedRow,
  iDField,
  isNew,
  action,
  proxyRoute,
  schemaParameters = false
) => {
  let row = schemaParameters
    ? SharedLists(editedRow, schemaParameters, "parameterField")
    : null;
  if (row) editedRow = row;
  // Remove ID field for patching
  const { [iDField]: _, ...editedRowWithoutIDField } = editedRow;
  const body = isNew
    ? editedRow
    : {
        entityID: `${editedRow[iDField]}`,
        ...{ patchJSON: editedRowWithoutIDField },
      };
  SetReoute(proxyRoute);
  const res = await APIHandling(
    action.routeAdderss,
    action.dashboardFormActionMethodType,
    body
  );

  return res;
};
export const onApplyWithSpecialAction = async (
  editedRow,
  action,
  methodType,
  routeAdderss,
  proxyRoute,
  schemaParameters = false
) => {
  let row = schemaParameters
    ? SharedLists(editedRow, schemaParameters, "parameterField")
    : null;
  if (row) editedRow = row;
  SetReoute(proxyRoute);
  const res = await APIHandling(routeAdderss, methodType, editedRow);

  return res;
};
