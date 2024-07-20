import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import LiveFormPartions from "../PartingFrom/LiveFormPartions";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import { SetReoute, defaultProjectProxyRoute } from "../../../request";
import BaseTable from "../DynamicTable/BaseTable";
import LiveTable from "../DynamicTable/LiveTable";
import CompainedLiveTable from "../PartingFrom/CompainedLiveTable";
function DrawPartionFrom({
  Schema,
  updatedData,
  postAction,
  putAction,
  mainSchema,
  mainID,
}) {
  SetReoute(Schema.projectProxyRoute);
  console.log(Schema.dataSourceName, updatedData);
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
  console.log("====================================CreateActionBody");
  console.log(CreateActionBody(true, true, Schema, editedRow));
  console.log("====================================");
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
    <div
      className="my-1 p-1 border-2 border-[#d5e0d5] roun
    ded-lg transition-all duration-300"
    >
      <div
        onClick={() => setopen(!open)}
        className="flex cursor-pointer container flex-row 
      justify-between items-center "
      >
        <h2 className=" font-bold text-[22px]">{Header}</h2>
        <div className=" hover:border-black hover:border">
          {open ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
        </div>
      </div>
      <form class={open ? `w-full max-w-4xl m-auto` : "hidden"}>
        {/* <div>{Table}</div> */}
        <div className="flex justify-end">
          <p
            className={`${
              Edit ? " inline" : "hidden"
            } color  font-bold cursor-pointer`}
            onClick={() => setEdit(false)}
          >
            Cancel
          </p>
          <p
            className=" color font-bold px-2 cursor-pointer"
            onClick={() => setEdit(!Edit)}
          >
            {Edit ? "Save" : "Edit"}
          </p>
        </div>
        <div className={Edit ? "cursor-auto" : "pointer-events-none"}>
          {schemaType()}
        </div>
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
