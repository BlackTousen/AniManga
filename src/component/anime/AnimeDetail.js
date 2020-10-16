import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AnimeContext } from "./Provider";
import "./Anime.css";
import { UserContext } from "../users/UserProvider";

export const AnimeDetail = () => {
  const { anime, getAnimeById } = useContext(AnimeContext);
  const { createList, getWatchingList } = useContext(UserContext);
  const [myAnime, setMyAnime] = useState({});
  const [watchingList, setWatchingList] = useState([]);
  const history = useHistory();
  const { animeId } = useParams();

  useEffect(() => {
      getWatchingList().then(x => {
          let found = x.find(list => parseInt(list.userId) === parseInt(localStorage.getItem("loginId")) )
          console.log(found)
          setWatchingList(found)
      })
    getAnimeById(animeId).then((res) => {
      setMyAnime(res);
      
    });
  }, []);

  const constructAnimeObject = () => {
    // setIsLoading(true);
    if (animeId) {
        //PUT - update
      createList({
        animeId: animeId,
        completed: false,
        userId: parseInt(localStorage.getItem("loginId"))
      }).then(() => history.push(`/anime/myAnime`));
    }
  };
  const handleAdd = (e) => {
    constructAnimeObject();
  };

  return (
    <section className="animeList">
      <section className="animeCard">
        <h3 className="center">
          {myAnime?.attributes?.canonicalTitle ??
            myAnime?.attributes?.titles.en}{" "}
        </h3>
        <img
          className="center"
          src={myAnime?.attributes?.posterImage.tiny}
          alt={myAnime?.attributes?.titles.en}
        />
        <div className="synopsis">
          {myAnime?.attributes?.subtype} - {myAnime?.attributes?.synopsis}
        </div>
        <p></p>
        <div className="buttons">
          <button
            className="AnimeButton"
            onClick={() => {
              handleAdd();
            }}
          >
            Start Watching
          </button>
          <button className="SearchButton" hidden={false} onClick={() => {}}>
            Completed
          </button>
        </div>
        <p></p>
        <div className="buttons">
          <button
            className="AnimeButton"
            onClick={() => {
              history.push("/anime/myAnime");
            }}
          >
            My Anime
          </button>
          <button
            className="SearchButton"
            hidden={true}
            onClick={() => {
              history.push("/anime/animeSearch");
            }}
          >
            Anime Search
          </button>
        </div>
      </section>
    </section>
  );
};
