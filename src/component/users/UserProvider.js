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
  const createList = () => {
    return fetch(`http://localhost:8088/lists/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          userId: localStorage.getItem("loginId"),
          completed: [],
          watching: []
      }),
    });
  };
  const getWatchingList = () => {
    return fetch(`http://localhost:8088/lists?_expand=user`)
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
        getUserById,
        addToList, getWatchingList, createList
      }}
    >
      {" "}
      {props.children}
    </UserContext.Provider>
  );
};
