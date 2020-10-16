import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Anime.css";
import { AnimeContext } from "./Provider";




export const AnimeCard = ({ anime }) => {
        return (
            <section>
              <Link to={`/anime/detail/${anime.id}`}>
                <section className="animeCard">
                  <h3 className="anime__name">{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</h3>
                  <div></div>
                </section>
              </Link>
            </section>
          );
        
}
  export const AnimeHomeCard = ({ anime }) => (
    <section>
                <Link to="/anime/myanime">
          <h2 className="center">My List</h2>
        </Link>
      <Link to={`/anime/detail/${anime.id}`}>
        <section className="animeCard">
          <h3 className="anime__name">{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</h3>
          <div></div>
        </section>
      </Link>
    </section>
  );
  export const AnimeSearchCard = ({ anime }) => (
    <section>
                <Link to="/anime/search">
          <h2 className="center">Browse</h2>
        </Link>
      <Link to={`/anime/detail/${anime.id}`}>
        <section className="animeCard">
          <h3 className="anime__name">{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</h3>
          <div></div>
        </section>
      </Link>
    </section>
  );
    