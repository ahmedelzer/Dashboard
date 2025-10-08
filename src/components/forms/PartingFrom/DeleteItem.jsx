import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import WaringPop from "./WaringPop";

export default function DeleteItem({
  id,
  modalIsOpen,
  setModalIsOpen,
  DeleteItemCallback,
  deleteWithApi,
  action,
  proxyRoute,
}) {
  const confirmDelete = async () => {
    if (deleteWithApi) {
      const deleteRequest = await APIHandling(
        action.routeAdderss + "/" + id,
        action.dashboardFormActionMethodType,
        ""
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
