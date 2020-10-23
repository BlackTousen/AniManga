import React, { useContext, useState } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { SearchContext } from "./SearchProvider";
// import "./Animal.css"

export const AnimeSearch = () => {
  const { setSearchTerms, setSearchTermsG } = useContext(SearchContext);
  const [value,setValue] = useState({})

  
  const handleChange = (e, { value }) => { 
    setValue({ value } )
  setSearchTermsG(value)  
  }


  const genreOptions = [
    {
      key: "Isekai",
      text: "Isekai",
      value: "isekai",
    },
    {
      key: "Action",
      text: "Action",
      value: "action",
    },    {
      key: "Shonen",
      text: "Shonen",
      value: "shounen",
    },
    {
      key: "Shoujo",
      text: "Shoujo",
      value: "shoujo",
    },
    {
      key: "Mecha",
      text: "Mecha",
      value: "mecha",
    },
    {
      key: "Ecchi",
      text: "Ecchi",
      value: "ecchi",
    },
    {
      key: "Harem",
      text: "Harem",
      value: "harem",
    },
    {
      key: "Slice of Life",
      text: "Slice of Life",
      value: "slice of life",
    },

  ];
  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.value.toUpperCase();
    const bandB = b.value.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
  genreOptions.sort(compare)
  return (
    <>
      <div>
        <span>
          Name Search:
          <input
            type="text"
            className="input--wide"
            onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value)}
            placeholder="Search for an anime... "
          />
          Genre Search:
          <Menu compact>
            <Dropdown
              placeholder="Select Genre"
              selection
              // value={value}
              options={genreOptions}
              onChange={handleChange}
            />
          </Menu>
        </span>
      </div>
      <p></p>
    </>
  );
};
