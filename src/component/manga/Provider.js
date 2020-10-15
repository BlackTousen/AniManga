import React, {useState, createContext } from "react"

export const MangaContext = createContext()

export const MangaProvider = props => {
    const [manga, setManga] = useState()

    const getManga = (offset = 0) => {
        return fetch(`https://kitsu.io/api/edge/manga?page[offset]=${offset}`)
        .then(res => res.json())
        .then(setManga)
    }

    const getMangaById = id => {
        return fetch(`https://kitsu.io/api/edge/manga/${id}`)
        .then(res => res.json())
        .then(setManga)
    }

    return (
        <MangaContext.Provider value={{
            manga, getManga, getMangaById
        }}> {props.children}
        </MangaContext.Provider>
    )

}