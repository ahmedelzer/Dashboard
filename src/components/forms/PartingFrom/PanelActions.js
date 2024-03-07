import React, { useState } from "react";
import { Button } from "reactstrap";
import Searching from "./Searching";
import { SearchingCellRender } from "../../hooks/FormsFunctions/SearchingCellRender";
function PanelActions({ Popup, Table }) {
  const [open, setopen] = useState(false);
  return (
    <div className="flex justify-evenly items-center">
      <Button className="pop" onClick={() => setopen(true)}>
        Search
      </Button>
      {/* <Searching open={open} SearchForm={Popup} />
      <SearchingCellRender /> */}
      <Button type="submit" className="pop">
        Clear
      </Button>
    </div>
  );
}

export default PanelActions;
