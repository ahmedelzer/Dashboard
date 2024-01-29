import React from 'react';
import './DynamicTable.scss';
import Table from '../../components/forms/DynamicTable/Table';
import useFetch from '../../components/hooks/APIsFunctions/useFetch';
import Loading from '../../components/loading/Loading';
import { useParams } from 'react-router-dom';


export default function DynamicTable() {
  const { dashboardItemID } = useParams();
  const { data, error, isLoading } = useFetch(`/Dashboard/GetDashboardFormSchema?DashboardMenuItemID=${dashboardItemID}`);
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



  return (
    <div>
    {data && data.map((schema) => (
      <Table key={schema.dashboardFormSchemaID} schema={schema} isSearchingTable={false} />
    ))}
  </div>
  );
}
