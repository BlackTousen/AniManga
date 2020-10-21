import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Button, Form, Input } from "semantic-ui-react";
import "./Login.css"


export const Login = props => {
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    // const password = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(user => { 
                if (!user[0]) { 
                    return false }
                else if (user[0].username === username) { return user[0] }
                else { return false }
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("loginId", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
        <dialog className="dialog dialog--auth" ref={existDialog}>
            <div>User does not exist</div>
            <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
        </dialog>
        <Form onSubmit={handleLogin} inverted>
        <h2>Welcome to Ani-Manga!</h2>
        <h3>Please Sign In</h3>
            <Form.Input
                onChange={(event) => setUsername(event.target.value)}
                id="form-input-username"
                control={Input}
                label="username"
                placeholder="username"
                width={6} />
            <Form.Input
                onChange={(event) => setEmail(event.target.value)}
                id="form-input-email"
                control={Input}
                label="email"
                placeholder="email"
                width={6} />
            <Button type="submit">
                Login
            </Button>
        </Form>
        <section className="link--register">
            <Link to="/register">Not a member yet?</Link>
        </section>
    </main>
    )
}

