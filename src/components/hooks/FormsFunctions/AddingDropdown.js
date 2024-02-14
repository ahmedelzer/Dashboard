import React from "react";
import { SearchingCellRender } from "./SearchingCellRender";

function AddingDropdown() {
  const data = {
    dashboardFormSchemaParameterID: "38ad2bc8-7d4f-46a5-9a59-8a2104e960f4",
    dashboardFormSchemaID: "270f513b-1788-4c01-879e-4526c990f899",
    isEnable: true,
    parameterType: "text",
    parameterField: "dashboardCategoryName",
    parameterTitel: "dashboard Menu Category Name",
    isIDField: false,
    lookupID: null,
    lookupReturnField: null,
    lookupDisplayField: null,
  };
  return (
    <div>
      <SearchingCellRender data={data} />
    </div>
  );
}

export default AddingDropdown;
