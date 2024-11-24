import React, { useState, createContext } from "react";
import { json } from "react-router-dom";
import staticLocalization from "./StaticLocalization.json";
//context
export const LanguageContext = createContext();

const Language = ({ children }) => {
  const [Lan, setLan] = useState(window.localStorage.getItem("language"));
  const [languageID, setLanguageID] = useState(
    window.localStorage.getItem("languageID")
  );
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
        languageID,
        setLanguageID,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default Language;
