import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MangaCard } from "./MangaCard";
import { MangaContext } from "./Provider";
import "../auth/Login.css"
import video from "../../video/video8.mp4"
import "./Manga.css";
import { UserContext } from "../users/UserProvider";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import { Card, Button, Divider } from "semantic-ui-react";

export const MangaList = () => {
  const { manga, getMangaById } = useContext(MangaContext);
  const { getMangaList } = useContext(UserContext);
  const [filteredMangaC, setFilteredMangaC] = useState([]);
  const [filteredMangaW, setFilteredMangaW] = useState([]);
  const [filteredManga1, setFilteredManga1] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [watching, setWatching] = useState([]);

  useEffect(() => {
    getMangaList()
      .then((res) => {
        handleManga(res);
      })
      .then(() => {});
  }, []);

  const handleManga = (list) => {
    let x = [];
    let z = [];
    let mangaRequests = []
    for (const y of list) {
      let mangaPromise = getMangaById(y.mangaId).then((res) => {
        if (y.completed === true) { x.push(res.data); }
         else if (y.completed === false) { z.push(res.data); }
      })
      mangaRequests.push(mangaPromise)
    }
    Promise.all(mangaRequests).then(_ =>{
      setFilteredMangaW(z);
      setFilteredMangaC(x);
    })
  };

  useEffect(() => {
    setCompleted(filteredMangaC);
    setWatching(filteredMangaW);
  }, [filteredMangaW, filteredMangaC]);

  const cardAlign = (list = [1]) => {
    let x = list.length;
    if (x < 3) {
      if (x < 1) { x = 1; }
      return x;
    } else {
      x = 3;
     return x;
    }
  };

  const history = useHistory();

  return (
    <><div className="main">
      <div id="MangaList"></div>
      <h2 className="text">Currently Watching</h2>
      <div className="mangaList">
        <Card.Group itemsPerRow={cardAlign(filteredMangaW)}>
          {filteredMangaW?.map((a) => <MangaCard key={a.id} manga={a} listed={true} />) }
        </Card.Group>
      </div>
      <Divider section hidden/>
      <Divider section inverted/>
      <Divider section hidden/>
      <h2 className="text">Completed</h2>
      <div className="mangaList">
        <Card.Group itemsPerRow={cardAlign(filteredMangaC)}>
          {filteredMangaC?.map((a) => {
            return <MangaCard key={a.id} manga={a} listed={true} />;
          })}
        </Card.Group>
      </div>
      <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        </div>

    </>
  );
};
