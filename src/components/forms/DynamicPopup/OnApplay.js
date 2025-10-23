import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import { SharedLists } from "../PartingFrom/SharedLists";

export const onApply = async (
  editedRow,
  iDField,
  isNew,
  action,
  proxyRoute = "",
  schemaParameters = false,
  constants = {}
) => {
  // const { showErrorToast } = useErrorToast();
  // const { isOnline, checkNetwork } = useNetwork();
  // console.log(isOnline, "isOnline");

  // if (!isOnline) {
  //   showErrorToast("connection Error", "please connect to internet ");
  //   return null;
  // }
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
  const dataSourceAPI = (query) => {
    return buildApiUrl(query, { ...constants });
  };

  const res = await APIHandling(
    dataSourceAPI(action),
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
  const res = await APIHandling(routeAdderss, methodType, editedRow);

  return res;
};
