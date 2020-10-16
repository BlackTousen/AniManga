import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { AnimeCard } from "../anime/AnimeCard"
import { AnimeContext } from "../anime/Provider"
import "../anime/Anime.css"



export const SearchList = () => {
    const { anime, getAnimeByGenre, getAnimeByName, getAnimeByPage } = useContext(AnimeContext) 
    const [filteredAnime, setAnime] = useState()
    const [offset, setOffset] = useState(0)

// Page selection
//     result = page - 1 
//     if (result = 0) { getAnimeByPage() }
//     else { 
//         result * 10 + 1 
//     getAnimeByPage(result) 
// }

    useEffect(() => {
        getAnimeByPage(offset).then(res => { 
            setAnime(res)
        })
    }, [offset])

    const history = useHistory()


    return (
        <>
        <h2>Anime!</h2>
        <div className="animeList">
            {console.log(filteredAnime)}
            {filteredAnime?.map(a => {
                return (
                    <AnimeCard 
                    key={a.id}
                    anime={a}
                    />
                )
            })}
        </div>
        </>
    )
}