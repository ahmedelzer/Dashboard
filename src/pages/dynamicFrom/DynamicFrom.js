import React from "react";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import PartionFrom from "../../components/forms/PartingFrom/PartionFrom";
import SelectForm from "../../components/hooks/FormsFunctions/SelecetForm";
function DynamicFrom() {
  const { dashboardItemID } = useParams();
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

  return <div>{data && data.map((schema) => SelectForm(schema))}</div>;
}

export default DynamicFrom;
