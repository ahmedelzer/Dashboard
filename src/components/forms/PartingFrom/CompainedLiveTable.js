import React from "react";
import LiveTable from "../DynamicTable/LiveTable";
import LiveFormPartions from "./LiveFormPartions";

function CompainedLiveTable({ Schema, updatedData, editedRow, setEditedgRow }) {
  return (
    <div>
      <LiveTable
        editedRow={editedRow}
        setEditedgRow={setEditedgRow}
        dataSource={Schema}
        updateRow={updatedData ? updatedData : []}
      />
      <LiveFormPartions Schema={Schema} data={updatedData ? updatedData : {}} />
    </div>
  );
}

export default CompainedLiveTable;
