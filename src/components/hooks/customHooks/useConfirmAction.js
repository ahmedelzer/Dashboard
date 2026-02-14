// src/hooks/useConfirmAction.js
import { useState } from "react";
import WaringPop from "../../forms/PartingFrom/WaringPop";

export function useConfirmAction() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // This function is what you'll call anywhere in the app
  const confirmAndRun = async (action, callback) => {
    console.log("confirmDelete", action);
    if (action?.confirm) {
      // Store the callback and action temporarily
      setPendingAction(() => callback);
      setModalIsOpen(true);
    } else {
      // No confirmation required → run immediately
      await callback();
    }
  };

  // Runs after the user confirms in the modal
  const confirmDelete = async () => {
    if (pendingAction) {
      await pendingAction();
      setPendingAction(null);
    }
    setModalIsOpen(false);
  };
  // Render modal globally
  const ConfirmModal = (
    <WaringPop
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      confirmDelete={confirmDelete}
      isDelAction={false}
    />
  );

  return { confirmAndRun, ConfirmModal };
}
