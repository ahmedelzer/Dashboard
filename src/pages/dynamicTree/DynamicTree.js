import React, { useContext } from "react";
import Table from "../../components/forms/DynamicTable/Table";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import GetFormSchema from "../../components/hooks/DashboardAPIs/GetFormSchema";
import { ExtractIDFromPath } from "../../components/hooks/FormsFunctions/ExtractIDFromPath";
import Loading from "../../components/loading/Loading";
import { LanguageContext } from "../../contexts/Language";
import {
  defaultProjectProxyRoute,
  defaultProjectProxyRouteWithoutBaseURL,
} from "../../request";
import Tree from "../../components/forms/DynamicTree/Tree";

export default function DynamicTree() {
  // const { dashboardItemID } = useParams();
  const dashboardItemID =
    "dcf7aa71-60d1-4071-9086-51eb67b01a77" ||
    ExtractIDFromPath(window.location.pathname);
  const { Right } = useContext(LanguageContext);
  const { data, error, isLoading } = useFetch(
    GetFormSchema(dashboardItemID),
    defaultProjectProxyRouteWithoutBaseURL,
  );

  // const rightSchema = TransFormSchema.find((schema) => schema.isMainSchema); //baseTable
  if (error && !data) {
    // Handle error, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    // Display a loading indicator while data is being fetched
    return <Loading />;
  }
  const mainSchema = data?.find((item) => item.isMainSchema);
  const subSchemas = data?.filter((item) => !item.isMainSchema);
  console.log(mainSchema, "mainSchema from dynamicTree");

  return (
    <div>
      <Tree
        key={mainSchema.idField}
        schema={mainSchema}
        isSearchingTable={false}
        subSchemas={subSchemas}
      />
    </div>
  );
}
