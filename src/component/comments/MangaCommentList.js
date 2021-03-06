import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  Container,
  Divider,
  Button,
  Modal,
  Feed,
} from "semantic-ui-react";
import { MangaContext } from "../manga/Provider";
import { CommentContext } from "./CommentProvider";
import "../auth/Login.css"
import video from "../../video/video3.mp4"


export const MangaCommentList = () => {
  const { comments, deleteComment, getComments, editComment } = useContext(
    CommentContext
  );
  const { getMangaById } = useContext(MangaContext);
  const [mangaName, setMangaName] = useState("");
  const [open, setOpen] = useState(false);
  const [commentInfo, setComment] = useState("");
  const [commentId, setCommentId] = useState();

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.date;
    const bandB = b.date;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }

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

  useEffect(() => {
    getComments();
  }, []);

  //   const handleMangaNames = list => {
  //       for (a of list) { getMangaById(a.mangaId).then(setMangaName) }
  //   }

  comments.sort(compare);

  const owned = (comment) => {
    if (parseInt(localStorage.getItem("loginId")) === comment.userId) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
    <div className="main">
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
            defaultValue={commentInfo}
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
              editComment(commentId, {
                comment: `${commentInfo} [edited]`,
                date: Date.now(),
              });
              setOpen(false);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>

      <h2>Comments Section</h2>
      <Container>
        <Feed>
        {comments.filter(comment => comment.mangaName).map((comment) => {
          return (
            <>
              <Card key={`Comment ${comment.mangaId}`} color="purple">
                <Link to={`/manga/detail/${comment.mangaId}`}>
                  <Card.Header textAlign="center"> {comment.mangaName} </Card.Header>{" "}
                </Link>
                <Card.Description content={comment.comment} />
                <Card.Content
                  extra
                  textAlign="center"
                  content={comment.user.username}
                />
              </Card>
              {owned(comment) ? (
                <>
                  <Button
                    size="mini"
                    icon="pencil"
                    onClick={() => {
                      setComment(comment.comment);
                      setCommentId(comment.id);
                      setOpen(true);
                    }}
                  />
                  <Button
                    size="mini"
                    icon="trash"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  />{" "}
                </>
              ) : (
                ""
              )}
            </>
          );
        })}
        </Feed>
      </Container>
      </div>

      <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        </div>
    </>
  );
};
