import React, { useState, createContext } from "react";

export const CommentContext = createContext();

export const CommentProvider = (props) => {

    const [comments, setComments] = useState([])


    const getComments = () => {
        return fetch(`http://localhost:8088/comments?_expand=user`)
        .then(res => res.json())
        .then(setComments)
    }

    const getCommentsById = (id) => {
        return fetch(`http://localhost:8088/comments?_expand=user&animeId=${id}`)
        .then(res => res.json())
        .then(setComments)
    }


    return (
        <CommentContext.Provider
          value={{
              comments, getComments, getCommentsById
           }}
        >
          {" "}
          {props.children}
        </CommentContext.Provider>
      );
}
