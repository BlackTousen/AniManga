import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">AniManga</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/anime">Anime Fans</Link>
            </li>
            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/manga">Manga Fans</Link>
            </li> */}
        </ul>
    )
}