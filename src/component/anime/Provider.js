import React, { useState, createContext, useEffect } from "react";
import { isCompositeComponent } from "react-dom/test-utils";

export const AnimeContext = createContext();

export const AnimeProvider = (props) => {
  const [anime, setAnime] = useState([]);

  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
  const animeCheck = id => {
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${localStorage.getItem("loginId")}&animeId=${id}`)
    .then(res => res.json())

  }
  const getAnimeByPage = (offset = 0) => {
    return fetch(
      `https://kitsu.io/api/edge/anime?page[offset]=${offset}&sort=slug`
    )
      .then((res) => res.json())
      .then((res) => {
        setAnime(res.data);
        return res.data;
      });
  };
  const getAnimeByCategory = (offset = 0, selection) => {
    return fetch(
      `https://kitsu.io/api/edge/anime?page[offset]=${offset}&filter[categories]=${selection}`
    )
      .then((res) => res.json())
      .then((res) => {
        setAnime(res.data);
        return res.data;
      });
  };
  const getAnimeByName = (selection, offset = 0) => {
    return fetch(
      `https://kitsu.io/api/edge/anime?page[offset]=${offset}&filter[text]=${selection}`
    )
      .then((res) => res.json())
      .then((res) => {
        setAnime(res.data);
        return res.data;
      });
  };
  const getAnimeByGenre = (selection, offset = 0) => {
    return fetch(
      `https://kitsu.io/api/edge/anime?page[offset]=${offset}&filter[genres]=${selection}`
    )
      .then((res) => res.json())
      .then((res) => {
        setAnime(res.data);
        return res.data;
      });
  };

  const getAnimeById = (id = Math.floor(Math.random() * 14200 + 1)) => {
    return fetch(`https://kitsu.io/api/edge/anime/${id}`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((res) => {
        setAnime(res.data);
        return res;
      })
      .catch(e => {
        return getAnimeById()
      })
;
  };

  return (
    <AnimeContext.Provider
      value={{
        anime,
        getAnimeByPage,
        getAnimeById,
        getAnimeByGenre,
        getAnimeByName,
        getAnimeByCategory,
        animeCheck
      }}
    >
      {" "}
      {props.children}
    </AnimeContext.Provider>
  );
};
