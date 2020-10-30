import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MangaCommentCard, MangaHomeCard, MangaSearchCard } from "./MangaCard";
import { MangaContext } from "./Provider";
import "../auth/Login.css"
import video from "../../video/video7.mp4"
import "./Manga.css";
import { UserContext } from "../users/UserProvider";




export const MangaHome = () => {
  const { manga, getMangaById } = useContext(MangaContext);
  const { getMangaList } = useContext(UserContext);
  const [filteredManga1, setManga] = useState([]);
  const [filteredManga, setManga1] = useState([]);




  useEffect(() => {
    getMangaList().then((res) => {
        let x = res.filter(list => list.completed === false)
        let range = x.length
        let randomChoice = Math.floor(Math.random() * range )
        getMangaById(x[randomChoice]?.mangaId)
        .then(res => { 
        if (res?.status === "404") { getRandomManga(1) }
        else { setManga1(res.data) }
      });
    });
    getRandomManga()
  }, []);

  const getRandomManga = (x = 0) => {
    let range = 14200
    let randomChoice = Math.floor(Math.random() * range + 1)
    getMangaById(randomChoice)
    .then(res => {
       if (x === 0) { setManga(res.data)  }
       else if (x === 1) { setManga1 (res.data) }
    })
    

  }


  const history = useHistory();

  return (
    <><div className="main">
      <div className="mangaPanel">
        <div className="mangaList">
          <MangaHomeCard key={filteredManga.id} manga={filteredManga} />
      </div>
      <div className="mangaList">
          <MangaCommentCard />
      </div>
      <div className="mangaList">
          <MangaSearchCard key={filteredManga1.id} manga={filteredManga1} />
      </div>
      </div>

      <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        </div>
    </>
  );
};
