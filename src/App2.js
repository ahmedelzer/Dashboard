import { Item } from "devextreme-react/accordion";
import React from "react";
import { Button } from "reactstrap";
import LanguageSelector from "./components/header/LanguageSelector";
import { Toolbar } from "devextreme-react";
import { Header } from "./components";

const App2 = () => {
  return (
    <>
      {/* <div className="sub-div"> */}
      <Header />
      {/* </div> */}
      <button onClick={() => console.log("clicked")}>ahhaahhah</button>
    </>
  );
};

export default App2;
