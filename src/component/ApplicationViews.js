import React from "react";
import { Route } from "react-router-dom";
import { AnimeDetail } from "./anime/AnimeDetail";
import { AnimeList } from "./anime/AnimeList";
import { AnimeHome } from "./anime/AnimeHome";
import { AnimeProvider } from "./anime/Provider";
import { Home } from "./Home";
import { UserProvider } from "./users/UserProvider";
import { SearchList } from "./search/SearchList";
// import { Home } from "./Home"

export const ApplicationViews = (props) => {
  return (
    <>
    {/* User Anime Pages */}
      {/* Render the location list when http://localhost:3000/ */}
      <Route exact path="/">
        <Home />
      </Route>
      <AnimeProvider>
      <UserProvider>
        <Route exact path="/anime/myAnime">
          <AnimeList />
        </Route>
        </UserProvider>
      </AnimeProvider>
      <AnimeProvider>
      <UserProvider>
        <Route exact path="/anime">
          <AnimeHome />
        </Route>
        </UserProvider>
      </AnimeProvider>
      <AnimeProvider>
        <UserProvider>
          <Route exact path="/anime/detail/:animeId(\d+)">
            <AnimeDetail />
          </Route>
        </UserProvider>
      </AnimeProvider>

      {/* Search Starts here */}

      <AnimeProvider>
        <Route exact path="/anime/search">
          <SearchList />
        </Route>
      </AnimeProvider>

      {/* Render the animal list when http://localhost:3000/animals */}
      {/* <Route exact path="/anime">
            </Route> */}
    </>
  );
};
