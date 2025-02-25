import React from "react";
import PartionFrom from "../../components/forms/PartingFrom/PartionFrom";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import { ExtractIDFromPath } from "../../components/hooks/FormsFunctions/ExtractIDFromPath";
import Loading from "../../components/loading/Loading";
import { defaultProjectProxyRoute } from "../../request";
import "../dynamicTable/DynamicTable.scss";
import Form from "../../contexts/Form";
import { DependenciesCategory } from "../../components/forms/PartingFrom/DependenciesCategory";
function DynamicDependForm() {
  const dashboardItemID = ExtractIDFromPath(window.location.pathname);

  const { data, error, isLoading } = useFetch(
    `/Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardItemID}`,
    defaultProjectProxyRoute
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
      <PartionFrom Schemas={data} AdditionForm={DependenciesCategory} />
    </Form>
  );
}
export default DynamicDependForm;
