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
import PartionFrom from "../../components/forms/PartingFrom/PartionFrom";
import TableTransformer from "../../components/forms/PartingFrom/TableTransformer";
function LiveForm() {
  const { dashboardItemID } = useParams();
  const { Right } = useContext(LanguageContext);

  const { data, error, isLoading } = useFetch(
    `/Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardItemID}`,
    defaultProjectProxyRoute
  );

  if (error) {
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
        <TableTransformer TransFormSchema={data} />
      </div>
    </>
  );
}
export default LiveForm;
