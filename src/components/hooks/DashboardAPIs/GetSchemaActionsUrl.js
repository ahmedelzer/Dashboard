function GetSchemaActionsUrl(dashboardFormSchemaID) {
  console.log("====================================dashboardFormSchemaID");
  console.log("a2");
  console.log("====================================");
  return `/Dashboard/GetDashboardSchemaActionsBySchemaID?DashboardSchemaID=${dashboardFormSchemaID}`;
}

export default GetSchemaActionsUrl;
