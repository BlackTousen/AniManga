import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { AnimeCard } from "./AnimeCard"
import { AnimeContext } from "./Provider"
import "./Anime.css"



export const AnimeList = () => {
    const { anime, getAnimeByGenre, getAnimeByName, getAnimeByPage } = useContext(AnimeContext) 
    const [filteredAnime, setAnime] = useState()

// Page selection
//     result = page - 1 
//     if (result = 0) { getAnimeByPage() }
//     else { 
//         result * 10 + 1 
//     getAnimeByPage(result) 
// }

    useEffect(() => {
        getAnimeByPage(0).then(res => { 
            setAnime(res)
            console.log("Use effect",res)
        })
    }, [])

    const history = useHistory()


    return (
        <>
        <h2>Anime!</h2>
        <div className="animeList">
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