import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../users/UserProvider";
import "./Login.css";

export const Register = (props) => {
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const email = useRef();
  const conflictDialog = useRef();
  const conflictDialog1 = useRef();
  const history = useHistory();



  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };
  const usernameCheck = () => {
    return fetch(`http://localhost:8088/users?username=${username.current.value}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    usernameCheck().then((userExists) => {
      if (userExists) {
        conflictDialog1.current.showModal();
      } else {
        existingUserCheck().then((userExists) => {
          if (!userExists) {
            fetch("http://localhost:8088/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email.current.value,
                firstName: `${firstName.current.value}`,
                lastName: `${lastName.current.value}`,
                username: `${username.current.value}`,
              }),
            })
              .then((_) => _.json())
              .then((createdUser) => {
                if (createdUser.hasOwnProperty("id")) {
                  localStorage.setItem("loginId", createdUser.id);
                  history.push("/");
                }
              });
          } else {
            conflictDialog.current.showModal();
          }
        });
      }
    });
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <dialog className="dialog dialog--password" ref={conflictDialog1}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog1.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for NSS Kennels
        </h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="username"> User Name </label>
          <input
            ref={username}
            type="text"
            name="username"
            className="form-control"
            placeholder="User Name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Sign in </button>
        </fieldset>
      </form>
    </main>
  );
};
