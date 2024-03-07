fetch(
  "http://ihs.ddnsking.com:8000/Centralization/api/Dashboard/GetDashboardMenuItems?pagination.PageSize=100&pagination.PageNumber=1"
)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
