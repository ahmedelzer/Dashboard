function GetSchemaUrl(dashboardFormSchemaID) {
  return `/Dashboard/GetDashboardFormItemSchemaBySchemaID?dashboardFormSchemaID=${dashboardFormSchemaID}`;
}

export default GetSchemaUrl;
