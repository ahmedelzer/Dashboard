import React, { useContext, useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import CompainedLiveTable from "../PartingFrom/CompainedLiveTable";
import LiveFormPartions from "../PartingFrom/LiveFormPartions";
import { stylesFile } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
import { SchemaType } from "../PartingFrom/SchemaTypeForm";
import { FormContext } from "../../../contexts/Form";
import { Button } from "reactstrap";
import { onApply } from "./OnApplay";
function DrawPartionFrom({
  Schema,
  updatedData,
  // postAction,
  // putAction,
  // actions,
  // mainSchema,
  mainID,
}) {
  const { actionsForm, mainSchema, selectedRow } = useContext(FormContext);
  const [open, setOpen] = useState(false);
  const { localization } = useContext(LanguageContext);
  const [editedRow, setEditedgRow] = useState("");
  const [disable, setDisable] = useState("");
  const Header = Schema.dashboardFormSchemaInfoDTOView.schemaHeader;
  const CreateActionBody = (isNew, isMainSchema, schema, editedRow) => {
    if (isNew && isMainSchema) {
      return {
        [mainSchema.propertyName]: {},
        [schema.propertyName]: {},
      };
    } else if (isMainSchema) {
      return {
        entityID: `${mainID}`,
        patchJSON: editedRow,
      };
    } else if (isNew) {
      return {
        [schema.propertyName]: {},
      };
    } else {
      return {
        entityID: `${editedRow[schema.iDField]}`,
        patchJSON: editedRow,
      };
    }
  };
  const onSubmit = async (e, action, type, route) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("====================================");
    console.log(formJson, action, actionsForm);
    console.log("====================================");
    setDisable(true);
    try {
      const request = await onApply(
        {
          ...formJson,
          ...selectedRow,
        },
        null,
        true,
        action,
        route
      );
      if (request) {
        // setResult(request);
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Optionally, handle the error here (e.g., show a notification)
    } finally {
    }
  };

  return (
    <div className={stylesFile.container}>
      <div
        onClick={() => setOpen(!open)}
        className={stylesFile.headerContainer}
      >
        <h2 className={stylesFile.headerText}>{Header}</h2>
        <div className={stylesFile.hoverEffect}>
          {open ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
        </div>
      </div>

      <form
        className={stylesFile.formContainer(open)}
        onSubmit={(e) =>
          onSubmit(e, actionsForm.postAction, null, Schema.projectProxyRoute)
        } // The form will only submit when Save button is clicked
      >
        {/* <div className="flex justify-end">
          <div className={stylesFile.buttonText(Edit)}>
            {Edit ? (
              <Button
                type="button"
                className="pop"
                onClick={() => setEdit(false)}
              >
                {localization.drawPartionForm.button.cancel}
              </Button>
            ) : null}
          </div>
          <div className={stylesFile.toggleButton}>
            {Edit ? (
              <Button type="submit" key={1} className="pop" disabled={disable}>
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
        </div> */}

        <div>
          <SchemaType
            Schema={Schema}
            editedRow={editedRow}
            setEditedgRow={setEditedgRow}
            updatedData={updatedData}
          />
        </div>
      </form>
    </div>
  );
}
{
  /* <p
            className={stylesFile.buttonText(Edit)}
            onClick={() => setEdit(false)}
          >
            <Button type="button" className="pop">
              {localization.drawPartionForm.button.cancel}
            </Button>
          </p>
          <p className={stylesFile.toggleButton} onClick={() => setEdit(!Edit)}>
            {Edit ? (
              <Button
                type="submit"
                key={"submit"}
                className="pop"
                disabled={disable}
              >
                {localization.drawPartionForm.button.save}
              </Button>
            ) : (
              <Button type="button" key={"button"} className="pop">
                {localization.drawPartionForm.button.edit}
              </Button>
            )}
          </p> */
}
//  <div
//       className="my-1 p-1 border-2 border-[#d5e0d5] roun
//       ded-lg transition-all duration-300"
//     >
//       <div
//         onClick={() => setopen(!open)}
//         className="flex cursor-pointer container flex-row
//         justify-between items-center "
//       >
//         <h2 className=" font-bold text-[22px]">{Header}</h2>
//         <div className=" hover:border-black hover:border">
//           {open ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
//         </div>
//       </div>
//       <form class={open ? `w-full max-w-lg m-auto` : "hidden"}>
//         <div>{Table}</div>
//         <div className="flex justify-end">
//           <p
//             className={`${
//               Edit ? " inline" : "hidden"
//             } color  font-bold cursor-pointer`}
//             onClick={() => setEdit(false)}
//           >
//             Cancel
//           </p>
//           <p
//             className=" color font-bold px-2 cursor-pointer"
//             onClick={() => setEdit(!Edit)}
//           >
//             {Edit ? "Save" : "Edit"}
//           </p>
//         </div>
//         <div className={Edit ? "cursor-auto" : "pointer-events-none"}>
//           {Schema}
//         </div>
//       </form>
//     </div>

export default DrawPartionFrom;
