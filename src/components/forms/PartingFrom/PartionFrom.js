import React, { useEffect, useState } from "react";

import { defaultProjectProxyRoute } from "../../../request";
import { BuildWSURL } from "../../hooks/APIsFunctions/BuildWSURL";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import { WSclass } from "../../hooks/FormsFunctions/WSclass";
import DrawPartionFrom from "../DynamicPopup/DrawPartionFrom";
import BaseTable from "../DynamicTable/BaseTable";
import PanelActions from "./PanelActions";

function PartionFrom({ Schemas }) {
  const mainSchema = Schemas
    ? Schemas.find((item) => item?.isMainSchema === true)
    : null;
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchAction, setSearchAction] = useState(null);
  const [getAction, setGetAction] = useState(null);
  const [postAction, setPostAction] = useState(null);
  const [putAction, setPutAction] = useState(null);
  // const [data, setData] = useState([{ invoice: {}, invoiceItems: [] }]);
  const [data, setData] = useState(null);
  const [mainID, setMainID] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  var WSClient;
  const { data: actionsData } = useFetch(
    GetSchemaActionsUrl(mainSchema?.dashboardFormSchemaID),
    defaultProjectProxyRoute
  );

  useEffect(() => {
    const FetchData = async () => {
      if (actionsData) {
        const search = actionsData.find(
          (action) => action?.dashboardFormActionMethodType === "Search"
        );
        const get = actionsData.find(
          (action) => action?.dashboardFormActionMethodType === "Get"
        );
        const post = actionsData.find(
          (action) => action?.dashboardFormActionMethodType === "Post"
        );
        const put = actionsData.find(
          (action) => action?.dashboardFormActionMethodType === "Put"
        );
        setGetAction(get);
        setSearchAction(search);
        setPostAction(post);
        setPutAction(put);
      }
    };
    FetchData();

    // Cleanup function to close WebSocket connection
  }, [actionsData, Schemas]);
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
  // const onApplyChangesForMainSchema = async () => {
  //   const action = mainID ? postAction : putAction;
  //   const isNew = mainID;
  //   const body = mainID
  //     ? //editedRow
  //       {}
  //     : {
  //         entityID: `${editedRow[iDField]}`,
  //         ...{ patchJSON: editedRow },
  //       };

  //   const res = await APIHandling(
  //     action.routeAdderss,
  //     action.dashboardFormActionMethodType,
  //     body
  //   );
  //   setResult(res);

  //   if (res.success) {
  //     const newRow = { ...res.data, ...editedRow };
  //     if (isNew) {
  //       state.rows = [...state.rows, newRow];
  //       cancelAddedRows({ rowIds });
  //     } else {
  //       const updatedRows = state.rows.map((row) => {
  //         if (row[iDField] === editedRow[iDField]) {
  //           return newRow; // Replace the existing row with the updated newRow
  //         }
  //         return row;
  //       });

  //       // Update the state with the updated rows
  //       state.rows = updatedRows;

  //       rowIds = [rowId];
  //       stopEditRows({ rowIds });
  //       cancelChangedRows({ rowIds });
  //     }

  //     // Assuming cancelAddedRows is a function to cancel added rows
  //   }
  // };
  useEffect(() => {
    const GetDataSources = () => {
      if (mainID) {
        WSClient = new WSclass(`${BuildWSURL(getAction, mainID)}`);
        // WSClient.connect();
        WSClient.ReciveMessages((datasources) => {
          let schemaDataSource = Schemas?.map(
            (data) => datasources[0][data?.dataSourceName]
          );

          setData(schemaDataSource);
        });
      }
    };

    if (selectedRow) {
      setMainID(selectedRow[mainSchema.idField]);
      GetDataSources();
    }
  }, [panelOpen]);
  return (
    <div>
      {Schemas &&
        Schemas.map((Schema) => (
          <div key={Schema?.dashboardFormSchemaID}>
            <DrawPartionFrom
              postAction={postAction}
              putAction={putAction}
              mainSchema={mainSchema}
              mainID={mainID}
              Schema={Schema}
              updatedData={data}
            />
            {/* <LiveFormPartions
              Schema={mainSchema}
              updatedData={data[0][mainSchema?.dataSourceName] || {}}
            /> */}
            {/* <LiveTable dataSource={Schema} updateRow={data[index]} /> */}
          </div>
        ))}
      <PanelActions
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
        SearchComponent={
          <BaseTable
            setPanelOpen={setPanelOpen}
            setSelectedRow={setSelectedRow}
            schema={mainSchema}
            getAction={searchAction}
            isSearchingTable={true}
          />
        }
      />
      {/* {Schemas.map((Schema) => WSselecet(Schema))} */}
      {/* <LiveFormPartions Schema={Schemas} data={data} /> */}
    </div>
  );

  // const [open, setopen] = useState(false);
  // const [Edit, setEdit] = useState(false);
}
{
  /* <div
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
        <form class={open ? `w-full max-w-lg m-auto` : "hidden"}>
          <div>{Table}</div>
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
            {Schema}
          </div>
        </form>
      </div> */
}

export default PartionFrom;
