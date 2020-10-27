import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AnimeContext } from "./Provider";
import "./Anime.css";
import { UserContext } from "../users/UserProvider";
import { Card, Image, Button, Modal, Input } from "semantic-ui-react";
import { CommentContext } from "../comments/CommentProvider";

export const AnimeDetail = () => {
  const { anime, getAnimeById } = useContext(AnimeContext);
  const { addComment } = useContext(CommentContext);
  const { createList, getWatchingList, getList, addToList } = useContext(
    UserContext
  );
  const [myAnime, setMyAnime] = useState({});
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
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
      setMyAnime(res.data);
    });
  }, []);

  const constructAnimeObject = (complete = false) => {
    // setIsLoading(true);
    if (animeId) {
      getList(animeId).then((res) => {
        if (!!res[0] === true) {
          addToList(res[0].id, {
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
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            rows="5"
          ></textarea>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Save"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              addComment({
                comment: comment,
                date: Date.now(),
                animeId: animeId,
                animeName: myAnime?.attributes?.canonicalTitle,
                userId: parseInt(localStorage.getItem("loginId")),
              });
              setOpen(false);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
      <div className="animePanel">
        <Card.Group>
          <Card color="purple">
            <Image src={myAnime?.attributes?.posterImage.large} />
            <Card.Content>
              <Card.Header textAlign="center">
                {myAnime?.attributes?.canonicalTitle ??
                  myAnime?.attributes?.titles.en}{" "}
              </Card.Header>
              <Card.Description className="synopsis">
                {myAnime?.attributes?.subtype} - {myAnime?.attributes?.synopsis}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button.Group widths={2}>
                <Button
                  attached="left"
                  size="mini"
                  className="AnimeButton"
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  Start Watching
                </Button>
                <Button
                  positive
                  size="tiny"
                  className="SearchButton"
                  hidden={false}
                  onClick={() => {
                    handleComplete();
                  }}
                >
                  Completed
                </Button>
              </Button.Group>
              <p></p>
              <Button.Group widths={2}>
                <Button
                  content="Add"
                  size="mini"
                  className="AnimeButton"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
                <Button
                  positive
                  content="Comments"
                  size="tiny"
                  className="SearchButton"
                  hidden={false}
                  onClick={() => {
                    history.push(`/anime/comments/${animeId}`);
                  }}
                />
              </Button.Group>
              <p></p>
              <Button.Group widths={2}>
                <Button
                  size="mini"
                  className="AnimeButton"
                  onClick={() => {
                    history.push("/anime/myAnime");
                  }}
                >
                  My Anime
                </Button>
                <Button
                  positive
                  size="tiny"
                  className="SearchButton"
                  hidden={false}
                  onClick={() => {
                    history.push("/anime/Search");
                  }}
                >
                  Anime Search
                </Button>
              </Button.Group>
            </Card.Content>
          </Card>

          <Card color="purple">
            {console.log(watchingList)}
            <Card.Content extra>
              <Input type="text" label="Note:" placeholder="Viewing on Netflix" />
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    </>
  );

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
