import React from "react";
import { Route } from "react-router-dom";
import { AnimeDetail } from "./anime/AnimeDetail";
import { AnimeList } from "./anime/AnimeList";
import { AnimeHome } from "./anime/AnimeHome";
import { AnimeProvider } from "./anime/Provider";
import { Home } from "./Home";
import { UserProvider } from "./users/UserProvider";
// import { Home } from "./Home"

export const ApplicationViews = (props) => {
  return (
    <>
      {/* Render the location list when http://localhost:3000/ */}
      <Route exact path="/">
        <Home />
      </Route>
      <AnimeProvider>
        <Route exact path="/anime/myAnime">
          <AnimeList />
        </Route>
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

      {/* Render the animal list when http://localhost:3000/animals */}
      {/* <Route exact path="/anime">
            </Route> */}
    </>
  );
};
