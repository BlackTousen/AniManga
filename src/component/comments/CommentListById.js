import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardDescription, Container, Divider } from "semantic-ui-react";
import { AnimeContext } from "../anime/Provider";
import { CommentContext } from "./CommentProvider";

export const CommentListById = () => {
    const { comments, setComments, getCommentsById } = useContext(CommentContext);
    const { getAnimeById } = useContext(AnimeContext);
    const [ animeName,setAnimeName ] = useState("")
    const {animeId} = useParams()

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
    getCommentsById(animeId).then((res) => comments.sort(compare))
  }, []);

//   const handleAnimeNames = list => {
//       for (a of list) { getAnimeById(a.animeId).then(setAnimeName) }
//   }

  return (
    <>
      <h2>Comments Section</h2>
      <Container>
          <Card.Group itemsPerRow={cardAlign(comments)}>
        {comments.map((comment) => {
          return (
            <Card
              key={comment.animeId}
              color="purple"
            ><Link to={`/anime/detail/${comment.animeId}`}>
                <Card.Header>Name Here {comment.animeName} </Card.Header> </Link>
                <Card.Description content={comment.comment}/>
                <Card.Content extra content={comment.user.username}/>
            </Card>
          );
        })}</Card.Group>
      </Container>
    </>
  );
};
