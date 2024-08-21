import React, { useState, createContext } from "react";

//context
export const LanguageContext = createContext();

const Language = ({ children }) => {
  const [Lan, setLan] = useState(
    window.localStorage.getItem("language") || "ENG_US"
  );
  const [Right, setRight] = useState(
    window.localStorage.getItem("right") === "true" || false
  );
  const [fileBase64, setFileBase64] = useState(null);
  const [leftSelectionContext, setLeftSelectionContext] = useState([]);

  return (
    <LanguageContext.Provider
      value={{
        Lan,
        setLan,
        Right,
        setRight,
        fileBase64,
        setFileBase64,
        leftSelectionContext,
        setLeftSelectionContext,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default Language;
