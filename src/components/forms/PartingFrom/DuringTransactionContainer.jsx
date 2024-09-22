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
  proxyRoute,
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
      proxyRoute,
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
    // Create an array of promises for all the task
    const tasks = selectionContext.map(
      (item, index) =>
        onApply(
          item,
          iDField,
          true,
          action,
          proxyRoute,
          tableSchema.dashboardFormSchemaParameters
        ).then(() => MoveOn()) // Move on after each task
    );

    // Wait for all tasks to complete concurrently
    await Promise.all(tasks);
    setSelectionContext([]);
    // Invoke TransformDone once all tasks are finished
    TransformDone();
  };
  //todo here the key of the solve
  useEffect(() => {
    if (automated) {
      AutomatedTransform();
    }
  }, [automated, proxyRoute, iDField, action, tableSchema]);
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
