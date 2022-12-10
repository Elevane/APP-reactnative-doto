import React, {  useState } from "react";
import useApi from "../../Hooks/useApi";






export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  
  const handleSubmit = async (e) => {
      e.preventDefault();
      useApi.Authenticate(email, password);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    window.location.href = "/CreateAccount";
  };

  return (
    <div id="login-form-wrap">
      <h2> Login </h2>{" "}
      <form id="login-form" onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="email"
            required
          />
        </p>{" "}
        <p>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
            required
          />
        </p>{" "}
        <p>
          <input type="submit" id="login" value="Login" />
        </p>{" "}
      </form>{" "}
      <div id="create-account-wrap">
        <p>
          {" "}
          Not a member ?{" "}
          <a href="/create" onClick={handleCreateAccount}>
            {" "}
            Create Account{" "}
          </a>
        </p>
      </div>{" "}
    </div>
  );
}
