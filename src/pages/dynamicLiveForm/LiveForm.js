import React, { useContext } from "react";
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
import FormContainer from "../../components/forms/DynamicPopup/FormContainer";
import Table from "../../components/forms/DynamicTable/Table";

function LiveForm() {
  const { dashboardItemID } = useParams();
  const { Right } = useContext(LanguageContext);

  const { data, error, isLoading } = useFetch(
    `/Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardItemID}`,
    defaultProjectProxyRoute
  );
  const mainSchema = data
    ? data.find((item) => item?.isMainSchema === true)
    : null;

  console.log("====================================mainSchema");
  console.log(mainSchema);
  console.log("====================================");
  const schemaActions = useFetch(
    GetSchemaActionsUrl(mainSchema?.dashboardFormSchemaID),
    defaultProjectProxyRoute
  );

  const searchAction =
    schemaActions.data &&
    schemaActions.data.find(
      (action) => action?.dashboardFormActionMethodType === "Search"
    );
  console.log("route", searchAction);

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
        {/* <PartionFrom
          Header={schema.dashboardFormSchemaInfoDTOView.schemaHeader}
          key={schema.idField}
          Popup={
            <FormContainer
              tableSchema={schema}
              row={{}}
              // onChange={onChange}
              // errorResult={errorResult}
              // img={img}
            />
          }
          Table={
            <Table
              key={schema.idField}
              schema={mainSchema}
              paging={true}
              isSearchingTable={false}
            />
          }
        /> */}
        <PanelActions
          SearchComponent={
            <BaseTable
              schema={mainSchema}
              isSearchingTable={true}
              setSelectedRow={null}
              paging={false}
              getAction={searchAction}
            />
          }
        />
      </div>
    );
  }

  return <>{data && data.map((schema) => SelectForm(schema))}</>;
}

export default LiveForm;
