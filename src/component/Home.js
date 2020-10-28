import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Divider } from "semantic-ui-react";
import "./home.css";
import "../component/auth/Login.css"
import video1 from "../video/video1.mp4";
import video2 from "../video/video2.mp4";
import video3 from "../video/video3.mp4";
import video4 from "../video/video4.mp4";
import video5 from "../video/video5.mp4";
import video6 from "../video/video6.mp4";

export const Home = () => {
  const randomVideo = () => {
    let result = Math.floor(Math.random() * 5 + 1);
    if (result === 1) {
      return video1;
    }
    if (result === 2) {
      return video2;
    }
    if (result === 3) {
      return video3;
    }
    if (result === 4) {
      return video4;
    }
    if (result === 5) {
      return video5;
    }
    if (result === 6) {
      return video6;
    }
  };

  return (
    <>
      <div>
        {/* <Container className="homepage"> */}
        <h2 className="center">AniManga</h2>
        <div className="center">Welcome!</div>
        <small className="center">
          Track your favorites, avoid the dislikes.
        </small>
        <Divider />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        {/* </Container> */}

        <div className="animePanel">
          <Link to="/anime">
            <Card color="purple" className="center">
              Anime
              <Card.Content extra> For your Anime needs</Card.Content>
            </Card>
          </Link>
          <Link to="/manga">
            <Card color="purple" className="center">
              Manga
              <Card.Content extra> For your Manga needs</Card.Content>
            </Card>
          </Link>
        </div>
              </div>
              <video className="videoTag" autoPlay loop muted>
          <source src={video1} type="video/mp4" />
        </video>
    </>
  );
};
