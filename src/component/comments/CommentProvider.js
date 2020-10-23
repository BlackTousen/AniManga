import React, { useState, createContext,  } from "react";

export const CommentContext = createContext();


export const CommentProvider = (props) => {

    const [comments, setComments] = useState([])


    const getComments = () => {
        return fetch(`http://localhost:8088/comments?_expand=user`)
        .then(res => res.json())
        .then(setComments)
    }
    const addComment = (stuff) => {
        return fetch(`http://localhost:8088/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(stuff)

        })
        .then(res => res.json())
        .then(getComments)
    }
    const deleteComment = (stuff) => {
        return fetch(`http://localhost:8088/comments/${stuff}`, {
            method: "DELETE",
        })
        .then(getComments)
    }

    const getCommentsById = (id) => {
        return fetch(`http://localhost:8088/comments?_expand=user&animeId=${id}`)
        .then(res => res.json())
        .then(setComments)
    }
    const editComment = (x,info) => {
        return fetch(`http://localhost:8088/comments/${x}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json",},
          body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(getComments)
      };
    

    return (
        <CommentContext.Provider
          value={{
              comments, getComments, getCommentsById, addComment, deleteComment, editComment
           }}
        >
          {" "}
          {props.children}
        </CommentContext.Provider>
      );
}
