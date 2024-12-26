import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import FormContainer from "../DynamicPopup/FormContainer";
import { onApply } from "../DynamicPopup/OnApplay";
import { buttonContainerStyle } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
import ProgressFilesLoading from "./ProgressFilesLoading";
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
  const [automatic, setAutomatic] = useState(automated);
  const [initialRow, setInitialRow] = useState({});
  const [textButton, setTextButton] = useState("");
  const [index, setIndex] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState(0); // Number of uploaded files
  const [totalFiles, setTotalFiles] = useState(0); // Total files to upload
  let editedRow = { ...initialRow };
  useEffect(() => {
    if (selectionContext.length > 0) {
      setInitialRow(selectionContext[0]);
      setIndex(0);
      setTotalFiles(selectionContext.length);
      // Calculate total size in MB
      // const totalSizeMB = selectionContext.reduce(
      //   (acc, file) => acc + (file.size || 0) / (1024 * 1024),
      //   0
      // );
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
    // Update progress
    setUploadedFiles((prev) => prev + 1);
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

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const apply = await onApply(
      formJson,
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
    if (selectionContext.length > 0) {
      setSelectionContext([]);
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
      // setSelectionContext([]);
      // Invoke TransformDone once all tasks are finished
      TransformDone();
      setAutomatic(false);
      setTotalFiles(0);
      setUploadedFiles(0);
    }
  };
  //todo here the key of the solve
  useEffect(() => {
    console.log("automatic", automatic);
    if (automated) {
      console.log("fire autometed");
      AutomatedTransform();
    }
  });
  const ReturnRow = (updatedRow) => {
    editedRow = { ...updatedRow(), ...initialRow };
  };
  return (
    <form onSubmit={handleButtonClick} action="">
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
              // onClick={handleButtonClick}
              type="submit"
              className={buttonContainerStyle.lastButton}
            >
              {textButton}
            </Button>
          </div>
        </div>
      )}
      <ProgressFilesLoading
        modalOpen={automated}
        totalFiles={totalFiles}
        uploadedFiles={uploadedFiles}
      />
    </form>
  );
}

export default DuringTransactionContainer;
