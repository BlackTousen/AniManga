import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUser] = useState();

const getPersonalNotes = (x) => {
  return fetch(`http://localhost:8088/notes?userId=${parseInt(localStorage.getItem("loginId"))}&animeId=${parseInt(x)}`)
  .then((res) => res.json())

}

  const addPersonalNote = x => {
    return fetch(`http://localhost:8088/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(x),
    });

  }

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
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${localStorage.getItem("loginId")}&type=anime`)
    .then(res => res.json())
  };
  const getMangaList = () => {
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${localStorage.getItem("loginId")}&type=manga`)
    .then(res => res.json())
  };
  const getList = (x) => {
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${localStorage.getItem("loginId")}&animeId=${x}`)
    .then(res => res.json())
  };
  const getMangaList2 = (x) => {
    return fetch(`http://localhost:8088/lists?_expand=user&userId=${localStorage.getItem("loginId")}&mangaId=${x}`)
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
  const deleteAnime = id => {
    return fetch(`http://localhost:8088/lists?animeId=${id}`)
    .then(res => res.json())
    .then(res => {
      return fetch(`http://localhost:8088/lists/${res[0].id}`, {
        method: "DELETE"
      })
    })
    
  }
  const deleteManga = id => {
    return fetch(`http://localhost:8088/lists?mangaId=${id}`)
    .then(res => res.json())
    .then(res => {
      return fetch(`http://localhost:8088/lists/${res[0].id}`, {
        method: "DELETE"
      })
    })
    
  }
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
        addToList, getWatchingList, createList, deleteAnime,
        addPersonalNote, getPersonalNotes, getMangaList, deleteManga,
        getMangaList2
      }}
    >
      {" "}
      {props.children}
    </UserContext.Provider>
  );
};
