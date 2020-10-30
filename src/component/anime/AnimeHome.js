import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AnimeCommentCard, AnimeHomeCard, AnimeSearchCard } from "./AnimeCard";
import { AnimeContext } from "./Provider";
import "../auth/Login.css"
import video from "../../video/video2.mp4"
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
        if (res?.status === "404") { getRandomAnime(1) }
        else { setAnime1(res.data) }
      });
    });
    getRandomAnime()
  }, []);

  const getRandomAnime = (x = 0) => {
    let range = 14200
    let randomChoice = Math.floor(Math.random() * range + 1)
    getAnimeById(randomChoice)
    .then(res => {
       if (x === 0) { setAnime(res.data)  }
       else if (x === 1) { setAnime1 (res.data) }
    })
    

  }


  const history = useHistory();

  return (
    <><div className="main">
      <div className="animePanel">
        <div className="animeList">
          <AnimeHomeCard key={filteredAnime.id} anime={filteredAnime} />
      </div>
      <div className="animeList">
          <AnimeCommentCard />
      </div>
      <div className="animeList">
          <AnimeSearchCard key={filteredAnime1.id} anime={filteredAnime1} />
      </div>
      </div>
      <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        </div>
    </>
  );
};
