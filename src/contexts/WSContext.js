// WSContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
export const WSContext = createContext(null);

// Context provider component
export const WSProvider = ({ children }) => {
  const [_wsMessageCart, setWSMessageCart] = useState("{}");
  const [_wsMessageMenuItem, setWSMessageMenuItem] = useState("{}");
  const [_wsMessageSuggest, setWSMessageSuggest] = useState("{}");
  const [_wsMessageAccounting, setWSMessageAccounting] = useState("{}");

  return (
    <WSContext.Provider
      value={{
        _wsMessageCart,
        setWSMessageCart,
        _wsMessageMenuItem,
        setWSMessageMenuItem,
        _wsMessageSuggest,
        setWSMessageSuggest,
        _wsMessageAccounting,
        setWSMessageAccounting,
      }}
    >
      {children}
    </WSContext.Provider>
  );
};

// Custom hook to consume the context
export const useWS = () => useContext(WSContext);
