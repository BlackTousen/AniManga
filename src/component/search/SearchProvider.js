import React, { useState, createContext, useEffect } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [searchTerms, setSearchTerms] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchTerms,
        setSearchTerms,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
