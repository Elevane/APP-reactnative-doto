import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/auth/Login";
import RequireAuth from "./Components/auth/RequireAuth";
import CreateAccount from "./Components/auth/CreateAccount";
import { Toaster } from "react-hot-toast";

function App({ children }) {
  return (
    <>
      <Toaster></Toaster>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createAccount" element={<CreateAccount />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
