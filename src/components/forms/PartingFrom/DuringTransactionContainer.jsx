import React, { useContext, useEffect, useState } from "react";
import FormContainer from "../DynamicPopup/FormContainer";
import { LanguageContext } from "../../../contexts/Language";
import { Button } from "reactstrap";

function DuringTransactionContainer({
  tableSchema,
  leftedlist,
  setLeftSelectionContext,
  rightlist,
  setrightlist,
  leftSelectionContext,
  isSubset,
}) {
  const textButtonNextValue = "Next";
  const textButtonFinishValue = "Finish";
  const textButtonSkipValue = "Skip";
  const [popupOpen, setPopupOpen] = useState(!isSubset);
  const [initialRow, setInitialRow] = useState({});
  const [textButton, setTextButton] = useState(textButtonNextValue);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (leftSelectionContext.length > 0) {
      setInitialRow(leftSelectionContext[0]);
    }
  }, [leftSelectionContext]);
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
  const handleCombinedChange = async (event) => {};
  const onApplyChanges = async () => {};
  return (
    <>
      {popupOpen && (
        <div>
          <FormContainer
            tableSchema={tableSchema}
            // isSelectionRow={true}
            isSelectionRow={initialRow}
            row={initialRow}
            onChange={handleCombinedChange}
            // errorResult={null}
            // img={null}
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
