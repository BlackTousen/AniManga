import React from "react";
import { Link } from "react-router-dom";
import "./Anime.css";

export const AnimeCard = ({ anime }) => (
    <section>
      <Link to={`/anime/detail/${anime.id}`}>
        <section className="animeCard">
          <h3 className="anime__name">{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</h3>
          <div></div>
        </section>
      </Link>
    </section>
  );
  export const AnimeHomeCard = ({ anime }) => (
    <section>
                <Link to="/anime/myanime">
          <h2 className="center">Anime Panel</h2>
        </Link>
      <Link to={`/anime/detail/${anime.id}`}>
        <section className="animeCard">
          <h3 className="anime__name">{anime?.attributes?.canonicalTitle ?? anime?.attributes?.abbreviatedTitles[0] ?? anime?.attributes?.titles.en }</h3>
          <div></div>
        </section>
      </Link>
    </section>
  );
    