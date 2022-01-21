import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import CenteringDiv from "../Fragments/CenteringDiv";
import AuthForm from "../Fragments/Auth/AuthForm";
import AuthButton from "../Fragments/Buttons/AuthButton";
import AuthInput from "../Fragments/Auth/AuthInput";

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
    <CenteringDiv>
      <AuthForm onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <AuthInput
          type="text"
          placeholder="your email"
          name="email"
          onChange={onChange}
        />
        <label htmlFor="password">Password</label>
        <AuthInput
          type="text"
          placeholder="password"
          name="password"
          onChange={onChange}
        />
        <AuthButton type="submit">Login</AuthButton>
      </AuthForm>
    </CenteringDiv>
  );
};

export default Login;
