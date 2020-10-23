import { UserContext } from "../users/UserProvider";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import "./Anime.css";
import { AnimeContext } from "./Provider";





export const AnimeCard = ({ anime, listed } = false) => {

  const {deleteAnime} = useContext(UserContext)
  const history = useHistory()
  return (
<>
      <Card color="purple" >
        <Link to={`/anime/detail/${anime.id}`}>
          <h3><Card.Header >
          {anime?.attributes?.canonicalTitle ?? anime?.attributes?.titles.en ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.canonicalTitle ?? anime?.attributes?.titles.en }
          </Card.Header></h3>
          <Card.Content textAlign="center" extra >{anime?.attributes?.canonicalTitle} - {anime?.attributes?.abbreviatedTitles[0]} - {anime?.attributes?.titles.en} </Card.Content>
          {/* <section className="animeCard">
            <h3 className="anime__name center">{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</h3>
            <div></div>
          </section> */}
        </Link>
        <Card.Content extra><button className="removeButton" hidden={!listed}
        onClick={() => {
          deleteAnime(anime.id)
          history.push("/anime")
        }}
        >Remove</button></Card.Content>
        </Card>
</>
    );
  
}
export const AnimeCommentCard = ({ anime }) => {
  return (
    <section>
                <Link to="/anime/comments">
          <h2 className="center">Comments</h2>
        </Link><Card  color="purple">
        <section className="animeCard">
          <h3 className="anime__name">Browse Comments, get recommendations</h3>
          <div></div>
        </section></Card>
    </section>
    );
  
}
export const AnimeHomeCard = ({ anime }) => (
    <section>
                <Link to="/anime/myanime">
          <h2 className="center">My List</h2>
        </Link>
        <Card color="purple">
      <Link to={`/anime/detail/${anime.id}`}>
        <section className="animeCard">
          <h3><Card.Header>{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</Card.Header></h3>
          <Card.Content extra> {anime?.attributes?.titles.en} - {anime?.attributes?.canonicalTitle} - {anime?.attributes?.abbreviatedTitles[0]} </Card.Content>
          <div></div>
        </section>
      </Link></Card>
    </section>
  );
  export const AnimeSearchCard = ({ anime }) => (
    <section>
                <Link to="/anime/search">
          <h2 className="center">Browse</h2>
        </Link>
        <Card color="purple" itemsPerRow={6}>
      <Link to={`/anime/detail/${anime.id}`}>
      <h3><Card.Header>{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</Card.Header></h3>
      <Card.Content extra> {anime?.attributes?.titles.en} - {anime?.attributes?.canonicalTitle} - {anime?.attributes?.abbreviatedTitles[0]} </Card.Content>
        {/* <section className="animeListCard">
          <h3 className="anime__name">{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</h3>
          <div></div>
        </section> */}
      </Link></Card>
    </section>
  );
    