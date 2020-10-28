import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MangaCard } from "../manga/MangaCard";
import { MangaContext } from "../manga/Provider";
import { Pagination, Icon, Divider } from "semantic-ui-react";
import { Card, Button } from "semantic-ui-react";
import "../manga/Manga.css";
import { SearchContext } from "./SearchProvider";

export const MangaSearchList = () => {
  const { manga, getMangaByGenre, getMangaByName, getMangaByPage } = useContext(
    MangaContext
  );
  const { searchTerms, setSearchTerms, searchTermsG } = useContext(SearchContext);
  const [filteredManga, setManga] = useState();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  setSearchTerms("");

  // Page selection
  //     result = page - 1
  //     if (result = 0) { getMangaByPage() }
  //     else {
  //         result * 10 + 1
  //     getMangaByPage(result)
  // }

  useEffect(() => {
    getMangaByPage(offset).then((res) => {
      setManga(res);
    });
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      getMangaByName(searchTerms, offset).then(setManga);
    }
    else if (searchTermsG !== "") {
      getMangaByGenre(searchTermsG,offset).then(setManga)
    }
    else {
      getMangaByPage(offset).then((res) => {
        setManga(res);
      });
    }
  }, [offset]);

  useEffect(() => {
    if (searchTerms !== "") {
      getMangaByName(searchTerms).then(setManga);
    } else {
      setOffset(offset + 1);
    }
  }, [searchTerms]);
  useEffect(() => {
    if (searchTermsG !== "") {
      getMangaByGenre(searchTermsG).then(setManga);
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
      <div className="mangaList">
        <Card.Group itemsPerRow={2}>
        {filteredManga?.map((a) => {
          return (
            <>
              <MangaCard key={a.id} manga={a} />
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
