import React, { useContext } from "react";
import { SearchContext } from "./SearchProvider";
// import "./Animal.css"

export const AnimeSearch = () => {
  const { setSearchTerms } = useContext(SearchContext);

  return (
    <>
      <div>
        Name Search:
        <input
          type="text"
          className="input--wide"
          onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value)}
          placeholder="Search for an anime... "
        />
      </div>
    </>
  );
};
