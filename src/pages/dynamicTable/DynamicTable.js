import React, { useContext } from "react";
import "./DynamicTable.scss";
import Table from "../../components/forms/DynamicTable/Table";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import PartionFrom from "../../components/forms/PartingFrom/PartionFrom";
import { LanguageContext } from "../../contexts/Language";
import { defaultProjectProxyRoute, SetReoute } from "../../request";
import GetFormSchema from "../../components/hooks/DashboardAPIs/GetFormSchema";
export default function DynamicTable() {
  const { dashboardItemID } = useParams();
  const { Right } = useContext(LanguageContext);
  const { data, error, isLoading } = useFetch(
    GetFormSchema(dashboardItemID),
    defaultProjectProxyRoute
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
  function SelectForm(schema, subSchemas) {
    if (schema.schemaType === "Table") {
      return (
        <div>
          <Table
            key={schema.idField}
            schema={schema}
            isSearchingTable={false}
            subSchemas={subSchemas}
          />
        </div>
      );
    }
  }

  return <div>{data && SelectForm(mainSchema, subSchemas)}</div>;
}
