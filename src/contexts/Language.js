import React, { useState, createContext } from "react";
import { json } from "react-router-dom";
import staticLocalization from "./StaticLocalization.json";
//context
export const LanguageContext = createContext();

const Language = ({ children }) => {
  const [Lan, setLan] = useState(window.localStorage.getItem("language"));
  const [Right, setRight] = useState(
    window.localStorage.getItem("right") === "true"
  );
  const [localization, setLocalization] = useState(staticLocalization);

  return (
    <LanguageContext.Provider
      value={{
        Lan,
        setLan,
        Right,
        setRight,
        localization,
        setLocalization,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default Language;
