import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MangaContext } from "./Provider";
import "./Manga.css";
import { UserContext } from "../users/UserProvider";
import { Card, Image, Button, Modal, Input } from "semantic-ui-react";
import { CommentContext } from "../comments/CommentProvider";

export const MangaDetail = () => {
  const { manga, getMangaById, mangaCheck } = useContext(MangaContext);
  const { addComment } = useContext(CommentContext);
  const {
    createList,
    getMangaList,
    getMangaList2,
    addToList,
    addPersonalNote,
    getPersonalNotes,
  } = useContext(UserContext);
  const [myManga, setMyManga] = useState({});
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [time, setTime] = useState("");
  const [personalComment, setPersonalComment] = useState("");
  const [watchingList, setWatchingList] = useState([]);
  const history = useHistory();
  const { mangaId } = useParams();
  const [value, setValue] = useState({});

  const handleChange = (e, { value }) => {
    setValue({ value });
    setPersonalComment(value);
  };
  useEffect(() => {
    mangaCheck(mangaId).then(setTime)
    getPersonalNotes(mangaId).then(setNotes);
    getMangaList().then((x) => {
      let found = x.find(
        (list) =>
          parseInt(list.userId) === parseInt(localStorage.getItem("loginId"))
      );
      setWatchingList(found);
    });
    getMangaById(mangaId).then((res) => {
      setMyManga(res.data);
    });
  }, []);

  useEffect(() => {
  getPersonalNotes(mangaId)
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

  const constructMangaObject = (complete = false) => {
    if (mangaId) {
      getMangaList2(mangaId).then((res) => {
        if (!!res[0] === true) {
          addToList(res[0].id, {
            type: "manga",
            completed: complete,
            userId: parseInt(localStorage.getItem("loginId")),
          }).then(() => history.push(`/manga/myManga`));
        } else {
          createList({
            type: "manga",
            mangaId: mangaId,
            completed: complete,
            userId: parseInt(localStorage.getItem("loginId")),
          }).then(() => history.push(`/manga/myManga`));
        }
      });
    }
  };
  const handleAdd = (e) => {
    constructMangaObject();
  };
  const handleComplete = (e) => {
    constructMangaObject(true);
  };
  const handleAddComment = (e) => {
    addPersonalNote({
      comment: personalComment,
      date: Date.now(),
      mangaId: mangaId,
      userId: parseInt(localStorage.getItem("loginId")),
    });
    document.getElementById("personalNote").value = "";
    getPersonalNotes(mangaId).then(setNotes)
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
                mangaId: mangaId,
                mangaName: myManga?.attributes?.canonicalTitle,
                userId: parseInt(localStorage.getItem("loginId")),
              });
              setOpen(false);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
      <div className="mangaPanel">
        <Card.Group>
          <Card color="purple">
            <Image src={myManga?.attributes?.posterImage.large} />
            <Card.Content>
              <Card.Header textAlign="center">
                {myManga?.attributes?.canonicalTitle ??
                  myManga?.attributes?.titles.en}{" "}
              </Card.Header>
              <Card.Description className="synopsis">
                {myManga?.attributes?.subtype} - {myManga?.attributes?.synopsis}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button.Group widths={2}>
                <Button
                  attached="left"
                  size="mini"
                  className="MangaButton"
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  Start Reading
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
                  className="MangaButton"
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
                    history.push(`/manga/comments/${mangaId}`);
                  }}
                />
              </Button.Group>
              <p></p>
              <Button.Group widths={2}>
                <Button
                  size="mini"
                  className="MangaButton"
                  onClick={() => {
                    history.push("/manga/myManga");
                  }}
                >
                  My Manga
                </Button>
                <Button
                  positive
                  size="tiny"
                  className="SearchButton"
                  hidden={false}
                  onClick={() => {
                    history.push("/manga/Search");
                  }}
                >
                  Manga Search
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
                  <Button content="Note" onClick={handleAddComment} />
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
