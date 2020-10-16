import React, {useState, createContext } from "react"
import { isCompositeComponent } from "react-dom/test-utils"

export const AnimeContext = createContext()

export const AnimeProvider = props => {
    const [anime, setAnime] = useState([])

    const getAnimeByPage = (offset = 0) => {
        return fetch(`https://kitsu.io/api/edge/anime?page[offset]=${offset}&sort=slug`)
        .then(res => res.json())
        .then(res => { 
            setAnime(res.data)
            return res.data
         })
    }
    const getAnimeByGenre = (offset = 0,selection) => {
        return fetch(`https://kitsu.io/api/edge/anime?page[offset]=${offset}&filter[categories]=${selection}`)
        .then(res => res.json())
        .then(res => { 
            setAnime(res.data)
            return res.data
        })
    }
    const getAnimeByName = (offset = 0,selection) => {
        return fetch(`https://kitsu.io/api/edge/anime?page[offset]=${offset}&filter[categories]=${selection}`)
        .then(res => res.json())
        .then(res => { 
            setAnime(res.data)
            return res.data
        })
    }

    const getAnimeById = (id = Math.floor(Math.random() * 1200)) => {
        return fetch(`https://kitsu.io/api/edge/anime/${id}`)
        .then(res => res.json())
        .then(res => { 
            setAnime(res.data)
            return res.data
        })
    }

    return (
        <AnimeContext.Provider value={{
            anime, getAnimeByPage, getAnimeById, getAnimeByGenre, getAnimeByName
        }}> {props.children}
        </AnimeContext.Provider>
    )

}