import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AnimeHomeCard } from "./AnimeCard";
import { AnimeContext } from "./Provider";
import "./Anime.css";
import { UserContext } from "../users/UserProvider";

export const AnimeHome = () => {
  const { anime, getAnimeById } = useContext(AnimeContext);
  const { getWatchingList } = useContext(UserContext);
  const [filteredAnime1, setAnime] = useState([]);
  const [filteredAnime, setAnime1] = useState([]);

  // Page selection
  //     result = page - 1
  //     if (result = 0) { getAnimeByPage() }
  //     else {
  //         result * 10 + 1
  //     getAnimeByPage(result)
  // }


  useEffect(() => {
    getWatchingList().then((res) => {
        const x = res.find(list => list.userId === parseInt(localStorage.getItem("loginId")) )
        const range = x.watching.length - 1
        const randomChoice = Math.floor(Math.random() * range + 1)
      getAnimeById(x.watching[randomChoice])
      .then(setAnime1);
    });
  }, []);

  const history = useHistory();

  return (
    <>
      <div className="animePanel">
        <div className="animeList">
          <AnimeHomeCard key={filteredAnime.id} anime={filteredAnime} />
        </div>
      </div>
    </>
  );
};
