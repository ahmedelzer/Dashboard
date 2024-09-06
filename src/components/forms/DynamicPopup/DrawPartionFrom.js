import React, { useContext, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { SetReoute } from "../../../request";
import CompainedLiveTable from "../PartingFrom/CompainedLiveTable";
import LiveFormPartions from "../PartingFrom/LiveFormPartions";
import { stylesFile } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
function DrawPartionFrom({
  Schema,
  updatedData,
  postAction,
  putAction,
  mainSchema,
  mainID,
}) {
  const { localization } = useContext(LanguageContext);
  SetReoute(Schema.projectProxyRoute);
  const [editedRow, setEditedgRow] = useState("");
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
  function schemaType() {
    switch (Schema.schemaType) {
      case "LiveForm":
        return (
          <LiveFormPartions
            editedRow={editedRow}
            setEditedgRow={setEditedgRow}
            // postAction={postAction}
            //     putAction={putAction}
            //     mainSchema={mainSchema}
            //     mainID={mainID}
            Schema={Schema}
            data={updatedData ? updatedData : {}}
          />
        );
      case "LiveTable":
        return (
          <div>
            {/* {Schema.dashboardFormSchemaInfoDTOView.schemaHeader} */}
            <CompainedLiveTable
              editedRow={editedRow}
              setEditedgRow={setEditedgRow}
              // postAction={postAction}
              //   putAction={putAction}
              //   mainSchema={mainSchema}
              //   mainID={mainID}
              Schema={Schema}
              updatedData={updatedData ? updatedData : []}
            />
            {/* <LiveFormPartions Schema={Schema} data={updatedData} /> */}
          </div>
        );
      default:
        return <div>{Schema.dashboardFormSchemaInfoDTOView.schemaHeader}</div>;
    }
  }
  const [open, setopen] = useState(false);
  const [Edit, setEdit] = useState(false);
  return (
    <div className={stylesFile.container}>
      <div
        onClick={() => setopen(!open)}
        className={stylesFile.headerContainer}
      >
        <h2 className={stylesFile.headerText}>{Header}</h2>
        <div className={stylesFile.hoverEffect}>
          {open ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
        </div>
      </div>
      <form className={stylesFile.formContainer(open)}>
        <div className="flex justify-end">
          <p
            className={stylesFile.buttonText(Edit)}
            onClick={() => setEdit(false)}
          >
            {localization.drawPartionForm.button.cancel}
          </p>
          <p className={stylesFile.toggleButton} onClick={() => setEdit(!Edit)}>
            {Edit
              ? localization.drawPartionForm.button.save
              : localization.drawPartionForm.button.edit}
          </p>
        </div>
        <div className={stylesFile.formEditState(Edit)}>{schemaType()}</div>
      </form>
    </div>
  );
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
