import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";

const Home = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);

  return <h1>Home</h1>;
};

export default Home;
