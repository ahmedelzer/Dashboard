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
  // const lookup= useFetch('/Dashboard/GetDashboardFormLookups');
  console.log("lookup", data);
  if (error && !data) {
    // Handle error, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    // Display a loading indicator while data is being fetched
    return <Loading />;
  }
  console.log("datahdahadhisis", data);
  function SelectForm(schema) {
    if (schema.schemaType === "Table") {
      return (
        <div className={Right ? "text-right" : ""}>
          <Table
            key={schema.idField}
            schema={schema}
            isSearchingTable={false}
          />
        </div>
      );
    } else if (schema.schemaType === "Form") {
      return (
        <PartionFrom
          Header={schema.dashboardFormSchemaInfoDTOView.schemaHeader}
          key={schema.dashboardFormSchemaInfoDTOView.dashboardFormSchemaID}
        />
      );
    }
  }

  return <div>{data && data.map((schema) => SelectForm(schema))}</div>;
}
