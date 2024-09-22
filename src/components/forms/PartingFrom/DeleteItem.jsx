import { useState } from "react";
import { defaultProjectProxyRoute, SetReoute } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import WaringPop from "./WaringPop";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";

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
      SetReoute(proxyRoute);
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
