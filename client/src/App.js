import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserContext from "./Context/UserContext";
import SinglePost from "./Pages/SinglePost";
import Profile from "./Pages/Profile";

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");

    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      const userRes = await axios.get("/users/", {
        headers: { "x-auth-token": token },
      });

      setUserData({
        token,
        user: userRes.data,
      });
    }
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {!userData.user ? (
          <div style={{ textAlign: "center", margin: "2rem" }}>
            <Link style={{ margin: "1rem" }} to="/signup">
              Signup
            </Link>
            <Link style={{ margin: "1rem" }} to="/login">
              Login
            </Link>
          </div>
        ) : (
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        )}

        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <Route exact path="/user/:id" component={Profile} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
