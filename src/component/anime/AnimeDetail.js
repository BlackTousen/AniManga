import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AnimeContext } from "./Provider";
import "./Anime.css";
import { UserContext } from "../users/UserProvider";
import { Card, Image, Button, Modal, Input } from "semantic-ui-react";
import { CommentContext } from "../comments/CommentProvider";

export const AnimeDetail = () => {
  const { anime, getAnimeById, animeCheck } = useContext(AnimeContext);
  const { addComment } = useContext(CommentContext);
  const {
    createList,
    getWatchingList,
    getList,
    addToList,
    addPersonalNote,
    getPersonalNotes,
  } = useContext(UserContext);
  const [myAnime, setMyAnime] = useState({});
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [time, setTime] = useState({});
  const [personalComment, setPersonalComment] = useState("");
  const [watchingList, setWatchingList] = useState([]);
  const history = useHistory();
  const { animeId } = useParams();
  const [value, setValue] = useState({});

  const handleChange = (e, { value }) => {
    setValue({ value });
    setPersonalComment(value);
  };
  useEffect(() => {
    animeCheck(animeId).then(setTime)
    getPersonalNotes(animeId).then(setNotes);
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

  useEffect(() => {
  getPersonalNotes(animeId)
  },[notes])

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.date;
    const bandB = b.date;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  const constructAnimeObject = (complete = false) => {
    if (animeId) {
      getList(animeId).then((res) => {
        if (!!res[0] === true) {
          addToList(res[0].id, {
            type: "anime",
            completed: complete,
            userId: parseInt(localStorage.getItem("loginId")),
          }).then(() => history.push(`/anime/myAnime`));
        } else {
          createList({
          type: "anime",
            animeId: animeId,
            completed: complete,
            userId: parseInt(localStorage.getItem("loginId")),
          }).then(() => history.push(`/anime/myAnime`));
        }
      });
    }
  };
  const handleAdd = (e) => {
    constructAnimeObject();
  };
  const handleComplete = (e) => {
    constructAnimeObject(true);
  };
  const handleAddComment = (e) => {
    addPersonalNote({
      comment: personalComment,
      date: Date.now(),
      animeId: animeId,
      userId: parseInt(localStorage.getItem("loginId")),
    });
    document.getElementById("personalNote").value = "";
    getPersonalNotes(animeId).then(res => {
      setNotes(res)
    })
  };

  return (
    <>
    <div className="text">

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
                  {time[0] ?           <Card color="purple" >
            <Card.Content className="noteCard">
              {notes.map((note) => {
                return <p>{note.comment}</p>;
              })}
            </Card.Content>
            <Card.Content extra>
              <div>
                <span>
                  <Input
                    id="personalNote"
                    type="text"
                    label="Note:"
                    placeholder="Viewing on Netflix"
                    onChange={handleChange}
                  />{" "}
                  <Button content="Add" onClick={handleAddComment} />
                </span>
              </div>
            </Card.Content>
          </Card>
 : ""}
        </Card.Group>
      </div>
                    </div>
    </>
  );
};
