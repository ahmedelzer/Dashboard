import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { stylesFile } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
import { FormContext } from "../../../contexts/Form";
import testSchemaAction from "../Test/testSchemaAction.json";
import { GetActionsFromSchemaAction } from "../../hooks/DashboardAPIs/GetActionsFromSchemaAction";
function EditFormToggle({ actions, edit, setEdit }) {
  // const [Edit, setEdit] = useState(false);
  const { localization } = useContext(LanguageContext);
  const { setActionsForm } = useContext(FormContext);
  const actionTypeLocalization = actions?.getAction
    ? localization.drawPartionForm.button.save
    : "📷";
  const initActions = GetActionsFromSchemaAction(testSchemaAction);
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
            onClick={() => setActionsForm(initActions)}
            className="pop"
          >
            {/*here i want to send pram on click */}
            {actionTypeLocalization}
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
