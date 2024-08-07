import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../DynamicPopup/FormContainer";
import { LanguageContext } from "../../../contexts/Language";
import { Button } from "reactstrap";
import { Onchange } from "../../hooks/FormsFunctions/OnchangeClass";
import { SharedLists } from "./SharedLists";

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
}) {
  const parameterFieldValue = "parameterField";
  const textButtonNextValue = "Next";
  const textButtonFinishValue = "Finish";
  const textButtonSkipValue = "Skip";
  const [popupOpen, setPopupOpen] = useState(false);
  const [initialRow, setInitialRow] = useState({});
  const [textButton, setTextButton] = useState(textButtonNextValue);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (leftSelectionContext.length > 0) {
      setInitialRow(
        SharedLists(
          leftSelectionContext[0],
          tableSchema.dashboardFormSchemaParameters,
          parameterFieldValue
        )
      );
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
  };
  console.log("====================================leftSelection");
  console.log("initialRow", initialRow);
  console.log("====================================");
  const onChange = new Onchange(initialRow).UpdateRow;
  return (
    <>
      {open && (
        <div>
          <FormContainer
            tableSchema={tableSchema}
            row={initialRow}
            onChange={onChange}
            errorResult={null}
            // onApplyChanges={onApplyChanges}
          />
          <div className="flex justify-end">
            <Button type="submit" onClick={handleButtonClick} className="pop">
              {textButton}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default DuringTransactionContainer;
