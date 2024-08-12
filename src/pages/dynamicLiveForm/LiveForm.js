import React, { useContext, useEffect, useState } from "react";
import "../dynamicTable/DynamicTable.scss";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../../contexts/Language";
import WebsoketTest from "../../components/forms/DynamicForm/WebsoketTest";
import PanelActions from "../../components/forms/PartingFrom/PanelActions";
import { defaultProjectProxyRoute, projectProxyRoute } from "../../request";
import GetSchemaActionsUrl from "../../components/hooks/DashboardAPIs/GetSchemaActionsUrl";
import BaseTable from "../../components/forms/DynamicTable/BaseTable";
import FormContainer from "../../components/forms/DynamicPopup/FormContainer";
import Table from "../../components/forms/DynamicTable/Table";
import APIHandling from "../../components/hooks/APIsFunctions/APIHandling";
import PartionFrom from "../../components/forms/PartingFrom/PartionFrom";
function LiveForm() {
  const { dashboardItemID } = useParams();
  const { Right } = useContext(LanguageContext);

  const { data, error, isLoading } = useFetch(
    `/Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardItemID}`,
    defaultProjectProxyRoute
  );
  // usefetch
  // const mainSchema = data
  //   ? data.find((item) => item?.isMainSchema === true)
  //   : null;

  // const [searchAction, setSearchAction] = useState(null);
  // const [getAction, setGetAction] = useState(null);
  // const { data: actionsData } = useFetch(
  //   GetSchemaActionsUrl(mainSchema?.dashboardFormSchemaID),
  //   defaultProjectProxyRoute
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (actionsData) {
  //       const search = await actionsData.find(
  //         (action) => action?.dashboardFormActionMethodType === "Search"
  //       );
  //       const get = await actionsData.find(
  //         (action) => action?.dashboardFormActionMethodType === "Get"
  //       );
  //       setSearchAction(search);
  //       setGetAction(get);
  //       console.log("====================================Done UseFetch");
  //       console.log(search);
  //       console.log(get);
  //       console.log("====================================");
  //     }
  //   };

  //   fetchData();
  // }, [actionsData]);
  // const lookup= useFetch('/Dashboard/GetDashboardFormLookups');
  // console.log(lookup)
  if (error && !data) {
    // Handle error, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !data) {
    // Display a loading indicator while data is being fetched
    return <Loading />;
  }

  return (
    <>
      <div>
        <PartionFrom Schemas={data} />
      </div>
      {/* {data && data.map((schema) => SelectForm(schema))} */}
    </>
  );
}
// const SchemaData = await APIHandling(
//   `/Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardItemID}`,
//   "Get",
//   defaultProjectProxyRoute
// );
export default LiveForm;
