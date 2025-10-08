import React, { useContext } from "react";
import TableTransformer from "../../components/forms/PartingFrom/TableTransformer";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import { ExtractIDFromPath } from "../../components/hooks/FormsFunctions/ExtractIDFromPath";
import Loading from "../../components/loading/Loading";
import { LanguageContext } from "../../contexts/Language";
import {
  defaultProjectProxyRoute,
  defaultProjectProxyRouteWithoutBaseURL,
} from "../../request";
import "../dynamicTable/DynamicTable.scss";
function DynamicTransform() {
  const dashboardItemID = ExtractIDFromPath(window.location.pathname);
  const { Right } = useContext(LanguageContext);

  const { data, error, isLoading } = useFetch(
    `/Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardItemID}`,
    defaultProjectProxyRouteWithoutBaseURL
  );

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
        <TableTransformer TransFormSchema={data} />
      </div>
    </>
  );
}
export default DynamicTransform;
