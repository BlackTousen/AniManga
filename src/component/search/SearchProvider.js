import React, { useState, createContext, useEffect } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [searchTerms, setSearchTerms] = useState("");
  const [searchTermsG, setSearchTermsG] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchTerms,
        setSearchTerms,
        searchTermsG, 
        setSearchTermsG
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
