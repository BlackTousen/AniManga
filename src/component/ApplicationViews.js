import React from "react"
import { Route } from "react-router-dom"
import { AnimeDetail } from "./anime/AnimeDetail"
import { AnimeList } from "./anime/AnimeList"
import { AnimeProvider } from "./anime/Provider"
import { Home } from "./Home"
// import { Home } from "./Home"

export const ApplicationViews = (props) => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>
            <AnimeProvider>
                <Route exact path="/myAnime">
                    <AnimeList />
                </Route>
            </AnimeProvider>
            <AnimeProvider>
                <Route exact path="/anime/detail/:animeId(\d+)">
                    <AnimeDetail />
                </Route>
            </AnimeProvider>

            {/* Render the animal list when http://localhost:3000/animals */}
            {/* <Route exact path="/anime">
            </Route> */}
        </>
    )
}