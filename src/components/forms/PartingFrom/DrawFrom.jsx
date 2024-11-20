import React from "react";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { defaultProjectProxyRoute, GetProjectUrl } from "../../../request";
import FormContainer from "../DynamicPopup/FormContainer";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";
import DotsLoading from "../../loading/DotsLoading";
import FormComponent from "./FormComponent";
// }
function DrawFrom({ serviceRegistration, result }) {
  const {
    data: addDashboardItem,
    error,
    isLoading,
  } = useFetch(
    `/Dashboard/GetDashboardForm?DashboardMenuItemID=${serviceRegistration.dataSource[0].addDashboardItemID}`,
    defaultProjectProxyRoute
  );

  if (!addDashboardItem || isLoading) {
    return <DotsLoading />;
  }
  if (error && !addDashboardItem) {
    // Handle error, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {addDashboardItem &&
        addDashboardItem.map((from) => (
          <FormComponent
            key={from.dashboardFormSchemaID}
            row={{}}
            returnRow={() => {}}
            tableSchema={from}
            result={result}
          />
        ))}
    </div>
  );
}

export default DrawFrom;
