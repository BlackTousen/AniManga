import { UserContext } from "../users/UserProvider";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import "./Manga.css";
import { MangaContext } from "./Provider";





export const MangaCard = ({ manga, listed } = false) => {

  const {deleteManga} = useContext(UserContext)
  const history = useHistory()
  return (
<>
      <Card color="purple" >
        <Link to={`/manga/detail/${manga.id}`}>
          <h3><Card.Header className="center">
          {manga?.attributes?.canonicalTitle ?? manga?.attributes?.titles.en ?? manga?.attributes?.abbreviatedTitles[0] ?? manga?.attributes?.canonicalTitle ?? manga?.attributes?.titles.en }
          </Card.Header></h3>
          <Card.Content textAlign="center" extra >{manga?.attributes?.canonicalTitle} - {manga?.attributes?.abbreviatedTitles[0]} - {manga?.attributes?.titles.en} </Card.Content>
        </Link>
        <Card.Content extra><button className="removeButton" hidden={!listed}
        onClick={() => {
          deleteManga(manga.id)
          history.push("/manga")
        }}
        >Remove</button></Card.Content>
        </Card>
</>
    );
  
}
export const MangaCommentCard = ({ manga }) => {
  return (
    <section>
                <Link to="/manga/comments">
          <h2 className="center">Comments</h2>
        </Link><Card  color="purple">
        <section className="mangaCard">
          <h3 className="manga__name">Browse Comments, get recommendations</h3>
          <div></div>
        </section></Card>
    </section>
    );
  
}
export const MangaHomeCard = ({ manga }) => (
    <section>
                <Link to="/manga/mymanga">
          <h2 className="center">My List</h2>
        </Link>
        <Card color="purple">
      <Link to={`/manga/detail/${manga.id}`}>
        <section className="mangaCard">
          <h3><Card.Header className="center">{manga?.attributes?.canonicalTitle ?? manga?.attributes?.abbreviatedTitles[0] ?? manga?.attributes?.titles.en }</Card.Header></h3>
          <Card.Content extra className="center"> {manga?.attributes?.titles.en} - {manga?.attributes?.canonicalTitle} - {manga?.attributes?.abbreviatedTitles[0]} </Card.Content>
          <div></div>
        </section>
      </Link></Card>
    </section>
  );
  export const MangaSearchCard = ({ manga }) => (
    <section>
                <Link to="/manga/search">
          <h2 className="center">Browse</h2>
        </Link>
        <Card color="purple" itemsPerRow={6}>
      <Link to={`/manga/detail/${manga.id}`}>
      <h3><Card.Header className="center">{manga?.attributes?.canonicalTitle ?? manga?.attributes?.abbreviatedTitles[0] ?? manga?.attributes?.titles.en }</Card.Header></h3>
      <Card.Content extra className="center"> {manga?.attributes?.titles.en} - {manga?.attributes?.canonicalTitle} - {manga?.attributes?.abbreviatedTitles[0]} </Card.Content>
      </Link></Card>
    </section>
  );
    