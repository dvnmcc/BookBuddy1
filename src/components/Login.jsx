import React, { useState } from "react";
import { loginUser } from "../API/index";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      const result = await loginUser(loginData);

      if (result.token) {
        localStorage.setItem("token", result.token);
        setLoggedIn(true);
        navigate("/account");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="login-input"
            required
          />
        </label>
        <br />
        <label className="login-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
            required
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
