import React, { useState, createContext } from "react";

//context
export const LanguageContext = createContext();
const Language = ({ children }) => {
  const [Lan, setLan] = useState("ENG_US");
  const [Right, setRight] = useState(false);
  const [fileBase64, setFileBase64] = useState(null);
  return (
    <LanguageContext.Provider
      value={{ Lan, setLan, Right, setRight, fileBase64, setFileBase64 }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default Language;
