import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../DynamicPopup/FormContainer";
import { LanguageContext } from "../../../contexts/Language";
import { Button } from "reactstrap";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";
import { SharedLists } from "./SharedLists";
import { onApply } from "../DynamicPopup/OnApplay";
import local from "../../../locals/EN/tableTransform.json";
function DuringTransactionContainer({
  tableSchema,
  TransformDone,
  automated,
  selectionContext,
  open,
  setOpen,
  action,
}) {
  const iDField = tableSchema.idField;
  const [result, setResult] = useState(false);
  const [initialRow, setInitialRow] = useState({});
  const [textButton, setTextButton] = useState("");
  const [index, setIndex] = useState(0);
  let editedRow = { ...initialRow };
  useEffect(() => {
    if (selectionContext.length > 0) {
      setInitialRow(selectionContext[0]);
      setIndex(0);
    }
  }, [selectionContext]);
  useEffect(() => {
    ChangeNextButton();
  }, [index, selectionContext]);

  function MoveOn() {
    const newIndex = index + 1;
    IndexIncreasing(index);

    if (newIndex < selectionContext.length) {
      setInitialRow(selectionContext[newIndex]);
    } else {
      setOpen(false);
    }
  }
  function IndexIncreasing(currentIndex) {
    setIndex(currentIndex + 1);
  }
  function ChangeNextButton() {
    if (index < selectionContext.length - 1) {
      setTextButton(local.textButtonNextValue);
    } else {
      setTextButton(local.textButtonFinishValue);
    }
  }
  function Skip() {
    MoveOn();
  }

  const handleButtonClick = async () => {
    const apply = await onApply(
      editedRow,
      iDField,
      true,
      action,
      tableSchema.dashboardFormSchemaParameters
    );
    setResult(apply);
    if (apply && apply.success === true) {
      MoveOn();
      ChangeNextButton();

      TransformDone();
    }
  };
  const AutomatedTransform = async () => {
    for (var i = 0; i < selectionContext.length; i++) {
      const apply = async () =>
        await onApply(
          selectionContext[i],
          iDField,
          true,
          action,
          tableSchema.dashboardFormSchemaParameters
        );
      await apply();
      MoveOn();
    }
    TransformDone();
  };
  useEffect(() => {
    if (automated) {
      AutomatedTransform();
    }
  }, [automated]);
  const ReturnRow = (updatedRow) => {
    editedRow = { ...updatedRow(), ...initialRow };
  };
  return (
    <>
      {open && (
        <div>
          <FormContainer
            tableSchema={tableSchema}
            row={editedRow}
            returnRow={ReturnRow}
            errorResult={result}
          />
          <div className="flex justify-end">
            <Button onClick={Skip} className="pop mx-2">
              {local.textButtonSkipValue}
            </Button>
            <Button onClick={handleButtonClick} className="pop">
              {textButton}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default DuringTransactionContainer;
