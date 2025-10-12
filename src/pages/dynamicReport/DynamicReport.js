import React, { useContext } from "react";
import PartionFrom from "../../components/forms/PartingFrom/PartionFrom";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import { ExtractIDFromPath } from "../../components/hooks/FormsFunctions/ExtractIDFromPath";
import Loading from "../../components/loading/Loading";
import { LanguageContext } from "../../contexts/Language";
import {
  defaultProjectProxyRoute,
  defaultProjectProxyRouteWithoutBaseURL,
} from "../../request";
import "../dynamicTable/DynamicTable.scss";
import Form from "../../contexts/Form";
import DrawPartitionForms from "../../components/forms/PartingFrom/DrawPartitionForms";
function DynamicReport() {
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
    <Form schemas={data}>
      <DrawPartitionForms Schemas={data} />
    </Form>
  );
}
export default DynamicReport;
