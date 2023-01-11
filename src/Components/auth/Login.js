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

    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5">El Doto</h2>
        <div className="text-center mb-5 text-dark">TP PWA bastien AUBRY</div>
        <div className="card " style={{width : "60%", margin : "auto"}}>
          <form
            className="card-body cardbody-color p-lg-5"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              <img
                src="mex.jpg"
                className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px"
                alt="profile"
              />
            </div>

            <div className="mb-3">
              <label>Adresse mail</label>
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email"
                aria-describedby="emailHelp"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
            <label>Mot de passe</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="password"
                className="form-control"
                required
              />
            </div>
            <div className="text-center">
              <input
                type="submit"
                id="login"
                value="Login"
                className="btn-color px-5 mb-5 w-100"
              />
            </div>
            <div
              id="emailHelp"
              className="form-text text-center mb-5 text-dark"
            >
              Not Registered?{" "}
              <a
                href="/createAccount"
                onClick={handleCreateAccount}
                className="text-dark fw-bold"
              >
                {" "}
                Create an Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}
