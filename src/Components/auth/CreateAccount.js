import React, { useState } from "react";
import useApi from "../../Hooks/useApi";


export default function CreateAccount() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    useApi.CreateAccount(email, password, username);
  };

  return (
    <div id="login-form-wrap">
      <h2 className="pb-2"> Create account </h2>{" "}
      <form id="login-form" onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            required
          />
        </p>{" "}
        <p>
          <input
            type="text"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            placeholder="username"
            required
          />
        </p>{" "}
        <p>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
            required
          />
        </p>{" "}
        <p>
          <input type="submit" id="create" value="create" />
        </p>{" "}
      </form>{" "}
      <div id="create-account-wrap">
        <p>
          {" "}
          Already a member,{" "}
          <a href="/login">
            {"   "}
            Login{" "}
          </a>
        </p>
      </div>{" "}
    </div>
  );
}
