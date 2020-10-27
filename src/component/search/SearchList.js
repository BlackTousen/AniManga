import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AnimeCard } from "../anime/AnimeCard";
import { AnimeContext } from "../anime/Provider";
import { Pagination, Icon, Divider } from "semantic-ui-react";
import { Card, Button } from "semantic-ui-react";
import "../anime/Anime.css";
import { SearchContext } from "./SearchProvider";

export const SearchList = () => {
  const { anime, getAnimeByGenre, getAnimeByName, getAnimeByPage } = useContext(
    AnimeContext
  );
  const { searchTerms, setSearchTerms, searchTermsG } = useContext(SearchContext);
  const [filteredAnime, setAnime] = useState();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  setSearchTerms("");

  // Page selection
  //     result = page - 1
  //     if (result = 0) { getAnimeByPage() }
  //     else {
  //         result * 10 + 1
  //     getAnimeByPage(result)
  // }

  useEffect(() => {
    getAnimeByPage(offset).then((res) => {
      setAnime(res);
    });
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      getAnimeByName(searchTerms, offset).then(setAnime);
    }
    else if (searchTermsG !== "") {
      getAnimeByGenre(searchTermsG,offset).then(setAnime)
    }
    else {
      getAnimeByPage(offset).then((res) => {
        setAnime(res);
      });
    }
  }, [offset]);

  useEffect(() => {
    if (searchTerms !== "") {
      getAnimeByName(searchTerms).then(setAnime);
    } else {
      setOffset(offset + 1);
    }
  }, [searchTerms]);
  useEffect(() => {
    if (searchTermsG !== "") {
      console.log(searchTermsG)
      getAnimeByGenre(searchTermsG).then(setAnime);
    } else {
      setOffset(offset + 1);
    }
  }, [searchTermsG]);

  const nextPage = () => {
    let newPage = page + 1;
    let result = newPage - 1;
    if (result === 0) {
      setOffset(0);
    } else {
      result = result * 10 + 1;
    }
    setPage(newPage);
    setOffset(result);
  };
  const previousPage = () => {
    let newPage = page - 1;
    let result = newPage - 1;
    if (result === 0) {
      setOffset(0);
    } else {
      result = result * 10 + 1;
    }
    setPage(newPage);
    setOffset(result);
  };

  const history = useHistory();

  return (
    <>
      <Button 
      floated='left'
      inverted color="green"
        onClick={() => {
          if (page > 1) {
            previousPage();
          }
        }}
        content="Previous Page"
      />
      <Button 
      floated='right'
      inverted color="green"
      float="right"
        onClick={() => {
          nextPage();
        }}
        content="Next Page"
        />
      <Divider section hidden />
      <Divider section hidden />
      <Divider section inverted/>
      <h2 className="center">Browse The Library...</h2>
      <div className="animeList">
        <Card.Group itemsPerRow={2}>
        {filteredAnime?.map((a) => {
          return (
            <>
              <AnimeCard key={a.id} anime={a} />
            </>
          );
        })}</Card.Group>
      </div>
      <Divider section inverted/>

      <Button 
      floated='left'
      inverted color="green"
        onClick={() => {
          if (page > 1) {
            previousPage();
          }
        }}
        content="Previous Page"
      />
      <Button 
      floated='right'
      inverted color="green"
      float="right"
        onClick={() => {
          nextPage();
        }}
        content="Next Page"
        />     
    </>
  );
};
