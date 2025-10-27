import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { UserContext } from "../Auth/UserContext";
import logo from "../Images/barkea_logo_transparent.png";
import { Carousel } from "react-bootstrap";
import home1 from "../Images/home1.jpg";
import home22 from "../Images/home22.jpg";
import vilaPushimi1 from "../Images/vilaPushimi1.jpg";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   const { setUserInfo } = useContext(UserContext);
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
    //   setUserInfo(res.data);
      if (res.data.role === "admin") nav("/create");
      else nav("/");
    } catch (err) {
      // console.log("Login error:", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-brand">
          <img src={logo} width="180" height="80" alt="logo" />
        </div>

        <h2>Sign In</h2>
        <p className="login-subtitle">Please fill your details to access your account.</p>

        <label>Email *</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address"
        />

        <label>Password *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <div className="login-options">
          
          <a href="/forgot" className="forgot-password">Forgot Password?</a>
        </div>

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Sign In</button>

        <p className="signup-text">
          Don't have an account?{" "}
          <a href="/register">Sign Up</a>
        </p>
      </div>
      <div className="login-carousel">
        <Carousel fade indicators={false} controls={false} interval={2500}>
          {[home1, home22, vilaPushimi1].map((photo, index) => (
            <Carousel.Item key={index}>
              <img src={photo} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Login;
