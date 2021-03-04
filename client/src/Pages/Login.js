import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [form, setForm] = useState({});
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await Axios.post("/users/login", {
        email: form.email,
        password: form.password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      console.log("problem", err);
    }
  };

  useEffect(() => {
    if (userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" onChange={onChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
