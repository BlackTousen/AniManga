import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardDescription,
  Container,
  Divider,
  Modal,
} from "semantic-ui-react";
import { AnimeContext } from "../anime/Provider";
import { CommentContext } from "./CommentProvider";

export const CommentListById = () => {
  const {
    comments,
    setComments,
    getCommentsById,
    deleteComment,
    editComment,
  } = useContext(CommentContext);
  const { getAnimeById } = useContext(AnimeContext);
  const { animeId } = useParams();
  const [open, setOpen] = useState(false);
  const [commentInfo, setComment] = useState("");
  const [commentId, setCommentId] = useState();

  function compare(a, b) {
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
    getCommentsById(animeId);
  }, []);


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

      <Container >
      <h2>Comments on selection</h2>
          {comments.map((comment) => {
            return (
              <>
                <Card key={`${comment.animeId} comment`} color="purple">
                  <Link to={`/anime/detail/${comment.animeId}`}>
                    <Card.Header>{comment.animeName} </Card.Header>{" "}
                  </Link>
                  <Divider />
                  <Card.Description content={comment.comment} />
                  <Card.Content
                    textAlign="center"
                    extra
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
                  </>) : ""}
              </>
            );
          })}
      </Container>
    </>
  );
};
