import React, {useState, createContext } from "react"

export const AnimeContext = createContext()

export const AnimeProvider = props => {
    const [anime, setAnime] = useState()

    const getAnime = (offset = 0) => {
        return fetch(`https://kitsu.io/api/edge/anime?page[offset]=${offset}`)
        .then(res => res.json())
        .then(setAnime)
    }

    const getAnimeById = id => {
        return fetch(`https://kitsu.io/api/edge/anime/${id}`)
        .then(res => res.json())
        .then(setManga)
    }

    return (
        <AnimeContext.Provider value={{
            anime, getAnime, getAnimeById
        }}> {props.children}
        </AnimeContext.Provider>
    )

}