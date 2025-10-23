// WSContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
export const WSContext = createContext(null);

// Context provider component
export const WSProvider = ({ children }) => {
  const [_wsMessageTable, setWSMessageTable] = useState("{}");
  const [_wsMessageForm, setWSMessageForm] = useState("{}");
  return (
    <WSContext.Provider
      value={{
        _wsMessageTable,
        setWSMessageTable,
        _wsMessageForm,
        setWSMessageForm,
      }}
    >
      {children}
    </WSContext.Provider>
  );
};

// Custom hook to consume the context
export const useWS = () => useContext(WSContext);
