function GetFormSchema(dashboardFormSchemaID) {
  return `/Dashboard/GetDashboardForm?DashboardMenuItemID=${dashboardFormSchemaID}`;
}

export default GetFormSchema;
