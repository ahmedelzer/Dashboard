import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { stylesFile } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
import { FormContext } from "../../../contexts/Form";

function EditFormToggle({ actions, edit, setEdit }) {
  // const [Edit, setEdit] = useState(false);
  const { localization } = useContext(LanguageContext);
  const { setActionsForm } = useContext(FormContext);

  return (
    <div className="flex justify-end">
      <div className={stylesFile.buttonText(edit)}>
        {edit ? (
          <Button type="button" className="pop" onClick={() => setEdit(false)}>
            {localization.drawPartionForm.button.cancel}
          </Button>
        ) : null}
      </div>
      <div className={stylesFile.toggleButton}>
        {edit ? (
          <Button
            type="submit"
            key={1}
            onClick={() => setActionsForm(actions)}
            className="pop"
          >
            {/*here i want to send pram on click */}
            {localization.drawPartionForm.button.save}
          </Button>
        ) : (
          <Button
            type="button"
            key={2}
            className="pop"
            onClick={() => setEdit(true)}
          >
            {localization.drawPartionForm.button.edit}
          </Button>
        )}
      </div>
    </div>
  );
}

export default EditFormToggle;
