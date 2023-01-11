import React, { useState } from "react";
import useApi from "../../Hooks/useApi";


export default function CreateAccount() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    await useApi.CreateAccount(email, password, username);
    setLoading(false)
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">El Doto</h2>
      
          <div className="text-center mb-5 text-dark">TP PWA bastien AUBRY</div>
          <h3 className="text-center text-blue mt-5">Créer un compte</h3>
          <div className="card"  style={{width : "60%", margin : "auto"}}>
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
                  placeholder="email"
                  aria-describedby="emailHelp"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
              <label>Pseudo</label>
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUserName(e.target.value)}
                  name="username"
                  placeholder="username"
                  aria-describedby="usernameHelp"
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
              { !loading ? <input
                type="submit"
                id="login"
                value="Login"
                className="btn-color px-5 mb-5 w-100"
              />:
              <div className="btn-color-loading px-5 mb-5 w-100" ><div className="loader"></div></div>}
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Already have an account?{" "}
                <a
                  href="/login"
                 
                  className="text-dark fw-bold"
                >
                  {" "}
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
