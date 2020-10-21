import React from "react"
import { Redirect, Route } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { UserProvider } from "./users/UserProvider"
import "../index.css"

export const AniManga = () => (
    <>
    <Route render={() => {
        if (localStorage.getItem("loginId")) {
            return (
<>
<NavBar />
    <ApplicationViews />
</>                
            );
        }
        else { return <Redirect to="/login"/>; }
    }}/>
    <UserProvider>
    <Route path="/login">
        <Login />
    </Route>
    <Route path="/register">
        <Register />

    </Route>
    </UserProvider>

    </>
)