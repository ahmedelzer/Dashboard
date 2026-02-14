import { GetProjectUrl } from "../../../request";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import WaringPop from "./WaringPop";

export default function DeleteItem({
  id,
  modalIsOpen,
  setModalIsOpen,
  DeleteItemCallback,
  deleteWithApi,
  action,
}) {
  const confirmDelete = async () => {
    if (deleteWithApi) {
      const getProjectUrl = GetProjectUrl(action.projectProxyRoute);
      const deleteRequest = await APIHandling(
        getProjectUrl + "/" + action.routeAdderss + "/" + id,
        action.dashboardFormActionMethodType,
        "",
      );
      if (deleteRequest.data && deleteRequest.success) {
        DeleteItemCallback();
      }
    } else {
      DeleteItemCallback(id);
    }
    setModalIsOpen(false);
  };
  return (
    <WaringPop
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      confirmDelete={confirmDelete}
    />
  );
}
