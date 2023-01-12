import React, { useState } from "react";
import useApi from "../../Hooks/useApi";
import routes from "../../Hooks/useRoutes";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await useApi.authenticate(email, password);
    setLoading(false);
  };

  const handleCreateAccount = () => {
    routes.moveTo("createAccount");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">El Doto</h2>
          <div className="text-center mb-5 text-dark">TP PWA bastien AUBRY</div>
          <div
            className="card auht_form"
            style={{ width: "60%", height: "80%", margin: "auto" }}
          >
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="text-center">
                <img
                  src="mex.jpg"
                  className="rounded-circle my-3"
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
                {!loading ? (
                  <input
                    type="submit"
                    id="login"
                    value="Login"
                    className="btn-color px-5 mb-5 w-100"
                  />
                ) : (
                  <div className="btn-color-loading px-5 mb-5 w-100">
                    <div className="loader"></div>
                  </div>
                )}
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Pas encore de compte ?
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  className="text-dark fw-bold create_account_btn"
                >
                  Create an Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
