import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../DynamicPopup/FormContainer";
import { LanguageContext } from "../../../contexts/Language";
import { Button } from "reactstrap";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";
import { SharedLists } from "./SharedLists";
import { onApply } from "../DynamicPopup/OnApplay";

function DuringTransactionContainer({
  tableSchema,
  transformedList,
  selectionContext,
  open,
  setOpen,
  action,
}) {
  const parameterFieldValue = "parameterField";
  const textButtonNextValue = "Next";
  const iDField = tableSchema.idField;
  const textButtonFinishValue = "Finish";
  const textButtonSkipValue = "Skip";
  const [result, setResult] = useState(false);
  const [initialRow, setInitialRow] = useState({});
  const [textButton, setTextButton] = useState(textButtonNextValue);
  const [index, setIndex] = useState(0);
  let editedRow = {};
  useEffect(() => {
    console.log("====================================");
    console.log("change");
    console.log("====================================");
  }, [initialRow, editedRow]);
  editedRow = { ...initialRow, ...editedRow };
  if (initialRow) {
  }
  const apply = async () =>
    await onApply(
      editedRow,
      iDField,
      true,
      action,
      tableSchema.dashboardFormSchemaParameters
    );
  useEffect(() => {
    if (selectionContext.length > 0) {
      setInitialRow(selectionContext[0]);
    }
  }, [selectionContext]);

  function MoveOn() {
    setIndex((prevIndex) => prevIndex + 1);
    setInitialRow(selectionContext[index + 1]);
  }
  function MoveNext() {
    if (index < selectionContext.length - 1) {
      MoveOn();
      setTextButton(textButtonNextValue);
    } else {
      setTextButton(textButtonFinishValue);
      setOpen(false);
    }
  }
  function TransformDone(result) {
    //
    // selectionContext.remove()
    // transformedList.add(result)
  }
  const handleButtonClick = () => {
    // console.log(apply());
    console.log("editedRow", editedRow);

    // if (result) {
    //   MoveOn();
    //   TransformDone(result);
    // }
  };
  const AutomatedTransform = () => {
    onApply(
      initialRow,
      // state,
      iDField,
      true,
      setResult,
      action
    );
    MoveOn();
    TransformDone(result);
  };
  return (
    <>
      {open ? (
        <div>
          <FormContainer
            tableSchema={tableSchema}
            row={editedRow}
            errorResult={result}
          />
          <div className="flex justify-end">
            <Button onClick={handleButtonClick} className="pop">
              {textButtonSkipValue}
            </Button>
            <Button onClick={handleButtonClick} className="pop">
              {textButton}
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default DuringTransactionContainer;
