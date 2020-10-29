import React, { useState, createContext, useEffect } from "react";
import { isCompositeComponent } from "react-dom/test-utils";

export const MangaContext = createContext();

export const MangaProvider = (props) => {
  const [manga, setManga] = useState([]);

  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
const mangaCheck = id => {
  return fetch(`http://localhost:8088/lists?_expand=user&userId=${localStorage.getItem("loginId")}&mangaId=${id}`)
  .then(res => res.json())

}

  const getMangaByPage = (offset = 0) => {
    return fetch(
      `https://kitsu.io/api/edge/manga?page[offset]=${offset}&sort=slug`
    )
      .then((res) => res.json())
      .then((res) => {
        setManga(res.data);
        return res.data;
      });
  };
  const getMangaByCategory = (offset = 0, selection) => {
    return fetch(
      `https://kitsu.io/api/edge/manga?page[offset]=${offset}&filter[categories]=${selection}`
    )
      .then((res) => res.json())
      .then((res) => {
        setManga(res.data);
        return res.data;
      });
  };
  const getMangaByName = (selection, offset = 0) => {
    return fetch(
      `https://kitsu.io/api/edge/manga?page[offset]=${offset}&filter[text]=${selection}`
    )
      .then((res) => res.json())
      .then((res) => {
        setManga(res.data);
        return res.data;
      });
  };
  const getMangaByGenre = (selection, offset = 0) => {
    return fetch(
      `https://kitsu.io/api/edge/manga?page[offset]=${offset}&filter[genres]=${selection}`
    )
      .then((res) => res.json())
      .then((res) => {
        setManga(res.data);
        return res.data;
      });
  };

  const getMangaById = (id = Math.floor(Math.random() * 14200 + 1)) => {
    return fetch(`https://kitsu.io/api/edge/manga/${id}`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((res) => {
        setManga(res.data);
        return res;
      })
      .catch(e => {
        return getMangaById()
      })
;
  };

  return (
    <MangaContext.Provider
      value={{
        manga,
        getMangaByPage,
        getMangaById,
        getMangaByGenre,
        getMangaByName,
        getMangaByCategory,
        mangaCheck
      }}
    >
      {" "}
      {props.children}
    </MangaContext.Provider>
  );
};
