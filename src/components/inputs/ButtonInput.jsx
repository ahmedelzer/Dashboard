import React, { useContext, useEffect, useState } from "react";
import { RunsSpacialAction } from "../hooks/APIsFunctions/RunsSpacialAction";
import { useConfirmAction } from "../hooks/customHooks/useConfirmAction";
import { Input } from "reactstrap";
import { LanguageContext } from "../../contexts/Language";
import { useNetwork } from "../../contexts/NetworkContext";

const ButtonInput = ({ ...props }) => {
  const {
    value,
    enable,
    title,
    fieldName,
    placeholder,
    specialActions,
    setDependenceRow,
    formSchemaParameters,
  } = props;
  const { confirmAndRun, ConfirmModal } = useConfirmAction();
  const idField = formSchemaParameters.find(
    (param) => param.isIDField
  ).parameterField;

  // Function to run your special action
  const triggerAction = async (val) => {
    if (!val) return;
    const action = specialActions.find(
      (ac) => ac.dashboardFormActionMethodType.split(":")[1] === fieldName
    );
    confirmAndRun(action, () => sendRequest(val));
  };

  const sendRequest = async (val) => {
    try {
      const req = await RunsSpacialAction(
        fieldName,
        val[idField],
        true,
        specialActions,
        false,
        { [fieldName]: val }
      );
      console.log("✅ Action completed:", req);
    } catch (error) {
      console.error("❌ Error running action:", error);
    }
  };

  return (
    <form
      // onSubmit={handleSubmitMobile}
      className="flex flex-col gap-3 w-full max-w-s mt-3"
    >
      <button
        name={fieldName}
        type="button"
        onClick={() => triggerAction(value)}
        className="bg-accent text-bg px-3 py-1 rounded-md transition"
      >
        {title}
      </button>
      {ConfirmModal}
    </form>
  );
};

export default ButtonInput;
