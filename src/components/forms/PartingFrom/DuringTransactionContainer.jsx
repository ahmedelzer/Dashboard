import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import FormContainer from "../DynamicPopup/FormContainer";
import { onApply } from "../DynamicPopup/OnApplay";
import { buttonContainerStyle } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
function DuringTransactionContainer({
  tableSchema,
  TransformDone,
  automated,
  selectionContext,
  open,
  setOpen,
  action,
  setSelectionContext,
}) {
  const { localization } = useContext(LanguageContext);

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
      setTextButton(localization.tableTransform.textButtonNextValue);
    } else {
      setTextButton(localization.tableTransform.textButtonFinishValue);
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
  // const AutomatedTransform = async () => {
  //   for (var i = 0; i < selectionContext.length; i++) {
  //     const apply = async () =>
  //       await onApply(
  //         selectionContext[i],
  //         iDField,
  //         true,
  //         action,
  //         tableSchema.dashboardFormSchemaParameters
  //       );
  //     await apply();
  //     MoveOn();
  //   }
  //   TransformDone();
  // };
  const AutomatedTransform = async () => {
    // Create an array of promises for all the tasks
    const tasks = selectionContext.map(
      (item, index) =>
        onApply(
          item,
          iDField,
          true,
          action,
          tableSchema.dashboardFormSchemaParameters
        ).then(() => MoveOn()) // Move on after each task
    );

    // Wait for all tasks to complete concurrently
    await Promise.all(tasks);
    setSelectionContext([]);
    // Invoke TransformDone once all tasks are finished
    TransformDone();
  };
  useEffect(() => {
    if (automated) {
      AutomatedTransform();
    }
  }, [automated]);
  const ReturnRow = (updatedRow) => {
    editedRow = { ...updatedRow(), ...initialRow };
    console.log(editedRow);
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
          <div className={buttonContainerStyle.container}>
            <Button onClick={Skip} className={buttonContainerStyle.button}>
              {localization.tableTransform.textButtonSkipValue}
            </Button>
            <Button
              onClick={handleButtonClick}
              className={buttonContainerStyle.lastButton}
            >
              {textButton}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default DuringTransactionContainer;
