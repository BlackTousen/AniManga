import React, {useContext, useEffect, useState} from "react"
import { useHistory, useParams } from "react-router-dom"
import {AnimeContext} from "./Provider"
import "./Anime.css"

export const AnimeDetail = () => {
    const { anime, getAnimeById } = useContext(AnimeContext)
    const [myAnime, setMyAnime] = useState({})
    const history = useHistory()
    const {animeId} = useParams()

    useEffect(() => {
        getAnimeById(animeId).then(res => {
            console.log(res)
            setMyAnime(res)
        })
    }, [])

    return (
        <section className="animeList">
            <section className="animeCard">
                <h3 className="center">{myAnime?.attributes?.canonicalTitle ?? myAnime?.attributes?.titles.en} </h3>
                <img className="center" src={myAnime?.attributes?.posterImage.tiny} alt={myAnime?.attributes?.titles.en}/>
                <div className="synopsis">{myAnime?.attributes?.subtype} - {myAnime?.attributes?.synopsis}</div>
                <div className="buttons"><button className="AnimeButton" onClick={() => {
                    history.push("/myAnime")
                }}>My Anime</button>
                <button className="SearchButton" hidden={true} onClick={() => {
                    history.push("/animeSearch")
                }}>Anime Search</button></div>
            </section>
        </section>
            )

}