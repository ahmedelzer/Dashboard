function GetSchemaActionsUrl(dashboardFormSchemaID) {
  return `/Dashboard/GetDashboardSchemaActionsBySchemaID?DashboardSchemaID=${dashboardFormSchemaID}`;
}

export default GetSchemaActionsUrl;
