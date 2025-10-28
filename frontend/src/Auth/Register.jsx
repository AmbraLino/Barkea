import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import logo from '../Images/barkea_logo_transparent.png';
import home1 from "../Images/home1.jpg";
import home22 from "../Images/home22.jpg";
import vilaPushimi1 from "../Images/vilaPushimi1.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css"; 

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!newUser.username) return setError("Username should not be empty");
    if (!newUser.email) return setError("Email should not be empty");
    if (newUser.password.length < 8) return setError("Password should have at least 8 characters!");

    try {
      const res = await axios.post('http://localhost:5000/api/users/register/', newUser);
      console.log("User created:", res.data);
      navigate('/');
    } catch (err) {
      // console.log("User not created:", err);
      setError("User not created");
    }
  };

  return (
    <div className='register-full-container'>
    <div className="register-container">
      <div className="register-form">
        <div className="logo-header">
          {/* <img src={logo} width="180" height="80" alt="logo" /> */}
          {/* <span>Barkea</span> */}
        </div>

        <h2>Regjistrohu</h2>
        <p className="form-subtext">Ju lutem plotësoni të dhënat tuaja për të krijuar një llogari.</p>

        <label>Emri përdoruesit *</label>
        <input type="text" name="username" value={newUser.username} onChange={handleChange} placeholder="Shkruani emrin e përdoruesit" />

        <label>Email *</label>
        <input type="text" name="email" value={newUser.email} onChange={handleChange} placeholder="Shkruani adresën e email-it" />

        <label>Fjalëkalimi *</label>
        <input type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Shkruani fjalëkalimin" />

        {error && <p className="error">{error}</p>}

        <button className="submit-btn" onClick={handleSubmit}>Regjistrohu</button>

        <p className="login-link">
          Keni tashmë një llogari? <a href="/login">Hyr</a>
        </p>
      </div>

      <div className="register-carousel">
        <Carousel fade indicators={false}>
          {[home1, home22, vilaPushimi1].map((photo, index) => (
            <Carousel.Item key={index}>
              <img src={photo} className="d-block w-100" alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
    </div>
  );
};

export default Register;
