import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../DynamicPopup/FormContainer";
import { LanguageContext } from "../../../contexts/Language";
import { Button } from "reactstrap";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";
import { SharedLists } from "./SharedLists";
import { onApply } from "../DynamicPopup/OnApplay";

function DuringTransactionContainer({
  tableSchema,
  leftedlist,
  setLeftSelectionContext,
  rightlist,
  setrightlist,
  leftSelectionContext,
  isSubset,
  open,
  setOpen,
  postAction,
}) {
  const parameterFieldValue = "parameterField";
  const textButtonNextValue = "Next";
  const iDField = tableSchema.idField;
  const textButtonFinishValue = "Finish";
  const textButtonSkipValue = "Skip";
  const [popupOpen, setPopupOpen] = useState(false);
  const [result, setResult] = useState(false);
  const [initialRow, setInitialRow] = useState({});
  const [textButton, setTextButton] = useState(textButtonNextValue);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (leftSelectionContext.length > 0) {
      setInitialRow(leftSelectionContext[0]);
    }
  }, [leftSelectionContext, tableSchema.dashboardFormSchemaParameters]);
  const handleButtonClick = () => {
    if (index < leftSelectionContext.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setInitialRow(leftSelectionContext[index + 1]);
      setTextButton(textButtonNextValue);
    } else {
      setTextButton(textButtonFinishValue);
      setPopupOpen(false);
    }
    onApply(
      initialRow,
      // state,
      iDField,
      true,
      setResult,
      postAction
    );
  };
  const callback = (updatedRow) => {
    setInitialRow(updatedRow());
    console.log("editedRow call", initialRow);
  };
  const onChange = new Onchange(initialRow).UpdateRow;
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(12, formJson);
  }

  return (
    <>
      {open && (
        <form onSubmit={handleSubmit}>
          <FormContainer
            tableSchema={tableSchema}
            row={initialRow}
            errorResult={result}
            callback={callback}
          />
          <div className="flex justify-end">
            <Button type="submit" className="pop">
              {textButton}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

export default DuringTransactionContainer;
