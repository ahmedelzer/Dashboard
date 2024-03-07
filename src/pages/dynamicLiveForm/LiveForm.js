import React, { useContext } from "react";
import "../dynamicTable/DynamicTable.scss";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../../contexts/Language";
import WebsoketTest from "../../components/forms/DynamicForm/WebsoketTest";
import PanelActions from "../../components/forms/PartingFrom/PanelActions";
function LiveForm() {
  const { dashboardItemID } = useParams();
  const { Right } = useContext(LanguageContext);
  const { data, error, isLoading } = useFetch(
    `/Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardItemID}`
  );
  // const lookup= useFetch('/Dashboard/GetDashboardFormLookups');
  // console.log(lookup)
  if (error) {
    // Handle error, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    // Display a loading indicator while data is being fetched
    return <Loading />;
  }
  function SelectForm(schema) {
    return (
      <div className={Right ? "text-right" : ""}>
        <WebsoketTest
          key={schema.idField}
          schema={schema}
          isSearchingTable={false}
        />
        <PanelActions />
      </div>
    );
  }

  return <>{data && data.map((schema) => SelectForm(schema))}</>;
}

export default LiveForm;
