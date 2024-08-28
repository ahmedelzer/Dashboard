import { useState } from "react";
import { defaultProjectProxyRoute } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import WaringPop from "./WaringPop";

export default function DeleteItem({
  id,
  modalIsOpen,
  setModalIsOpen,
  DeleteItemCallback,
  deleteWithApi,
  action,
}) {
  const confirmDelete = () => {
    if (deleteWithApi) {
      //todo take from schema i mean subschema
      //const success= useFetch(action + "/" + id, defaultProjectProxyRoute);
      // if(success){
      //   DeleteItemCallback;
      // }
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

function ConfirmMessages({ confirmDelete, modalIsOpen, setModalIsOpen }) {
  // message if want delte it with localition
  return (
    <WaringPop
      confirmDelete={confirmDelete}
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
    />
  );
}
