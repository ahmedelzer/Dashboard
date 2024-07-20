import React from "react";
import TableTransformer from "./PartingFrom/TableTransformer";

function Data() {
  //const {data}  = useFetch(`/Dashboard/GetDashboardFormSchema?DashboardMenuItemID=69a840d3-1170-4297-a6f0-baffae16a94f`);
  // console.log("data",data);
  return (
    <>
      {/* <Test /> */}
      <div className="">
        <TableTransformer />
        {/* <Table /> */}
        {/* <FileInput label={"ahmed"} size={50} />
        <FileInput label={"ahmed"} size={50} />
        <FileInput label={"ahmed"} size={50} /> */}
      </div>
    </>
  );
}

export default Data;
