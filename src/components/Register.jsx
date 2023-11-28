import React, { useState } from "react";
import { registerUser } from "../API/index.js";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser({
        firstname,
        lastname,
        email,
        password,
      });
      console.log("Registration successful!");

      if (result.token) {
        console.log("Token received:", result.token);
      }

      navigate("/account");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-label">
          First Name:
          <input
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
            className="register-input"
            required
          />
        </label>
        <br />
        <label className="register-label">
          Last Name:
          <input
            type="text"
            value={lastname}
            onChange={handleLastnameChange}
            className="register-input"
            required
          />
        </label>
        <br />
        <label className="register-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="register-input"
            required
          />
        </label>
        <br />
        <label className="register-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="register-input"
            required
          />
        </label>
        <br />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
