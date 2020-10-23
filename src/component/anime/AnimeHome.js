import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AnimeCommentCard, AnimeHomeCard, AnimeSearchCard } from "./AnimeCard";
import { AnimeContext } from "./Provider";
import "./Anime.css";
import { UserContext } from "../users/UserProvider";

export const AnimeHome = () => {
  const { anime, getAnimeById } = useContext(AnimeContext);
  const { getWatchingList } = useContext(UserContext);
  const [filteredAnime1, setAnime] = useState([]);
  const [filteredAnime, setAnime1] = useState([]);




  useEffect(() => {
    getWatchingList().then((res) => {
        let x = res.filter(list => list.completed === false)
        let range = x.length
        let randomChoice = Math.floor(Math.random() * range)
        getAnimeById(x[randomChoice]?.animeId)
      .then(res => { 
        setAnime1(res.data) 
      });
    });
    getRandomAnime()
  }, []);

  const getRandomAnime = () => {
    let range = 1500
    let randomChoice = Math.floor(Math.random() * range)
    getAnimeById(randomChoice)
    .then(res => {
      if (res.status === "404") { getRandomAnime() }
     else { setAnime(res.data) }
    })
    

  }


  const history = useHistory();

  return (
    <>
      <div className="animePanel">
        <div className="animeList">
          <AnimeHomeCard key={filteredAnime?.id} anime={filteredAnime} />
      </div>
      <div className="animeList">
          <AnimeCommentCard />
      </div>
      <div className="animeList">
          <AnimeSearchCard key={filteredAnime1?.id} anime={filteredAnime1} />
      </div>
      </div>
    </>
  );
};
