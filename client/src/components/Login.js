import React, { useState } from "react";
import { AxiosWithAuth } from "../utils/AxiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [auth, setAuth] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    AxiosWithAuth()
      .post("api/login", auth)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })

      .catch(err => console.log("Error with Login: ", err.response))
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={auth.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={auth.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </>
  );
};

export default Login;
