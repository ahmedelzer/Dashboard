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
  const body = isNew
    ? editedRow
    : {
        entityID: `${editedRow[iDField]}`,
        ...{ patchJSON: editedRow },
      };
  SetReoute(proxyRoute);
  const res = await APIHandling(
    action.routeAdderss,
    action.dashboardFormActionMethodType,
    body
  );

  return res;
};
