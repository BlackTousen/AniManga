import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AnimeCard } from "./AnimeCard";
import { AnimeContext } from "./Provider";
import "./Anime.css";
import { UserContext } from "../users/UserProvider";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import { Card, Button } from "semantic-ui-react";

export const AnimeList = () => {
  const { anime, getAnimeById } = useContext(AnimeContext);
  const { getWatchingList } = useContext(UserContext);
  const [filteredAnimeC, setFilteredAnimeC] = useState([]);
  const [filteredAnimeW, setFilteredAnimeW] = useState([]);
  const [filteredAnime1, setFilteredAnime1] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [watching, setWatching] = useState([]);

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
      })
      .then(() => {});
  }, []);

  const handleAnime = (test) => {
    let x = [];
    let z = [];
    for (const y of test) {
      getAnimeById(y.animeId).then((res) => {
        if (y.completed === true) {
          x.push(res);
        } else if (y.completed === false) {
          z.push(res);
        }
      });
    }
    setTimeout(() => {
      setFilteredAnimeW(z);
      setFilteredAnimeC(x);
    }, 500);
  };

  useEffect(() => {
    setCompleted(filteredAnimeC);
    setWatching(filteredAnimeW);
  }, [filteredAnimeW, filteredAnimeC]);

  // const handleAnime1 = (test) => {
  //   let x = [];
  //   for (const y of test) {
  //     getAnimeById(y.animeId).then((res) => {
  //       x.push(res);
  //     }).then(_ => {
  //         setFilteredAnimeW(x)
  //     });
  //   }
  // };
  // const handleAnime2 = (test) => {
  //   let x = [];
  //   for (const y of test) {
  //     getAnimeById(y.animeId).then((res) => {
  //       x.push(res);
  //     }).then(_ => {
  //       console.log(x)
  //         setFilteredAnimeC(x)
  //     });
  //   }
  // };

  // const setWatchingAnime = (list) => {
  //   let y = list.filter(a => a.completed === false)
  // setWatching(y)
  // handleAnime1(y)
  // }
  // const setCompletedAnime = (list) => {
  //   let y = list.filter(a => a.completed === true)
  //   console.log(y,list,"Completed List")
  // setCompleted(y)
  // handleAnime2(y)

  // }

  // useEffect(() => {
  //   console.log("called",filteredAnime1)
  //   setWatchingAnime(filteredAnime1)
  //   setCompletedAnime(filteredAnime1)
  // },[filteredAnime1])

  // useEffect(() => {
  //     let x = []
  //      filteredAnime.map(x=> {
  //         getAnimeById(x.animeId)
  //     }).then(res => {
  //         x.push(res)
  //     })
  // },[filteredAnime])
  const cardAlign = (list = [1]) => {
    let x = list.length;
    if (x < 3) {
      if (x < 1) {
        x = 1;
      }
      return x;
    } else {
      x = 3;
     return x;
    }
  };

  const history = useHistory();

  return (
    <>
      <div id="AnimeList"></div>
      <h2>Currently Watching</h2>
      <div className="animeList">
        <Card.Group itemsPerRow={cardAlign(filteredAnimeW)}>
          {filteredAnimeW?.map((a) => {
            return <AnimeCard key={a.id} anime={a} listed={true} />;
          })}
        </Card.Group>
      </div>
      <h2>Completed</h2>
      <div className="animeList">
        <Card.Group itemsPerRow={cardAlign(filteredAnimeC)}>
          {filteredAnimeC?.map((a) => {
            return <AnimeCard key={a.id} anime={a} listed={true} />;
          })}
        </Card.Group>
      </div>
    </>
  );
};
