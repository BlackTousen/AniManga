import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import "./Login.css";

export const Login = (props) => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  // const password = useRef()
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((user) => {
        if (!user[0]) {
          return false;
        } else if (user[0].username === username) {
          return user[0];
        } else {
          return false;
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingUserCheck().then((exists) => {
      if (exists) {
        localStorage.setItem("loginId", exists.id);
        history.push("/");
      } else {
        existDialog.current.showModal();
      }
    });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <Form className="form--login" onSubmit={handleLogin}>
        <h1>Welcome to AniManga!</h1>
        <h2>Please sign in</h2>
        <Form.Input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          label="Username"
          id="username"
          className="form-control"
          placeholder="username"
          required
          autoFocus
        />
        <Form.Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email Address:"
          id="email"
          className="form-control"
          placeholder="Email address"
          required
        />
        <Button type="submit">Sign in</Button>
      </Form>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
