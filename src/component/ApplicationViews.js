import React from "react";
import { Route } from "react-router-dom";
import { AnimeDetail } from "./anime/AnimeDetail";
import { AnimeList } from "./anime/AnimeList";
import { AnimeHome } from "./anime/AnimeHome";
import { AnimeProvider } from "./anime/Provider";
import { Home } from "./Home";
import { UserProvider } from "./users/UserProvider";
import { SearchList } from "./search/SearchList";
import { MangaSearchList } from "./search/MangaSearchList";
import { SearchProvider } from "./search/SearchProvider";
import { AnimeSearch } from "./search/AnimeSearch";
import { MangaSearch } from "./search/MangaSearch";
import { CommentProvider } from "./comments/CommentProvider";
import { CommentList } from "./comments/CommentList";
import { MangaCommentList } from "./comments/MangaCommentList";
import { CommentListById } from "./comments/CommentListById";
// import { Home } from "./Home"
import "./auth/Login.css"
import video from "../video/video3.mp4"
import { MangaProvider } from "./manga/Provider";
import { MangaHome } from "./manga/MangaHome";
import { MangaList } from "./manga/MangaList";
import { MangaDetail } from "./manga/MangaDetail";

// import video2 from "../video/video2.mp4"
// import video3 from "../video/video3.mp4"
// import video4 from "../video/video4.mp4"
// import video5 from "../video/video5.mp4"
// import video6 from "../video/video6.mp4"


export const ApplicationViews = (props) => {

  const randomVideo = () => {
    let result = "video" + Math.floor(Math.random() * 0) + 1
    return result
  }


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
      <CommentProvider>
      <AnimeProvider>
        <UserProvider>
          <Route exact path="/anime/detail/:animeId(\d+)">
            <AnimeDetail />
          </Route>
        </UserProvider>
      </AnimeProvider>
      </CommentProvider>

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
      {/* Comments Starts here */}
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
              <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
            </Route>
        </CommentProvider>
        </AnimeProvider>  

      {/* <Route exact path="/anime">
            </Route> */}

            {/* Manga setup here */}
            <MangaProvider>
        <UserProvider>
          <Route exact path="/manga">
            <MangaHome />
          </Route>
        </UserProvider>
      </MangaProvider>

      <MangaProvider>
        <UserProvider>
          <Route exact path="/manga/myManga">
            <MangaList />
          </Route>
        </UserProvider>
      </MangaProvider>

      <CommentProvider>
      <MangaProvider>
        <UserProvider>
          <Route exact path="/manga/detail/:mangaId(\d+)">
            <MangaDetail />
          </Route>
        </UserProvider>
      </MangaProvider>
      </CommentProvider>

       <SearchProvider>
        <MangaProvider>
          <UserProvider>
            <Route exact path="/manga/search">
              <MangaSearch />
              <MangaSearchList />
            </Route>
          </UserProvider>
        </MangaProvider>
      </SearchProvider> 

<MangaProvider>
      <CommentProvider>
            <Route exact path="/manga/comments">
              <MangaCommentList />
            </Route>
        </CommentProvider>
        </MangaProvider>  

        <MangaProvider>
      <CommentProvider>
            <Route exact path="/manga/comments/:mangaId(\d+)">
              <MangaCommentList />
              <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
            </Route>
        </CommentProvider>
        </MangaProvider>  

    </>
  );
};
