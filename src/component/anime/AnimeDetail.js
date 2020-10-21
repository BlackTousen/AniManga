import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AnimeContext } from "./Provider";
import "./Anime.css";
import { UserContext } from "../users/UserProvider";

export const AnimeDetail = () => {
  const { anime, getAnimeById } = useContext(AnimeContext);
  const { createList, getWatchingList, getList, addToList } = useContext(
    UserContext
  );
  const [myAnime, setMyAnime] = useState({});
  const [watchingList, setWatchingList] = useState([]);
  const history = useHistory();
  const { animeId } = useParams();

  useEffect(() => {
    getWatchingList().then((x) => {
      let found = x.find(
        (list) =>
          parseInt(list.userId) === parseInt(localStorage.getItem("loginId"))
      );
      setWatchingList(found);
    });
    getAnimeById(animeId).then((res) => {
      setMyAnime(res);
    });
  }, []);

  const constructAnimeObject = (complete = false) => {
    // setIsLoading(true);
    if (animeId) {
      getList(animeId).then((res) => {
        if (!!res === false) {
          addToList(res.id, {
            completed: complete,
            userId: parseInt(localStorage.getItem("loginId")),
          }).then(() => history.push(`/anime/myAnime`));
        } else {
          createList({
            animeId: animeId,
            completed: complete,
            userId: parseInt(localStorage.getItem("loginId")),
          }).then(() => history.push(`/anime/myAnime`));
        }
      });
      //PUT - update
    }
  };
  const handleAdd = (e) => {
    constructAnimeObject();
  };
  const handleComplete = (e) => {
    constructAnimeObject(true);
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
          <button
            className="SearchButton"
            hidden={false}
            onClick={() => {
              handleComplete();
            }}
          >
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
            Add Comment
          </button>
          <button
            className="SearchButton"
            hidden={false}
            onClick={() => {
              // history.push("/anime/Search");
            }}
          >
            View Comments
          </button>
        </div>
        <p></p>
        <div className="buttons">
          <button
            className="AnimeButton"
            onClick={() => {
              // history.push("/anime/myAnime");
            }}
          >
            My Anime
          </button>
          <button
            className="SearchButton"
            hidden={false}
            onClick={() => {
              history.push("/anime/Search");
            }}
          >
            Anime Search
          </button>
        </div>
      </section>
    </section>
  );
};
