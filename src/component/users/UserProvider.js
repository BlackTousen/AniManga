import React, { useState, createContext } from "react";
import { isCompositeComponent } from "react-dom/test-utils";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUser] = useState();

  const addToList = (id,anime) => {
    return fetch(`http://localhost:8088/lists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(anime),
    });
  };
  const createList = (list) => {
    return fetch(`http://localhost:8088/lists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
  };
  const getWatchingList = () => {
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${localStorage.getItem("loginId")}`)
    .then(res => res.json())
  };
  const getList = (x) => {
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${localStorage.getItem("loginId")}&animeId=${x}`)
    .then(res => res.json())
  };
  const PatchAnime = (x,info) => {
    return fetch(`http://localhost:8088/lists/${x}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify(info)
    })
    .then(res => res.json())
  };
  const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`, {

    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };
  const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        return res;
      });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        getUserById, getList, PatchAnime,
        addToList, getWatchingList, createList
      }}
    >
      {" "}
      {props.children}
    </UserContext.Provider>
  );
};
