import React, { useState, useContext } from "react";
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const Signup = () => {
  const { setUserData } = useContext(UserContext);
  const [form, setForm] = useState();
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/users/register", form);
      const loginRes = await Axios.post("/users/login", {
        email: form.email,
        password: form.password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      console.log("problem", err);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        onChange={onChange}
        type="text"
        name="email"
        placeholder="email"
      ></input>

      <input
        onChange={onChange}
        type="text"
        name="password"
        placeholder="password"
      ></input>

      <input
        onChange={onChange}
        type="text"
        name="passwordCheck"
        placeholder="passwordCheck"
      ></input>

      <input
        onChange={onChange}
        type="text"
        name="displayName"
        placeholder="Display name"
      ></input>

      <input type="submit"></input>
    </form>
  );
};

export default Signup;
