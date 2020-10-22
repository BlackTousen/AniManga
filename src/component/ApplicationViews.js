import React from "react";
import { Route } from "react-router-dom";
import { AnimeDetail } from "./anime/AnimeDetail";
import { AnimeList } from "./anime/AnimeList";
import { AnimeHome } from "./anime/AnimeHome";
import { AnimeProvider } from "./anime/Provider";
import { Home } from "./Home";
import { UserProvider } from "./users/UserProvider";
import { SearchList } from "./search/SearchList";
import { SearchProvider } from "./search/SearchProvider";
import { AnimeSearch } from "./search/AnimeSearch";
import { CommentProvider } from "./comments/CommentProvider";
import { CommentList } from "./comments/CommentList";
import { CommentListById } from "./comments/CommentListById";
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
      <SearchProvider>
        <AnimeProvider>
          <UserProvider>
            <Route exact path="/anime/search">
              <AnimeSearch />
              <SearchList />
            </Route>
          </UserProvider>
        </AnimeProvider>
      </SearchProvider>
      {/* Search Starts here */}
      <AnimeProvider>
      <CommentProvider>
            <Route exact path="/anime/comments">
              <CommentList />
            </Route>
        </CommentProvider>
        </AnimeProvider>  
        <AnimeProvider>
      <CommentProvider>
            <Route exact path="/anime/comments/:animeId(\d+)">
              <CommentListById />
            </Route>
        </CommentProvider>
        </AnimeProvider>  

      {/* Render the animal list when http://localhost:3000/animals */}
      {/* <Route exact path="/anime">
            </Route> */}
    </>
  );
};
