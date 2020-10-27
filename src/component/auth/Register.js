import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form,Input } from "semantic-ui-react";
import { UserContext } from "../users/UserProvider";
import "./Login.css";
import video from "../../video/register.mp4"


export const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const conflictDialog = useRef();
  const conflictDialog1 = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };
  const usernameCheck = () => {
    return fetch(`http://localhost:8088/users?username=${username}`)
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
                email: email,
                firstName: `${firstName}`,
                lastName: `${lastName}`,
                username: `${username}`,
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
<div>
<main >
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

      <Form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Register for Ani-Manga
        </h1>
        <Form.Input 
        width={3}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                    control={Input}
                    required
                    autoFocus
                    label="First Name"
/>
<Form.Input 
        width={3}
        onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    name="LastName"
                    className="form-control"
                    placeholder="Last name"
                    control={Input}
                    required
                    autoFocus
                    label="Last Name"
/>
<Form.Input 
        width={3}
        onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="User name"
                    control={Input}
                    required
                    autoFocus
                    label="User Name"
/>
<Form.Input 
        width={3}
        onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="email@domain.com"
                    control={Input}
                    required
                    autoFocus
                    label="Email"
/>
          <Button type="submit"> Register </Button>
      </Form>
    </main>
                        <video className="videoTag" autoPlay loop muted>
                        <source src={video} type="video/mp4" />
                    </video>
    </div>
    
  );
};
