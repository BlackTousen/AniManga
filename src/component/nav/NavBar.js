import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import { Menu } from "semantic-ui-react";

export const NavBar = (props) => {
  return (
    <>
      <Menu inverted>
        <Menu.Item
        color="purple"
        as={NavLink} exact to="/">
          Home
        </Menu.Item>
        <Menu.Item
                color="purple"
                as={NavLink} to="/anime">
          Anime
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={NavLink}
            to="/login"
            onClick={() => {
              localStorage.removeItem("loginId");
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};
