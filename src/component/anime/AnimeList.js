import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AnimeCard } from "./AnimeCard";
import { AnimeContext } from "./Provider";
import "./Anime.css";
import { UserContext } from "../users/UserProvider";

export const AnimeList = () => {
  const { anime, getAnimeById } = useContext(AnimeContext);
  const { getWatchingList } = useContext(UserContext);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [filteredAnime1, setFilteredAnime1] = useState([]);

  // Page selection
  //     result = page - 1
  //     if (result = 0) { getAnimeByPage() }
  //     else {
  //         result * 10 + 1
  //     getAnimeByPage(result)
  // }

  useEffect(() => {
    getWatchingList()
      .then((res) => {
        handleAnime(res);
      });
  }, []);

  const handleAnime = (test) => {
    let x = [];
    for (const y of test) {
      getAnimeById(y.animeId).then((res) => {
        x.push(res);
      }).then(_ => {
          setFilteredAnime1(x)
      });
    }
  };

  // useEffect(() => {
  //     let x = []
  //      filteredAnime.map(x=> {
  //         getAnimeById(x.animeId)
  //     }).then(res => {
  //         x.push(res)
  //     })
  // },[filteredAnime])

  const history = useHistory();

  return (
    <>
      <h2>My Listy Thangz</h2>
      <div className="animeList">
        {filteredAnime1.map(a => {
          return <AnimeCard key={a.id} anime={a} />
        })}
      </div>
    </>
  );
};
