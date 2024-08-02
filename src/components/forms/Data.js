import React from "react";
import TableTransformer from "./PartingFrom/TableTransformer";
import DisplayFile from "./PartingFrom/DisplayFile";
import FileInput from "./PartingFrom/FileInput";
import UploadAction from "../inputs/InputActins/UploadAction";
import BrowserUrlAction from "../inputs/InputActins/BrowserUrlAction";
import WebcamActions from "../inputs/InputActins/WebcamActins";
import ParentComponent from "../inputs/InputActins/PanelActions";

function Data() {
  //const {data}  = useFetch(`/Dashboard/GetDashboardFormSchema?DashboardMenuItemID=69a840d3-1170-4297-a6f0-baffae16a94f`);
  // console.log("data",data);
  return (
    <>
      {/* <UploadAction /> */}
      {/* <BrowserUrlAction /> */}
      <ParentComponent />
      {/* <DisplayFile photo={""} /> */}
      {/* <Test /> */}
      {/* <div className="relative flex justify-center items-center">
        <img
          src="https://educators.brainpop.com/wp-content/uploads/2013/10/at_the_park_action_image-422x322.png"
          alt=""
          className="cursor-pointer"
        />
        <div className="absolute inset-0 bg-black opacity-0 hover:bg-[hsla(0, 0%, 9%, 0.2)] transition-opacity duration-300 ease-in-out"></div>
      </div> */}

      {/* <TableTransformer /> */}
      {/* <Table /> */}
      {/* <FileInput label={"ahmed"} size={50} />
        <FileInput label={"ahmed"} size={50} />
        <FileInput label={"ahmed"} size={50} /> */}
    </>
  );
}

export default Data;
