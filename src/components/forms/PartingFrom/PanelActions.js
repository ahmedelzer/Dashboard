import React, { useState } from "react";
import { Button } from "reactstrap";
import Searching from "./Searching";
function PanelActions({ SearchComponent }) {
  const [open, setopen] = useState(false);
  return (
    <div className="w-full relative mt-12">
      <div className="flex justify-end items-center absolute bottom-0 right-0">
        <Button className="pop mr-2" onClick={() => setopen(true)}>
          Search
        </Button>
        <Searching open={open} SearchForm={SearchComponent} />
        <Button type="submit" className="pop">
          Clear
        </Button>
      </div>
    </div>
  );
}

export default PanelActions;
