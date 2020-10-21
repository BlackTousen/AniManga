import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AnimeCard } from "../anime/AnimeCard";
import { AnimeContext } from "../anime/Provider";
import { Pagination, Icon } from "semantic-ui-react";
import { Card, Button } from "semantic-ui-react";

import "../anime/Anime.css";
import { SearchContext } from "./SearchProvider";

export const SearchList = () => {
  const { anime, getAnimeByGenre, getAnimeByName, getAnimeByPage } = useContext(
    AnimeContext
  );
  const { searchTerms, setSearchTerms } = useContext(SearchContext);
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
    } else {
      getAnimeByPage(offset).then((res) => {
        setAnime(res);
      });
    }
  }, [offset]);

  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      getAnimeByName(searchTerms).then(setAnime);
    } else {
      // If the search field is blank, display all animals
      setOffset(offset + 1);
    }
  }, [searchTerms]);

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
        onClick={() => {
          if (page > 1) {
            previousPage();
          }
        }}
      >
        Previous Page
      </Button>
      <Button
        onClick={() => {
          nextPage();
        }}
      >
        Next Page
      </Button>
      <h2>Browse The Library...</h2>
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
      <Button
        onClick={() => {
          if (page > 1) {
            previousPage();
          }
        }}
      >
        Previous Page
      </Button>
      <Button
        onClick={() => {
          nextPage();
        }}
      >
        Next Page
      </Button>
      {/* <Pagination 
                     defaultActivePage={5}
                     ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                     firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                     lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                     prevItem={{ content: <Icon name='angle left' />, icon: true }}
                     nextItem={{ content: <Icon name='angle right' />, icon: true }}
                     totalPages={10}
                    /> */}
    </>
  );
};
